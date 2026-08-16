# Outbound link policy

This policy implements audit finding F53 without changing the visible interface.

- External editorial sources open in a new tab with `rel="noopener noreferrer"`. This prevents opener access and avoids disclosing the dossier URL to an unrelated publisher.
- External links use a visible source or service name. Generic labels such as "read more" are not permitted.
- A screen-reader-only notice announces when a link opens a new tab.
- Same-site links use React Router navigation unless the destination is a file intended for separate viewing.
- Same-site new-tab file links use `rel="noopener"`; `noreferrer` is reserved for external destinations where referrer suppression is intentional.
- `sponsored` and `ugc` must only be added when the relationship actually has that meaning. They are not generic security attributes.
- Source links remain ordinary crawlable anchors. A scheduled monitor records HTTP status, redirects and the observed source title in a retained JSON artifact.
- A `404` or `410` is treated as confirmed missing. Authentication, bot protection, rate limiting, timeouts and server errors require manual review and must not be mislabeled as removal.
- A source URL must not be replaced automatically. Editorial/legal review must verify provenance, equivalence, rights and whether a lawful archive link or corrected publisher URL is appropriate.
- Redirect destinations and changed titles are review signals, not automatic approval to rewrite a citation.

Every externally supplied URL must use HTTPS and every coverage record must provide a non-empty, descriptive `sourceName`.

Run locally with `SOURCE_MONITOR_OUTPUT=external-source-report.json npm run monitor:external-sources`. The weekly workflow retains each report for 90 days. Assign confirmed failures an owner and record the decision in the corresponding release or editorial evidence record.
