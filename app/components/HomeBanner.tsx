import { LANGUAGES } from "~/lib/languages";
import type { Article, LanguageCode } from "~/lib/types";
import { Container } from "./Container";

// Newspaper-themed hero backdrop (Unsplash). Falls back to the local asset if
// the CDN fails to load.
const BANNER_IMAGE =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80";

interface HomeBannerProps {
  lang: LanguageCode;
  tagline: string;
  article?: Article;
  articleCount: number;
  readLabel: string;
}

export function HomeBanner({ lang, tagline, article, articleCount, readLabel }: HomeBannerProps) {
  const edition = LANGUAGES[lang];

  return (
    <section className="relative isolate overflow-hidden bg-gray-950">
      <img
        src={BANNER_IMAGE}
        alt=""
        aria-hidden="true"
        onError={(e) => {
          const img = e.currentTarget;
          if (img.src.endsWith("/common.jpeg")) return;
          img.src = "/common.jpeg";
        }}
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,18,0.95),rgba(17,24,39,0.78)_45%,rgba(185,28,28,0.58))]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/20" />

      <Container className="relative py-10 sm:py-14 lg:py-16">
        <div className="grid min-h-[260px] items-end gap-8 lg:grid-cols-[1fr_420px]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase text-white backdrop-blur">
              <span aria-hidden="true">{edition.flag}</span>
              <span>{edition.englishName} Edition</span>
            </div>
            <h1 className="mt-5 max-w-2xl text-4xl font-black leading-none text-white sm:text-5xl lg:text-6xl">
           Noosha Aubel
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-gray-100 sm:text-lg">{tagline}</p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold text-white">
              <span className="rounded-md border border-white/20 bg-white/10 px-3 py-2 backdrop-blur">
                {articleCount} Stories
              </span>
              <span className="rounded-md border border-white/20 bg-white/10 px-3 py-2 backdrop-blur">
                {edition.nativeName}
              </span>
            </div>
          </div>

          {article && (
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noreferrer nofollow"
              className="block rounded-lg border border-white/20 bg-white/95 p-5 text-gray-950 shadow-2xl transition hover:-translate-y-0.5 hover:bg-white"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-red-700">{article.sourceName}</p>
              <h2 className="mt-2 line-clamp-3 text-xl font-extrabold leading-snug">{article.title}</h2>
              <p className="mt-4 text-sm font-semibold text-blue-700">{readLabel} →</p>
            </a>
          )}
        </div>
      </Container>
    </section>
  );
}
