# Release quality gates

Every change must pass `npm run check:quality` before deployment. CI repeats the same command from a locked install and separately blocks high/critical npm advisories in production and development dependencies.

## Blocking checks

- Type generation, TypeScript compilation, and production build
- Protected identity and forbidden legacy strings, including generated content JSON
- Locale routes, route-preserving language switching, canonical and hreflang behavior
- robots.txt, sitemap, indexation controls, HTTP status/redirect/cache behavior
- Structured data, SSR without scripts, semantic HTML, language declarations
- Media ownership/delivery, document policy, video disclosure, performance budgets
- Outbound-link security, accessible names, keyboard/focus behavior, responsive safeguards
- CSP/security header baseline and pinned patched React Router versions
- Sitemap-driven crawl of every indexable page and every unique internal anchor destination

Any failure blocks release. Do not weaken a check solely to make CI green; update the implementation or document and approve an intentional policy change.

## Ownership and evidence

| Area | Accountable role | Required evidence |
| --- | --- | --- |
| Routing, HTTP, CSP, dependencies | Engineering | CI log and production header sample |
| Canonical, hreflang, robots, sitemap | Technical SEO | Crawl export and representative URL inspection |
| Identity, claims, sources, corrections | Editorial/legal | Approved content record and review date |
| Locale quality | Localization | Native-review record per maintained locale |
| Accessibility | Product/accessibility | Automated log plus manual keyboard, zoom, screen-reader, and contrast review |
| Performance | Engineering | Budget log plus field/lab measurements after deployment |

CI proves repository behavior, not production DNS/CDN/TLS, Search Console state, image rights, legal accuracy, native translation quality, analytics consent, or assistive-technology conformance. Those approvals remain mandatory release evidence.

Publisher contact details and legal assertions currently remain evidence-dependent release blockers under `docs/trust-claim-policy.md`; a passing build must not be interpreted as their approval.
