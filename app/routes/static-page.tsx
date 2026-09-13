import { Translated } from "~/components/Translated";
import { isRouteErrorResponse, Link, useParams } from "react-router";
import { isLanguageCode, DEFAULT_LANGUAGE } from "~/lib/languages";
import { getTranslation, type Translation } from "~/lib/i18n";
import { getOrigin } from "~/lib/http";
import { buildMeta, SOCIAL_PREVIEW_IMAGE } from "~/lib/seo";
import { localePath } from "~/lib/i18n-context";
import { SITE_CONTACT_EMAIL, SITE_NAME } from "~/lib/site-identity";
import { isStaticPage, type StaticPage } from "~/lib/static-pages";
import { Container } from "~/components/Container";
import { EditorialStatementContent } from "~/components/EditorialStatementContent";
import type { Route } from "./+types/static-page";

function pageContent(page: StaticPage, t: Translation): { title: string; paragraphs: string[] } {
  switch (page) {
    case "editorial-statement":
      return {
        title: "Editorial Statement & Legal Disclaimer",
        paragraphs: [
          "Statement on Editorial Objectives, Journalism in the Public Interest, Freedom of Expression, Compliance with Legal Requirements, Data Protection, Corrections, Counter-Opinions and Infrastructure Continuity.",
        ],
      };
    case "about":
      return { title: t.footer.about, paragraphs: [t.footer.aboutText, t.footer.description] };
    case "contact":
      return {
        title: t.footer.contact,
        paragraphs: [
          SITE_NAME,
          `Corrections and source updates: ${SITE_CONTACT_EMAIL}`,
          "Publisher-supplied address and telephone details are withheld from the public contact page until documentary verification and legal review are complete.",
        ],
      };
    case "privacy":
      return {
        title: t.footer.privacy,
        paragraphs: [
          "This website is intended to minimize personal-data collection and use personal information only for clearly stated purposes.",
          t.footer.description,
        ],
      };
    case "terms":
      return {
        title: t.footer.terms,
        paragraphs: [
          `${SITE_NAME} editorial terms and source-archive guidelines.`,
          t.footer.description,
        ],
      };
  }
}

export function loader({ params, request }: Route.LoaderArgs) {
  if (!isLanguageCode(params.lang) || !isStaticPage(params.page)) {
    throw new Response("Not Found", { status: 404 });
  }
  return { lang: params.lang, page: params.page, origin: getOrigin(request) };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [];
  const { lang, page, origin } = loaderData;
  const t = getTranslation(lang);
  const { title, paragraphs } = pageContent(page, t);
  // Legal/contact wrappers stay crawlable for users and trust review, but are
  // not search landing pages while publisher identity remains unverified.
  const canonical = `${origin}${localePath(lang, page)}`;
  return buildMeta({
    title: `${title} — ${SITE_NAME}`,
    description: paragraphs[0],
    canonical,
    image: SOCIAL_PREVIEW_IMAGE,
    lang,
    robots: "noindex, follow",
    alternates: undefined,
  });
}

export default function StaticPageRoute({ loaderData }: Route.ComponentProps) {
  const { lang, page } = loaderData;
  const t = getTranslation(lang);
  const { title, paragraphs } = pageContent(page, t);

  if (page === "editorial-statement") {
    return <Translated>{(
      <Container className="py-14">
        <div className="mx-auto max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
            <Link to={localePath(lang)} className="hover:text-gray-800">
              {t.nav.home}
            </Link>{" "}
            / <span className="text-gray-700">{title}</span>
          </nav>
          <EditorialStatementContent />
        </div>
      </Container>
    )}</Translated>;
  }

  return <Translated>{(
    <Container className="py-14">
      <div className="mx-auto max-w-3xl">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
          <Link to={localePath(lang)} className="hover:text-gray-800">
            {t.nav.home}
          </Link>{" "}
          / <span className="text-gray-700">{title}</span>
        </nav>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-gray-700">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </Container>
  )}</Translated>;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const params = useParams();
  const lang = isLanguageCode(params.lang) ? params.lang : DEFAULT_LANGUAGE;
  const t = getTranslation(lang);
  const is404 = isRouteErrorResponse(error) && error.status === 404;
  return <Translated>{(
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
  )}</Translated>;
}
