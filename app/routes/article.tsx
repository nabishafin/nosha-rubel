import { Link, isRouteErrorResponse, useParams } from "react-router";
import { isLanguageCode, DEFAULT_LANGUAGE, LANGUAGES } from "~/lib/languages";
import { getInterfaceLocale, getTranslation } from "~/lib/i18n";
import { getArticleBySlug, getRelated, getTranslations } from "~/lib/news";
import { getOrigin } from "~/lib/http";
import { articleAlternates, buildMeta, coverageRecordJsonLd, withSiteName } from "~/lib/seo";
import { formatDate, readingTime } from "~/lib/format";
import { localePath } from "~/lib/i18n-context";
import { SITE_CONTACT_EMAIL } from "~/lib/site-identity";

import { Container } from "~/components/Container";
import { ExternalLink } from "~/components/ExternalLink";
import { Section } from "~/components/Section";
import { SectionHeading } from "~/components/SectionHeading";
import { SmartImage } from "~/components/SmartImage";
import { ArticleCard } from "~/components/ArticleCard";
import { TagCloud } from "~/components/TagCloud";
import type { Route } from "./+types/article";

export function loader({ params, request }: Route.LoaderArgs) {
  if (!isLanguageCode(params.lang)) throw new Response("Not Found", { status: 404 });
  const lang = params.lang;
  const article = getArticleBySlug(lang, params.slug);
  if (!article) throw new Response("Article Not Found", { status: 404 });

  const origin = getOrigin(request);
  const canonical = `${origin}${localePath(lang, `news/${article.slug}`)}`;

  // hreflang alternates: point each language at its own version of this story.
  const translations = getTranslations(article);
  const alternates = translations.length > 1 ? articleAlternates(origin, translations) : undefined;

  return {
    lang,
    origin,
    article,
    related: getRelated(article, 3),
    canonical,
    alternates,
  };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [];
  const { article, canonical, lang, alternates, origin } = loaderData;
  return [
    ...buildMeta({
      title: withSiteName(article.title),
      description: article.description,
      canonical,
      image: article.image,
      lang,
      keywords: article.tags,
      alternates,
    }),
    { "script:ld+json": coverageRecordJsonLd(article, canonical, origin) },
  ];
}

export default function ArticlePage({ loaderData }: Route.ComponentProps) {
  const { lang, article, related } = loaderData;
  const t = getTranslation(lang);
  const interfaceLocale = getInterfaceLocale(lang);
  const mins = readingTime(article.content);

  return (
    <article lang={LANGUAGES[article.language].locale}>
      {/* Article header */}
      <Container className="pt-8">
        <div className="mx-auto max-w-3xl">
          <nav lang={interfaceLocale} aria-label="Breadcrumb" className="mb-5 text-sm text-gray-500">
            <Link to={localePath(lang)} className="hover:text-gray-800">{t.nav.home}</Link>
            <span aria-hidden="true"> / </span>
            <span>{t.article.source}</span>
          </nav>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">{article.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-gray-100 py-4 text-sm text-gray-500">
            <span className="font-semibold text-gray-800">{t.article.source}: {article.sourceName}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, lang)}</time>
            <span aria-hidden="true">·</span>
            <span lang={interfaceLocale}>{mins} {t.article.minRead}</span>
          </div>
        </div>
      </Container>

      {/* Hero image */}
      <Container className="mt-8">
        <div className="mx-auto max-w-4xl">
          <SmartImage
            src={article.image}
            alt={article.title}
            aspect="aspect-[16/9]"
            eager
            className="rounded-lg"
            sizes="(max-width: 896px) 100vw, 896px"
            width={950}
            height={534}
          />
        </div>
      </Container>

      {/* Body */}
      <Container className="mt-10">
        <div className="mx-auto max-w-3xl">
          <div lang="en" className="mb-7 rounded-lg border border-blue-100 bg-blue-50 p-5 text-sm leading-relaxed text-blue-950">
            This is an independent coverage record summarizing a publication from {article.sourceName}. The original publisher remains responsible for the source article.
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-gray-800">
            {article.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Source */}
          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-5">
            <p lang={interfaceLocale} className="text-sm font-semibold text-gray-900">{t.article.source}</p>
            <ExternalLink
              href={article.sourceUrl}
              className="mt-1 inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800"
            >
              {article.sourceName}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </ExternalLink>
          </div>

          <div lang="en" className="mt-5 rounded-lg border border-gray-200 bg-white p-5 text-sm leading-relaxed text-gray-600">
            Corrections or source updates can be reported to{" "}
            <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="font-semibold text-blue-600 hover:text-blue-800">
              {SITE_CONTACT_EMAIL}
            </a>.
          </div>

          {/* Tags */}
          <div className="mt-8">
            <h2 lang={interfaceLocale} className="mb-3 text-sm font-semibold text-gray-900">{t.sections.tags}</h2>
            <TagCloud tags={article.tags} />
          </div>
        </div>
      </Container>

      {/* Related */}
      {related.length > 0 && (
        <Section muted className="mt-14">
          <SectionHeading
            title={t.sections.related}
          />
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </Section>
      )}
    </article>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const params = useParams();
  const lang = isLanguageCode(params.lang) ? params.lang : DEFAULT_LANGUAGE;
  const t = getTranslation(lang);
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <Container className="py-24 text-center">
      <p className="text-6xl">{is404 ? "🔍" : "⚠️"}</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">
        {is404 ? t.article.notFound : "Error"}
      </h1>
      <p className="mx-auto mt-2 max-w-md text-gray-600">
        {is404 ? t.article.notFoundBody : "An unexpected error occurred."}
      </p>
      <Link
        to={localePath(lang)}
        className="mt-6 inline-block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
      >
        {t.actions.backHome}
      </Link>
    </Container>
  );
}
