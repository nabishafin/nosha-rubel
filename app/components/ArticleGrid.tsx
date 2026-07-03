import type { Article } from "~/lib/types";
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
  return (
    <div className={`grid grid-cols-1 gap-4 sm:gap-5 ${COLS[columns]}`}>
      {articles.map((a, i) => (
        <ArticleCard key={a.id} article={a} eager={eagerFirst && i === 0} />
      ))}
    </div>
  );
}
