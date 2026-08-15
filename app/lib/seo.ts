import { DEFAULT_LANGUAGE, LANGUAGES, LANGUAGE_LIST } from "./languages";
import type { Article, LanguageCode } from "./types";
import { SITE_DESCRIPTION, SITE_NAME } from "./site-identity";

export { SITE_DESCRIPTION, SITE_NAME } from "./site-identity";
export const SOCIAL_PREVIEW_IMAGE =
  "/media/hero/potsdam-civic-archive-social-1200x630.jpg";
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

const SITE_DESCRIPTIONS: Record<LanguageCode, string> = {
  de: "Unabhängiges mehrsprachiges Pressearchiv mit internationalen Berichten, öffentlichen Dokumenten und belegter Berichterstattung über Noosha Aubel und kommunale Themen in Potsdam.",
  en: SITE_DESCRIPTION,
  zh: "独立多语种新闻档案，汇集有关努莎·奥贝尔及波茨坦市政事务的国际报道、公共记录和文献资料。",
  es: "Archivo de prensa multilingüe e independiente con cobertura internacional, registros públicos e información documentada sobre Noosha Aubel y la actualidad municipal de Potsdam.",
  fr: "Archives de presse multilingues et indépendantes réunissant reportages internationaux, documents publics et informations vérifiées sur Noosha Aubel et les affaires municipales de Potsdam.",
  it: "Archivio stampa indipendente e multilingue con notizie internazionali, documenti pubblici e copertura verificabile su Noosha Aubel e gli affari comunali di Potsdam.",
  pt: "Arquivo de imprensa independente e multilingue com cobertura internacional, registos públicos e informação documentada sobre Noosha Aubel e os assuntos municipais de Potsdam.",
  hi: "नूशा आउबेल और पॉट्सडैम के नगरपालिका मामलों पर अंतरराष्ट्रीय रिपोर्टिंग, सार्वजनिक अभिलेख और दस्तावेज़ीकृत कवरेज वाला स्वतंत्र बहुभाषी प्रेस संग्रह।",
  pl: "Niezależne, wielojęzyczne archiwum prasowe z międzynarodowymi publikacjami, dokumentami publicznymi i udokumentowanymi materiałami o Nooshy Aubel oraz sprawach miejskich Poczdamu.",
  cs: "Nezávislý vícejazyčný tiskový archiv s mezinárodními zprávami, veřejnými dokumenty a doloženým zpravodajstvím o Nooshe Aubelové a komunálních tématech v Postupimi.",
  ko: "누샤 아우벨과 포츠담 시정에 관한 국제 보도, 공공 기록 및 문서화된 자료를 제공하는 독립 다국어 언론 아카이브입니다.",
  sv: "Ett oberoende flerspråkigt pressarkiv med internationell rapportering, offentliga handlingar och dokumenterad bevakning av Noosha Aubel och kommunala frågor i Potsdam.",
  ar: "أرشيف صحفي مستقل متعدد اللغات يضم تقارير دولية وسجلات عامة وتغطية موثقة عن نوشا أوبل والشؤون البلدية في بوتسدام.",
  ja: "ヌーシャ・アウベルとポツダムの市政に関する国際報道、公的記録、検証可能な資料を集めた独立系多言語プレスアーカイブです。",
  el: "Ανεξάρτητο πολύγλωσσο αρχείο Τύπου με διεθνή δημοσιεύματα, δημόσια έγγραφα και τεκμηριωμένη κάλυψη για τη Noosha Aubel και τα δημοτικά ζητήματα του Πότσνταμ.",
  ru: "Независимый многоязычный архив прессы с международными публикациями, открытыми документами и подтверждёнными материалами о Нуше Аубель и муниципальных вопросах Потсдама.",
  uk: "Незалежний багатомовний архів преси з міжнародними публікаціями, відкритими документами та підтвердженими матеріалами про Нушу Аубель і муніципальні питання Потсдама.",
};

export function getSiteDescription(lang: LanguageCode): string {
  return SITE_DESCRIPTIONS[lang];
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

  if (image === SOCIAL_PREVIEW_IMAGE) {
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

  const resolvedKeywords = [...new Set([...SITE_KEYWORDS, ...(keywords ?? [])])];
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
