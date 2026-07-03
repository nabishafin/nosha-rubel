// Core domain types shared across the app.

export const LANGUAGE_CODES = [
  "de",
  "en",
  "zh",
  "es",
  "fr",
  "it",
  "pt",
] as const;

export type LanguageCode = (typeof LANGUAGE_CODES)[number];

export const CATEGORY_SLUGS = [
  "politics",
  "technology",
  "sports",
  "business",
  "health",
  "entertainment",
  "world",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

/**
 * A single news article. Mirrors the shape a real aggregator API would return
 * so the local mock service can later be swapped for a live source without
 * touching the UI layer.
 */
export interface Article {
  id: string;
  title: string;
  slug: string;
  description: string;
  /** Body split into paragraphs for clean, semantic rendering. */
  content: string[];
  image: string;
  language: LanguageCode;
  category: CategorySlug;
  sourceUrl: string;
  sourceName: string;
  author: string;
  /** ISO 8601 timestamp. */
  publishedAt: string;
  views: number;
  tags: string[];
  /** Editor's pick — surfaced in the Featured section. */
  featured?: boolean;
  /** Drives the hero breaking-news slider. */
  breaking?: boolean;
  /**
   * Stories that are the same article translated into several languages share a
   * translationGroup id. Used to build article-level hreflang alternates.
   */
  translationGroup?: string;
}
