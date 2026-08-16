# SSR and JavaScript SEO contract

The application runs in React Router Framework Mode with `ssr: true`. Every indexable route must deliver its primary content and SEO signals in the initial HTTP response.

Required in raw HTML before hydration:

- correct document language and direction;
- one route-specific title, description and canonical URL;
- robots directive;
- reciprocal hreflang where genuine translations exist;
- visible H1, primary copy, internal navigation and source links;
- truthful JSON-LD matching visible content;
- intrinsic image dimensions and loading semantics.

Search and unavailable-translation routes remain usable in raw HTML but carry `noindex, follow`. Client hydration may add interaction, but must not replace server content with a different locale, title, canonical, story or indexing state.

`npm run check:ssr` starts the production server, removes scripts from returned pages and verifies these invariants across homepage, article, document and search templates.
