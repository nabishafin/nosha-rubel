import { getOrigin } from "~/lib/http";
import type { Route } from "./+types/robots";

export function loader({ request }: Route.LoaderArgs) {
  const origin = getOrigin(request);
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /*/search",
    "",
    `Sitemap: ${origin}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
