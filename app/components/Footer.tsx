import { Link } from "react-router";
import { CATEGORY_LIST } from "~/lib/categories";
import { LANGUAGE_LIST } from "~/lib/languages";
import { useI18n, localePath } from "~/lib/i18n-context";
import { Container } from "./Container";

const SOCIALS: Array<{ label: string; href: string; path: string }> = [
  { label: "X", href: "https://x.com", path: "M18 2h3l-7 8 8 12h-6l-5-7-5 7H2l8-11L2 2h6l4 6z" },
  { label: "Facebook", href: "https://facebook.com", path: "M14 9h3V6h-3c-2 0-3 1-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14v-2c0-.6.4-1 1-1z" },
  { label: "LinkedIn", href: "https://linkedin.com", path: "M4 4h4v16H4zM6 2a2 2 0 110 4 2 2 0 010-4zM12 8h4v2a4 4 0 018 0v10h-4v-8a2 2 0 00-4 0v8h-4z" },
  { label: "YouTube", href: "https://youtube.com", path: "M22 12s0-3-.4-4.4a2.6 2.6 0 00-1.8-1.8C18.4 5.4 12 5.4 12 5.4s-6.4 0-7.8.4a2.6 2.6 0 00-1.8 1.8C2 9 2 12 2 12s0 3 .4 4.4a2.6 2.6 0 001.8 1.8c1.4.4 7.8.4 7.8.4s6.4 0 7.8-.4a2.6 2.6 0 001.8-1.8C22 15 22 12 22 12zM10 15V9l5 3z" },
];

export function Footer() {
  const { lang, t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-gray-200 bg-gray-50">
      <Container className="py-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand + about */}
          <div className="lg:col-span-2">
            <Link to={localePath(lang)} className="flex items-center gap-2">
             
              <span className="text-xl font-extrabold tracking-tight text-gray-900">
           Noosha Aubel<span className="text-blue-600"></span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-600">{t.footer.description}</p>
            <div className="mt-6 flex gap-3">
              {/* {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:border-blue-300 hover:text-blue-600"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))} */}
            </div>
          </div>

          {/* Categories */}
          <nav aria-label={t.footer.categories}>
            <h3 className="text-sm font-semibold text-gray-900">{t.footer.categories}</h3>
            <ul className="mt-4 space-y-2.5">
              {CATEGORY_LIST.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={localePath(lang, `category/${c.slug}`)}
                    className="text-sm text-gray-600 transition hover:text-blue-700"
                  >
                    {t.categories[c.slug]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick links */}
          <nav aria-label={t.footer.quickLinks}>
            <h3 className="text-sm font-semibold text-gray-900">{t.footer.quickLinks}</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { slug: "about", label: t.footer.about },
                { slug: "contact", label: t.footer.contact },
                { slug: "privacy", label: t.footer.privacy },
                { slug: "terms", label: t.footer.terms },
              ].map(({ slug, label }) => (
                <li key={slug}>
                  <Link
                    to={localePath(lang, slug)}
                    className="text-sm text-gray-600 transition hover:text-blue-700"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Languages */}
          <nav aria-label={t.footer.languages}>
            <h3 className="text-sm font-semibold text-gray-900">{t.footer.languages}</h3>
            <ul className="mt-4 space-y-2.5">
              {LANGUAGE_LIST.map((info) => (
                <li key={info.code}>
                  <Link
                    to={localePath(info.code)}
                    hrefLang={info.code}
                    className="flex items-center gap-2 text-sm text-gray-600 transition hover:text-blue-700"
                  >
                    <span aria-hidden="true">{info.flag}</span>
                    {info.nativeName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 text-sm text-gray-500 sm:flex-row">
          <p>
            © {year} NewsHub. {t.footer.rights}
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link to={localePath(lang, "privacy")} className="hover:text-gray-800">{t.footer.privacy}</Link>
            <Link to={localePath(lang, "terms")} className="hover:text-gray-800">{t.footer.terms}</Link>
            <Link to={localePath(lang, "contact")} className="hover:text-gray-800">{t.footer.contact}</Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
