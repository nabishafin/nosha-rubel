import { Form } from "react-router";
import { useI18n, localePath } from "~/lib/i18n-context";

interface SearchBarProps {
  defaultValue?: string;
  variant?: "default" | "compact";
  autoFocus?: boolean;
}

/**
 * GET form that navigates to the search route. Works without JS (native form
 * submit) and is enhanced by React Router when hydrated.
 */
export function SearchBar({ defaultValue = "", variant = "default", autoFocus = false }: SearchBarProps) {
  const { lang, t } = useI18n();
  const compact = variant === "compact";

  return (
    <Form action={localePath(lang, "search")} method="get" role="search" className="relative w-full">
      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
        </svg>
      </span>
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        // autoFocus is intentional on the dedicated search page.
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
        placeholder={t.search.placeholder}
        aria-label={t.search.title}
        className={`w-full rounded-md border border-gray-200 bg-white pl-10 pr-24 text-gray-900 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
          compact ? "py-2 text-sm" : "py-3 text-base"
        }`}
      />
      <button
        type="submit"
        className={`absolute inset-y-0 right-0 my-1 mr-1 rounded bg-blue-600 px-4 font-semibold text-white transition hover:bg-blue-700 ${
          compact ? "text-sm" : ""
        }`}
      >
        {t.actions.search}
      </button>
    </Form>
  );
}
