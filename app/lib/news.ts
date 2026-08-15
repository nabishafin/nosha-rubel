import { ARTICLES } from "~/data/articles";
import type { Article, LanguageCode } from "./types";

// Data-access layer. Every route loads news through these functions, so the
// underlying source (local mock now, live API later via api-client.ts) can be
// changed in one place without touching components.

const byNewest = (a: Article, b: Article) =>
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

function inLanguage(lang: LanguageCode): Article[] {
  return ARTICLES.filter((a) => a.language === lang);
}

export function getLatest(lang: LanguageCode, limit?: number): Article[] {
  const list = inLanguage(lang).sort(byNewest);
  return limit ? list.slice(0, limit) : list;
}

export function getSourceCount(lang: LanguageCode): number {
  return new Set(inLanguage(lang).map((article) => article.sourceName)).size;
}

export function getFeatured(lang: LanguageCode, limit = 4): Article[] {
  const featured = inLanguage(lang).filter((a) => a.featured).sort(byNewest);
  const pool = featured.length ? featured : inLanguage(lang).slice().sort(byNewest);
  return pool.slice(0, limit);
}

export function getBreaking(lang: LanguageCode, limit = 5): Article[] {
  const breaking = inLanguage(lang).filter((a) => a.breaking).sort(byNewest);
  // Always give the hero something to show.
  const pool = breaking.length ? breaking : getFeatured(lang, limit);
  return pool.slice(0, limit);
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
  const group = ARTICLES.filter((a) => a.translationGroup === article.translationGroup);
  const languages = group.map((a) => a.language);
  return new Set(languages).size === languages.length ? group : [article];
}

/** Resolve the translated slug for a stable story group. */
export function getTranslatedArticleSlug(
  sourceLang: LanguageCode,
  sourceSlug: string,
  targetLang: LanguageCode,
): string | undefined {
  const source = getArticleBySlug(sourceLang, sourceSlug);
  if (!source) return undefined;
  return getTranslations(source).find((article) => article.language === targetLang)?.slug;
}

export function getRelated(article: Article, limit = 3): Article[] {
  const articleTags = new Set(article.tags.map((tag) => tag.toLowerCase()));
  return inLanguage(article.language)
    .filter((candidate) => candidate.id !== article.id)
    .map((candidate) => ({
      candidate,
      score:
        (candidate.category === article.category ? 4 : 0) +
        candidate.tags.filter((tag) => articleTags.has(tag.toLowerCase())).length,
    }))
    .sort((left, right) => right.score - left.score || byNewest(left.candidate, right.candidate))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
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
