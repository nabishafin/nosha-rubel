const configuredSiteUrl = process.env.SITE_URL?.trim();
export const DEFAULT_PRODUCTION_ORIGIN = "https://nooshaaubel.com";
const CANONICAL_HOSTNAMES = new Set([
  "nooshaaubel.com",
  "www.nooshaaubel.com",
  "noosha-aubel.com",
  "www.noosha-aubel.com",
]);

function normalizeOrigin(value: string): string | undefined {
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}

/**
 * Resolve the public origin used by canonicals, hreflang and XML resources.
 *
 * Production should always set SITE_URL to the one indexable hostname. This
 * avoids duplicate-domain canonicals and prevents proxy Host headers from
 * leaking into SEO URLs. The request-based fallback keeps local development
 * and preview deployments working without extra configuration.
 */
export function getOrigin(request: Request): string {
  const publicOrigin = configuredSiteUrl && normalizeOrigin(configuredSiteUrl);
  if (publicOrigin) return publicOrigin;

  // Never let a proxy Host header silently choose the indexable production
  // origin. SITE_URL remains the explicit override for an approved migration.
  if (process.env.NODE_ENV === "production") return DEFAULT_PRODUCTION_ORIGIN;

  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost ?? request.headers.get("host");
  if (host) {
    const proto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ?? "https";
    return `${proto}://${host}`;
  }
  return new URL(request.url).origin;
}

/**
 * Return a one-hop permanent redirect when a request arrives on a known
 * duplicate production hostname. Preview and localhost hosts are intentionally
 * ignored so staging remains testable.
 */
export function getCanonicalHostRedirect(request: Request): string | undefined {
  const requestUrl = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",", 1)[0]?.trim();
  const requestHostname = (forwardedHost ? forwardedHost.split(":", 1)[0] : requestUrl.hostname).toLowerCase();
  if (!CANONICAL_HOSTNAMES.has(requestHostname)) return undefined;

  const canonical =
    (configuredSiteUrl && normalizeOrigin(configuredSiteUrl)) ?? DEFAULT_PRODUCTION_ORIGIN;
  const canonicalUrl = new URL(canonical);
  if (requestHostname === canonicalUrl.hostname.toLowerCase()) return undefined;

  return `${canonicalUrl.origin}${requestUrl.pathname}${requestUrl.search}`;
}
