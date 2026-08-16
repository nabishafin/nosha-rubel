import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { readFile } from "node:fs/promises";

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

  const html = await (await fetch(`${base}/en`)).text();
  assert.match(html, /href="#main-content"[^>]*>Skip to main content<\/a>/);
  assert.match(html, /aria-live="polite" aria-atomic="true"/);
  assert.match(html, /<main id="main-content" tabindex="-1"/);
  assert.match(html, /aria-controls="language-options"/);
  assert.doesNotMatch(html, /role="menu(item)?"/);
  assert.doesNotMatch(html, /<a[^>]*aria-hidden="true"[^>]*tabindex="(?!-1)/);

  const switcherSource = await readFile(new URL("../app/components/LanguageSwitcher.tsx", import.meta.url), "utf8");
  assert.match(switcherSource, /e\.key !== "Escape"/);
  assert.match(switcherSource, /buttonRef\.current\?\.focus\(\)/);
  assert.match(switcherSource, /event\.key !== "ArrowDown"/);
  assert.match(switcherSource, /event\.currentTarget\.contains\(event\.relatedTarget\)/);

  console.log("Keyboard and focus-management checks passed.");
} finally {
  server.kill();
}
