import { Translated } from "~/components/Translated";
import { Link } from "react-router";
import { Container } from "./Container";
import { ArticleGrid } from "./ArticleGrid";
import { ExternalLink } from "./ExternalLink";
import { formatDate, readingTime } from "~/lib/format";
import { LANGUAGES } from "~/lib/languages";
import { localePath } from "~/lib/i18n-context";
import { SITE_CONTACT_EMAIL } from "~/lib/site-identity";
import type { Article } from "~/lib/types";
import type { FullPublication } from "~/lib/full-publications.server";

export function FullArticle({ article, publication, related, translations }: {
  article: Article;
  publication: FullPublication;
  related: Article[];
  translations: Article[];
}) {
  const german = article.language === "de";
  const locale = article.contentLocale ?? LANGUAGES[article.language].locale;
  const labels = german
    ? { home: "Startseite", section: "Politik · Potsdam", by: "Von", minutes: "Min. Lesezeit", editions: "Weitere Sprachausgaben", credit: "Illustration", publication: "Veröffentlichung", source: "Ausgabe beim Herausgeber", related: "Weitere Berichte", corrections: "Korrekturen und Leserhinweise" }
    : { home: "Home", section: "Politics · Potsdam", by: "By", minutes: "min read", editions: "Other language editions", credit: "Illustration", publication: "Publication", source: "Publisher edition", related: "More reporting", corrections: "Corrections and reader feedback" };
  return <Translated>{(
    <article lang={locale} dir={article.language === "ar" ? "rtl" : "ltr"} className="full-publication">
      <Container className="pt-8 sm:pt-12">
        <div className="mx-auto max-w-4xl">
          <nav lang={german ? "de-DE" : "en-US"} aria-label={german ? "Brotkrümelnavigation" : "Breadcrumb"} className="text-sm text-gray-500">
            <Link to={localePath(article.language)} className="hover:text-blue-700">{labels.home}</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span>{article.sourceName}</span>
          </nav>
          <div className="mt-8 flex flex-wrap items-center gap-3 border-t-4 border-red-800 pt-5">
            <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-red-800">{article.sourceName}</span>
            <span lang={german ? "de-DE" : "en-US"} className="border-s border-gray-300 ps-3 text-xs font-semibold text-gray-500">{labels.section}</span>
          </div>
          <h1 className="mt-5 text-3xl font-extrabold leading-[1.15] tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">{article.title}</h1>
          <div className="article-lead mt-6 text-lg leading-relaxed text-gray-600 sm:text-xl" dangerouslySetInnerHTML={{ __html: publication.leadHtml }} />
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-gray-200 py-4 text-sm">
            <span><span lang={german ? "de-DE" : "en-US"} className="text-gray-500">{labels.by} </span><strong className="text-gray-900">{article.author}</strong></span>
            <time dateTime={article.publishedAt} className="text-gray-600">{formatDate(article.publishedAt, article.language)}</time>
            <span lang={german ? "de-DE" : "en-US"} className="text-gray-500">{readingTime(publication.paragraphs)} {labels.minutes}</span>
          </div>
        </div>
      </Container>
      <Container className="mt-8">
        <figure className="mx-auto max-w-4xl">
          <img src={article.image} alt={article.title} width={article.imageWidth} height={article.imageHeight} fetchPriority="high" decoding="async" className="h-auto w-full rounded-sm bg-gray-100" />
          <figcaption lang={german ? "de-DE" : "en-US"} className="mt-2 border-b border-gray-200 pb-3 text-xs text-gray-500">{labels.credit}: {article.sourceName}</figcaption>
        </figure>
      </Container>
      <Container className="mt-9 sm:mt-12">
        <div className="mx-auto max-w-3xl">
          {/* Importer permits only text, emphasis, headings, lists and safe links. */}
          <div className="article-body" dangerouslySetInnerHTML={{ __html: publication.bodyHtml }} />
          <div lang={german ? "de-DE" : "en-US"} className="mt-10 border-y border-gray-200 py-5 text-sm leading-relaxed text-gray-600">
            <p><strong className="text-gray-900">{labels.publication}: </strong>{article.sourceName} · {article.author}</p>
            <ExternalLink href={article.sourceUrl} className="mt-2 inline-flex font-semibold text-blue-700 hover:underline">{labels.source}: {article.sourceName} ↗</ExternalLink>
            <p className="mt-3">{labels.corrections}: <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="text-blue-700 hover:underline">{SITE_CONTACT_EMAIL}</a></p>
          </div>
          {translations.length > 1 && (
            <nav lang={german ? "de-DE" : "en-US"} aria-label={labels.editions} className="mt-8">
              <h2 className="text-sm font-bold text-gray-900">{labels.editions}</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {translations.map((variant) => (
                  <li key={variant.id}><Link to={localePath(variant.language, `news/${variant.slug}`)} hrefLang={variant.contentLocale ?? LANGUAGES[variant.language].hreflang} aria-current={variant.id === article.id ? "page" : undefined} className={`inline-flex rounded border px-3 py-2 text-sm ${variant.id === article.id ? "border-blue-200 bg-blue-50 font-semibold text-blue-800" : "border-gray-200 hover:border-blue-300 hover:text-blue-700"}`}>{LANGUAGES[variant.language].nativeName}</Link></li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </Container>
      {related.length > 0 && <section lang={german ? "de-DE" : "en-US"} aria-labelledby="more-reporting-heading" className="mt-14 border-t border-gray-200 bg-gray-50 py-10"><Container><h2 id="more-reporting-heading" className="mb-6 text-2xl font-extrabold text-gray-950">{labels.related}</h2><ArticleGrid articles={related} columns={3} /></Container></section>}
    </article>
  )}</Translated>;
}
