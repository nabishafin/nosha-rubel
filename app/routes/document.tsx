import { Link } from "react-router";
import { Container } from "~/components/Container";
import { DOCUMENTS } from "~/components/DocumentArchive";
import { getOrigin } from "~/lib/http";
import { localePath } from "~/lib/i18n-context";
import { getTranslation } from "~/lib/i18n";
import { isLanguageCode } from "~/lib/languages";
import { buildMeta, SOCIAL_PREVIEW_IMAGE, staticPageJsonLd, withSiteName } from "~/lib/seo";
import type { Route } from "./+types/document";

export function loader({ params, request }: Route.LoaderArgs) {
  if (!isLanguageCode(params.lang)) throw new Response("Not Found", { status: 404 });
  const document = DOCUMENTS.find((item) => item.id === params.docId);
  if (!document) throw new Response("Document Not Found", { status: 404 });
  const origin = getOrigin(request);
  const canonical = `${origin}${localePath("en", `documents/${document.id}`)}`;
  return { lang: params.lang, document, origin, canonical };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [];
  const { document, lang, origin, canonical } = loaderData;
  const title = `${document.englishName} Wikipedia snapshot`;
  const description = `Context and access information for an archived ${document.englishName} Wikipedia PDF snapshot concerning Noosha Aubel.`;
  return [
    ...buildMeta({
      title: withSiteName(title),
      description,
      canonical,
      image: SOCIAL_PREVIEW_IMAGE,
      lang,
      robots: lang === "en" ? undefined : "noindex, follow",
    }),
    { "script:ld+json": staticPageJsonLd({ origin, canonical, lang, title, description }) },
  ];
}

export default function DocumentPage({ loaderData }: Route.ComponentProps) {
  const { lang, document } = loaderData;
  const t = getTranslation(lang);
  return (
    <Container className="py-14">
      <div className="mx-auto max-w-3xl">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
          <Link to={localePath(lang)} className="hover:text-gray-800">{t.nav.home}</Link>
          <span aria-hidden="true"> / </span>
          <span>Documents</span>
          <span aria-hidden="true"> / </span>
          <span>{document.englishName}</span>
        </nav>

        <div lang="en">
          <p className="mt-8 text-sm font-bold uppercase tracking-wider text-blue-700">Archived source snapshot</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {document.englishName} Wikipedia snapshot
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-gray-700">{document.summary}</p>

          <dl className="mt-8 grid gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:grid-cols-2">
            <div><dt className="text-xs font-bold uppercase text-gray-500">Document language</dt><dd className="mt-1 font-semibold text-gray-900">{document.language}</dd></div>
            <div><dt className="text-xs font-bold uppercase text-gray-500">Format</dt><dd className="mt-1 font-semibold text-gray-900">PDF snapshot</dd></div>
            <div><dt className="text-xs font-bold uppercase text-gray-500">Source</dt><dd className="mt-1 font-semibold text-gray-900">Wikipedia page print capture</dd></div>
            <div><dt className="text-xs font-bold uppercase text-gray-500">Index policy</dt><dd className="mt-1 font-semibold text-gray-900">HTML record indexable; PDF binary noindex</dd></div>
            <div><dt className="text-xs font-bold uppercase text-gray-500">Capture date</dt><dd className="mt-1 font-semibold text-gray-900">Not recorded in repository</dd></div>
            <div><dt className="text-xs font-bold uppercase text-gray-500">Accessibility</dt><dd className="mt-1 font-semibold text-gray-900">Not verified as PDF/UA</dd></div>
          </dl>

          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950">
            This file is preserved as a reference snapshot. It is not an official biography, an original publication of this site, or a substitute for the current source page. Translation, licensing, capture date and accessibility status require independent verification.
          </div>

          <a
            href={localePath(lang, `documents/${document.id}/file`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            Open archived PDF
          </a>
        </div>
      </div>
    </Container>
  );
}
