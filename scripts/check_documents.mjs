import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";

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
    try {
      if ((await fetch(`${base}/robots.txt`)).ok) break;
    } catch {
      // Server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const landing = await fetch(`${base}/en/documents/de`);
  const html = await landing.text();
  assert.equal(landing.status, 200);
  assert.match(html, /Archived source snapshot/);
  assert.match(html, /not an official biography/i);
  assert.match(html, /rel="canonical" href="[^"]+\/en\/documents\/de"/);

  const binary = await fetch(`${base}/en/documents/de/file`);
  assert.equal(binary.status, 200);
  assert.match(binary.headers.get("content-type") ?? "", /^application\/pdf/);
  assert.equal(binary.headers.get("x-robots-tag"), "noindex, noarchive");
  const signature = new TextDecoder().decode((await binary.arrayBuffer()).slice(0, 5));
  assert.equal(signature, "%PDF-");

  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  assert.doesNotMatch(sitemap, /\/documents\/[^<]+\/file|\.pdf/i);
  console.log("Document checks passed.");
} finally {
  server.kill();
}
