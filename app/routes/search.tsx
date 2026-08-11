import { isLanguageCode, DEFAULT_LANGUAGE } from "~/lib/languages";
import { getTranslation } from "~/lib/i18n";
import { searchArticles } from "~/lib/news";
import { getOrigin } from "~/lib/http";
import { buildMeta, SITE_DESCRIPTION, SITE_NAME, SOCIAL_PREVIEW_IMAGE } from "~/lib/seo";
import { localePath } from "~/lib/i18n-context";

import { Section } from "~/components/Section";
import { SearchBar } from "~/components/SearchBar";
import { ArticleGrid } from "~/components/ArticleGrid";
import type { Route } from "./+types/search";

export function loader({ params, request }: Route.LoaderArgs) {
  const lang = isLanguageCode(params.lang) ? params.lang : DEFAULT_LANGUAGE;
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.trim() ?? "";
  const origin = getOrigin(request);

  return {
    lang,
    origin,
    query,
    results: query ? searchArticles(lang, query) : [],
  };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [];
  const { lang, origin, query } = loaderData;
  const t = getTranslation(lang);
  const title = query ? `${t.search.resultsFor} “${query}” — ${SITE_NAME}` : `${t.search.title} — ${SITE_NAME}`;
  return buildMeta({
    title,
    description: SITE_DESCRIPTION,
    canonical: `${origin}${localePath(lang, "search")}`,
    image: SOCIAL_PREVIEW_IMAGE,
    lang,
    robots: "noindex, follow", // search result pages should not be indexed
  });
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  const { lang, query, results } = loaderData;
  const t = getTranslation(lang);

  function renderResults() {
    if (!query) return <p className="py-10 text-center text-gray-500">{t.search.typePrompt}</p>;
    if (results.length === 0) return <p className="py-10 text-center text-gray-500">{t.search.noResults}</p>;
    return (
      <>
        <p className="mb-6 text-sm text-gray-600">
          {results.length} · {t.search.resultsFor}{" "}
          <span className="font-semibold text-gray-900">“{query}”</span>
        </p>
        <ArticleGrid articles={results} columns={3} />
      </>
    );
  }

  return (
    <Section>
      <div className="mx-auto max-w-2xl">
        <h1 className="text-center text-3xl font-extrabold tracking-tight text-gray-900">{t.search.title}</h1>
        <div className="mt-6">
          <SearchBar defaultValue={query} autoFocus />
        </div>
      </div>

      <div className="mt-10">{renderResults()}</div>
    </Section>
  );
}
