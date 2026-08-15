export const LEGACY_GONE_HEADERS = {
  "X-Robots-Tag": "noindex, nofollow",
  "Cache-Control": "public, max-age=300",
} as const;

export function throwLegacyCategoryGone(): never {
  throw new Response("This legacy category URL has been permanently removed.", {
    status: 410,
    statusText: "Gone",
    headers: LEGACY_GONE_HEADERS,
  });
}
