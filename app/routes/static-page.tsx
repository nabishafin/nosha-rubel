import { isRouteErrorResponse, Link, useParams } from "react-router";
import { isLanguageCode, DEFAULT_LANGUAGE } from "~/lib/languages";
import { getTranslation, type Translation } from "~/lib/i18n";
import { getOrigin } from "~/lib/http";
import { buildMeta } from "~/lib/seo";
import { localePath } from "~/lib/i18n-context";
import { Container } from "~/components/Container";
import { EditorialStatementContent } from "~/components/EditorialStatementContent";
import type { Route } from "./+types/static-page";

const PAGES = ["about", "contact", "privacy", "terms", "editorial-statement"] as const;
type StaticPage = (typeof PAGES)[number];

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
          "Dhaka News Times / HRD Media",
          "Address: 28/A Toyenbee Circular Road, Dhaka-1000 & 9/A, HRC Bhaban, 45 Kawran Bazar, Dhaka-1217",
          "Telephone: +880 1812-345678 · Email: DhakaNewsTimes@Proton.me",
        ],
      };
    case "privacy":
      return {
        title: t.footer.privacy,
        paragraphs: [
          "The publisher complies with applicable data protection legislation including Bangladesh Personal Data Protection Act 2026 and Icelandic Data Protection Act No. 90/2018 (GDPR).",
          t.footer.description,
        ],
      };
    case "terms":
      return {
        title: t.footer.terms,
        paragraphs: [
          "Dhaka News Times Editorial Terms & Press Guidelines.",
          t.footer.description,
        ],
      };
  }
}

function isStaticPage(value: unknown): value is StaticPage {
  return typeof value === "string" && (PAGES as readonly string[]).includes(value);
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
  return buildMeta({
    title: `${title} — Dhaka News Times`,
    description: paragraphs[0],
    canonical: `${origin}${localePath(lang, page)}`,
    image: `${origin}/favicon.ico`,
    lang,
  });
}

export default function StaticPageRoute({ loaderData }: Route.ComponentProps) {
  const { lang, page } = loaderData;
  const t = getTranslation(lang);
  const { title, paragraphs } = pageContent(page, t);

  if (page === "editorial-statement") {
    return (
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
    );
  }

  return (
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
