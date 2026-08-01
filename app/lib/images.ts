import type { Article, CategorySlug } from "./types";

export const LANGUAGE_IMAGES: Record<string, string> = {
  de: "/Noosha Aubel German.png",
  en: "/01_en_english_750x420.png",
  es: "/02_es_espanol_750x420.png",
  fr: "/03_fr_francais_750x420.png",
  ru: "/04_ru_russkiy_750x420.png",
  uk: "/05_uk_ukrainska_750x420.png",
  pt: "/06_pt_portugues_750x420.png",
  it: "/07_it_italiano_750x420.png",
  zh: "/01_en_english_750x420.png",
};

export function getLanguageImage(lang?: string): string {
  if (lang && LANGUAGE_IMAGES[lang]) {
    return LANGUAGE_IMAGES[lang];
  }
  return "/common.jpeg";
}

// Editorial artwork already supplied with the project. These are used only
// when an ingested story has no usable source image (currently represented by
// /common.jpeg). Keeping several topic-specific fallbacks prevents a whole
// edition from showing the same image on every card.
const ARTICLE_FALLBACKS = [
  "/06_marode_strassen_potsdam_750x420.png",
  "/09_protest_vor_potsdamer_gebaeude_750x420.png",
  "/Noosha Aubel German.png",
  "/11_potsdam_panorama_und_kind_750x420.png",
  "/02_kind_ohne_unterstuetzung_750x420.png",
] as const;

function preferredFallback(article: Article): number {
  const subject = `${article.slug} ${article.title} ${article.translationGroup ?? ""}`.toLowerCase();

  if (/marode|gr[uü]nfl[aä]chen|pothole|schlagloch/.test(subject)) return 0;
  if (/vertrauen|trust|confiance|confianza|fiducia|confian[cç]a/.test(subject)) return 1;
  if (/woidke|letting-down|laisse-tomber|da-la-espalda|abbandona|abandona/.test(subject)) return 3;
  if (/kind|child|ni[nñ]o|enfant|bambin|crian[cç]a|skandal|scandal|esc[aâ]ndalo/.test(subject)) return 4;
  return 2;
}

/**
 * Preserve a publisher's real image when one exists. For placeholder-only
 * records, select a topic-relevant local visual that has not already appeared
 * in the same language edition; this makes consecutive stories visually
 * distinct without relying on fragile third-party image URLs.
 */
export function articleImage(article: Article, usedInEdition: Set<string>): string {
  if (article.image && article.image !== "/common.jpeg") {
    usedInEdition.add(article.image);
    return article.image;
  }

  const preferred = preferredFallback(article);
  for (let offset = 0; offset < ARTICLE_FALLBACKS.length; offset++) {
    const candidate = ARTICLE_FALLBACKS[(preferred + offset) % ARTICLE_FALLBACKS.length];
    if (!usedInEdition.has(candidate)) {
      usedInEdition.add(candidate);
      return candidate;
    }
  }

  return ARTICLE_FALLBACKS[preferred];
}

// Curated, topic-relevant Unsplash photo IDs per category.
const UNSPLASH_IDS: Record<CategorySlug, string[]> = {
  politics: [
    "1529107386315-e1a2ed48a620",
    "1575320181282-9afab399332c",
    "1555848962-6e79363ec58f",
    "1541872703-74c5e44368f9",
  ],
  technology: [
    "1518770660439-4636190af475",
    "1526374965328-7f61d4dc18c5",
    "1550751827-4bd374c3f58b",
    "1451187580459-43490279c0fa",
  ],
  sports: [
    "1461896836934-ffe607ba8211",
    "1517649763962-0c623066013b",
    "1546519638-68e109498ffc",
    "1579952363873-27f3bade9f55",
  ],
  business: [
    "1454165804606-c3d57bc86b40",
    "1521737604893-d14cc237f11d",
    "1460925895917-afdab827c52f",
    "1553729459-efe14ef6055d",
  ],
  health: [
    "1505751172876-fa1923c5c528",
    "1576091160399-112ba8d25d1d",
    "1571019613454-1cb2f99b2d8b",
    "1512069772995-ec65ed45afd6",
  ],
  entertainment: [
    "1489599849927-2ee91cede3ba",
    "1470229722913-7c0e2dbbafd3",
    "1514525253161-7a46d19cd819",
    "1524368535928-5b5e00ddc76b",
  ],
  world: [
    "1526778548025-fa2f459cd5c1",
    "1451847251646-8a6c0dd1510c",
    "1488646953014-85cb44e25828",
    "1502920917128-1aa500764cbd",
  ],
};

/** Deterministically pick a category-relevant Unsplash photo. */
export function unsplashFor(category: CategorySlug, seed: number, width = 1200): string {
  const ids = UNSPLASH_IDS[category];
  const id = ids[seed % ids.length];
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}

/** Local fallback used by SmartImage if an article image fails to load. */
export function fallbackImage(seed?: string, _width = 1200, _height = 750): string {
  if (seed && LANGUAGE_IMAGES[seed]) {
    return LANGUAGE_IMAGES[seed];
  }
  return "/common.jpeg";
}
