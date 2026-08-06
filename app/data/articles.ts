import type { Article } from "~/lib/types";
import generatedRaw from "./articles.generated.json";

// Publisher-provided images are stored by the ingestion script and rendered
// unchanged. Do not replace them with language- or project-level artwork.
export const ARTICLES: Article[] = generatedRaw as unknown as Article[];
