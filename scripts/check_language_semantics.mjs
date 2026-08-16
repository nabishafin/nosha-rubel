import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { readFile } from "node:fs/promises";

const articles = JSON.parse(await readFile(new URL("../app/data/articles.generated.json", import.meta.url), "utf8"));
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

  const cases = [
    ["/en", "en-US", "ltr", "en-US"],
    ["/zh", "zh-Hans", "ltr", "zh-Hans"],
    ["/ar", "ar-AE", "rtl", "en-US"],
  ];
  for (const [path, documentLocale, direction, interfaceLocale] of cases) {
    const html = await (await fetch(`${base}${path}`)).text();
    assert.match(html, new RegExp(`<html lang="${documentLocale}" dir="${direction}">`));
    assert.match(html, new RegExp(`<main id="main-content" tabindex="-1" lang="${interfaceLocale}" class="flex-1 focus:outline-none">`));
  }

  const arabicArticle = articles.find((article) => article.language === "ar");
  assert.ok(arabicArticle, "Arabic coverage fixture must exist");
  const html = await (await fetch(`${base}/ar/news/${arabicArticle.slug}`)).text();
  assert.match(html, /<article lang="ar-AE">/);
  assert.match(html, /<nav lang="en-US" aria-label="Breadcrumb"/);

  console.log("Language-semantics checks passed.");
} finally {
  server.kill();
}
