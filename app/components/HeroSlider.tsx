import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useI18n, localePath } from "~/lib/i18n-context";
import type { Article } from "~/lib/types";
import { SmartImage } from "./SmartImage";
import { ArticleMeta } from "./ArticleMeta";

/**
 * Auto-advancing hero slider for breaking / featured stories. Server-renders
 * the first slide; interactivity (auto-play, dots, arrows) activates on hydration.
 */
export function HeroSlider({ articles }: { articles: Article[] }) {
  const { lang, t } = useI18n();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = articles.length;

  useEffect(() => {
    if (count <= 1 || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [count, paused]);

  if (count === 0) return null;

  const go = (i: number) => setIndex((i + count) % count);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t.sections.breaking}
      className="relative overflow-hidden rounded-xl bg-gray-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[16/10] sm:aspect-[16/8] lg:aspect-[16/7]">
        {articles.map((article, i) => (
          <div
            key={article.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            <SmartImage
              src={article.image}
              alt={article.title}
              aspect="h-full"
              eager={i === 0}
              className="h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                    {t.hero.breaking}
                  </span>
                </div>
                <h1 className="mt-4 text-2xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                  {article.title}
                </h1>
                <p className="mt-3 line-clamp-2 max-w-2xl text-sm text-gray-200 sm:text-base">
                  {article.description}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <Link
                    to={localePath(lang, `news/${article.slug}`)}
                    className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
                  >
                    {t.actions.readFull} →
                  </Link>
                  <ArticleMeta article={article} className="text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur transition hover:bg-white/40 sm:block"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur transition hover:bg-white/40 sm:block"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {articles.map((a, i) => (
              <button
                key={a.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
