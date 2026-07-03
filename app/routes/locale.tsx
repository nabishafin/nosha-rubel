import { Outlet } from "react-router";
import { isLanguageCode } from "~/lib/languages";
import { I18nProvider } from "~/lib/i18n-context";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import type { Route } from "./+types/locale";

/**
 * Layout for every localized route. Validates the :lang segment (404 on an
 * unsupported language), renders the shared chrome and provides the i18n
 * context consumed throughout the tree.
 */
export function loader({ params }: Route.LoaderArgs) {
  if (!isLanguageCode(params.lang)) {
    throw new Response("Not Found", { status: 404 });
  }
  return { lang: params.lang };
}

export default function LocaleLayout({ loaderData }: Route.ComponentProps) {
  const { lang } = loaderData;
  return (
    <I18nProvider lang={lang}>
      <div className="flex min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
