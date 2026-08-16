import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { readFile } from "node:fs/promises";

const envExample = await readFile(new URL("../.env.example", import.meta.url), "utf8");
const configured = envExample.match(/^SITE_URL=(.+)$/m)?.[1]?.trim();
assert.ok(configured, ".env.example must define SITE_URL");
const origin = new URL(configured);
assert.equal(origin.protocol, "https:", "canonical SITE_URL must use HTTPS");
assert.equal(origin.pathname, "/", "canonical SITE_URL must not contain a path");
assert.equal(origin.search, "", "canonical SITE_URL must not contain a query");
assert.equal(origin.hash, "", "canonical SITE_URL must not contain a fragment");
assert.equal(configured, origin.origin, "canonical SITE_URL must not end with a slash");

const dockerfile = await readFile(new URL("../Dockerfile", import.meta.url), "utf8");
assert.match(dockerfile, /npm ci --legacy-peer-deps/);
assert.match(dockerfile, /npm ci --omit=dev --legacy-peer-deps/);
assert.match(dockerfile, /HEALTHCHECK[^\n]+\/robots\.txt/);

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
  env: { ...process.env, PORT: String(port), SITE_URL: origin.origin },
  stdio: "ignore",
});

try {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try { if ((await fetch(`${base}/robots.txt`)).ok) break; } catch { /* starting */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const robots = await (await fetch(`${base}/robots.txt`)).text();
  assert.match(robots, new RegExp(`Sitemap: ${origin.origin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\/sitemap\\.xml`));

  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  const sitemapUrls = [
    ...[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]),
    ...[...sitemap.matchAll(/<xhtml:link\b[^>]*href="([^"]+)"/g)].map((match) => match[1]),
  ];
  assert.ok(sitemapUrls.length > 0, "sitemap must contain at least one URL");
  for (const sitemapUrl of sitemapUrls) {
    assert.equal(new URL(sitemapUrl).origin, origin.origin, `sitemap URL must use canonical origin: ${sitemapUrl}`);
  }

  const home = await (await fetch(`${base}/en`)).text();
  assert.match(home, new RegExp(`<link[^>]+rel="canonical"[^>]+href="${origin.origin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\/en"`));

  console.log(`Migration-readiness checks passed for ${origin.origin}.`);
} finally {
  server.kill();
}
