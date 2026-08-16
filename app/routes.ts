import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Entry: detect language from Accept-Language and redirect to /:lang.
  index("routes/home.tsx"),

  // SEO resource routes (served at the domain root).
  route("robots.txt", "routes/robots.tsx"),
  route("sitemap.xml", "routes/sitemap.tsx"),
  route("feed.xml", "routes/feed.tsx"),
  route("category/*", "routes/legacy-category.tsx"),

  // Localized area. The layout validates :lang, renders chrome and provides i18n.
  route(":lang", "routes/locale.tsx", [
    index("routes/landing.tsx"),
    route("news/:slug", "routes/article.tsx"),
    route("documents/:docId", "routes/document.tsx"),
    route("documents/:docId/file", "routes/document-file.tsx"),
    route("search", "routes/search.tsx"),
    route("translation-unavailable", "routes/translation-unavailable.tsx"),
    route("category/*", "routes/legacy-category-localized.tsx"),
    // Single-segment static pages (about/contact/privacy/terms). Least specific,
    // so it never shadows `search` or `news/:slug`.
    route(":page", "routes/static-page.tsx"),
  ]),
] satisfies RouteConfig;
