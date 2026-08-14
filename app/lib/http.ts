const configuredSiteUrl = process.env.SITE_URL?.trim();

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

  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost ?? request.headers.get("host");
  if (host) {
    const proto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ?? "https";
    return `${proto}://${host}`;
  }
  return new URL(request.url).origin;
}
