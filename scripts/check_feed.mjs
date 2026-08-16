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
const origin = "https://noosha-aubel.com";
const server = spawn(process.execPath, ["node_modules/@react-router/serve/bin.cjs", "build/server/index.js"], {
  env: { ...process.env, PORT: String(port), SITE_URL: origin, NODE_ENV: "production" },
  stdio: "ignore",
});

try {
  const base = `http://127.0.0.1:${port}`;
  let feedResponse;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      feedResponse = await fetch(`${base}/feed.xml`);
      if (feedResponse.ok) break;
    } catch { /* server starting */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.ok(feedResponse?.ok, "feed.xml must return 200");
  assert.match(feedResponse.headers.get("content-type") ?? "", /^application\/atom\+xml/);
  assert.equal(feedResponse.headers.get("x-content-type-options"), "nosniff");
  const feed = await feedResponse.text();
  assert.match(feed, /<feed xmlns="http:\/\/www\.w3\.org\/2005\/Atom">/);
  assert.match(feed, new RegExp(`<id>${origin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\/feed\\.xml<\/id>`));
  assert.match(feed, new RegExp(`<link rel="self" type="application\/atom\\+xml" href="${origin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\/feed\\.xml" \/>`));
  const entries = [...feed.matchAll(/<entry xml:lang="([^"]+)">([\s\S]*?)<\/entry>/g)];
  assert.ok(entries.length > 0 && entries.length <= 50, "feed must contain one to 50 entries");
  for (const [, language, entry] of entries) {
    assert.match(entry, new RegExp(`<id>${origin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\/${language}\/news\/[^<]+<\/id>`));
    assert.match(entry, /<updated>\d{4}-\d{2}-\d{2}T[^<]+<\/updated>/);
    assert.match(entry, /<summary type="text">[^<]+<\/summary>/);
  }
  const home = await (await fetch(`${base}/en`)).text();
  assert.match(home, /<link[^>]+rel="alternate"[^>]+href="\/feed\.xml"[^>]+type="application\/atom\+xml"[^>]+title="Noosha Aubel feed"\/>/);
  console.log(`Atom feed checks passed (${entries.length} canonical internal entries).`);
} finally {
  server.kill();
}
