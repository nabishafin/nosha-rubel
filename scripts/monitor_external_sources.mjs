import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";

const articles = JSON.parse(await readFile(new URL("../app/data/articles.generated.json", import.meta.url), "utf8"));
assert.ok(articles.length > 0, "coverage records must exist");
const timeoutMs = Number.parseInt(process.env.SOURCE_MONITOR_TIMEOUT_MS ?? "15000", 10);
const output = process.env.SOURCE_MONITOR_OUTPUT?.trim();
const checkedAt = new Date().toISOString();

function classify(status, error) {
  if (error) return "manual-review";
  if (status >= 200 && status < 400) return "reachable";
  if (status === 404 || status === 410) return "confirmed-missing";
  if ([401, 403, 405, 408, 425, 429].includes(status) || status >= 500) return "manual-review";
  return "unexpected-response";
}

async function inspect(article) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(article.sourceUrl, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.1",
        "User-Agent": "Noosha-Aubel-Source-Monitor/1.0 (+editorial link maintenance)",
      },
    });
    const contentType = response.headers.get("content-type") ?? "";
    const body = contentType.includes("html") ? await response.text() : "";
    const observedTitle = body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
      ?.replace(/\s+/g, " ").trim().slice(0, 300) ?? null;
    return {
      articleId: article.id,
      declaredTitle: article.title,
      sourceName: article.sourceName,
      requestedUrl: article.sourceUrl,
      finalUrl: response.url,
      redirected: response.url !== article.sourceUrl,
      status: response.status,
      contentType,
      observedTitle,
      classification: classify(response.status),
    };
  } catch (error) {
    return {
      articleId: article.id,
      declaredTitle: article.title,
      sourceName: article.sourceName,
      requestedUrl: article.sourceUrl,
      finalUrl: null,
      redirected: false,
      status: null,
      contentType: null,
      observedTitle: null,
      classification: "manual-review",
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    clearTimeout(timer);
  }
}

const results = [];
const queue = articles.slice();
await Promise.all(Array.from({ length: Math.min(6, queue.length) }, async () => {
  while (queue.length > 0) results.push(await inspect(queue.shift()));
}));
results.sort((left, right) => String(left.articleId).localeCompare(String(right.articleId)));

const counts = results.reduce((totals, result) => {
  totals[result.classification] = (totals[result.classification] ?? 0) + 1;
  return totals;
}, {});
const report = {
  schemaVersion: 1,
  checkedAt,
  policy: "No URL is automatically replaced or archived. Editorial/legal review is required.",
  counts,
  results,
};
const serialized = `${JSON.stringify(report, null, 2)}\n`;
if (output) {
  await writeFile(output, serialized, "utf8");
  console.log(`External-source report written to ${output}: ${JSON.stringify(counts)}`);
} else {
  process.stdout.write(serialized);
}
if ((counts["confirmed-missing"] ?? 0) > 0 || (counts["unexpected-response"] ?? 0) > 0) process.exitCode = 1;

