# PDF index and retention policy

Document binaries are stored under non-public `storage/documents` and are served only by the controlled `/:lang/documents/:docId/file` resource route. Repository working files belong under `storage/internal` and are never copied into the runtime image.

Legacy root PDF filenames redirect once to the corresponding controlled English file endpoint. The retired metadata working document returns `410 Gone`. CI fails if a PDF, DOC, DOCX or ODT appears directly under `public/`.

The current PDF collection consists of third-party Wikipedia print snapshots. These binaries are reference captures, not original publications or official biographies.

- Users enter through localized HTML document records that explain purpose, source, limitations and accessibility state.
- Controlled `/LANG/documents/ID/file` responses send `X-Robots-Tag: noindex, noarchive`.
- PDF binaries are excluded from XML sitemaps and structured data.
- Existing root-level PDF filenames are legacy paths. The application redirects each one in a single hop to its controlled English file endpoint; production smoke tests must confirm the CDN preserves that behavior.
- Do not claim PDF/UA conformance until PAC and manual assistive-technology testing pass.
- Do not label a snapshot as official, translated or licensed without recorded evidence.
- A future asset registry should record capture date, source revision URL, license, translator, checksum, accessibility review and retention owner.
