# Coverage content policy

The primary editorial unit is an internal coverage dossier at `/:lang/news/:slug`. A dossier is not a copied article and must not imply that this site is the original publisher of the cited report.

## Authorized complete newspaper articles

The owner explicitly confirmed ownership of the 35 newspapers/articles listed in `scripts/article-import-manifest.tsv` and authorized exact full-text and image republication in the September 2026 import request. These records carry `publicationMode: "full"` and render as complete newspaper articles at the same internal route pattern. They retain source headlines, introductions, body text, emphasis, original bylines, publication dates and publisher credits. They do not display the legacy dossier-summary notice or generated editorial analysis.

`app/data/articles.fulltext.json` contains sanitized publication markup; it is imported only by the server module and returned only for the requested article. `app/data/article-import-evidence.json` records source URLs, text hashes, source HTML hashes, original images and the authorization basis. Local image checksums and authorization are registered in the media-governance file. Existing coverage dossiers keep their original content model. Complete native full articles are indexable in every supplied language, with script-aware hreflang. A publisher edition whose declared language differs from its actual source text remains noindex. Incomplete archive and profile translations remain noindex.

The source supplied as Russian for the leadership-crisis group actually contains Ukrainian text; it is preserved and explicitly marked `uk-UA`. Chinese source articles use `zh-Hant`. These source differences are recorded rather than silently translated or rewritten.

Every indexable coverage page must provide:

- the source-language headline and summary;
- a clearly identified external publisher and crawlable source link;
- an original overview that explains the source's main argument without reproducing its full text;
- key points, public-interest context and a verification-status note;
- publication date, correction channel and related internal coverage;
- first-party dossier context in the same language as the indexable article.

Translated publications may share factual dossier context when they belong to one verified translation group. Repetition across languages or outlets is not independent corroboration and must not be described as such.

Full third-party text may be hosted only when the rights owner has provided documentary permission covering reproduction, translation and online distribution. Otherwise the site publishes an original summary and keeps the source link.

The 26 Wikipedia PDF snapshots remain available as secondary documentation. They are not primary editorial offerings. Their HTML wrappers and binary files are omitted from the XML sitemap; wrappers use `noindex, follow`, while binaries use `X-Robots-Tag: noindex, noarchive`. No PDF file is removed by this policy.
