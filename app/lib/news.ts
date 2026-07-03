import { ARTICLES } from "~/data/articles";
import { CATEGORY_LIST } from "./categories";
import type { Article, CategorySlug, LanguageCode } from "./types";

// Data-access layer. Every route loads news through these functions, so the
// underlying source (local mock now, live API later via api-client.ts) can be
// changed in one place without touching components.

const byNewest = (a: Article, b: Article) =>
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
const byViews = (a: Article, b: Article) => b.views - a.views;

function inLanguage(lang: LanguageCode): Article[] {
  return ARTICLES.filter((a) => a.language === lang);
}

export function getLatest(lang: LanguageCode, limit?: number): Article[] {
  const list = inLanguage(lang).sort(byNewest);
  return limit ? list.slice(0, limit) : list;
}

export function getTrending(lang: LanguageCode, limit = 6): Article[] {
  // "Trending" = recent + heavily viewed. Blend recency and views.
  const now = Date.now();
  return inLanguage(lang)
    .map((a) => {
      const ageDays = (now - new Date(a.publishedAt).getTime()) / 86_400_000;
      const score = a.views / (1 + ageDays);
      return { a, score };
    })
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.a);
}

export function getMostRead(lang: LanguageCode, limit = 5): Article[] {
  return inLanguage(lang).slice().sort(byViews).slice(0, limit);
}

export function getFeatured(lang: LanguageCode, limit = 4): Article[] {
  const featured = inLanguage(lang).filter((a) => a.featured).sort(byNewest);
  const pool = featured.length ? featured : inLanguage(lang).slice().sort(byViews);
  return pool.slice(0, limit);
}

export function getBreaking(lang: LanguageCode, limit = 5): Article[] {
  const breaking = inLanguage(lang).filter((a) => a.breaking).sort(byNewest);
  // Always give the hero something to show.
  const pool = breaking.length ? breaking : getFeatured(lang, limit);
  return pool.slice(0, limit);
}

export function getByCategory(lang: LanguageCode, category: CategorySlug, limit?: number): Article[] {
  const list = inLanguage(lang)
    .filter((a) => a.category === category)
    .sort(byNewest);
  return limit ? list.slice(0, limit) : list;
}

export function getArticleBySlug(lang: LanguageCode, slug: string): Article | undefined {
  return ARTICLES.find((a) => a.language === lang && a.slug === slug);
}

/**
 * Other-language versions of the same story (same translationGroup), including
 * the article itself. Drives article-level hreflang alternates.
 */
export function getTranslations(article: Article): Article[] {
  if (!article.translationGroup) return [article];
  return ARTICLES.filter((a) => a.translationGroup === article.translationGroup);
}

export function getRelated(article: Article, limit = 3): Article[] {
  const sameLang = inLanguage(article.language).filter((a) => a.id !== article.id);
  const sameCategory = sameLang.filter((a) => a.category === article.category);
  const others = sameLang.filter((a) => a.category !== article.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function searchArticles(lang: LanguageCode, query: string): Article[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return inLanguage(lang)
    .filter((a) => {
      const haystack = [a.title, a.description, ...a.tags, a.category].join(" ").toLowerCase();
      return haystack.includes(q);
    })
    .sort(byNewest);
}

export function getPopularTags(lang: LanguageCode, limit = 16): string[] {
  const counts = new Map<string, number>();
  for (const a of inLanguage(lang)) {
    for (const tag of a.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}

export interface CategoryCount {
  category: CategorySlug;
  count: number;
}

export function getCategoryCounts(lang: LanguageCode): CategoryCount[] {
  return CATEGORY_LIST.map((c) => ({
    category: c.slug,
    count: inLanguage(lang).filter((a) => a.category === c.slug).length,
  }));
}

export interface ArticleRef {
  language: LanguageCode;
  slug: string;
  publishedAt: string;
  translationGroup?: string;
}

/** Every article's (language, slug, date, group) — used to generate the sitemap. */
export function getAllArticleRefs(): ArticleRef[] {
  return ARTICLES.map((a) => ({
    language: a.language,
    slug: a.slug,
    publishedAt: a.publishedAt,
    translationGroup: a.translationGroup,
  }));
}
