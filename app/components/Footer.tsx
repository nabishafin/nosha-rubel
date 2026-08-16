import { useState } from "react";
import { Link } from "react-router";
import { LANGUAGE_LIST } from "~/lib/languages";
import { useI18n, localePath } from "~/lib/i18n-context";
import { SITE_CONTACT_EMAIL, SITE_NAME, SITE_PRODUCT_LABEL } from "~/lib/site-identity";
import { Container } from "./Container";
import { EditorialStatementContent } from "./EditorialStatementContent";

export function Footer() {
  const { lang, t } = useI18n();
  const year = new Date().getFullYear();
  const [showStatement, setShowStatement] = useState(false);

  return (
    <footer className="mt-12 border-t border-gray-200 bg-gray-50">
      <Container className="py-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + about + Publisher Notice */}
          <div className="lg:col-span-2 space-y-4">
            <Link to={localePath(lang)} className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-gray-900">
                {SITE_NAME} <span className="text-xs font-semibold text-blue-600">/ Press Dossier</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-gray-600">{t.footer.description}</p>

            {/* Official Publisher & Press Legal Imprint Box */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 text-xs space-y-2 text-gray-700 shadow-xs">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">Site Information</span>
                <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-700">Independent Archive</span>
              </div>
              <p>
                <strong>Site:</strong> {SITE_NAME}
                <br />
                <strong>Purpose:</strong> {SITE_PRODUCT_LABEL}
                <br />
                <strong>Contact address:</strong> 28/A Toyenbee Circular Road, Dhaka-1000
                <br />
                <strong>Additional address:</strong> 9/A, HRC Bhaban, 45 Kawran Bazar, Dhaka-1217
              </p>
              <p className="text-gray-500 pt-1">
                <strong>Tel:</strong> +880 1812-345678 | <strong>Email:</strong>{" "}
                <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="text-blue-600 font-semibold hover:underline">
                  {SITE_CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label={t.footer.quickLinks}>
            <h3 className="text-sm font-semibold text-gray-900">{t.footer.quickLinks}</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { slug: "editorial-statement", label: "Editorial Statement" },
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
                    hrefLang={info.hreflang}
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

        {/* Expandable Editorial & Legal Statement Section */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={() => setShowStatement((prev) => !prev)}
            aria-expanded={showStatement}
            aria-controls="editorial-legal-statement"
            className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white p-4 text-left text-sm font-bold text-gray-800 shadow-xs transition hover:border-blue-300 hover:bg-blue-50/30"
          >
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-100 p-1 text-blue-700">
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </span>
              <span>
                Statement on Editorial Objectives, Freedom of Expression, Legal Compliance & Data Protection
              </span>
            </div>
            <span className="text-xs font-semibold text-blue-600">
              {showStatement ? "Hide Legal Document ▲" : "Read Full Document ▼"}
            </span>
          </button>

          {showStatement && (
            <div id="editorial-legal-statement" className="mt-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <EditorialStatementContent />
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 text-sm text-gray-500 sm:flex-row">
          <p>
            © {year} {SITE_NAME}. {t.footer.rights}
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link to={localePath(lang, "editorial-statement")} className="font-semibold text-blue-600 hover:text-blue-800">
              Editorial Statement
            </Link>
            <Link to={localePath(lang, "privacy")} className="hover:text-gray-800">
              {t.footer.privacy}
            </Link>
            <Link to={localePath(lang, "terms")} className="hover:text-gray-800">
              {t.footer.terms}
            </Link>
            <Link to={localePath(lang, "contact")} className="hover:text-gray-800">
              {t.footer.contact}
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
