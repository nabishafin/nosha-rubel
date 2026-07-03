import { redirect } from "react-router";
import { detectLanguage } from "~/lib/languages";
import type { Route } from "./+types/home";

/**
 * Root entry. Auto-detects the visitor's preferred language from the
 * Accept-Language header and redirects to the matching localized edition.
 */
export function loader({ request }: Route.LoaderArgs) {
  const lang = detectLanguage(request.headers.get("Accept-Language"));
  return redirect(`/${lang}`);
}
