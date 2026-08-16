# QA, monitoring and KPI framework

This framework separates repository-proven checks from production evidence. A passing build does not prove DNS, CDN, Search Console, analytics, crawler-log, legal, rights, native-language, assistive-technology or field-performance outcomes.

## Release evidence

Every release must copy and complete `docs/release-evidence-template.md`. Store the completed record with the release artifacts, crawl exports, screenshots and approvals. Never mark an unavailable external signal as passing.

Run repository gates with `npm run check:quality`. After deployment, run `DEPLOYMENT_URL=https://approved-origin.example npm run smoke:production`, followed by `DEPLOYMENT_URL=https://approved-origin.example MONITOR_OUTPUT=production-monitor.json npm run monitor:production`.

The production monitor reads every sitemap URL and records status, response time, canonical-host integrity, hreflang-host integrity, indexability and forbidden identity strings. A critical failure exits non-zero. It intentionally does not install analytics or tracking in the website.

## KPI definitions

| KPI | Definition | Target and evidence owner |
| --- | --- | --- |
| Canonical host purity | Indexable internal and organic landing URLs on the approved origin | 100%; Engineering plus Search Console owner |
| Legacy index cleanup | Indexed mirrors, legacy categories, query and retired paths | Zero unintended URLs after recrawl; SEO owner |
| Hreflang validity | Published variants in valid reciprocal clusters | 100% of included variants; Localization and SEO |
| Metadata integrity | Indexable pages with unique correct-language metadata and no forbidden strings | 100%; Engineering and Localization |
| Translation quality | Supported-locale core pages with native review | 100%; Localization owner |
| First-party depth | Strategic sources with substantial internal records | Editorially prioritized; Editorial owner |
| Document governance | Retained documents with landing page, metadata, rights and index decision | 100%; Editorial and Legal |
| Core Web Vitals | Good LCP, INP and CLS at the 75th percentile by page group/device | Good field thresholds; Performance owner |
| Accessibility | Critical templates passing agreed WCAG 2.2 AA evidence | Zero critical blockers; Accessibility owner |
| Crawl efficiency | Verified crawler requests reaching canonical 200 content | Rising canonical share and declining waste; Platform owner |
| Organic quality | Impressions, clicks, qualified engagement and conversions by locale | Improve qualified outcomes; SEO and Product |
| Editorial accountability | Original/sensitive pages with source, correction and review state | 100%; Editorial owner |

## Monitoring cadence

| Cadence | Required review |
| --- | --- |
| Daily for 14 days | 5xx/4xx spikes, redirect misses, host leakage, sitemap fetches, selected canonicals, traffic anomalies and client errors |
| Weekly for 90 days | Indexed mirrors/legacy URLs, hreflang, Core Web Vitals, structured data, broken links, translation defects and top landing pages |
| Monthly ongoing | Content freshness, corrections, source availability, locale support, document versions, budgets and accessibility regressions |
| Quarterly | Full crawl, verified-bot log analysis, domain inventory, dependency/security review, native-locale sample, assistive-technology review and strategy update |

## Alert and closure rules

- Roll back or halt rollout on sustained 5xx errors, widespread wrong canonicals/noindex, redirect loops, host leakage, sitemap corruption or loss of critical functionality.
- Assign every alert an owner, timestamp, affected URL group, severity, evidence link and resolution or accepted-risk decision.
- Compare against an approved baseline. Do not claim causal SEO improvement before an adequate recrawl and observation window.
- Close a finding only with before/after evidence against every acceptance clause and a recorded residual-risk review date.

