# Production migration runbook

The repository currently declares `https://noosha-aubel.com` as the intended canonical origin in `.env.example`. Ownership, legal approval, DNS access, Search Console access, and the final primary-host decision must be confirmed before using this value in production. If the approved origin differs, update `.env.example`, hosting configuration, this runbook, and all baseline evidence together.

## 1. Required owners and evidence

- Incident commander: authorizes launch, rollback, and closure.
- Engineering owner: application, CDN/proxy, DNS, TLS, logs, backups, rollback image.
- Technical SEO owner: URL inventory, redirect map, crawl baselines, canonicals/hreflang, sitemaps, Search Console/Bing.
- Editorial/legal owner: publisher identity, claims, corrections, sources, rights, privacy and consent.
- Localization/accessibility owners: native review and manual WCAG evidence.

Do not launch without named people, contact paths, a change window, and a previous deploy artifact that can be restored.

## 2. Pre-migration inventory

1. Copy `docs/migration-url-map-template.csv` into the controlled release evidence location.
2. Add every valuable URL from every owned `.com`, `.info`, `www`, protocol, case, encoded filename, category, document, and historical route family.
3. Record traffic, backlinks and indexed state before selecting `301`, retained `200`, `404`, or `410`.
4. Approve one-to-one targets only when semantically equivalent. Never redirect all missing URLs to a homepage.
5. Preserve redirects long term and reject chains, loops, query loss, and redirects to noindex/error pages.

The application already handles slash normalization and intentional category `410` responses. Protocol, hostname, mirror-domain and old static-file redirects belong at the CDN/reverse proxy.

## 3. Staging gate

```text
npm ci --legacy-peer-deps
npm audit --omit=dev --audit-level=high
npm audit --audit-level=high
npm run check:quality
```

Run the built application with the approved `SITE_URL`. `npm run check:migration-readiness` verifies canonical, robots, sitemap, container-install and health-check contracts against `.env.example`.

Additionally complete manual keyboard, screen-reader, 320px, 200%/400% zoom, native-locale, legal/editorial, image-rights and PDF checks. Staging must be protected from public indexation and excluded from production analytics.

## 4. Infrastructure configuration

- Provision valid TLS for the primary and every redirecting hostname.
- Route the primary HTTPS origin to the application.
- Permanently redirect every approved alternate protocol/host in one hop while preserving path and query.
- Pass trustworthy `X-Forwarded-Proto` and `X-Forwarded-Host` values; strip untrusted client versions at the edge.
- Set `SITE_URL` exactly to the approved HTTPS origin, without a path or trailing slash.
- Confirm cache rules do not override application `no-store`, `X-Robots-Tag`, PDF, sitemap, or error semantics.
- Enable access/error logs, alerting, rate controls, backups and a tested previous-image rollback.
- Add HSTS `includeSubDomains` or preload only after every subdomain is confirmed HTTPS-ready.

## 5. Launch sequence

1. Freeze routing, content IDs, locale mappings and redirect inputs.
2. Capture final legacy/new crawl, analytics, Search Console, backlink, status and Core Web Vitals baselines.
3. Deploy the immutable tested artifact without changing DNS yet.
4. Run health and representative direct-route checks against the deployment target.
5. Apply CDN/proxy redirects and primary-host routing in the controlled window.
6. Set `DEPLOYMENT_URL=https://approved-origin` and run `npm run smoke:production`.
7. Set `REDIRECT_ORIGINS` to a comma-separated list of every controlled alternate origin and repeat the smoke command.
8. Crawl the production sitemap with JavaScript on and off; compare raw/rendered canonical, hreflang, robots and schema.
9. Submit the canonical sitemap to verified Google Search Console and Bing properties; request recrawl only for strategic pages.
10. Record release ID, timestamps, owners, evidence links and every exception.

## 6. Rollback triggers

The incident commander should roll back or disable the affected change when any of these cannot be corrected safely inside the approved window:

- primary pages return 5xx, soft 404, blank/incorrect SSR, or widespread hydration failure;
- primary/alternate hosts expose duplicate indexable 200 responses;
- redirect loops, chains, query loss, mass homepage redirects, or valuable unmapped legacy URLs appear;
- canonical, hreflang, robots or sitemap points to the wrong host, redirects, errors or noindex pages;
- severe accessibility blocker, security-header breakage, consent failure or protected identity/legal regression;
- material traffic/crawl anomaly crosses the pre-approved threshold.

Rollback restores the previous application artifact and edge configuration. Do not remove already-correct permanent redirects merely to mask an application failure. Preserve logs and timestamps for diagnosis, then rerun every smoke test before resuming.

## 7. Monitoring and closure

- Daily for 14 days: 5xx/4xx spikes, redirect misses, host leakage, sitemap fetches, selected canonicals, traffic and client errors.
- Weekly for 90 days: indexed legacy/mirror URLs, hreflang, structured data, broken sources, Core Web Vitals, locale quality and conversions.
- Monthly: corrections, source availability, document versions, rights, performance and accessibility regression evidence.
- Quarterly: full crawl/log/security/dependency/native-locale/assistive-technology review.

Close migration only after 90 days of stable evidence, documented exceptions and named ongoing owners.
