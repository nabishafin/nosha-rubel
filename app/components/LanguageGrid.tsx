import { Link } from "react-router";
import { LANGUAGE_LIST } from "~/lib/languages";
import { useI18n, localePath } from "~/lib/i18n-context";

/** "News by Language" section — jump to any localized edition. */
export function LanguageGrid() {
  const { lang } = useI18n();

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
      {LANGUAGE_LIST.map((info) => {
        const active = info.code === lang;
        return (
          <Link
            key={info.code}
            to={localePath(info.code)}
            hrefLang={info.code}
            className={`flex flex-col items-center gap-2 rounded-lg border p-3.5 text-center transition ${
              active ? "border-blue-300 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/40"
            }`}
          >
            <span className="text-2xl" aria-hidden="true">
              {info.flag}
            </span>
            <span className="text-sm font-semibold text-gray-900">{info.nativeName}</span>
            <span className="text-xs uppercase tracking-wide text-gray-400">{info.code}</span>
          </Link>
        );
      })}
    </div>
  );
}
