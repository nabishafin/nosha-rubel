import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { createServer } from "node:net";
import { spawn } from "node:child_process";

const records = JSON.parse(await readFile("app/data/articles.generated.json", "utf8"));
const publications = JSON.parse(await readFile("app/data/articles.fulltext.json", "utf8"));
const evidence = JSON.parse(await readFile("app/data/article-import-evidence.json", "utf8"));
const imported = records.filter((article) => article.publicationMode === "full");
assert.equal(imported.length, 35);
assert.equal(new Set(imported.map((article) => article.sourceUrl)).size, 35);
assert.equal(Object.keys(publications).length, 35);
const hash = (value) => createHash("sha256").update(value).digest("hex");
const normalize = (value) => value.replace(/\s+/gu, " ").trim();
const text = (value) => normalize(value.replace(/<[^>]*>/g, "").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&"));
const port = await new Promise((resolve, reject) => {
  const listener = createServer();
  listener.once("error", reject);
  listener.listen(0, "127.0.0.1", () => {
    const port = listener.address().port;
    listener.close(() => resolve(port));
  });
});
const base = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ["node_modules/@react-router/serve/bin.cjs", "build/server/index.js"], {
  env: { ...process.env, PORT: String(port), SITE_URL: "https://nooshaaubel.com", NODE_ENV: "production" }, stdio: "ignore",
});
try {
  let ready = false;
  for (let attempt = 0; attempt < 80; attempt++) {
    try { if ((await fetch(`${base}/robots.txt`)).ok) { ready = true; break; } } catch { /* server starting */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.ok(ready, "production server must start");
  for (const article of imported) {
    const publication = publications[article.id];
    const proof = evidence.find((entry) => entry.articleId === article.id);
    assert.ok(publication && proof, `${article.id}: missing complete text or evidence`);
    assert.equal(hash(text(publication.bodyHtml)), proof.bodyTextSha256, `${article.id}: text differs from source`);
    assert.equal(hash(text(publication.leadHtml)), proof.leadTextSha256, `${article.id}: introduction differs from source`);
    assert.ok(proof.textCharacters > 4000, `${article.id}: expected a complete article`);
    assert.doesNotMatch(publication.bodyHtml, /<(?:script|style|iframe|form|input|button)\b|\son\w+=|javascript:/i);
    const pathname = `/${article.language}/news/${article.slug}`;
    const response = await fetch(`${base}${pathname}`, { redirect: "manual" });
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.ok(html.includes(publication.bodyHtml), `${article.id}: full body must be present verbatim in SSR`);
    assert.ok(html.includes(publication.leadHtml), `${article.id}: full introduction must be in SSR`);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.match(html, /"@type":"NewsArticle"/);
    assert.doesNotMatch(html, /original dossier summary|What the cited publication reports/);
    assert.ok(html.includes(`lang="${article.contentLocale ?? ({ de: "de-DE", en: "en-US", zh: "zh-Hans", es: "es-ES", fr: "fr-FR", it: "it-IT", pt: "pt-PT", ru: "ru-RU", uk: "uk-UA", ar: "ar-AE", tr: "tr-TR", ko: "ko-KR", hi: "hi-IN", el: "el-GR", ja: "ja-JP", sv: "sv-SE", pl: "pl-PL", cs: "cs-CZ" })[article.language]}"`));
    const image = await fetch(`${base}${article.image}`);
    assert.equal(image.status, 200, article.image);
    assert.equal(hash(Buffer.from(await image.arrayBuffer())), hash(await readFile(`public${article.image}`)));
    const variants = imported.filter((variant) => variant.translationGroup === article.translationGroup);
    assert.ok(variants.length >= 17);
    for (const variant of variants) assert.ok(html.includes(`/${variant.language}/news/${variant.slug}`), `${article.id}: missing edition ${variant.language}`);
  }
  const home = await (await fetch(`${base}/en`)).text();
  assert.doesNotMatch(home, /The medical warning makes further waiting intolerable/);
  console.log("Full-publication checks passed: 35 complete source-matching SSR articles, local images and linked editions.");
} finally {
  server.kill();
}
