import type { CategorySlug } from "./types";

// Curated, topic-relevant Unsplash photo IDs per category. Images are served
// from images.unsplash.com with on-the-fly resizing params. SmartImage adds a
// graceful fallback if any single asset fails to load.
const UNSPLASH_IDS: Record<CategorySlug, string[]> = {
  politics: [
    "1529107386315-e1a2ed48a620",
    "1575320181282-9afab399332c",
    "1555848962-6e79363ec58f",
    "1541872703-74c5e44368f9",
  ],
  technology: [
    "1518770660439-4636190af475",
    "1526374965328-7f61d4dc18c5",
    "1550751827-4bd374c3f58b",
    "1451187580459-43490279c0fa",
  ],
  sports: [
    "1461896836934-ffe607ba8211",
    "1517649763962-0c623066013b",
    "1546519638-68e109498ffc",
    "1579952363873-27f3bade9f55",
  ],
  business: [
    "1454165804606-c3d57bc86b40",
    "1521737604893-d14cc237f11d",
    "1460925895917-afdab827c52f",
    "1553729459-efe14ef6055d",
  ],
  health: [
    "1505751172876-fa1923c5c528",
    "1576091160399-112ba8d25d1d",
    "1571019613454-1cb2f99b2d8b",
    "1512069772995-ec65ed45afd6",
  ],
  entertainment: [
    "1489599849927-2ee91cede3ba",
    "1470229722913-7c0e2dbbafd3",
    "1514525253161-7a46d19cd819",
    "1524368535928-5b5e00ddc76b",
  ],
  world: [
    "1526778548025-fa2f459cd5c1",
    "1451847251646-8a6c0dd1510c",
    "1488646953014-85cb44e25828",
    "1502920917128-1aa500764cbd",
  ],
};

/** Deterministically pick a category-relevant Unsplash photo. */
export function unsplashFor(category: CategorySlug, seed: number, width = 1200): string {
  const ids = UNSPLASH_IDS[category];
  const id = ids[seed % ids.length];
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}

/** Local fallback used by SmartImage if an article image fails to load. */
export function fallbackImage(_seed: string, _width = 1200, _height = 750): string {
  return "/common.jpeg";
}
