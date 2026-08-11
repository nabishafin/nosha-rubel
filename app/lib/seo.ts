import { DEFAULT_LANGUAGE, LANGUAGES, LANGUAGE_LIST } from "./languages";
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
  section?: string;
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
  section,
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
  }

  const resolvedKeywords = [...new Set([...SITE_KEYWORDS, ...(keywords ?? [])])];
  meta.push({ name: "keywords", content: resolvedKeywords.join(", ") });

  if (type === "article") {
    if (publishedAt) meta.push({ property: "article:published_time", content: publishedAt });
    if (section) meta.push({ property: "article:section", content: section });
    for (const tag of tags ?? []) meta.push({ property: "article:tag", content: tag });
  }

  if (alternates) {
    for (const [hreflang, href] of Object.entries(alternates)) {
      meta.push({ tagName: "link", rel: "alternate", hrefLang: hreflang, href });
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
    articleSection: article.category,
    keywords: article.tags.join(", "),
    author: { "@type": "Person", name: article.author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${new URL(url).origin}/favicon.png` },
    },
  };
}

/** Organization + WebSite structured data for the landing page. */
export function websiteJsonLd(origin: string, lang: LanguageCode) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: `${origin}/${lang}`,
    image: SOCIAL_PREVIEW_IMAGE,
    inLanguage: LANGUAGES[lang].locale,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${origin}/favicon.png`,
        width: 512,
        height: 512,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${origin}/${lang}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
