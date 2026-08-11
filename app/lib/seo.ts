import { DEFAULT_LANGUAGE, isLanguageCode, LANGUAGES, LANGUAGE_LIST } from "./languages";
import type { Article, LanguageCode } from "./types";

export const SITE_NAME = "Noosha Aubel";
export const SITE_DESCRIPTION =
  "Independent multilingual press archive featuring international reporting, public records, and documented coverage of Noosha Aubel and municipal affairs in Potsdam.";
export const SOCIAL_PREVIEW_IMAGE =
  "https://www.sanfranciscofrontiers.com/media/shared/articles/news/2026-08/01_English_950x533_8213.jpg";
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
    { property: "og:image", content: image },
    { property: "og:image:secure_url", content: image },
    { property: "og:image:alt", content: title },
    { property: "og:locale", content: LANGUAGES[lang].locale.replace("-", "_") },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: title },
  ];

  if (image === SOCIAL_PREVIEW_IMAGE) {
    meta.push(
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "950" },
      { property: "og:image:height", content: "533" },
    );
  } else {
    const imagePath = new URL(image).pathname.toLowerCase();
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
      if (isLanguageCode(hreflang) && hreflang !== lang) {
        meta.push({
          property: "og:locale:alternate",
          content: LANGUAGES[hreflang].locale.replace("-", "_"),
        });
      }
    }
  }

  return meta;
}

/** hreflang alternates for a path that exists in every language (e.g. the home page). */
export function localizedAlternates(origin: string, pathAfterLang: string): Record<string, string> {
  const suffix = pathAfterLang ? `/${pathAfterLang.replace(/^\//, "")}` : "";
  const map: Record<string, string> = {};
  for (const info of LANGUAGE_LIST) {
    map[info.code] = `${origin}/${info.code}${suffix}`;
  }
  map["x-default"] = `${origin}/${DEFAULT_LANGUAGE}${suffix}`;
  return map;
}

/** schema.org NewsArticle structured data. */
export function newsArticleJsonLd(article: Article, url: string, imageUrl: string) {
  const origin = new URL(url).origin;
  const sourceOrigin = new URL(article.sourceUrl).origin;
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: article.title,
    description: article.description,
    image: [imageUrl],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: LANGUAGES[article.language].locale,
    keywords: article.tags.join(", "),
    author: {
      "@type": article.author === article.sourceName ? "Organization" : "Person",
      name: article.author,
      ...(article.author === article.sourceName ? { url: sourceOrigin } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: origin,
      logo: {
        "@type": "ImageObject",
        url: `${origin}/favicon.png`,
        width: 512,
        height: 512,
      },
    },
  };
}

/** Organization + WebSite structured data for the landing page. */
export function websiteJsonLd(origin: string, lang: LanguageCode) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        name: SITE_NAME,
        url: origin,
        logo: {
          "@type": "ImageObject",
          url: `${origin}/favicon.png`,
          width: 512,
          height: 512,
        },
        image: SOCIAL_PREVIEW_IMAGE,
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        name: SITE_NAME,
        description: getSiteDescription(lang),
        url: `${origin}/${lang}`,
        image: SOCIAL_PREVIEW_IMAGE,
        inLanguage: LANGUAGES[lang].locale,
        publisher: { "@id": `${origin}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${origin}/${lang}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}
