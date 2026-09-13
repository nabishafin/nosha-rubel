import { hasLocalizedCoverageDossier } from "./coverage-dossiers";
import { LANGUAGES } from "./languages";
import type { Article } from "./types";

type SearchArticle = Pick<Article, "id" | "language" | "translationGroup" | "publicationMode" | "contentLocale">;

/** Complete native publications can be indexed independently of archive UI coverage. */
export function isIndexableArticle(article: SearchArticle): boolean {
  if (article.publicationMode !== "full") return hasLocalizedCoverageDossier(article);
  // One publisher's Russian edition currently contains Ukrainian source text.
  // Keep the original accessible without advertising it as a Russian translation.
  return !article.contentLocale || article.contentLocale.split("-")[0] === article.language;
}

export function articleHreflang(article: Pick<Article, "language" | "contentLocale">): string {
  return article.contentLocale ?? LANGUAGES[article.language].hreflang;
}
