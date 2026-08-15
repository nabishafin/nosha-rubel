import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";

const port = await new Promise((resolve, reject) => {
  const server = createServer();
  server.once("error", reject);
  server.listen(0, "127.0.0.1", () => {
    const address = server.address();
    server.close(() => resolve(address.port));
  });
});

const base = `http://127.0.0.1:${port}`;
const server = spawn(
  process.execPath,
  ["node_modules/@react-router/serve/bin.cjs", "build/server/index.js"],
  { env: { ...process.env, PORT: String(port) }, stdio: "ignore" },
);

async function waitForServer() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(`${base}/robots.txt`);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("Timed out waiting for the production server");
}

async function expectRobots(path, status, directive) {
  const response = await fetch(`${base}${path}`);
  const html = await response.text();
  assert.equal(response.status, status, `${path} status`);
  assert.equal(response.headers.get("x-robots-tag"), directive, `${path} X-Robots-Tag`);
  assert.match(html, new RegExp(`name="robots" content="${directive}"`), `${path} meta robots`);
  return html;
}

try {
  await waitForServer();

  const search = await expectRobots(
    "/en/search?q=noosha%20%20aubel&sort=ignored",
    200,
    "noindex, follow",
  );
  assert.match(search, /rel="canonical" href="[^"]+\/en\/search"/);
  assert.doesNotMatch(search, /rel="canonical" href="[^"]+\?/);
  assert.match(search, /value="noosha aubel"/);

  await expectRobots(
    "/en/translation-unavailable?from=%2Fen%2Fnews%2Fmissing",
    200,
    "noindex, follow",
  );
  await expectRobots("/category/politics", 410, "noindex, nofollow");
  await expectRobots("/de/category/politik", 410, "noindex, nofollow");
  await expectRobots("/category", 410, "noindex, nofollow");

  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  assert.doesNotMatch(sitemap, /\/category|\/search|translation-unavailable|\.pdf/i);

  console.log("Crawl-control checks passed.");
} finally {
  server.kill();
}
