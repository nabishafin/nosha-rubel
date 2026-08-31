import { LANGUAGE_LIST, isSearchIndexLanguage } from "~/lib/languages";
import { getAllArticleRefs, type ArticleRef } from "~/lib/news";
import { getOrigin } from "~/lib/http";
import { hasLocalizedCoverageDossier } from "~/lib/coverage-dossiers";
import type { Route } from "./+types/sitemap";

interface UrlEntry {
  loc: string;
  lastmod?: string;
  /** hreflang alternates for this URL. */
  alternates?: Array<{ hreflang: string; href: string }>;
}

function xmlEscape(value: string): string {
  return value.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]!));
}

export function loader({ request }: Route.LoaderArgs) {
  const origin = getOrigin(request);
  const urls: UrlEntry[] = [];
  const refs = getAllArticleRefs().filter(hasLocalizedCoverageDossier);
  const indexLanguages = LANGUAGE_LIST.filter((language) => isSearchIndexLanguage(language.code));
  const latestByLanguage = new Map<string, string>();
  for (const ref of refs) {
    const current = latestByLanguage.get(ref.language);
    if (!current || new Date(ref.publishedAt) > new Date(current)) {
      latestByLanguage.set(ref.language, ref.publishedAt);
    }
  }

  // Home page per language, cross-linked with hreflang alternates.
  const localizedAlternates = (path = "") => [
    ...indexLanguages.map((l) => ({ hreflang: l.hreflang, href: `${origin}/${l.code}${path}` })),
    { hreflang: "x-default", href: `${origin}/de${path}` },
  ];
  const homeAlternates = localizedAlternates();
  for (const l of indexLanguages) {
    urls.push({
      loc: `${origin}/${l.code}`,
      lastmod: latestByLanguage.get(l.code),
      alternates: homeAlternates,
    });
  }

  // German entity hub: the primary answer page for biographical and office-related searches.
  urls.push({ loc: `${origin}/de/noosha-aubel` });

  // Article pages, with hreflang alternates linking translated versions.
  const byGroup = new Map<string, ArticleRef[]>();
  for (const ref of refs) {
    if (!ref.translationGroup) continue;
    const list = byGroup.get(ref.translationGroup) ?? [];
    list.push(ref);
    byGroup.set(ref.translationGroup, list);
  }
  for (const ref of refs) {
    const group = ref.translationGroup ? byGroup.get(ref.translationGroup) : undefined;
    const hasUniqueLanguages = group && new Set(group.map((g) => g.language)).size === group.length;
    const defaultRef = group?.find((g) => g.language === "de") ?? group?.find((g) => g.language === "en");
    const alternates = hasUniqueLanguages
      ? [
          ...group.map((g) => ({
            hreflang: LANGUAGE_LIST.find((language) => language.code === g.language)!.hreflang,
            href: `${origin}/${g.language}/news/${g.slug}`,
          })),
          ...(defaultRef
            ? [{ hreflang: "x-default", href: `${origin}/${defaultRef.language}/news/${defaultRef.slug}` }]
            : []),
        ]
      : undefined;
    urls.push({ loc: `${origin}/${ref.language}/news/${ref.slug}`, lastmod: ref.publishedAt, alternates });
  }

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    urls
      .map((u) => {
        const parts = [`  <url>`, `    <loc>${xmlEscape(u.loc)}</loc>`];
        if (u.lastmod) parts.push(`    <lastmod>${u.lastmod}</lastmod>`);
        for (const alt of u.alternates ?? []) {
          parts.push(`    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${xmlEscape(alt.href)}" />`);
        }
        parts.push(`  </url>`);
        return parts.join("\n");
      })
      .join("\n") +
    `\n</urlset>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
