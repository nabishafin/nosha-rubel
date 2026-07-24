import type { Article } from "~/lib/types";
import { getLanguageImage } from "~/lib/images";
import generatedRaw from "./articles.generated.json";

export const ARTICLES: Article[] = (generatedRaw as unknown as Article[]).map((article) => ({
  ...article,
  image: getLanguageImage(article.language),
}));
