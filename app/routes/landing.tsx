import { isLanguageCode, DEFAULT_LANGUAGE } from "~/lib/languages";
import { getTranslation } from "~/lib/i18n";
import { getFeatured, getLatest, getPopularTags, getSourceCount } from "~/lib/news";
import { getOrigin } from "~/lib/http";
import {
  buildMeta,
  getSiteDescription,
  localizedAlternates,
  SITE_NAME,
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
      title: SITE_NAME,
      description: getSiteDescription(lang),
      canonical,
      image: SOCIAL_PREVIEW_IMAGE,
      lang,
      alternates: localizedAlternates(origin, ""),
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

      <Section>
        <DocumentArchive />
      </Section>

      <Section muted>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeading title={t.sections.featured} />
            <div className="rounded-lg border border-gray-200 bg-white px-5">
              {selectedCoverage.map((a, i) => (
                <ArticleCard key={a.id} article={a} variant="compact" rank={i + 1} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeading title={t.sections.tags} />
            <TagCloud tags={tags} />
          </div>
        </div>
      </Section>
    </>
  );
}
