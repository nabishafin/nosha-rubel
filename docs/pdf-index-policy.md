# PDF index and retention policy

The current PDF collection consists of third-party Wikipedia print snapshots. These binaries are reference captures, not original publications or official biographies.

- Users enter through localized HTML document records that explain purpose, source, limitations and accessibility state.
- Controlled `/LANG/documents/ID/file` responses send `X-Robots-Tag: noindex, noarchive`.
- PDF binaries are excluded from XML sitemaps and structured data.
- Existing root-level filenames are legacy static paths. Production hosting must redirect each legacy path to its HTML record or attach the same `X-Robots-Tag` header at the CDN/static host.
- Do not claim PDF/UA conformance until PAC and manual assistive-technology testing pass.
- Do not label a snapshot as official, translated or licensed without recorded evidence.
- A future asset registry should record capture date, source revision URL, license, translator, checksum, accessibility review and retention owner.
