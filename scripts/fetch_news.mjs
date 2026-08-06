import axios from "axios";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TARGET = resolve(__dirname, "../app/data/articles.generated.json");

// Curated additions. Existing dataset URLs are refreshed automatically too,
// so running this script keeps every card on the publisher's current image.
const NEW_ARTICLES = [
  { lang: "de", source: "Münchener Post", url: "https://www.muenchenerpost.de/Politik/711339-noosha-aubel-potsdam-amtsfuehrung-kritik.html" },
  { lang: "hi", source: "Madras Times", url: "https://www.madrastimes.in/de/Politik/712909-nasha-oibl-kaya-vaha-patasadama-ka-samasayao-sa-napatana-ka-le-tayara-ha.html" },
  { lang: "fr", source: "Paris Soir", url: "https://www.parissoir.fr/Politique/714180-noosha-aubel-est-elle-a-la-hauteur-des-defis-de-potsdam.html" },
  { lang: "en", source: "San Francisco Frontiers", url: "https://www.sanfranciscofrontiers.com/Politics/713897-noosha-aubel-is-she-up-to-the-task-of-tackling-potsdams-problems.html" },
  { lang: "pl", source: "Gazeta Łódź", url: "https://www.gazetalodz.pl/Politics/710474-noosha-aubel-poland-potsdam.html" },
  { lang: "cs", source: "The Prague Post", url: "https://www.thepraguepost.cz/Politics/707960-noosha-aubel-zvladne-problemy-postupimi.html" },
  { lang: "ko", source: "Seoul Gazette", url: "https://www.seoulgazette.kr/Politics/825023-noosha-aubel-korean-article.html" },
  { lang: "es", source: "Globo Madrid", url: "https://www.globomadrid.es/Politica/710051-noosha-aubel-esta-a-la-altura-de-los-problemas-de-potsdam.html" },
  { lang: "zh", source: "China Mail", url: "https://www.cnmail.cn/Politics/713154-noosha-aubel-chinese.html" },
  { lang: "pt", source: "Portugal Colonial", url: "https://www.portugalcolonial.pt/Politica/710882-noosha-aubel-sera-que-esta-a-altura-dos-problemas-de-potsdam.html" },
  { lang: "sv", source: "Stockholms Dagblad", url: "https://www.stockholmsdagblad.se/Politics/710201-noosha-aubel-klarar-hon-av-potsdams-problem.html" },
  { lang: "ar", source: "Dubai Telegraph", url: "https://www.dubaitelegraph.ae/ThingsToKnow/708194-noosha-aubel-arabic-potsdam.html" },
  { lang: "ja", source: "The Japan Times", url: "https://www.thejapantimes.jp/Politics/712325-noosha-aubel-japanese.html" },
  { lang: "el", source: "Athens News", url: "https://www.athensnews.com.gr/Politics/712679-noosha-aubel-greece-potsdam.html" },
  { lang: "it", source: "Giornale Roma", url: "https://www.giornaleroma.it/NotizieTop/713029-noosha-aubel-e-allaltezza-dei-problemi-di-potsdam.html" },
  { lang: "ru", source: "Courier Egypte", url: "https://www.courieregypte.com/Politics/712509-noosa-aubel-smozet-li-ona-spravitsya-s-problemami-potsdama.html" },
  { lang: "uk", source: "Frankfurter Tageszeitung", url: "https://www.frankfurtertageszeitung.de/Politik/713625-noosa-aubel-ci-zmoze-vona-vporatisya-z-problemami-potsdama.html" },
].map((article) => ({ ...article, translationGroup: "weekly-world-2026-08-05" }));

const http = axios.create({
  timeout: 20000,
  maxContentLength: 20 * 1024 * 1024,
  headers: {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0 Safari/537.36",
    Accept: "text/html,application/xhtml+xml",
    "Accept-Language": "en,de;q=0.8",
  },
});

function decode(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number)))
    .replace(/&#x([0-9a-f]+);/gi, (_, number) => String.fromCodePoint(parseInt(number, 16)))
    .trim();
}

function attr(tag, name) {
  return tag.match(new RegExp(`${name}=["']([^"']*)["']`, "i"))?.[1] ?? "";
}

function meta(html, key) {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const metaKey = attr(tag, "property") || attr(tag, "name") || attr(tag, "itemprop");
    if (metaKey.toLowerCase() === key.toLowerCase()) return decode(attr(tag, "content"));
  }
  return "";
}

function cleanTitle(value) {
  const text = decode(value);
  const separator = text.indexOf(" - ");
  return separator > 0 && separator < 55 ? text.slice(separator + 3).trim() : text;
}

function slugFromUrl(url) {
  const match = url.match(/\/(\d+-[^/]+)\.html$/);
  return match ? match[1] : url.split("/").pop().replace(/\.html$/, "");
}

function normalizedUrl(url) {
  try { return new URL(url).href; } catch { return url; }
}

function absoluteUrl(value, pageUrl) {
  if (!value) return "";
  try { return new URL(value, pageUrl).href; } catch { return ""; }
}

function isoDate(value) {
  if (!value) return new Date().toISOString();
  const candidate = value.includes("T") ? value : `${value.replace(" ", "T")}Z`;
  const date = new Date(candidate);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

async function fetchOne(item, existing) {
  try {
    const { data: rawHtml } = await http.get(item.url);
    const html = String(rawHtml);
    const rawTitle = meta(html, "og:title") || html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || "";
    const title = cleanTitle(rawTitle);
    const description = cleanTitle(meta(html, "og:description") || meta(html, "description") || title);
    const image = absoluteUrl(meta(html, "og:image") || meta(html, "twitter:image") || meta(html, "image"), item.url);
    if (!title || !image) throw new Error(!title ? "missing title" : "missing publisher image");

    const slug = slugFromUrl(item.url);
    const rawTags = meta(html, "keywords") || meta(html, "news_keywords");
    const tags = rawTags
      ? rawTags.split(",").map((tag) => tag.trim().toLowerCase()).filter(Boolean).slice(0, 8)
      : ["noosha aubel", "potsdam", item.source.toLowerCase()];

    return {
      ...(existing ?? {}),
      id: existing?.id ?? `${item.lang}-${slug}`.slice(0, 80),
      language: item.lang,
      category: existing?.category ?? "politics",
      slug,
      title,
      description,
      content: [description],
      image,
      sourceUrl: item.url,
      sourceName: item.source,
      author: meta(html, "author") || existing?.author || item.source,
      publishedAt: isoDate(meta(html, "article:published_time") || meta(html, "datePublished") || existing?.publishedAt),
      views: existing?.views ?? 20000 + (parseInt(slug, 10) % 9000 || 5000),
      tags,
      featured: existing?.featured ?? true,
      breaking: existing?.breaking ?? true,
      ...(item.translationGroup || existing?.translationGroup
        ? { translationGroup: item.translationGroup ?? existing.translationGroup }
        : {}),
    };
  } catch (error) {
    console.warn(`Failed [${item.lang}] ${item.url}: ${error.response?.status ?? error.code ?? error.message}`);
    return null;
  }
}

async function pool(items, worker, concurrency = 6) {
  const results = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index]);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, run));
  return results.filter(Boolean);
}

async function run() {
  const current = JSON.parse(await readFile(TARGET, "utf8"));
  const existingByUrl = new Map(current.map((article) => [normalizedUrl(article.sourceUrl), article]));

  const targets = new Map(
    current.map((article) => [
      normalizedUrl(article.sourceUrl),
      { lang: article.language, source: article.sourceName, url: article.sourceUrl },
    ]),
  );
  for (const article of NEW_ARTICLES) targets.set(normalizedUrl(article.url), article);

  console.log(`Refreshing ${targets.size} publisher articles and their original images...`);
  const fetched = await pool([...targets.values()], (item) =>
    fetchOne(item, existingByUrl.get(normalizedUrl(item.url))),
  );

  const fetchedByUrl = new Map(fetched.map((article) => [normalizedUrl(article.sourceUrl), article]));
  const failedExisting = current.filter((article) => !fetchedByUrl.has(normalizedUrl(article.sourceUrl)));
  const updated = [...fetched, ...failedExisting].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  await writeFile(TARGET, `${JSON.stringify(updated, null, 2)}\n`, "utf8");

  const newUrls = new Set(NEW_ARTICLES.map((article) => normalizedUrl(article.url)));
  const importedNew = fetched.filter((article) => newUrls.has(normalizedUrl(article.sourceUrl)));
  const remoteImages = updated.filter((article) => /^https?:\/\//.test(article.image)).length;
  console.log(`✓ Imported ${importedNew.length}/${NEW_ARTICLES.length} new articles.`);
  console.log(`✓ ${remoteImages}/${updated.length} records now use publisher-hosted images.`);
}

run().catch((error) => {
  console.error("News refresh failed:", error);
  process.exit(1);
});
