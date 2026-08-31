# SEO review — 2026-08-31

## Objective

Improve discovery for searches about Noosha Aubel, especially German-language searches in Germany, without manufacturing thin pages, unsupported claims or artificial search signals.

## Live findings

- `https://nooshaaubel.com` and `https://noosha-aubel.com` both served the same indexable HTML with HTTP 200.
- Canonicals, hreflang links, robots.txt and sitemap URLs pointed to the hyphenated domain, while the site owner supplied the non-hyphenated domain as the current website.
- Search results already surfaced the hyphenated host. A controlled host migration is therefore required; changing metadata alone is insufficient.
- The German homepage had appropriate title, description, canonical and hreflang signals, but important interface and dossier labels remained in English.
- The archive focused heavily on critical republished topics and lacked one neutral, comprehensive German entity page answering basic searches about biography, election, office and policy themes.
- The default social card hotlinked a third-party publisher image even though a governed first-party 1200 × 630 asset already existed.

## Repository changes

- Canonical origin changed to `https://nooshaaubel.com`.
- Known duplicate hosts now receive one-hop permanent application redirects with path and query preservation.
- Root entry is deterministic at `/de`; it no longer changes by `Accept-Language`.
- Added `/de/noosha-aubel`, a German entity hub with neutral biography, election facts, current topic clusters, official citations, AboutPage/Person schema and related dossiers.
- Added crawlable links to the entity hub from the German homepage, header and footer, plus sitemap inclusion.
- Localized prominent German homepage and dossier labels.
- Replaced the third-party default social preview with the governed first-party social image.
- Removed remote download-and-`eval` behavior from the React Router build configuration.

## Second-pass quality improvements

- Separated search intent between the German homepage (`Noosha Aubel: Aktuelles, Biografie und Potsdam-Themen`) and the biographical entity page (`Noosha Aubel: Biografie der Potsdamer Oberbürgermeisterin`) to avoid two pages competing with nearly identical titles.
- Replaced the German hero's critical-article spotlight with a neutral, crawlable link to the entity page and added an above-the-fold factual overview of office, inauguration date and 2025 runoff result.
- Expanded the entity page with a sourced career timeline, visible review date, official election report, inauguration record, current municipal sources and concise frequently asked questions.
- Added original German overview, key-point, context and verification sections for every one of the seven German article dossiers. No German dossier now falls back to English editorial analysis.
- Localized the remaining visible German hero, video, document-archive, footer and accessibility labels.
- Reduced the XML sitemap to 15 high-value, indexable URLs: German and English homepages, the German entity hub, and the fully localized German/English dossiers.
- Kept incomplete fallback locales, legal/contact wrappers and retained PDF context pages accessible to users but marked them `noindex, follow`; PDF binaries remain `noindex, noarchive`.
- Added a sitemap-driven SEO gate that verifies a 200 response, self-canonical, index directive, unique title, one H1 and substantive description on every submitted URL. It also verifies all German dossiers remain German and that excluded templates remain noindex.

## Required deployment actions

1. Set `SITE_URL=https://nooshaaubel.com` in production.
2. Configure edge-level HTTP 301 redirects from every `http`, `www` and `noosha-aubel.com` variant to the matching `https://nooshaaubel.com` path and query in one hop.
3. Verify both domains in Google Search Console. Submit `https://nooshaaubel.com/sitemap.xml`, inspect `/de` and `/de/noosha-aubel`, and use the site-move workflow where applicable.
4. Keep the old-domain redirects active long term. Do not block the old domain in robots.txt while Google is processing the redirects.
5. Record the deployment date and monitor Google-selected canonicals, indexed old URLs, crawl errors and German impressions weekly for at least 90 days.
6. Request indexing first for `/de` and `/de/noosha-aubel`; do not bulk-request the fallback locale or PDF pages.
7. Rotate the API credential that previously appeared in the tracked `.env` file and, if the repository was shared, purge it from Git history using the repository owner's approved secret-removal process.

## German editorial roadmap

Prioritize substantive, individually researched updates rather than pages for keyword variations:

- Noosha Aubel: biography, career and term of office;
- Potsdam mayoral election 2025 and stated mandate;
- Potsdam budget 2026 and consolidation decisions;
- housing and urban development;
- schools, childcare, inclusion and administrative delivery;
- roads, transport and municipal infrastructure;
- City Hall organization, council decisions and measurable implementation status.

Each update should cite primary documents where available, name its author or reviewer, show a genuine publication/update date, distinguish fact from opinion, and add material analysis beyond a source summary. Search visibility cannot be guaranteed; the goal is to make the canonical German pages technically unambiguous and genuinely useful.
