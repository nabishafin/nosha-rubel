import { Link } from "react-router";
import { CATEGORIES } from "~/lib/categories";
import { useI18n, localePath } from "~/lib/i18n-context";
import type { CategorySlug } from "~/lib/types";

export function CategoryBadge({ category, asLink = true }: { category: CategorySlug; asLink?: boolean }) {
  const { lang, t } = useI18n();
  const info = CATEGORIES[category];
  const label = t.categories[category];

  const className = `inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset ${info.accent}`;

  if (!asLink) {
    return (
      <span className={className}>
        <span aria-hidden="true">{info.emoji}</span>
        {label}
      </span>
    );
  }

  return (
    <Link to={localePath(lang, `category/${category}`)} className={`${className} transition hover:brightness-95`}>
      <span aria-hidden="true">{info.emoji}</span>
      {label}
    </Link>
  );
}
