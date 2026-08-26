import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { createServer } from "node:net";

const [articles, dossiersSource] = await Promise.all([
  readFile("app/data/articles.generated.json", "utf8").then(JSON.parse),
  readFile("app/lib/coverage-dossiers.ts", "utf8"),
]);

const dossierKeys = new Set(articles.map((article) => article.translationGroup ?? article.id));
for (const key of dossierKeys) {
  assert.ok(dossiersSource.includes(`"${key}"`), `missing first-party dossier context for ${key}`);
}
assert.match(dossiersSource, /not independently verified/i);
assert.match(dossiersSource, /not a court judgment|not a ruling|no independently/i);

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
    try { if ((await fetch(`${base}/robots.txt`)).ok) break; } catch { /* starting */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const home = await (await fetch(`${base}/en`)).text();
  assert.match(home, /Coverage records/);
  assert.match(home, /Secondary PDF snapshots/);
  assert.match(home, /Browse all 26 retained snapshots/);
  assert.doesNotMatch(home, /Live Press Coverage|Comprehensive investigative reporting|Read full story/i);

  const articlePath = home.match(/href="(\/en\/news\/[^"]+)"/)?.[1];
  assert.ok(articlePath, "expected an internal English coverage link");
  const article = await (await fetch(`${base}${articlePath}`)).text();
  assert.match(article, /original dossier summary/i);
  assert.match(article, /What the cited publication reports/);
  assert.match(article, /Key points in the coverage record/);
  assert.match(article, /Verification status/);
  assert.match(article, /target="_blank" rel="noopener noreferrer"/);

  console.log(`Coverage-depth checks passed for ${dossierKeys.size} distinct editorial topics.`);
} finally {
  server.kill();
}
