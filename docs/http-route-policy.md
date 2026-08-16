# HTTP route policy

- `/` uses a temporary language-negotiation redirect because the destination varies by the request's `Accept-Language` header.
- Canonical application paths omit a trailing slash. Non-root slash variants redirect once with HTTP 301 while preserving the query string.
- Existing localized pages and resources return 200.
- Missing routes and records return 404, not a soft 200, with `X-Robots-Tag: noindex, nofollow` and `Cache-Control: private, no-store`.
- Retired category URLs return 410 with `noindex, nofollow`.
- Internal search and translation-unavailable states return 200 with `noindex, follow` and no-store caching.
- Successful HTML may be cached by a shared cache for five minutes and served stale during revalidation; browsers must revalidate.
- Robots and sitemap resources have their own explicit content types and cache policies.
- PDF download responses are `application/pdf` and carry `noindex, noarchive`.
- Protocol, hostname, TLS and legacy-domain redirects remain deployment/CDN responsibilities.
