import { isRouteErrorResponse, Link, useParams } from "react-router";
import { isLanguageCode, DEFAULT_LANGUAGE } from "~/lib/languages";
import { isCategorySlug, CATEGORIES } from "~/lib/categories";
import { getTranslation } from "~/lib/i18n";
import { getByCategory } from "~/lib/news";
import { getOrigin } from "~/lib/http";
import { buildMeta, localizedAlternates } from "~/lib/seo";
import { localePath } from "~/lib/i18n-context";

import { Section } from "~/components/Section";
import { Container } from "~/components/Container";
import { ArticleGrid } from "~/components/ArticleGrid";
import type { Route } from "./+types/category";

export function loader({ params, request }: Route.LoaderArgs) {
  if (!isLanguageCode(params.lang) || !isCategorySlug(params.category)) {
    throw new Response("Not Found", { status: 404 });
  }
  const lang = params.lang;
  const category = params.category;
  const origin = getOrigin(request);

  return {
    lang,
    origin,
    category,
    articles: getByCategory(lang, category),
  };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [];
  const { lang, origin, category } = loaderData;
  const t = getTranslation(lang);
  const label = t.categories[category];
  const path = localePath(lang, `category/${category}`);
  const canonical = `${origin}${path}`;

  return buildMeta({
    title: `${label} — NewsHub`,
    description: `${label} news, ${t.sections.latest.toLowerCase()} — ${t.meta.homeDescription}`,
    canonical,
    image: `${origin}/favicon.ico`,
    lang,
    alternates: localizedAlternates(origin, `category/${category}`),
  });
}

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  const { lang, category, articles } = loaderData;
  const t = getTranslation(lang);
  const info = CATEGORIES[category];

  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <Container className="py-10">
          <span className="text-4xl" aria-hidden="true">{info.emoji}</span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {t.categories[category]}
          </h1>
          <p className="mt-2 text-gray-600">
            {articles.length} {t.sections.latest.toLowerCase()}
          </p>
        </Container>
      </div>

      <Section>
        {articles.length > 0 ? (
          <ArticleGrid articles={articles} columns={3} eagerFirst />
        ) : (
          <p className="py-16 text-center text-gray-500">{t.search.noResults}</p>
        )}
      </Section>
    </>
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
      <h1 className="mt-4 text-2xl font-bold text-gray-900">{is404 ? t.article.notFound : "Error"}</h1>
      <Link
        to={localePath(lang)}
        className="mt-6 inline-block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
      >
        {t.actions.backHome}
      </Link>
    </Container>
  );
}
