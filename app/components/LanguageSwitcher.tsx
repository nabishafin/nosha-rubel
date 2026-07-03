import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { LANGUAGES, LANGUAGE_LIST } from "~/lib/languages";
import { useI18n, localePath } from "~/lib/i18n-context";

/** Dropdown to switch editions. Switching returns to the chosen language's home. */
export function LanguageSwitcher() {
  const { lang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES[lang];

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-3.5 py-2 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/60"
      >
        <span aria-hidden="true">{current.flag}</span>
        <span className="hidden sm:inline">{current.nativeName}</span>
        <span className="uppercase sm:hidden">{current.code}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul
          role="menu"
          className="absolute right-0 z-50 mt-3 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white py-1.5 shadow-xl shadow-gray-900/10"
        >
          {LANGUAGE_LIST.map((info) => (
            <li key={info.code} role="none">
              <Link
                role="menuitem"
                to={localePath(info.code)}
                hrefLang={info.code}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 px-4 py-2.5 text-sm transition hover:bg-blue-50 ${
                  info.code === lang ? "font-semibold text-blue-700" : "font-medium text-gray-700"
                }`}
              >
                <span aria-hidden="true">{info.flag}</span>
                {info.nativeName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
