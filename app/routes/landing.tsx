import { Link } from "react-router";
import { isLanguageCode, DEFAULT_LANGUAGE, isSearchIndexLanguage, SEARCH_INDEX_LANGUAGES } from "~/lib/languages";
import { getTranslation } from "~/lib/i18n";
import { getFeatured, getLatest, getPopularTags, getSourceCount } from "~/lib/news";
import { getOrigin } from "~/lib/http";
import {
  buildMeta,
  getSiteDescription,
  getSiteTitle,
  localizedAlternates,
  SOCIAL_PREVIEW_IMAGE,
  websiteCollectionJsonLd,
} from "~/lib/seo";
import { localePath } from "~/lib/i18n-context";

import { Section } from "~/components/Section";
import { HomeBanner } from "~/components/HomeBanner";
import { SectionHeading } from "~/components/SectionHeading";
import { ArticleGrid } from "~/components/ArticleGrid";
import { ArticleCard } from "~/components/ArticleCard";
import { LanguageGrid } from "~/components/LanguageGrid";
import { TagCloud } from "~/components/TagCloud";
import { DocumentArchive } from "~/components/DocumentArchive";
import { VideoFeature } from "~/components/VideoFeature";
import type { Route } from "./+types/landing";

export const links: Route.LinksFunction = () => [
  {
    rel: "preload",
    as: "image",
    href: "/media/hero/potsdam-civic-archive-960.webp",
    type: "image/webp",
    fetchPriority: "high",
    imageSrcSet:
      "/media/hero/potsdam-civic-archive-640.webp 640w, /media/hero/potsdam-civic-archive-960.webp 960w, /media/hero/potsdam-civic-archive-1440.webp 1440w",
    imageSizes: "100vw",
  },
];

export function loader({ params, request }: Route.LoaderArgs) {
  const lang = isLanguageCode(params.lang) ? params.lang : DEFAULT_LANGUAGE;
  const origin = getOrigin(request);

  return {
    lang,
    origin,
    articles: getLatest(lang),
    sourceCount: getSourceCount(lang),
    selectedCoverage: getFeatured(lang, 6),
    tags: getPopularTags(lang, 16),
  };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [];
  const { lang, origin, articles } = loaderData;
  const canonical = `${origin}${localePath(lang)}`;

  return [
    ...buildMeta({
      title: getSiteTitle(lang),
      description: getSiteDescription(lang),
      canonical,
      image: SOCIAL_PREVIEW_IMAGE,
      lang,
      alternates: isSearchIndexLanguage(lang)
        ? localizedAlternates(origin, "", SEARCH_INDEX_LANGUAGES)
        : undefined,
      robots: isSearchIndexLanguage(lang) ? undefined : "noindex, follow",
    }),
    { "script:ld+json": websiteCollectionJsonLd(origin, lang, articles) },
  ];
}

export default function Landing({ loaderData }: Route.ComponentProps) {
  const { articles, sourceCount, selectedCoverage, tags } = loaderData;
  const t = getTranslation(loaderData.lang);

  return (
    <>
      <HomeBanner
        lang={loaderData.lang}
        tagline={t.brandTagline}
        article={articles[0]}
        articleCount={articles.length}
        sourceCount={sourceCount}
        readLabel={t.actions.readFull}
      />

      {loaderData.lang === "de" && (
        <Section className="border-b border-gray-200">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700">Person, Amt und Quellen</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-950">Noosha Aubel aktuell in Potsdam</h2>
            <p className="mt-3 max-w-4xl leading-relaxed text-gray-700">
              Noosha Aubel ist seit dem 24. Oktober 2025 Oberbürgermeisterin der Landeshauptstadt Potsdam. Diese unabhängige Übersicht trennt amtlich belegte Fakten zu Biografie, Wahl und Amt von redaktionellen Bewertungen in den unten aufgeführten Pressedossiers.
            </p>
            <dl className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-blue-100 bg-white p-4"><dt className="text-xs font-bold uppercase text-gray-500">Amt</dt><dd className="mt-1 font-bold text-gray-950">Oberbürgermeisterin</dd></div>
              <div className="rounded-xl border border-blue-100 bg-white p-4"><dt className="text-xs font-bold uppercase text-gray-500">Amtsantritt</dt><dd className="mt-1 font-bold text-gray-950">24. Oktober 2025</dd></div>
              <div className="rounded-xl border border-blue-100 bg-white p-4"><dt className="text-xs font-bold uppercase text-gray-500">Stichwahl 2025</dt><dd className="mt-1 font-bold text-gray-950">72,9 Prozent</dd></div>
            </dl>
            <div className="mt-6">
              <Link to={localePath("de", "noosha-aubel")} className="inline-flex justify-center rounded-lg bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800">
                Vollständige Biografie, Themen und Primärquellen
              </Link>
            </div>
          </div>
        </Section>
      )}

      <Section>
        <ArticleGrid articles={articles} columns={3} />
      </Section>

      <Section muted>
        <VideoFeature />
      </Section>

      <Section>
        <SectionHeading title={t.sections.byLanguage} />
        <LanguageGrid />
      </Section>

      <Section muted>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeading title={t.sections.featured} />
            <ol aria-label={t.sections.featured} className="rounded-lg border border-gray-200 bg-white px-5">
              {selectedCoverage.map((a, i) => (
                <li key={a.id}>
                  <ArticleCard article={a} variant="compact" rank={i + 1} />
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeading title={t.sections.tags} />
            <TagCloud tags={tags} />
          </div>
        </div>
      </Section>

      <Section>
        <DocumentArchive />
      </Section>
    </>
  );
}
