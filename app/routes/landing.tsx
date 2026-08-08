import { isLanguageCode, DEFAULT_LANGUAGE } from "~/lib/languages";
import { getTranslation } from "~/lib/i18n";
import { getLatest, getMostRead, getPopularTags, getTotalViews } from "~/lib/news";
import { getOrigin } from "~/lib/http";
import {
  buildMeta,
  localizedAlternates,
  SITE_DESCRIPTION,
  SITE_NAME,
  websiteJsonLd,
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

export function loader({ params, request }: Route.LoaderArgs) {
  const lang = isLanguageCode(params.lang) ? params.lang : DEFAULT_LANGUAGE;
  const origin = getOrigin(request);

  return {
    lang,
    origin,
    articles: getLatest(lang),
    totalViews: getTotalViews(lang),
    mostRead: getMostRead(lang, 6),
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
      description: SITE_DESCRIPTION,
      canonical,
      image: articles[0]?.image ?? `${origin}/favicon.png`,
      lang,
      alternates: localizedAlternates(origin, ""),
    }),
    { "script:ld+json": websiteJsonLd(origin, lang) },
  ];
}

export default function Landing({ loaderData }: Route.ComponentProps) {
  const { articles, totalViews, mostRead, tags } = loaderData;
  const t = getTranslation(loaderData.lang);

  return (
    <>
      <HomeBanner
        lang={loaderData.lang}
        tagline={t.brandTagline}
        article={articles[0]}
        articleCount={articles.length}
        totalViews={totalViews}
        readLabel={t.actions.readFull}
      />

      <Section>
        <ArticleGrid articles={articles} columns={3} eagerFirst />
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
            <SectionHeading title={t.sections.mostRead} />
            <div className="rounded-lg border border-gray-200 bg-white px-5">
              {mostRead.map((a, i) => (
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
