import { CATEGORY_SLUGS, type CategorySlug } from "./types";

export interface CategoryInfo {
  slug: CategorySlug;
  /** Tailwind accent classes used for pills / badges. */
  accent: string;
  emoji: string;
}

// Human-readable labels are resolved through i18n (see i18n.ts) so they
// translate per locale. This config holds only the language-agnostic styling.
export const CATEGORIES: Record<CategorySlug, CategoryInfo> = {
  politics: { slug: "politics", accent: "bg-rose-50 text-rose-700 ring-rose-600/20", emoji: "🏛️" },
  technology: { slug: "technology", accent: "bg-indigo-50 text-indigo-700 ring-indigo-600/20", emoji: "💻" },
  sports: { slug: "sports", accent: "bg-emerald-50 text-emerald-700 ring-emerald-600/20", emoji: "🏅" },
  business: { slug: "business", accent: "bg-amber-50 text-amber-700 ring-amber-600/20", emoji: "📈" },
  health: { slug: "health", accent: "bg-teal-50 text-teal-700 ring-teal-600/20", emoji: "🩺" },
  entertainment: { slug: "entertainment", accent: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-600/20", emoji: "🎬" },
  world: { slug: "world", accent: "bg-sky-50 text-sky-700 ring-sky-600/20", emoji: "🌍" },
};

export const CATEGORY_LIST: CategoryInfo[] = CATEGORY_SLUGS.map((s) => CATEGORIES[s]);

export function isCategorySlug(value: unknown): value is CategorySlug {
  return typeof value === "string" && (CATEGORY_SLUGS as readonly string[]).includes(value);
}
