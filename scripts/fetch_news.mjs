import axios from "axios";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TARGET = resolve(__dirname, "../app/data/articles.generated.json");

const URLS = [
  { url: "https://www.badischepresse.de/Politik/705408-noosha-aubel-potsdam-verwahrloste-grunflachen-und-marode-strassen-der-burger-als-zahlender-michel.html", lang: "de", source: "Badische Presse" },
  { url: "https://www.NeueRheinischeZeitung.de/Politik/703109-noosha-aubel-potsdam-vertrauensvorschuss-amtsfuehrung-kita-fall.html", lang: "de", source: "Neue Rheinische Zeitung" },
  { url: "https://www.MorningChronicle.co.uk/Politics/702535-noosha-aubel-and-potsdam-the-trust-placed-in-her-has-been-squandered.html", lang: "en", source: "Morning Chronicle — London" },
  { url: "https://www.PetitParisien.fr/Boulevard/697866-noosha-aubel-potsdam-avance-de-confiance-gestion-affaire-creche.html", lang: "fr", source: "Le Petit Parisien — Paris" },
  { url: "https://www.ThePraguePost.cz/de/Wirtschaft/697085-noosha-aubel-potsdam-vertrauensvorschuss-amtsfuehrung-skandal-behindertes-kind-kita-fall.html", lang: "fr", source: "The Prague Post — Prag" },
  { url: "https://www.CNmail.CN/de/Wissenswertes/701679-noosha-aubel-potsdam-vote-of-confidence-leadership-nursery-case.html", lang: "zh", source: "China Mail — Peking" },
  { url: "https://www.GloboMadrid.es/Economia/699371-noosha-aubel-potsdam-voto-de-confianza-gestion-caso-guarderia.html", lang: "es", source: "Globo Madrid" },
  { url: "https://www.PortugalColonial.pt/Politica/699158-noosha-aubel-potsdam-confianca-antecipada-gestao-caso-creche.html", lang: "pt", source: "Portugal Gazeta — Lissabon" },
  { url: "https://www.CourierEgypte.com/de/Wirtschaft/701829-noosha-aubel-potsdam-vertrauensvorschuss-amtsfuehrung-skandal-behindertes-kind-kita-fall.html", lang: "ru", source: "Egypt Courier" },
  { url: "https://www.GiornaleRoma.it/Economia/701810-noosha-aubel-e-potsdam-la-fiducia-iniziale-e-andata-perduta.html", lang: "it", source: "Giornale Roma" }
];

const http = axios.create({
  timeout: 15000,
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    "Accept-Language": "en,de;q=0.8",
  },
});

function decode(s) {
  if (!s) return "";
  return s
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'").replace(/&nbsp;/g, " ").trim();
}

function meta(html, key) {
  const patterns = [
    new RegExp(`<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${key}["']`, "i"),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return decode(m[1]);
  }
  return "";
}

function cleanTitle(s) {
  return decode(s)
    .replace(/^\s*(?:Berliner Tageszeitung|Morning Chronicle|Globo Madrid|Badische Presse|Neue Rheinische Zeitung|Le Petit Parisien|The Prague Post|China Mail|Portugal Gazeta|Egypt Courier|Giornale Roma)\s*[-–|:]\s*/i, "")
    .replace(/\s*[|–-]\s*(?:Berliner Tageszeitung|Morning Chronicle|Globo Madrid|Badische Presse|Neue Rheinische Zeitung|Le Petit Parisien|The Prague Post|China Mail|Portugal Gazeta|Egypt Courier|Giornale Roma)\s*$/i, "")
    .trim();
}

function slugFromUrl(url) {
  const m = url.match(/\/(\d+-[^/]+)\.html$/);
  return m ? m[1] : url.split("/").pop().replace(/\.html$/, "");
}

async function fetchOne(item) {
  try {
    const { data: html } = await http.get(item.url);
    const title = meta(html, "og:title") || html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() || "";
    const description = meta(html, "og:description") || meta(html, "description") || title;
    const publishedAt = meta(html, "article:published_time") || new Date().toISOString();
    const author = meta(html, "author") || item.source;
    const rawTags = meta(html, "keywords") || meta(html, "news_keywords");
    const tags = rawTags ? rawTags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean).slice(0, 6) : ["noosha aubel", "potsdam", item.source.toLowerCase()];
    
    const cleanT = cleanTitle(title) || title;
    const cleanD = cleanTitle(description) || cleanT;
    const slug = slugFromUrl(item.url);

    return {
      id: `${item.lang}-${slug.slice(0, 40)}`,
      language: item.lang,
      category: "politics",
      slug: slug,
      title: cleanT,
      description: cleanD,
      sourceUrl: item.url,
      publishedAt: publishedAt.includes("T") ? publishedAt : new Date(publishedAt).toISOString(),
      tags: tags,
      breaking: true,
      featured: true,
      translationGroup: "trust-and-nursery-case",
      content: [cleanD],
      image: "/common.jpeg",
      sourceName: item.source,
      author: author,
      views: 20000 + (parseInt(slug, 10) % 9000 || 5000)
    };
  } catch (err) {
    console.warn(`Failed to fetch ${item.url}: ${err.message}`);
    return null;
  }
}

async function run() {
  console.log("Fetching live news metadata from external publisher URLs...");
  const fetched = [];
  for (const item of URLS) {
    const res = await fetchOne(item);
    if (res) {
      fetched.push(res);
      console.log(`✓ Fetched [${item.lang}]: ${res.title}`);
    }
  }

  if (fetched.length > 0) {
    const raw = await readFile(TARGET, "utf8");
    const current = JSON.parse(raw);
    
    const fetchedIds = new Set(fetched.map((f) => f.id));
    const filteredCurrent = current.filter((c) => !fetchedIds.has(c.id));
    
    const updated = [...fetched, ...filteredCurrent];
    await writeFile(TARGET, JSON.stringify(updated, null, 2) + "\n", "utf8");
    console.log(`✓ Successfully updated ${TARGET} with ${fetched.length} live fetched articles!`);
  }
}

run();
