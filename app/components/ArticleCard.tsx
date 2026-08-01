import { useI18n } from "~/lib/i18n-context";
import type { Article } from "~/lib/types";
import { SmartImage } from "./SmartImage";
import { CategoryBadge } from "./CategoryBadge";
import { ArticleMeta } from "./ArticleMeta";

type CardVariant = "vertical" | "horizontal" | "compact" | "overlay";

interface ArticleCardProps {
  article: Article;
  variant?: CardVariant;
  /** Rank number for numbered lists (e.g. Most Read). */
  rank?: number;
  eager?: boolean;
}

export function ArticleCard({ article, variant = "vertical", rank, eager }: ArticleCardProps) {
  const { t } = useI18n();
  // Cards link out to the original source article, not the internal detail page.
  const href = article.sourceUrl;
  const linkProps = { href, target: "_blank" as const, rel: "noreferrer nofollow" };
  const cardTitle = article.title;
  const cardSummary = article.description;

  // Compact: text-first row for "Most Read" style lists.
  if (variant === "compact") {
    return (
      <a
        {...linkProps}
        className="group flex items-start gap-4 border-b border-gray-100 py-4 last:border-0"
      >
        {rank !== undefined && (
          <span className="shrink-0 text-2xl font-extrabold leading-none text-gray-200 tabular-nums">
            {String(rank).padStart(2, "0")}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="line-clamp-2 font-semibold text-gray-900 group-hover:text-blue-700">
            {cardTitle}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-gray-600">{cardSummary}</p>
          <ArticleMeta article={article} showViews className="mt-1.5" />
        </div>
      </a>
    );
  }

  // Horizontal: image beside text — good for sidebars / dense lists.
  if (variant === "horizontal") {
    return (
      <a {...linkProps} className="group flex gap-4">
        <SmartImage
          src={article.image}
          alt={article.title}
          fallbackSeed={article.id}
          aspect="aspect-[4/3]"
          className="w-28 shrink-0 rounded-md sm:w-36"
        />
        <div className="min-w-0">
          <CategoryBadge category={article.category} asLink={false} />
          <h3 className="mt-1.5 line-clamp-2 font-semibold leading-snug text-gray-900 group-hover:text-blue-700">
            {cardTitle}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-gray-600">{cardSummary}</p>
          <ArticleMeta article={article} className="mt-1.5" />
        </div>
      </a>
    );
  }

  // Overlay: full-bleed image with text on top — used for feature tiles.
  if (variant === "overlay") {
    return (
      <a {...linkProps} className="group relative block overflow-hidden rounded-lg">
        <SmartImage
          src={article.image}
          alt={article.title}
          fallbackSeed={article.id}
          aspect="aspect-[4/5] sm:aspect-[3/4]"
          eager={eager}
          className="transition duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <CategoryBadge category={article.category} asLink={false} />
          <h3 className="mt-2 line-clamp-2 text-lg font-bold leading-snug text-white">{cardTitle}</h3>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-200">{cardSummary}</p>
        </div>
      </a>
    );
  }

  // Vertical (default): the primary news card.
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:border-gray-300 hover:shadow-sm">
      <a {...linkProps} className="block overflow-hidden">
        <SmartImage
          src={article.image}
          alt={article.title}
          fallbackSeed={article.id}
          eager={eager}
          className="transition duration-500 group-hover:scale-105"
        />
      </a>
      <div className="flex flex-1 flex-col p-4">
        <CategoryBadge category={article.category} />
        <a {...linkProps}>
          <h3 className="mt-2.5 line-clamp-2 text-[17px] font-bold leading-snug text-gray-900 group-hover:text-blue-700">
            {cardTitle}
          </h3>
        </a>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-600">{cardSummary}</p>
        <div className="mt-3 flex items-center justify-between">
          <ArticleMeta article={article} showViews />
          <a
            {...linkProps}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 group-hover:text-blue-800"
          >
            {t.actions.readMore} →
          </a>
        </div>
      </div>
    </article>
  );
}
