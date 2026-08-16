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
              <div lang="en" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                <span aria-hidden="true">{edition.flag}</span>
                <span>{edition.englishName} Edition</span>
              </div>
              <div lang="en" className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Live Press Coverage
              </div>
            </div>

            <h1 className="mt-4 text-4xl font-black leading-none tracking-tight text-white sm:text-5xl lg:text-6xl">
              {SITE_NAME}
            </h1>

            <p className="mt-2 text-base font-bold text-blue-300 sm:text-lg">
              {SITE_PRODUCT_LABEL}
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-200 sm:text-base">
              {tagline} — Comprehensive investigative reporting, public record documentation, and global press archives covering municipal governance, civic policy, and international affairs in Potsdam and beyond.
            </p>

            {/* Feature Pills */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5 text-xs font-semibold text-white">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md">
                📰 <strong>{articleCount}</strong> Stories
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md">
                📚 <strong>{sourceCount}</strong> Sources
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md">
                🌍 <strong>26</strong> Wikipedia Archives
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md">
                🗣️ {edition.nativeName}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-blue-400/30 bg-blue-500/20 px-3 py-2 text-blue-200 backdrop-blur-md">
                🏛️ Public Records
              </span>
            </div>
          </div>

          {/* Right Column: Lead Article Spotlight Card */}
          {article && (
            <Link
              lang={LANGUAGES[article.language].locale}
              to={localePath(article.language, `news/${article.slug}`)}
              className="group block rounded-2xl border border-white/20 bg-white/95 p-5 text-gray-950 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white"
            >
              <div className="flex items-center justify-end">
                <span lang="en" className="rounded bg-red-100 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-red-700">
                  Coverage Record
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
                <span lang="en" className="text-[11px] font-normal text-gray-600">Internal Dossier</span>
              </div>
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}
