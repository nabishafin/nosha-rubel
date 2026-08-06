import { Link, isRouteErrorResponse, useParams } from "react-router";
import { isLanguageCode, DEFAULT_LANGUAGE } from "~/lib/languages";
import { getTranslation } from "~/lib/i18n";
import { getArticleBySlug, getRelated, getTranslations } from "~/lib/news";
import { getOrigin } from "~/lib/http";
import { buildMeta, newsArticleJsonLd } from "~/lib/seo";
import { formatDate, formatViews, readingTime } from "~/lib/format";
import { localePath } from "~/lib/i18n-context";

import { Container } from "~/components/Container";
import { Section } from "~/components/Section";
import { SectionHeading } from "~/components/SectionHeading";
import { SmartImage } from "~/components/SmartImage";
import { CategoryBadge } from "~/components/CategoryBadge";
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
  const alternates: Record<string, string> = {};
  for (const alt of translations) {
    alternates[alt.language] = `${origin}${localePath(alt.language, `news/${alt.slug}`)}`;
  }
  const defaultAlt =
    translations.find((a) => a.language === DEFAULT_LANGUAGE) ??
    translations.find((a) => a.language === "en");
  if (defaultAlt) alternates["x-default"] = `${origin}${localePath(defaultAlt.language, `news/${defaultAlt.slug}`)}`;

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
  const { article, canonical, lang, alternates } = loaderData;
  return [
    ...buildMeta({
      title: `${article.title} — NewsHub`,
      description: article.description,
      canonical,
      image: article.image,
      lang,
      type: "article",
      publishedAt: article.publishedAt,
      section: article.category,
      tags: article.tags,
      keywords: article.tags,
      alternates,
    }),
    { "script:ld+json": newsArticleJsonLd(article, canonical, article.image) },
    { name: "author", content: article.author },
  ];
}

export default function ArticlePage({ loaderData }: Route.ComponentProps) {
  const { lang, article, related } = loaderData;
  const t = getTranslation(lang);
  const mins = readingTime(article.content);

  return (
    <article>
      {/* Breadcrumb + header */}
      <Container className="pt-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link to={localePath(lang)} className="hover:text-gray-800">
            {t.nav.home}
          </Link>
          <span aria-hidden="true">/</span>
          <Link to={localePath(lang, `category/${article.category}`)} className="hover:text-gray-800">
            {t.categories[article.category]}
          </Link>
        </nav>

        <div className="mx-auto mt-6 max-w-3xl">
          <CategoryBadge category={article.category} />
          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">{article.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-gray-100 py-4 text-sm text-gray-500">
            <span className="font-semibold text-gray-800">{article.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, lang)}</time>
            <span aria-hidden="true">·</span>
            <span>{mins} {t.article.minRead}</span>
            <span aria-hidden="true">·</span>
            <span>{formatViews(article.views, lang)} {t.article.views}</span>
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
          />
        </div>
      </Container>

      {/* Body */}
      <Container className="mt-10">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-5 text-lg leading-relaxed text-gray-800">
            {article.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Source */}
          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-5">
            <p className="text-sm font-semibold text-gray-900">{t.article.source}</p>
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noreferrer nofollow"
              className="mt-1 inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800"
            >
              {article.sourceName}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Tags */}
          <div className="mt-8">
            <h2 className="mb-3 text-sm font-semibold text-gray-900">{t.sections.tags}</h2>
            <TagCloud tags={article.tags} />
          </div>
        </div>
      </Container>

      {/* Related */}
      {related.length > 0 && (
        <Section muted className="mt-14">
          <SectionHeading
            title={t.sections.related}
            viewAllTo={localePath(lang, `category/${article.category}`)}
            viewAllLabel={t.actions.viewAll}
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
