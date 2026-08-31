import { Link } from "react-router";
import { localePath } from "~/lib/i18n-context";
import { LANGUAGES } from "~/lib/languages";
import { SITE_NAME, SITE_PRODUCT_LABEL } from "~/lib/site-identity";
import type { Article, LanguageCode } from "~/lib/types";
import { Container } from "./Container";

interface HomeBannerProps {
  lang: LanguageCode;
  tagline: string;
  article?: Article;
  articleCount: number;
  sourceCount: number;
  readLabel: string;
}

export function HomeBanner({ lang, tagline, article, articleCount, sourceCount, readLabel }: HomeBannerProps) {
  const edition = LANGUAGES[lang];
  const labels = lang === "de"
    ? {
        edition: "Deutsche Ausgabe",
        archive: "Quellenbasiertes Pressedossier",
        coverage: "Berichtsdossiers",
        publishers: "zitierte Herausgeber",
        documents: "PDF-Quellenkopien",
        records: "Öffentliche Dokumente",
        internal: "Internes Dossier",
        product: "Unabhängiges, mehrsprachiges Pressedossier",
        description: `${tagline}. Jeder interne Eintrag enthält eine eigenständige Zusammenfassung, redaktionellen Kontext, Prüfhinweise und einen direkten Link zur zitierten Veröffentlichung.`,
        coverageRecord: "Berichtsdossier",
      }
    : {
        edition: `${edition.englishName} Edition`,
        archive: "Sourced Coverage Archive",
        coverage: "Coverage records",
        publishers: "Cited publishers",
        documents: "Secondary PDF snapshots",
        records: "Public Records",
        internal: "Internal Dossier",
        product: SITE_PRODUCT_LABEL,
        description: `${tagline}. Each internal record provides an original summary, editorial context, verification notes and a direct citation to the external publication.`,
        coverageRecord: "Coverage Record",
      };
  return (
    <section className="relative isolate overflow-hidden bg-gray-950">
      <picture aria-hidden="true">
        <source
          type="image/webp"
          srcSet="/media/hero/potsdam-civic-archive-640.webp 640w, /media/hero/potsdam-civic-archive-960.webp 960w, /media/hero/potsdam-civic-archive-1440.webp 1440w"
          sizes="100vw"
        />
        <img
          src="/media/hero/potsdam-civic-archive-960.jpg"
          srcSet="/media/hero/potsdam-civic-archive-640.jpg 640w, /media/hero/potsdam-civic-archive-960.jpg 960w, /media/hero/potsdam-civic-archive-1440.jpg 1440w"
          sizes="100vw"
          width="1440"
          height="810"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
      </picture>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,18,0.96),rgba(17,24,39,0.85)_50%,rgba(185,28,28,0.6))] " />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/20" />

      <Container className="relative py-12 sm:py-16 lg:py-20">
        <div className="grid min-h-[300px] sm:min-h-[340px] items-end gap-8 lg:grid-cols-[1fr_440px]">
          {/* Left Column: Rich Title, Subtitle, Description & Badges */}
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <div lang={lang === "de" ? "de" : "en"} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                <span aria-hidden="true">{edition.flag}</span>
                <span>{labels.edition}</span>
              </div>
              <div lang={lang === "de" ? "de" : "en"} className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {labels.archive}
              </div>
            </div>

            <h1 className="mt-4 text-4xl font-black leading-none tracking-tight text-white sm:text-5xl lg:text-6xl">
              {SITE_NAME}
            </h1>

            <p className="mt-2 text-base font-bold text-blue-300 sm:text-lg">
              {labels.product}
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-200 sm:text-base">
              {labels.description}
            </p>

            {/* Feature Pills */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5 text-xs font-semibold text-white">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md">
                📰 <strong>{articleCount}</strong> {labels.coverage}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md">
                📚 <strong>{sourceCount}</strong> {labels.publishers}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md">
                📄 <strong>26</strong> {labels.documents}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md">
                🗣️ {edition.nativeName}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-blue-400/30 bg-blue-500/20 px-3 py-2 text-blue-200 backdrop-blur-md">
                🏛️ {labels.records}
              </span>
            </div>
          </div>

          {/* German search intent is served by the neutral entity profile first. */}
          {lang === "de" ? (
            <Link
              lang="de"
              to={localePath("de", "noosha-aubel")}
              className="group block rounded-2xl border border-white/20 bg-white/95 p-5 text-gray-950 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white"
            >
              <div className="flex items-center justify-end">
                <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-blue-800">
                  Person und Amt
                </span>
              </div>
              <h2 className="mt-2.5 text-xl font-extrabold leading-snug text-gray-900 group-hover:text-blue-700">
                Noosha Aubel: Biografie und Amt in Potsdam
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Quellenbasierte Fakten zu Lebenslauf, Oberbürgermeisterwahl 2025, Amtsantritt und aktuellen kommunalpolitischen Themen.
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs font-bold text-blue-700">
                <span>Profil und Quellen ansehen →</span>
                <span className="text-[11px] font-normal text-gray-600">Aktualisiert am 31.08.2026</span>
              </div>
            </Link>
          ) : article ? (
            <Link
              lang={LANGUAGES[article.language].locale}
              to={localePath(article.language, `news/${article.slug}`)}
              className="group block rounded-2xl border border-white/20 bg-white/95 p-5 text-gray-950 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white"
            >
              <div className="flex items-center justify-end">
                <span lang="en" className="rounded bg-red-100 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-red-700">
                  {labels.coverageRecord}
                </span>
              </div>
              <h2 className="mt-2.5 line-clamp-3 text-lg font-extrabold leading-snug text-gray-900 group-hover:text-blue-700">
                {article.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-600">
                {article.description}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs font-bold text-blue-600">
                <span>{readLabel} →</span>
                <span lang="en" className="text-[11px] font-normal text-gray-600">{labels.internal}</span>
              </div>
            </Link>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
