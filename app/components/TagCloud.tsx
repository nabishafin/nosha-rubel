import { Link } from "react-router";
import { useI18n, localePath } from "~/lib/i18n-context";

export function TagCloud({ tags }: { tags: string[] }) {
  const { lang } = useI18n();
  return (
    <div className="flex flex-wrap gap-2.5">
      {tags.map((tag) => (
        <Link
          key={tag}
          to={localePath(lang, `search?q=${encodeURIComponent(tag)}`)}
          className="rounded border border-gray-200 bg-white px-2.5 py-1 text-sm font-medium text-gray-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}
