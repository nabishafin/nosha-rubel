import { Translated } from "~/components/Translated";
import type { Article } from "~/lib/types";
import { useI18n } from "~/lib/i18n-context";
import { ArticleCard } from "./ArticleCard";

interface ArticleGridProps {
  articles: Article[];
  /** Columns at the lg breakpoint. */
  columns?: 2 | 3 | 4;
  eagerFirst?: boolean;
}

const COLS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function ArticleGrid({ articles, columns = 3, eagerFirst = false }: ArticleGridProps) {
  const { lang } = useI18n();
  return <Translated>{(
    <ul aria-label={lang === "de" ? "Berichtsdossiers" : "Coverage records"} className={`grid grid-cols-1 gap-4 sm:gap-5 ${COLS[columns]}`}>
      {articles.map((a, i) => (
        <li key={a.id}>
          <ArticleCard article={a} eager={eagerFirst && i === 0} />
        </li>
      ))}
    </ul>
  )}</Translated>;
}
