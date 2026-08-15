import type { LanguageCode } from "./types";

interface LocaleSwitchArgs {
  pathname: string;
  search: string;
  hash: string;
  sourceLang: LanguageCode;
  targetLang: LanguageCode;
  resolveArticleSlug: (
    sourceLang: LanguageCode,
    sourceSlug: string,
    targetLang: LanguageCode,
  ) => string | undefined;
}

function withLocationState(path: string, search: string, hash: string): string {
  return `${path}${search}${hash}`;
}

/**
 * Build a language-switch destination without losing the current page identity.
 * Article routes use translation groups; every other localized route preserves
 * its path, query and fragment verbatim.
 */
export function getLocaleSwitchTarget({
  pathname,
  search,
  hash,
  sourceLang,
  targetLang,
  resolveArticleSlug,
}: LocaleSwitchArgs): string {
  if (sourceLang === targetLang) return withLocationState(pathname, search, hash);

  const segments = pathname.split("/").filter(Boolean);
  const routeSegments = segments[0] === sourceLang ? segments.slice(1) : [];

  if (routeSegments[0] === "news" && routeSegments[1]) {
    const translatedSlug = resolveArticleSlug(sourceLang, routeSegments[1], targetLang);
    if (translatedSlug) {
      return withLocationState(`/${targetLang}/news/${translatedSlug}`, search, hash);
    }

    const source = withLocationState(pathname, search, hash);
    return `/${targetLang}/translation-unavailable?from=${encodeURIComponent(source)}`;
  }

  const suffix = routeSegments.join("/");
  const trailingSlash = suffix && pathname.endsWith("/") ? "/" : "";
  const targetPath = suffix ? `/${targetLang}/${suffix}${trailingSlash}` : `/${targetLang}`;
  return withLocationState(targetPath, search, hash);
}
