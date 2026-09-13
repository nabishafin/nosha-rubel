import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { readFile } from "node:fs/promises";

const articles = JSON.parse(
  await readFile(new URL("../app/data/articles.generated.json", import.meta.url), "utf8"),
);
const origin = "https://nooshaaubel.com";
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
  env: { ...process.env, PORT: String(port), SITE_URL: origin, NODE_ENV: "production", GOOGLE_SITE_VERIFICATION: "seo-test-public-token" },
  stdio: "ignore",
});

function decode(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&apos;", "'");
}

function metaContent(html, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return decode(
    html.match(new RegExp(`<meta[^>]+name=["']${escaped}["'][^>]+content=["']([^"']*)["']`, "i"))?.[1] ?? "",
  );
}

function linkHref(html, rel) {
  const escaped = rel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return decode(
    html.match(new RegExp(`<link[^>]+rel=["']${escaped}["'][^>]+href=["']([^"']+)["']`, "i"))?.[1] ?? "",
  );
}

try {
  let ready = false;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      if ((await fetch(`${base}/robots.txt`)).ok) {
        ready = true;
        break;
      }
    } catch { /* server starting */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.ok(ready, "production server did not become ready");

  const sitemapResponse = await fetch(`${base}/sitemap.xml`);
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]));
  assert.ok(urls.length >= 10, "focused sitemap should contain the core entity and dossier pages");
  assert.equal(new Set(urls).size, urls.length, "sitemap URLs must be unique");
  for (const article of articles.filter(article => article.publicationMode === "full" && (!article.contentLocale || article.contentLocale.split("-")[0] === article.language))) {
    assert.ok(urls.includes(`${origin}/${article.language}/news/${article.slug}`), `Complete native publication missing: ${article.id}`);
  }
  assert.ok(urls.includes(`${origin}/en/noosha-aubel`));
  assert.match(sitemap, /hreflang="zh-Hant"/);
  assert.doesNotMatch(sitemap, /\/documents\/|\/about<|\/contact<|\/privacy<|\/terms<|\/editorial-statement</);

  const titles = new Set();
  const canonicals = new Set();
  for (const absoluteUrl of urls) {
    const expected = new URL(absoluteUrl);
    assert.equal(expected.origin, origin, `sitemap host mismatch: ${absoluteUrl}`);
    const response = await fetch(`${base}${expected.pathname}`, { redirect: "manual" });
    assert.equal(response.status, 200, `indexable URL must return 200: ${expected.pathname}`);
    const html = await response.text();
    assert.match(html, /<meta name="google-site-verification" content="seo-test-public-token"/);
    const robots = metaContent(html, "robots");
    assert.match(robots, /^index, follow/, `sitemap URL must be indexable: ${expected.pathname}`);
    const canonical = linkHref(html, "canonical");
    assert.equal(canonical, absoluteUrl, `self-canonical mismatch: ${expected.pathname}`);
    assert.ok(!canonicals.has(canonical), `duplicate canonical: ${canonical}`);
    canonicals.add(canonical);

    const title = decode(html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? "").trim();
    const description = metaContent(html, "description").trim();
    assert.ok(title.toLowerCase().includes("noosha aubel"), `title lacks entity name: ${expected.pathname}`);
    assert.ok(description.length >= 50, `description is too weak: ${expected.pathname}`);
    assert.ok(!titles.has(title.toLowerCase()), `duplicate title: ${title}`);
    titles.add(title.toLowerCase());
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `expected one H1: ${expected.pathname}`);
    // XML and HTML must advertise the same reciprocal language cluster.
    const entry = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].find(match => match[1].includes(`<loc>${absoluteUrl}</loc>`))?.[1] ?? "";
    for (const alternate of entry.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)) {
      const links = html.match(/<link\b[^>]*>/gi) ?? [];
      assert.ok(links.some(link => new RegExp(`hreflang="${alternate[1]}"`, "i").test(link) && link.includes(`href="${alternate[2]}"`)), `HTML/sitemap alternate mismatch: ${expected.pathname} ${alternate[1]}`);
    }
  }

  const germanArticles = articles.filter((article) => article.language === "de");
  for (const article of germanArticles) {
    const path = `/de/news/${article.slug}`;
    assert.ok(urls.includes(`${origin}${path}`), `German dossier missing from sitemap: ${path}`);
    const html = await (await fetch(`${base}${path}`)).text();
    if (article.publicationMode === "full") {
      assert.match(html, /class="article-body"/);
      assert.match(html, /"@type":"NewsArticle"/);
      assert.doesNotMatch(html, /original dossier summary/i);
      continue;
    }
    assert.match(html, /Was die zitierte Veröffentlichung berichtet/);
    assert.match(html, /Kernaussagen des Berichtsdossiers/);
    assert.match(html, /Prüfstatus/);
    assert.doesNotMatch(html, /What the cited publication reports|Key points in the coverage record|Verification status/);
  }

  const frenchArticle = articles.find((article) => article.language === "fr" && article.publicationMode !== "full");
  assert.ok(frenchArticle, "French non-index fixture must exist");
  for (const path of [
    "/fr",
    "/fr/noosha-aubel",
    `/fr/news/${frenchArticle.slug}`,
    "/en/documents/de",
    "/en/about",
  ]) {
    const html = await (await fetch(`${base}${path}`)).text();
    assert.equal(metaContent(html, "robots"), "noindex, follow", `expected noindex: ${path}`);
  }

  console.log(`SEO index-quality checks passed (${urls.length} focused URLs; ${germanArticles.length} fully German dossiers).`);
} finally {
  server.kill();
}
