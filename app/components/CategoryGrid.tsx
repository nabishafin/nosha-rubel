import { Link } from "react-router";
import { CATEGORY_LIST } from "~/lib/categories";
import { useI18n, localePath } from "~/lib/i18n-context";
import type { CategoryCount } from "~/lib/news";

export function CategoryGrid({ counts }: { counts: CategoryCount[] }) {
  const { lang, t } = useI18n();
  const countMap = new Map(counts.map((c) => [c.category, c.count]));

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {CATEGORY_LIST.map((c) => (
        <Link
          key={c.slug}
          to={localePath(lang, `category/${c.slug}`)}
          className="group flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 transition hover:border-blue-300 hover:bg-blue-50/40"
        >
          <span className="text-2xl" aria-hidden="true">
            {c.emoji}
          </span>
          <div className="mt-3">
            <h3 className="font-bold text-gray-900 group-hover:text-blue-700">{t.categories[c.slug]}</h3>
            <p className="mt-0.5 text-xs text-gray-500">
              {countMap.get(c.slug) ?? 0} {t.sections.latest.toLowerCase()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
