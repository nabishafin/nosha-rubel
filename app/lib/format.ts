import { LANGUAGES } from "./languages";
import type { LanguageCode } from "./types";

/** Locale-aware long date, e.g. "July 3, 2026". */
export function formatDate(iso: string, lang: LanguageCode): string {
  return new Intl.DateTimeFormat(LANGUAGES[lang].locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

/** Compact view count, e.g. "12.4K". */
export function formatViews(views: number, lang: LanguageCode): string {
  return new Intl.NumberFormat(LANGUAGES[lang].locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(views);
}

/** Rough reading time from paragraph content (~200 wpm). */
export function readingTime(content: string[]): number {
  const words = content.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
