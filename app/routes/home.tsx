import { redirect } from "react-router";
import { DEFAULT_LANGUAGE } from "~/lib/languages";
import type { Route } from "./+types/home";

/**
 * Root entry. A deterministic German default keeps crawlers and users on the
 * same entry point; explicit language links remain available on every page.
 */
export function loader(_: Route.LoaderArgs) {
  return redirect(`/${DEFAULT_LANGUAGE}`, 302);
}
