# SEO audit and search-intent plan — 14 September 2026

## Findings that matter first

The public canonical domain is reachable. Direct HTTP checks confirmed that `/de`, `/robots.txt` and `/sitemap.xml` return 200. The German homepage is indexable and has a self-canonical pointing to `https://nooshaaubel.com/de`. Requests to the checked www and hyphenated domains ultimately reached the canonical domain. Public search checks did not surface the canonical domain in the retrieved results; this alone does not establish Google’s actual indexing status.

**Production is serving an older build.** The deployed sitemap contains 15 URLs. `/en/noosha-aubel` and the newly imported German political-bankruptcy article both return 404. These findings are recorded in `seo-live-evidence-2026-09-14.json`. Local edits cannot change Google’s view until they are deployed.

The precise reason Google is not showing an existing page must be checked in Search Console. The URL Inspection report distinguishes exclusion by noindex, discovery without crawling, crawling without indexing, and selection of a different canonical. Search results and an HTTP audit cannot expose those private account reports. Google explains that crawling and indexing are separate processes and that inclusion cannot be guaranteed. [Crawling and indexing FAQ](https://developers.google.com/search/help/crawling-index-faq)

## Changes implemented in this project

- The complete English biography is now indexable alongside German, with reciprocal English/German hreflang, a self-canonical and sitemap inclusion.
- Complete native newspaper articles are eligible for indexing in every supplied language. The archive’s incomplete interface translations no longer automatically block full source-language articles.
- The Russian publisher edition containing Ukrainian text remains accessible but excluded from indexing and indexable hreflang clusters. Its source text is preserved.
- Chinese article alternates use `zh-Hant`, matching the actual Traditional Chinese source text rather than the archive interface’s Simplified Chinese language setting.
- The sitemap now includes 50 eligible pages. Incomplete archive/profile translations, search results, unavailable translations, legal wrappers and reference PDFs remain excluded.
- The Atom feed uses the same article eligibility rule and exposes 46 canonical article destinations.
- The biography sitemap entries include recorded modification dates. Original article publication dates remain intact; no automatic “today” timestamp is used to manufacture freshness.
- A configured `GOOGLE_SITE_VERIFICATION` token is delivered in the initial HTML head on every page. The token must come from the actual Search Console property; the feature does not itself verify the site or submit URLs.
- SEO tests check every submitted page for HTTP 200, indexability, self-canonical, unique entity-relevant title, one H1, substantive description, and agreement between HTML and sitemap language alternates. They also verify the public verification token is server-rendered when configured.

Google recommends separate language URLs and reciprocal hreflang for genuine translations. Language declarations must describe the actual content. [Multilingual site guidance](https://developers.google.com/search/docs/advanced/crawling/managing-multi-regional-sites)

## Keyword research and page mapping

This is qualitative search-intent research based on public results and existing content. No Keyword Planner, Search Console performance export or paid keyword dataset was available, so search volume, keyword difficulty and ranking positions have not been invented. Primary search results include Potsdam’s official biography and election material. The site should offer a clearly independent, sourced archive rather than present itself as the official municipal website. [Official Potsdam biography](https://www.potsdam.de/de/oberbuergermeisterin-noosha-aubel)

| Priority | Search terms | Best destination | Content needed |
|---|---|---|---|
| First | Noosha Aubel; Noosha Aubel aktuell; Noosha Aubel Potsdam | `/de` | Useful news archive, clear role, biography link and dated articles |
| First | Noosha Aubel Biografie; Lebenslauf; Oberbürgermeisterin Potsdam | `/de/noosha-aubel` | Neutral career, office, dates and official citations |
| First | Noosha Aubel mayor of Potsdam; biography | `/en/noosha-aubel` | Complete English biography and source references |
| Next | Noosha Aubel Wahl 2025; Stichwahl; Wahlergebnis | Existing biography election section | Official result, election date and term; expand only with substantive new research |
| Next | Noosha Aubel Haushalt 2026; Potsdam Haushalt | Biography topics and relevant existing reporting | Budget documents, adopted decisions, dates and distinction between fact and opinion |
| Next | Noosha Aubel Wohnen; Stadtentwicklung Potsdam | Biography housing section and relevant reporting | Primary planning and housing sources; meaningful developments |
| Next | Noosha Aubel Kita; Inklusion Potsdam | Existing relevant article pages | Accurate source attribution, procedural dates and careful treatment of allegations |
| Next | Potsdam Griebnitzsee Bahnhof; Rudolf-Breitscheid-Straße Potsdam | Relevant existing video/report pages | Location-specific reporting, documented condition and update status |
| International | Native translations of the person’s name and Potsdam mayor role | Corresponding complete newspaper articles | Native main content, correct script, publisher/byline/date and reciprocal alternates |

Keep titles distinct by intent: homepage for current coverage, biography for identity and career, articles for their specific subjects. Existing source article titles and complete text remain unchanged. Do not create near-identical pages for every keyword variation. New topic pages should add original research, a real author/reviewer, primary sources and a genuine update history. Google evaluates whether content provides value beyond copying or rewriting existing sources. [Helpful content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

The keywords meta tag is not a Google ranking or indexing signal. Adding more terms there cannot fix a 404, an unpublished build or an indexing exclusion. [Supported meta tags](https://developers.google.com/search/docs/crawling-indexing/special-tags)

## Deployment and Search Console actions

1. Deploy this production build to the actual server. Set `SITE_URL=https://nooshaaubel.com`; build and run with Node 24. Keep HTTPS and permanent alternate-domain redirects in place.
2. Run `DEPLOYMENT_URL=https://nooshaaubel.com npm run smoke:production`. Confirm the sitemap has 50 URLs and that the English biography and new full articles return 200. Local test success is not production deployment evidence.
3. Verify the canonical domain in Search Console. DNS verification covers the Domain property. Alternatively, the HTTPS URL-prefix property can use the HTML token through `GOOGLE_SITE_VERIFICATION`; these are different verification methods.
4. Submit `https://nooshaaubel.com/sitemap.xml` in the Sitemaps report. Inspect `/de`, `/de/noosha-aubel`, `/en/noosha-aubel` and one newly imported German article. Run the live test, verify Google can fetch the page and review the Google-selected canonical. Request indexing once for these priority pages.
5. Check Page indexing, Manual actions and Security issues. If a page is “Crawled – currently not indexed,” inspect originality, usefulness and Google’s selected canonical rather than repeatedly submitting it. Exact republications can be grouped with another publisher’s copy; a self-canonical is a preference, not a guarantee that Google will choose it. [Canonicalization guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
6. Maintain the source publishers’ normal, relevant links to this archive where editorially appropriate and authorized. Publish accurate operator and editorial identity once verified. Do not buy links, fabricate credentials or create misleading dates.
7. Measure German impressions, clicks, indexed eligible pages and query/page pairs weekly. Establish the initial baseline after deployment. Use those real queries to refine titles and content; investigate persistent exclusions and crawl failures rather than promising a fixed ranking deadline.

Google says crawling may take days to weeks and that repeated requests do not speed up crawling. A sitemap helps discovery but does not guarantee indexing or ranking. [Requesting a recrawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)

## Verification

The complete release quality suite passed. It verified 50 sitemap pages, 284 internal destinations, all 35 full articles’ exact source text, crawl controls, structured data, metadata in all 18 supported language routes, the 46-entry feed, accessibility, security and performance. Initial JavaScript measured 517 KiB, within the existing 550 KiB budget. The English homepage and full biography regression check also passed. No deployment, Search Console verification or indexing submission has been performed in this task.

## VPS deployment with PM2 and nginx

The owner confirmed the updated code has not been deployed and that production runs behind nginx under PM2. No hosting migration is needed. Keep the existing nginx upstream and PM2 application identity; deploy the updated code and production build into the application directory.

On the VPS, use Node 24 for both building and the PM2 application interpreter. An upgraded interactive shell does not automatically change an existing PM2 process’s interpreter. Inspect the existing process configuration before restarting it.

```sh
node --version
npm ci
npm run build
```

Use the existing PM2 application name in the following command. If the project already manages these variables through an ecosystem configuration, update that configuration instead.

```sh
task_pm2_app='REPLACE_WITH_YOUR_EXISTING_PM2_APP_NAME'
SITE_URL=https://nooshaaubel.com NODE_ENV=production pm2 restart "$task_pm2_app" --update-env
```

If using the optional Search Console HTML token, set `GOOGLE_SITE_VERIFICATION` in the existing PM2 environment too. A blank value produces no verification tag. Keep that tag after verification.

After restarting the application, check PM2 logs and the public URLs, then run:

```sh
DEPLOYMENT_URL=https://nooshaaubel.com npm run smoke:production
```

The public sitemap should contain 50 `<loc>` entries, the English biography should return 200 with an index directive, and newly imported full articles should load. Only then submit the updated sitemap and request indexing of the priority pages in Search Console.
