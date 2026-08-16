import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { readFile } from "node:fs/promises";

const [archiveSource, policy] = await Promise.all([
  readFile("app/components/DocumentArchive.tsx", "utf8"),
  readFile("docs/trust-claim-policy.md", "utf8"),
]);
for (const unsupported of [/100%\s*Available/i, /original PDF publication/i, /published across 26 international languages/i]) {
  assert.doesNotMatch(archiveSource, unsupported);
}
for (const pending of ["DhakaNewsTimes@Proton.me", "+880 1812-345678", "verification-required", "release-approval blocker"]) {
  assert.ok(policy.includes(pending), `trust policy must track ${pending}`);
}

const port = await new Promise((resolve, reject) => {
  const listener = createServer();
  listener.once("error", reject);
  listener.listen(0, "127.0.0.1", () => {
    const address = listener.address();
    listener.close(() => resolve(address.port));
  });
});
const base = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ["node_modules/@react-router/serve/bin.cjs", "build/server/index.js"], {
  env: { ...process.env, PORT: String(port) },
  stdio: "ignore",
});

try {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try { if ((await fetch(`${base}/robots.txt`)).ok) break; } catch { /* server starting */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  const home = await (await fetch(`${base}/en`)).text();
  assert.match(home, /26 language-labeled Wikipedia print snapshots/);
  assert.match(home, /not presented as an official biography or original publication of this site/);
  assert.doesNotMatch(home, /100%[^<]{0,30}Available/i);
  assert.doesNotMatch(home, /original PDF publication/i);
  console.log("Trust-claim checks passed; evidence-dependent identity fields remain documented release blockers.");
} finally {
  server.kill();
}

