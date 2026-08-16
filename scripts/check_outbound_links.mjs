import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { readFile } from "node:fs/promises";

const articles = JSON.parse(await readFile(new URL("../app/data/articles.generated.json", import.meta.url), "utf8"));
assert.ok(articles.length > 0, "coverage records must exist");

for (const article of articles) {
  const source = new URL(article.sourceUrl);
  assert.equal(source.protocol, "https:", `${article.id} source must use HTTPS`);
  assert.ok(article.sourceName?.trim(), `${article.id} must have a descriptive source name`);
  assert.doesNotMatch(article.sourceName.trim().toLowerCase(), /^(read more|click here|source)$/);
}

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
    try {
      if ((await fetch(`${base}/robots.txt`)).ok) break;
    } catch {
      // Server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const article = articles[0];
  const articleHtml = await (await fetch(`${base}/${article.language}/news/${article.slug}`)).text();
  const sourceAnchor = articleHtml.match(new RegExp(`<a[^>]*href="${article.sourceUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*>`))?.[0];
  assert.ok(sourceAnchor, "article must render its crawlable source link");
  assert.match(sourceAnchor, /target="_blank"/);
  assert.match(sourceAnchor, /rel="noopener noreferrer"/);
  assert.match(articleHtml, /opens in a new tab/);

  const homeHtml = await (await fetch(`${base}/en`)).text();
  const videoAnchor = homeHtml.match(/<a[^>]*href="https:\/\/www\.youtube\.com\/shorts\/9Zzm9aq5sV4"[^>]*>/)?.[0];
  assert.ok(videoAnchor, "homepage must render the crawlable YouTube source link");
  assert.match(videoAnchor, /target="_blank"/);
  assert.match(videoAnchor, /rel="noopener noreferrer"/);

  const documentHtml = await (await fetch(`${base}/en/documents/de`)).text();
  const documentAnchor = documentHtml.match(/<a[^>]*href="\/en\/documents\/de\/file"[^>]*>/)?.[0];
  assert.ok(documentAnchor, "document page must render its PDF link");
  assert.match(documentAnchor, /target="_blank"/);
  assert.match(documentAnchor, /rel="noopener"/);
  assert.doesNotMatch(documentAnchor, /noreferrer/);

  console.log("Outbound-link checks passed.");
} finally {
  server.kill();
}
