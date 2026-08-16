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

function count(html, pattern) {
  return [...html.matchAll(pattern)].length;
}

try {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      if ((await fetch(`${base}/robots.txt`)).ok) break;
    } catch {
      // Server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const home = await (await fetch(`${base}/en`)).text();
  assert.equal(count(home, /<main\b/g), 1);
  assert.equal(count(home, /<header\b/g), 1);
  assert.equal(count(home, /<footer\b/g), 1);
  assert.equal(count(home, /<h1\b/g), 1);
  assert.match(home, /<ul aria-label="Coverage records"/);
  assert.match(home, /<ul lang="en" aria-label="Language editions"/);
  assert.match(home, /<ul aria-label="Archived reference documents"/);
  assert.match(home, /<ol aria-label="[^"]+" class="rounded-lg border/);
  assert.match(home, /<ul aria-label="Topics"/);

  const articlePath = home.match(/href="(\/en\/news\/[^"]+)"/)?.[1];
  assert.ok(articlePath);
  const article = await (await fetch(`${base}${articlePath}`)).text();
  assert.equal(count(article, /<h1\b/g), 1);
  assert.match(article, /<article lang="en-US">/);
  assert.match(article, /<nav lang="en-US" aria-label="Breadcrumb"/);
  assert.match(article, /<time dateTime=/);

  const staticPage = await (await fetch(`${base}/en/about`)).text();
  assert.equal(count(staticPage, /<h1\b/g), 1);
  assert.match(staticPage, /<nav aria-label="Breadcrumb"/);

  console.log("Semantic HTML checks passed.");
} finally {
  server.kill();
}
