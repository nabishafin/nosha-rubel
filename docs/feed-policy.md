# Feed policy

The product publishes one canonical global Atom feed at `/feed.xml`. A single feed avoids stale legacy endpoints and represents the multilingual archive without pretending that every locale has a separately maintained editorial feed.

- The feed contains up to 50 newest published coverage records across supported languages.
- Every entry ID and alternate link is an absolute canonical internal HTML URL.
- `xml:lang` identifies each entry language; language flags are not used.
- The related link records the external source, while the primary entry link remains the first-party context page.
- Dates come from the content record and entries contain escaped plain-text summaries.
- Feed autodiscovery is present in server-rendered HTML.
- The endpoint is cacheable and uses `application/atom+xml; charset=utf-8` plus `nosniff`.

Do not add locale-specific or legacy RSS endpoints unless there is a named editorial owner, distinct maintained scope and validation plan. Any retired feed discovered during migration belongs in the approved one-hop redirect or explicit-gone map.

