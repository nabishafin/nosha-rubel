import type { Article } from "~/lib/types";
import { articleImage } from "~/lib/images";
import generatedRaw from "./articles.generated.json";

const usedImages = new Map<string, Set<string>>();

export const ARTICLES: Article[] = (generatedRaw as unknown as Article[]).map((article) => {
  const usedInEdition = usedImages.get(article.language) ?? new Set<string>();
  usedImages.set(article.language, usedInEdition);

  return {
    ...article,
    image: articleImage(article, usedInEdition),
  };
});
