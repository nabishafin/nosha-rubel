import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";

const deploymentUrl = process.env.DEPLOYMENT_URL?.trim();
if (!deploymentUrl) throw new Error("Set DEPLOYMENT_URL to the canonical production origin.");
const origin = new URL(deploymentUrl).origin;
assert.equal(deploymentUrl, origin, "DEPLOYMENT_URL must be an origin without a path or trailing slash");
assert.equal(new URL(origin).protocol, "https:", "Production monitoring requires HTTPS");

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const startedAt = new Date().toISOString();
const sitemapResponse = await fetch(`${origin}/sitemap.xml`);
assert.equal(sitemapResponse.status, 200, "sitemap.xml must return 200");
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.ok(urls.length > 0, "sitemap.xml must contain URLs");

const results = [];
for (const url of urls) {
  const began = performance.now();
  try {
    const response = await fetch(url, { redirect: "manual" });
    const html = await response.text();
    const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1] ?? null;
    const hreflangTargets = [...html.matchAll(/<link[^>]+rel="alternate"[^>]+hreflang="[^"]+"[^>]+href="([^"]+)"/g)].map((match) => match[1]);
    results.push({
      url,
      status: response.status,
      durationMs: Math.round(performance.now() - began),
      canonical,
      canonicalHostValid: canonical ? new URL(canonical).origin === origin : false,
      hreflangHostValid: hreflangTargets.every((target) => new URL(target).origin === origin),
      noindex: /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html),
      forbiddenIdentity: /NewsHub|Dhaka News Times|Nosha Aubel/i.test(html),
    });
  } catch (error) {
    results.push({ url, error: error instanceof Error ? error.message : String(error) });
  }
}

const failures = results.filter((result) =>
  result.error || result.status !== 200 || !result.canonicalHostValid || !result.hreflangHostValid || result.noindex || result.forbiddenIdentity
);
const report = {
  schemaVersion: 1,
  startedAt,
  completedAt: new Date().toISOString(),
  origin,
  totals: { sitemapUrls: urls.length, passed: results.length - failures.length, failed: failures.length },
  checks: results,
  externalEvidenceRequired: [
    "Search Console indexation and selected canonicals",
    "analytics and qualified engagement",
    "CDN/server crawler logs and redirect misses",
    "field Core Web Vitals",
    "native-locale, accessibility, editorial/legal and rights sign-off",
  ],
};

const serialized = `${JSON.stringify(report, null, 2)}\n`;
if (process.env.MONITOR_OUTPUT?.trim()) {
  await writeFile(process.env.MONITOR_OUTPUT.trim(), serialized, "utf8");
  console.log(`Production monitoring report written to ${process.env.MONITOR_OUTPUT.trim()}.`);
} else {
  process.stdout.write(serialized);
}
if (failures.length > 0) process.exitCode = 1;

