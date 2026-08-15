import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { getLocaleSwitchTarget } from "../app/lib/locale-routing.ts";

const articles = JSON.parse(
  await readFile(new URL("../app/data/articles.generated.json", import.meta.url), "utf8"),
);

function resolveArticleSlug(sourceLang, sourceSlug, targetLang) {
  const source = articles.find(
    (article) => article.language === sourceLang && article.slug === sourceSlug,
  );
  if (!source?.translationGroup) return undefined;
  return articles.find(
    (article) =>
      article.translationGroup === source.translationGroup && article.language === targetLang,
  )?.slug;
}

function target(overrides) {
  return getLocaleSwitchTarget({
    pathname: "/en",
    search: "",
    hash: "",
    sourceLang: "en",
    targetLang: "de",
    resolveArticleSlug,
    ...overrides,
  });
}

assert.equal(target({}), "/de");
assert.equal(
  target({ pathname: "/zh/contact", sourceLang: "zh", targetLang: "en" }),
  "/en/contact",
);
assert.equal(
  target({
    pathname: "/zh/editorial-statement",
    search: "?view=full",
    hash: "#corrections",
    sourceLang: "zh",
    targetLang: "de",
  }),
  "/de/editorial-statement?view=full#corrections",
);
assert.equal(
  target({ pathname: "/en/search", search: "?q=noosha+aubel", hash: "#results" }),
  "/de/search?q=noosha+aubel#results",
);

const translatedSource = articles.find((article) => {
  if (!article.translationGroup) return false;
  return articles.some(
    (candidate) =>
      candidate.translationGroup === article.translationGroup &&
      candidate.language !== article.language,
  );
});
assert.ok(translatedSource, "Expected at least one translated article group");
const translatedTarget = articles.find(
  (article) =>
    article.translationGroup === translatedSource.translationGroup &&
    article.language !== translatedSource.language,
);
assert.ok(translatedTarget);
assert.equal(
  target({
    pathname: `/${translatedSource.language}/news/${translatedSource.slug}`,
    sourceLang: translatedSource.language,
    targetLang: translatedTarget.language,
    search: "?ref=archive",
    hash: "#source",
  }),
  `/${translatedTarget.language}/news/${translatedTarget.slug}?ref=archive#source`,
);

const untranslatedSource = articles.find((article) => !article.translationGroup);
assert.ok(untranslatedSource, "Expected an article without a translation group");
const fallbackLanguage = untranslatedSource.language === "de" ? "en" : "de";
const originalPath = `/${untranslatedSource.language}/news/${untranslatedSource.slug}`;
assert.equal(
  target({
    pathname: originalPath,
    sourceLang: untranslatedSource.language,
    targetLang: fallbackLanguage,
  }),
  `/${fallbackLanguage}/translation-unavailable?from=${encodeURIComponent(originalPath)}`,
);

console.log("Locale route checks passed.");
