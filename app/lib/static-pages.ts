import type { LanguageCode } from "./types";

export const STATIC_PAGES = ["about", "contact", "privacy", "terms", "editorial-statement"] as const;
export type StaticPage = (typeof STATIC_PAGES)[number];

const INTERFACE_TRANSLATIONS: readonly LanguageCode[] = ["de", "en", "zh", "es", "fr", "it", "pt"];

/** Only locales whose complete page content is genuinely equivalent. */
export function staticPageLanguages(page: StaticPage): readonly LanguageCode[] {
  if (page === "about" || page === "contact") return INTERFACE_TRANSLATIONS;
  return ["en"];
}

export function isStaticPage(value: unknown): value is StaticPage {
  return typeof value === "string" && (STATIC_PAGES as readonly string[]).includes(value);
}
