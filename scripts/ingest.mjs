// Automated news ingestion.
//
// Pulls fresh articles straight from berlinertageszeitung.de — no hand-pasted
// URLs. For each language edition it reads the homepage, follows a batch of
// article links, and extracts title / summary / image / date / author / tags
// from the page's meta tags. Each article's own hreflang <link> tags reveal the
// other-language versions, which we use to build translationGroups so the app
// can emit correct per-article hreflang alternates.
//
// Output: app/data/articles.generated.json  (consumed by app/data/articles.ts)
// Run:    npm run ingest
//
// Only headline + short summary are stored; full text stays at the source
// (aggregator link-out), so this is copyright-safe.

import axios from "axios";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../app/data/articles.generated.json");

const BASE = "https://www.berlinertageszeitung.de";
// Homepage per edition. German lives at the root; others under /<lang>/.
const EDITIONS = {
  de: `${BASE}/`,
  en: `${BASE}/en/`,
  es: `${BASE}/es/`,
  fr: `${BASE}/fr/`,
  it: `${BASE}/it/`,
  pt: `${BASE}/pt/`,
};
const PER_EDITION = 12; // article links to take from each homepage
const CONCURRENCY = 6;

const http = axios.create({
  timeout: 20000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    "Accept-Language": "en,de;q=0.8",
  },
  maxContentLength: 20 * 1024 * 1024,
});

// Map the source's section names (any language) onto our 7 categories.
const CATEGORY_MAP = {
  politik: "politics", politics: "politics", politica: "politics", politique: "politics",
  sport: "sports", sports: "sports", deporte: "sports", deportes: "sports", desporto: "sports",
  wirtschaft: "business", business: "business", economia: "business", economie: "business",
  économie: "business", negocios: "business", negócios: "business", finanzen: "business",
  gesundheit: "health", health: "health", salud: "health", sante: "health", santé: "health",
  salute: "health", saude: "health", saúde: "health",
  technik: "technology", technologie: "technology", technology: "technology",
  tecnologia: "technology", tecnología: "technology", tech: "technology", digital: "technology",
  kultur: "entertainment", culture: "entertainment", cultura: "entertainment",
  entertainment: "entertainment", unterhaltung: "entertainment", intrattenimento: "entertainment",
  people: "entertainment", panorama: "entertainment",
};
const CATEGORIES = ["politics", "technology", "sports", "business", "health", "entertainment", "world"];
const LANGS = ["de", "en", "es", "fr", "it", "pt"];

function mapCategory(raw) {
  return CATEGORY_MAP[raw.toLowerCase()] ?? "world";
}

// Article URLs look like /Section/123456-slug.html, optionally /<lang>/ prefixed.
const ARTICLE_RE = /href="((?:https:\/\/www\.berlinertageszeitung\.de)?\/(?:[a-z]{2}\/)?[A-Za-zÀ-ÿ]+\/\d+-[^"#?]+\.html)"/g;

function langFromUrl(url) {
  const m = url.replace(BASE, "").match(/^\/([a-z]{2})\//);
  if (m && LANGS.includes(m[1])) return m[1];
  return "de"; // unprefixed = German edition
}

function sectionFromUrl(url) {
  const path = url.replace(BASE, "").replace(/^\/[a-z]{2}\//, "/");
  const m = path.match(/^\/([A-Za-zÀ-ÿ]+)\//);
  return m ? m[1] : "world";
}

function slugFromUrl(url) {
  const m = url.match(/\/(\d+-[^/]+)\.html$/);
  return m ? m[1] : url.split("/").pop().replace(/\.html$/, "");
}

function meta(html, key) {
  const patterns = [
    new RegExp(`<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${key}["']`, "i"),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return decode(m[1]).trim();
  }
  return "";
}

function decode(s) {
  return s
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'").replace(/&nbsp;/g, " ");
}

// Strip the site-name affixes the CMS adds to og:title.
function cleanTitle(s) {
  return decode(s)
    .replace(/^\s*Berliner Tageszeitung\s*[-–|:]\s*/i, "")
    .replace(/\s*[|–-]\s*Berliner Tageszeitung\s*$/i, "")
    .trim();
}

// og:image is served as a site-relative path; make it absolute. Falls back to
// a deterministic placeholder so every article always has a usable image.
function absImage(src, seed) {
  if (!src) return `https://picsum.photos/seed/${encodeURIComponent(seed)}/1200/750`;
  if (src.startsWith("http")) return src;
  return BASE + (src.startsWith("/") ? src : `/${src}`);
}

function extractHreflang(html) {
  const out = {};
  const linkRe = /<link\b[^>]*rel=["']alternate["'][^>]*>/gi;
  for (const tag of html.match(linkRe) ?? []) {
    const hl = tag.match(/hreflang=["']([a-zA-Z-]+)["']/i)?.[1];
    const href = tag.match(/href=["']([^"']+)["']/i)?.[1];
    if (hl && href) out[hl.toLowerCase()] = href;
  }
  return out;
}

function ldJson(html, field) {
  const re = new RegExp(`"${field}"\\s*:\\s*"([^"]+)"`, "i");
  return html.match(re)?.[1] ?? "";
}

async function collectLinks() {
  const found = new Map(); // url -> lang
  await Promise.all(
    Object.entries(EDITIONS).map(async ([lang, url]) => {
      try {
        const { data: html } = await http.get(url);
        let count = 0;
        for (const m of html.matchAll(ARTICLE_RE)) {
          if (count >= PER_EDITION) break;
          let href = m[1];
          if (!href.startsWith("http")) href = BASE + href;
          if (langFromUrl(href) !== lang) continue; // keep to this edition
          if (!found.has(href)) {
            found.set(href, lang);
            count++;
          }
        }
        console.log(`  ${lang}: collected ${count} links`);
      } catch (e) {
        console.warn(`  ${lang}: homepage failed (${e.code ?? e.message})`);
      }
    })
  );
  return [...found.keys()];
}

async function fetchArticle(url) {
  const { data: html } = await http.get(url);
  const lang = langFromUrl(url);
  const title = meta(html, "og:title") || html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() || "";
  const description = meta(html, "og:description") || meta(html, "description");
  if (!title) return null;

  // Same-story translations across editions share a hreflang alternate set. If
  // the source exposes them we group by the x-default URL; most article pages
  // don't, so ingested articles usually stand alone per edition.
  const alts = extractHreflang(html);
  const groupUrl = alts["x-default"] || alts["de"] || "";

  const publishedAt =
    meta(html, "article:published_time") || ldJson(html, "datePublished") || new Date().toISOString();
  const author = meta(html, "author") || ldJson(html, "name") || "Berliner Tageszeitung";
  const tags = (meta(html, "keywords") || meta(html, "news_keywords"))
    .split(",").map((t) => t.trim().toLowerCase()).filter(Boolean).slice(0, 6);
  const cleanTitleText = cleanTitle(title);
  const cleanDesc = cleanTitle(description) || cleanTitleText;

  return {
    id: `${lang}-${slugFromUrl(url)}`.slice(0, 80),
    language: lang,
    category: mapCategory(sectionFromUrl(url)),
    ...(groupUrl ? { translationGroup: `grp:${slugFromUrl(groupUrl)}` } : {}),
    slug: slugFromUrl(url),
    title: cleanTitleText,
    description: cleanDesc,
    content: [cleanDesc],
    image: absImage(meta(html, "og:image"), slugFromUrl(url)),
    sourceUrl: url,
    sourceName: "Berliner Tageszeitung",
    author,
    publishedAt: new Date(publishedAt).toISOString(),
    views: 800 + (parseInt(slugFromUrl(url), 10) % 6000 || 0),
    tags: tags.length ? tags : ["news"],
  };
}

async function pool(items, worker, size) {
  const results = [];
  let i = 0;
  async function run() {
    while (i < items.length) {
      const idx = i++;
      try {
        const r = await worker(items[idx]);
        if (r) results.push(r);
      } catch (e) {
        console.warn(`  skip ${items[idx]} (${e.response?.status ?? e.code ?? e.message})`);
      }
    }
  }
  await Promise.all(Array.from({ length: size }, run));
  return results;
}

async function main() {
  console.log("Collecting article links from homepages…");
  const links = await collectLinks();
  console.log(`Found ${links.length} unique article links. Fetching…`);

  const articles = await pool(links, fetchArticle, CONCURRENCY);

  // Per language: newest first → mark hero (breaking) and editor picks (featured).
  for (const lang of LANGS) {
    const list = articles
      .filter((a) => a.language === lang)
      .sort((x, y) => new Date(y.publishedAt) - new Date(x.publishedAt));
    list.forEach((a, i) => {
      if (i < 3) a.breaking = true;
      if (i < 6) a.featured = true;
    });
  }

  // Drop groups that ended up with a single member to avoid pointless hreflang.
  const groupCount = new Map();
  for (const a of articles) groupCount.set(a.translationGroup, (groupCount.get(a.translationGroup) ?? 0) + 1);
  for (const a of articles) if ((groupCount.get(a.translationGroup) ?? 0) < 2) delete a.translationGroup;

  await writeFile(OUT, JSON.stringify(articles, null, 2) + "\n", "utf8");

  const byLang = LANGS.map((l) => `${l}:${articles.filter((a) => a.language === l).length}`).join("  ");
  const byCat = CATEGORIES.map((c) => `${c}:${articles.filter((a) => a.category === c).length}`).join("  ");
  console.log(`\n✓ Wrote ${articles.length} articles to ${OUT}`);
  console.log(`  Languages: ${byLang}`);
  console.log(`  Categories: ${byCat}`);
}

main().catch((e) => {
  console.error("Ingest failed:", e);
  process.exit(1);
});
