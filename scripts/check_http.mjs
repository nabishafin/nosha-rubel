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

async function request(path, options = {}) {
  return fetch(`${base}${path}`, { redirect: "manual", ...options });
}

try {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      if ((await request("/robots.txt")).ok) break;
    } catch {
      // Server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const root = await request("/", { headers: { "Accept-Language": "en" } });
  assert.equal(root.status, 302);
  assert.equal(root.headers.get("location"), "/en");

  const slash = await request("/en/?q=kept");
  assert.equal(slash.status, 301);
  assert.equal(slash.headers.get("location"), "/en?q=kept");
  const slashTarget = await request(slash.headers.get("location"));
  assert.equal(slashTarget.status, 200);

  const home = await request("/en");
  assert.equal(home.status, 200);
  assert.match(home.headers.get("content-type") ?? "", /^text\/html; charset=utf-8/);
  assert.match(home.headers.get("cache-control") ?? "", /s-maxage=300/);

  const head = await request("/en", { method: "HEAD" });
  assert.equal(head.status, 200);
  assert.equal((await head.text()).length, 0);

  for (const path of ["/not-a-language", "/en/news/not-a-real-record", "/en/documents/not-real"]) {
    const response = await request(path);
    assert.equal(response.status, 404, `${path} status`);
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
    assert.equal(response.headers.get("cache-control"), "private, no-store");
  }

  const gone = await request("/category/politics");
  assert.equal(gone.status, 410);
  assert.equal(gone.headers.get("x-robots-tag"), "noindex, nofollow");

  const search = await request("/en/search?q=Potsdam");
  assert.equal(search.status, 200);
  assert.equal(search.headers.get("x-robots-tag"), "noindex, follow");
  assert.equal(search.headers.get("cache-control"), "private, no-store");

  const pdf = await request("/en/documents/de/file");
  assert.equal(pdf.status, 200);
  assert.match(pdf.headers.get("content-type") ?? "", /^application\/pdf/);
  assert.equal(pdf.headers.get("x-robots-tag"), "noindex, noarchive");

  console.log("HTTP route checks passed.");
} finally {
  server.kill();
}
