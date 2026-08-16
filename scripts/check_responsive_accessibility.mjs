import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const css = await readFile(new URL("../app/app.css", import.meta.url), "utf8");
assert.match(css, /overflow-wrap:\s*break-word/);
assert.match(css, /img,\s*video,\s*iframe\s*\{\s*max-inline-size:\s*100%/s);
assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
assert.match(css, /animation-duration:\s*0\.01ms !important/);
assert.match(css, /animation-iteration-count:\s*1 !important/);
assert.match(css, /transition-duration:\s*0\.01ms !important/);
assert.match(css, /@media \(forced-colors: active\)/);

const hero = await readFile(new URL("../app/components/HeroSlider.tsx", import.meta.url), "utf8");
assert.match(hero, /className="group flex h-6 w-6 items-end justify-center"/);
assert.match(hero, /aria-label=\{`Go to slide/);

for (const file of ["DocumentArchive.tsx", "LanguageGrid.tsx", "HomeBanner.tsx", "SearchBar.tsx"]) {
  const source = await readFile(new URL(`../app/components/${file}`, import.meta.url), "utf8");
  assert.doesNotMatch(source, /placeholder:text-gray-400|className="text-gray-400"/);
}

console.log("Responsive accessibility checks passed.");
