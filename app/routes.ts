import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Entry: detect language from Accept-Language and redirect to /:lang.
  index("routes/home.tsx"),

  // SEO resource routes (served at the domain root).
  route("robots.txt", "routes/robots.tsx"),
  route("sitemap.xml", "routes/sitemap.tsx"),

  // Localized area. The layout validates :lang, renders chrome and provides i18n.
  route(":lang", "routes/locale.tsx", [
    index("routes/landing.tsx"),
    route("news/:slug", "routes/article.tsx"),
    route("category/:category", "routes/category.tsx"),
    route("search", "routes/search.tsx"),
    // Single-segment static pages (about/contact/privacy/terms). Least specific,
    // so it never shadows `search`, `news/:slug` or `category/:category`.
    route(":page", "routes/static-page.tsx"),
  ]),
] satisfies RouteConfig;
