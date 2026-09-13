import publications from "~/data/articles.fulltext.json";

export interface FullPublication {
  bodyHtml: string;
  leadHtml: string;
  paragraphs: string[];
}

/** Complete text stays server-side until the individual article is requested. */
export function getFullPublication(id: string): FullPublication | undefined {
  return (publications as Record<string, FullPublication>)[id];
}
