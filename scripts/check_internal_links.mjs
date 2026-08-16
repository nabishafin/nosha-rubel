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

const decodeXml = (value) => value.replaceAll("&amp;", "&").replaceAll("&apos;", "'").replaceAll("&quot;", '"');

try {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try { if ((await fetch(`${base}/robots.txt`)).ok) break; } catch { /* starting */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const sitemapResponse = await fetch(`${base}/sitemap.xml`);
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  const pagePaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(decodeXml(match[1])).pathname);
  assert.ok(pagePaths.length > 0, "sitemap must expose indexable pages");

  const linkedPaths = new Set();
  for (const path of pagePaths) {
    const response = await fetch(`${base}${path}`, { redirect: "manual" });
    assert.equal(response.status, 200, `sitemap URL must return 200: ${path}`);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html/);
    const html = await response.text();
    for (const match of html.matchAll(/<a\b[^>]*\shref="([^"]+)"[^>]*>/g)) {
      const href = decodeXml(match[1]);
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
      const target = new URL(href, base);
      if (target.origin === base) linkedPaths.add(`${target.pathname}${target.search}`);
    }
  }

  for (const path of linkedPaths) {
    const response = await fetch(`${base}${path}`, { redirect: "manual" });
    assert.ok(response.status >= 200 && response.status < 300, `internal link must resolve directly: ${path} (${response.status})`);
  }

  console.log(`Internal-link checks passed (${pagePaths.length} sitemap pages, ${linkedPaths.size} unique internal destinations).`);
} finally {
  server.kill();
}
