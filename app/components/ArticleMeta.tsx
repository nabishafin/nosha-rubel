import { useI18n } from "~/lib/i18n-context";
import { formatDate } from "~/lib/format";
import type { Article } from "~/lib/types";

interface ArticleMetaProps {
  article: Article;
  showAuthor?: boolean;
  className?: string;
}

export function ArticleMeta({ article, showAuthor = false, className = "" }: ArticleMetaProps) {
  const { lang, t } = useI18n();
  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 ${className}`}>
      {showAuthor && (
        <>
          <span className="font-medium text-gray-700">
            {t.article.by} {article.author}
          </span>
          <span aria-hidden="true">·</span>
        </>
      )}
      <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, lang)}</time>
    </div>
  );
}
