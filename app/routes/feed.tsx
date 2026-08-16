import { ARTICLES } from "~/data/articles";
import { getOrigin } from "~/lib/http";
import { SITE_DESCRIPTION, SITE_NAME } from "~/lib/site-identity";
import type { Route } from "./+types/feed";

const escapeXml = (value: string) =>
  value.replace(/[<>&"']/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
  })[character] ?? character);

export function loader({ request }: Route.LoaderArgs) {
  const origin = getOrigin(request);
  const articles = ARTICLES.slice()
    .sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime())
    .slice(0, 50);
  const updated = articles[0]?.publishedAt ?? new Date(0).toISOString();
  const entries = articles.map((article) => {
    const url = `${origin}/${article.language}/news/${article.slug}`;
    return [
      `  <entry xml:lang="${escapeXml(article.language)}">`,
      `    <title>${escapeXml(article.title)}</title>`,
      `    <id>${escapeXml(url)}</id>`,
      `    <link rel="alternate" type="text/html" href="${escapeXml(url)}" />`,
      `    <link rel="related" href="${escapeXml(article.sourceUrl)}" />`,
      `    <updated>${escapeXml(article.publishedAt)}</updated>`,
      `    <published>${escapeXml(article.publishedAt)}</published>`,
      `    <author><name>${escapeXml(article.author || article.sourceName)}</name></author>`,
      `    <category term="${escapeXml(article.category)}" />`,
      `    <summary type="text">${escapeXml(article.description)}</summary>`,
      "  </entry>",
    ].join("\n");
  });
  const body = [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom">',
    `  <title>${escapeXml(SITE_NAME)} - Multilingual coverage records</title>`,
    `  <subtitle>${escapeXml(SITE_DESCRIPTION)}</subtitle>`,
    `  <id>${origin}/feed.xml</id>`,
    `  <link rel="self" type="application/atom+xml" href="${origin}/feed.xml" />`,
    `  <link rel="alternate" type="text/html" href="${origin}/en" />`,
    `  <updated>${escapeXml(updated)}</updated>`,
    ...entries,
    "</feed>",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=900, s-maxage=3600, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

