import { DEFAULT_LANGUAGE, LANGUAGES, LANGUAGE_LIST } from "./languages";
import type { Article, LanguageCode } from "./types";
import { SITE_DESCRIPTION, SITE_NAME } from "./site-identity";

export { SITE_DESCRIPTION, SITE_NAME } from "./site-identity";
export const SOCIAL_PREVIEW_IMAGE =
  "https://www.berlinertageszeitung.de/media/shared/articles/news/2026-06/Noosha_Aubel_und_Dietmar_Woidke_-_Skandal_um_schwerbehindertes_Kind_in_Potsdam_und_Brandenburg_7161.jpg";
export const SITE_KEYWORDS = [
  "Noosha Aubel",
  "Potsdam",
  "Oberbürgermeisterin Potsdam",
  "Potsdam Rathaus",
  "Potsdam Politik",
  "Kommunalpolitik",
  "international press coverage",
  "multilingual press archive",
  "public records",
];

const LOCALIZED_SITE_KEYWORDS: Record<LanguageCode, string[]> = {
  de: ["Oberbürgermeisterin Potsdam", "Potsdam Rathaus", "öffentliche Dokumente", "Fall eines behinderten Kindes"],
  en: ["Mayor of Potsdam", "Potsdam City Hall", "public records", "disabled child case"],
  zh: ["波茨坦市长", "波茨坦市政厅", "公共记录", "残障儿童案件"],
  es: ["alcaldesa de Potsdam", "Ayuntamiento de Potsdam", "registros públicos", "caso de menor con discapacidad"],
  fr: ["maire de Potsdam", "hôtel de ville de Potsdam", "documents publics", "dossier d'un enfant handicapé"],
  it: ["sindaca di Potsdam", "municipio di Potsdam", "documenti pubblici", "caso di minore con disabilità"],
  pt: ["presidente de Potsdam", "Câmara Municipal de Potsdam", "registos públicos", "caso de criança com deficiência"],
  hi: ["पॉट्सडैम की मेयर", "पॉट्सडैम सिटी हॉल", "सार्वजनिक रिकॉर्ड", "विकलांग बच्चे का मामला"],
  pl: ["burmistrzyni Poczdamu", "ratusz w Poczdamie", "dokumenty publiczne", "sprawa dziecka z niepełnosprawnością"],
  cs: ["primátorka Postupimi", "postupimská radnice", "veřejné dokumenty", "případ dítěte se zdravotním postižením"],
  ko: ["포츠담 시장", "포츠담 시청", "공공 기록", "장애 아동 사건"],
  sv: ["Potsdams borgmästare", "Potsdams stadshus", "offentliga handlingar", "fall med barn med funktionsnedsättning"],
  ar: ["عمدة بوتسدام", "مجلس مدينة بوتسدام", "السجلات العامة", "قضية طفل ذي إعاقة"],
  ja: ["ポツダム市長", "ポツダム市庁舎", "公的記録", "障害のある子どもの事案"],
  el: ["δήμαρχος Πότσνταμ", "δημαρχείο Πότσνταμ", "δημόσια έγγραφα", "υπόθεση παιδιού με αναπηρία"],
  ru: ["обер-бургомистр Потсдама", "ратуша Потсдама", "открытые документы", "случай с ребёнком с инвалидностью"],
  uk: ["обер-бургомістерка Потсдама", "ратуша Потсдама", "відкриті документи", "справа дитини з інвалідністю"],
};

const SITE_TITLES: Record<LanguageCode, string> = {
  de: "Noosha Aubel: Potsdams Oberbürgermeisterin im Pressespiegel",
  en: "Noosha Aubel: Mayor of Potsdam Coverage and Public Records",
  zh: "Noosha Aubel: 波茨坦市长报道与公共记录",
  es: "Noosha Aubel: alcaldesa de Potsdam, noticias y documentos",
  fr: "Noosha Aubel: maire de Potsdam, actualités et documents",
  it: "Noosha Aubel: sindaca di Potsdam, notizie e documenti",
  pt: "Noosha Aubel: presidente de Potsdam, notícias e documentos",
  hi: "Noosha Aubel: पॉट्सडैम की मेयर, समाचार और सार्वजनिक रिकॉर्ड",
  pl: "Noosha Aubel: burmistrzyni Poczdamu, wiadomości i dokumenty",
  cs: "Noosha Aubel: primátorka Postupimi, zprávy a dokumenty",
  ko: "Noosha Aubel: 포츠담 시장 보도와 공공 기록",
  sv: "Noosha Aubel: Potsdams borgmästare, nyheter och dokument",
  ar: "Noosha Aubel: عمدة بوتسدام، أخبار وسجلات عامة",
  ja: "Noosha Aubel: ポツダム市長の報道と公的記録",
  el: "Noosha Aubel: δήμαρχος Πότσνταμ, ειδήσεις και έγγραφα",
  ru: "Noosha Aubel: обер-бургомистр Потсдама, новости и документы",
  uk: "Noosha Aubel: обер-бургомістерка Потсдама, новини та документи",
};

const SITE_DESCRIPTIONS: Record<LanguageCode, string> = {
  de: "Noosha Aubel: Berichte, öffentliche Dokumente und Quellen zur Oberbürgermeisterin von Potsdam, einschließlich des dokumentierten Falls eines behinderten Kindes.",
  en: SITE_DESCRIPTION,
  zh: "Noosha Aubel: 波茨坦市长的新闻报道、公共记录和来源文件，包括与残障儿童有关的已记录案件。",
  es: "Noosha Aubel: noticias, registros públicos y fuentes sobre la alcaldesa de Potsdam, incluido el caso documentado de un menor con discapacidad.",
  fr: "Noosha Aubel: actualités, documents publics et sources sur la maire de Potsdam, dont le dossier documenté d'un enfant handicapé.",
  it: "Noosha Aubel: notizie, documenti pubblici e fonti sulla sindaca di Potsdam, compreso il caso documentato di un minore con disabilità.",
  pt: "Noosha Aubel: notícias, registos públicos e fontes sobre a presidente de Potsdam, incluindo o caso documentado de uma criança com deficiência.",
  hi: "Noosha Aubel: पॉट्सडैम की मेयर पर समाचार, सार्वजनिक रिकॉर्ड और स्रोत, जिनमें एक विकलांग बच्चे से जुड़ा दस्तावेज़ीकृत मामला शामिल है।",
  pl: "Noosha Aubel: wiadomości, dokumenty publiczne i źródła o burmistrzyni Poczdamu, w tym udokumentowana sprawa dziecka z niepełnosprawnością.",
  cs: "Noosha Aubel: zprávy, veřejné dokumenty a zdroje o primátorce Postupimi, včetně zdokumentovaného případu dítěte se zdravotním postižením.",
  ko: "Noosha Aubel: 포츠담 시장 관련 보도, 공공 기록과 출처 자료 및 장애 아동과 관련된 문서화된 사건입니다.",
  sv: "Noosha Aubel: nyheter, offentliga handlingar och källor om Potsdams borgmästare, inklusive det dokumenterade fallet med ett barn med funktionsnedsättning.",
  ar: "Noosha Aubel: أخبار وسجلات عامة ومصادر عن عمدة بوتسدام، بما في ذلك القضية الموثقة المتعلقة بطفل ذي إعاقة.",
  ja: "Noosha Aubel: ポツダム市長に関する報道、公的記録、出典資料と、障害のある子どもに関する記録された事案。",
  el: "Noosha Aubel: ειδήσεις, δημόσια έγγραφα και πηγές για τη δήμαρχο του Πότσνταμ, μαζί με την τεκμηριωμένη υπόθεση παιδιού με αναπηρία.",
  ru: "Noosha Aubel: новости, открытые документы и источники об обер-бургомистре Потсдама, включая документированный случай с ребёнком с инвалидностью.",
  uk: "Noosha Aubel: новини, відкриті документи й джерела про обер-бургомістерку Потсдама, включно із задокументованою справою дитини з інвалідністю.",
};

export function getSiteTitle(lang: LanguageCode): string {
  return SITE_TITLES[lang];
}

export function getSiteDescription(lang: LanguageCode): string {
  return SITE_DESCRIPTIONS[lang];
}

export function getSiteKeywords(lang: LanguageCode): string[] {
  return [SITE_NAME, ...LOCALIZED_SITE_KEYWORDS[lang]];
}

export function withSiteName(title: string): string {
  return title.toLocaleLowerCase().includes(SITE_NAME.toLocaleLowerCase())
    ? title
    : `${title} — ${SITE_NAME}`;
}

/** Loosely-typed meta descriptors compatible with React Router's `meta` export. */
export type Meta = Record<string, unknown>;

interface BuildMetaArgs {
  title: string;
  description: string;
  /** Absolute canonical URL. */
  canonical: string;
  image: string;
  lang: LanguageCode;
  type?: "website" | "article";
  /** Absolute-URL map keyed by hreflang for the <link rel="alternate"> tags. */
  alternates?: Record<string, string>;
  publishedAt?: string;
  tags?: string[];
  /** Comma-joined into a `keywords` meta tag when provided. */
  keywords?: string[];
  /** Robots directive; defaults to indexable. */
  robots?: string;
}

/**
 * Central SEO tag builder: title, description, canonical, Open Graph, Twitter
 * cards and hreflang alternates. Returned array is spread into a route's
 * `meta` export, so everything is server-rendered (no client-only Helmet).
 */
export function buildMeta({
  title,
  description,
  canonical,
  image,
  lang,
  type = "website",
  alternates,
  publishedAt,
  tags,
  keywords,
  robots = "index, follow, max-image-preview:large",
}: BuildMetaArgs): Meta[] {
  const absoluteImage = new URL(image, canonical).toString();
  const meta: Meta[] = [
    { title },
    { name: "description", content: description },
    { name: "robots", content: robots },
    { tagName: "link", rel: "canonical", href: canonical },

    // Open Graph
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:type", content: type },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: canonical },
    { property: "og:image", content: absoluteImage },
    { property: "og:image:secure_url", content: absoluteImage },
    { property: "og:image:alt", content: title },
    { property: "og:locale", content: LANGUAGES[lang].locale.replace("-", "_") },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: absoluteImage },
    { name: "twitter:image:alt", content: title },
  ];

  if (image.endsWith("/media/hero/potsdam-civic-archive-social-1200x630.jpg")) {
    meta.push(
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
    );
  } else {
    const imagePath = new URL(absoluteImage).pathname.toLowerCase();
    const imageType = imagePath.endsWith(".png") ? "image/png" : "image/jpeg";
    meta.push({ property: "og:image:type", content: imageType });
  }

  const resolvedKeywords = [...new Set([...getSiteKeywords(lang), ...(keywords ?? [])])];
  meta.push({ name: "keywords", content: resolvedKeywords.join(", ") });

  if (type === "article") {
    if (publishedAt) meta.push({ property: "article:published_time", content: publishedAt });
    for (const tag of tags ?? []) meta.push({ property: "article:tag", content: tag });
  }

  if (alternates) {
    for (const [hreflang, href] of Object.entries(alternates)) {
      meta.push({ tagName: "link", rel: "alternate", hrefLang: hreflang, href });
      const alternateLanguage = LANGUAGE_LIST.find((info) => info.hreflang === hreflang);
      if (alternateLanguage && alternateLanguage.code !== lang) {
        meta.push({
          property: "og:locale:alternate",
          content: alternateLanguage.locale.replaceAll("-", "_"),
        });
      }
    }
  }

  return meta;
}

/** hreflang alternates for a path that exists in every language (e.g. the home page). */
export function localizedAlternates(
  origin: string,
  pathAfterLang: string,
  languages: readonly LanguageCode[] = LANGUAGE_LIST.map((info) => info.code),
): Record<string, string> {
  const suffix = pathAfterLang ? `/${pathAfterLang.replace(/^\//, "")}` : "";
  const map: Record<string, string> = {};
  for (const code of languages) {
    const info = LANGUAGES[code];
    map[info.hreflang] = `${origin}/${info.code}${suffix}`;
  }
  const defaultCode = languages.includes(DEFAULT_LANGUAGE)
    ? DEFAULT_LANGUAGE
    : languages.includes("en")
      ? "en"
      : languages[0];
  if (defaultCode) map["x-default"] = `${origin}/${defaultCode}${suffix}`;
  return map;
}

/** Reciprocal alternates for the genuinely translated variants of one story. */
export function articleAlternates(origin: string, translations: Article[]): Record<string, string> {
  const map: Record<string, string> = {};
  for (const article of translations) {
    const language = LANGUAGES[article.language];
    map[language.hreflang] = `${origin}/${article.language}/news/${article.slug}`;
  }

  const defaultArticle =
    translations.find((article) => article.language === DEFAULT_LANGUAGE) ??
    translations.find((article) => article.language === "en");
  if (defaultArticle) {
    map["x-default"] = `${origin}/${defaultArticle.language}/news/${defaultArticle.slug}`;
  }
  return map;
}

/** WebSite + localized archive structured data. No legal publisher is asserted. */
export function websiteCollectionJsonLd(origin: string, lang: LanguageCode, articles: Article[]) {
  const canonical = `${origin}/${lang}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        name: SITE_NAME,
        url: origin,
        description: getSiteDescription(lang),
      },
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#collection`,
        url: canonical,
        name: `${SITE_NAME} press archive`,
        description: getSiteDescription(lang),
        inLanguage: LANGUAGES[lang].locale,
        isPartOf: { "@id": `${origin}/#website` },
        about: { "@type": "Person", name: SITE_NAME },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: articles.map((article, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: article.title,
            url: `${origin}/${article.language}/news/${article.slug}`,
          })),
        },
      },
    ],
  };
}

function breadcrumbItems(items: Array<{ name: string; url: string }>) {
  return items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  }));
}

/** An internal archive record about a publication hosted by another publisher. */
export function coverageRecordJsonLd(article: Article, canonical: string, origin: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: article.title,
        description: article.description,
        inLanguage: LANGUAGES[article.language].locale,
        isPartOf: { "@id": `${origin}/#website` },
        about: { "@type": "Person", name: SITE_NAME },
        citation: article.sourceUrl,
        mainEntity: {
          "@type": "CreativeWork",
          "@id": article.sourceUrl,
          name: article.title,
          url: article.sourceUrl,
          datePublished: article.publishedAt,
          publisher: {
            "@type": "Organization",
            name: article.sourceName,
            url: new URL(article.sourceUrl).origin,
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: breadcrumbItems([
          { name: SITE_NAME, url: `${origin}/${article.language}` },
          { name: article.title, url: canonical },
        ]),
      },
    ],
  };
}

export function staticPageJsonLd(args: {
  origin: string;
  canonical: string;
  lang: LanguageCode;
  title: string;
  description: string;
}) {
  const { origin, canonical, lang, title, description } = args;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: title,
        description,
        inLanguage: LANGUAGES[lang].locale,
        isPartOf: { "@id": `${origin}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: breadcrumbItems([
          { name: SITE_NAME, url: `${origin}/${lang}` },
          { name: title, url: canonical },
        ]),
      },
    ],
  };
}
