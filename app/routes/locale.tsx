import { Outlet, redirect } from "react-router";
import { isLanguageCode } from "~/lib/languages";
import { getInterfaceLocale } from "~/lib/i18n";
import { DOCUMENTS } from "~/components/DocumentArchive";
import { I18nProvider } from "~/lib/i18n-context";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { RouteAccessibility } from "~/components/RouteAccessibility";
import type { Route } from "./+types/locale";

/**
 * Layout for every localized route. Validates the :lang segment (404 on an
 * unsupported language), renders the shared chrome and provides the i18n
 * context consumed throughout the tree.
 */
export function loader({ params }: Route.LoaderArgs) {
  const routeValue = params.lang ?? "";
  let legacyName = routeValue;
  try {
    legacyName = decodeURIComponent(routeValue);
  } catch {
    // Keep the original route value for the encoded comparison.
  }
  const legacyDocument = DOCUMENTS.find(
    (item) => item.filename === legacyName || encodeURIComponent(item.filename) === routeValue,
  );
  if (legacyDocument) {
    return redirect(`/en/documents/${legacyDocument.id}/file`, {
      status: 301,
      headers: { "Cache-Control": "public, max-age=86400" },
    });
  }
  const retiredWorkingFile = "META DESCRIPTION FOR WEBSITE.docx";
  if (legacyName === retiredWorkingFile || encodeURIComponent(retiredWorkingFile) === routeValue) {
    throw new Response("Gone", {
      status: 410,
      headers: { "Cache-Control": "public, max-age=86400", "X-Robots-Tag": "noindex, noarchive" },
    });
  }
  if (!isLanguageCode(params.lang)) {
    throw new Response("Not Found", { status: 404 });
  }
  return { lang: params.lang };
}

export default function LocaleLayout({ loaderData }: Route.ComponentProps) {
  const { lang } = loaderData;
  const interfaceLocale = getInterfaceLocale(lang);
  return (
    <I18nProvider lang={lang}>
      <div className="flex min-h-screen flex-col bg-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-blue-700 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Skip to main content
        </a>
        <RouteAccessibility />
        <div lang={interfaceLocale}><Header /></div>
        <main id="main-content" tabIndex={-1} lang={interfaceLocale} className="flex-1 focus:outline-none">
          <Outlet />
        </main>
        <div lang={interfaceLocale}><Footer /></div>
      </div>
    </I18nProvider>
  );
}
