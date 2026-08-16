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

function assertImagesHaveAlternatives(html, page) {
  for (const image of html.match(/<img\b[^>]*>/g) ?? []) {
    assert.match(image, /\salt="[^"]*"/, `${page} image lacks an alt attribute: ${image}`);
  }
}

try {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try { if ((await fetch(`${base}/robots.txt`)).ok) break; } catch { /* starting */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const home = await (await fetch(`${base}/en`)).text();
  assertImagesHaveAlternatives(home, "homepage");
  assert.match(home, /aria-label="Select language; current language: English"/);
  assert.match(home, /role="group" aria-label="Filter documents by region"/);
  assert.match(home, /aria-pressed="true"/);
  assert.match(home, /aria-label="Search archived documents by language or keyword"/);
  assert.match(home, /aria-expanded="false" aria-controls="editorial-legal-statement"/);
  assert.match(home, /<iframe[^>]*title="German-language video report about Potsdam-Griebnitzsee station"/);

  const articlePath = home.match(/href="(\/en\/news\/[^"]+)"/)?.[1];
  assert.ok(articlePath, "homepage must expose a coverage record");
  const article = await (await fetch(`${base}${articlePath}`)).text();
  assertImagesHaveAlternatives(article, "article");
  assert.match(article, /aria-hidden="true" tabindex="-1" class="block overflow-hidden"/);

  const search = await (await fetch(`${base}/en/search?q=Potsdam`)).text();
  assert.match(search, /<form[^>]*role="search"/);
  assert.match(search, /<input[^>]*type="search"[^>]*aria-label="Search"/);

  console.log("Accessible-name and image-alternative checks passed.");
} finally {
  server.kill();
}
