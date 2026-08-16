import assert from "node:assert/strict";

const deploymentUrl = process.env.DEPLOYMENT_URL?.trim();
if (!deploymentUrl) throw new Error("Set DEPLOYMENT_URL to the deployed canonical origin.");
const origin = new URL(deploymentUrl).origin;
assert.equal(deploymentUrl, origin, "DEPLOYMENT_URL must be an origin without a trailing slash or path");
assert.equal(new URL(origin).protocol, "https:", "production smoke tests require HTTPS");

async function request(path, options = {}) {
  return fetch(`${origin}${path}`, { redirect: "manual", ...options });
}

const robots = await request("/robots.txt");
assert.equal(robots.status, 200);
assert.match(robots.headers.get("content-type") ?? "", /^text\/plain/);
assert.match(await robots.text(), new RegExp(`Sitemap: ${origin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\/sitemap\\.xml`));

const sitemap = await request("/sitemap.xml");
assert.equal(sitemap.status, 200);
assert.match(sitemap.headers.get("content-type") ?? "", /xml/);

const home = await request("/en");
assert.equal(home.status, 200);
assert.equal(home.headers.get("x-content-type-options"), "nosniff");
assert.ok(home.headers.get("content-security-policy"));
assert.ok(home.headers.get("strict-transport-security"));
assert.match(await home.text(), new RegExp(`rel="canonical" href="${origin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\/en"`));

const slash = await request("/en/?migration=smoke");
assert.equal(slash.status, 301);
assert.equal(slash.headers.get("location"), "/en?migration=smoke");

const missing = await request("/en/news/migration-smoke-missing");
assert.equal(missing.status, 404);
assert.equal(missing.headers.get("x-robots-tag"), "noindex, nofollow");

for (const redirectOrigin of (process.env.REDIRECT_ORIGINS ?? "").split(",").map((value) => value.trim()).filter(Boolean)) {
  const response = await fetch(`${new URL(redirectOrigin).origin}/en?migration=smoke`, { redirect: "manual" });
  assert.equal(response.status, 301, `${redirectOrigin} must permanently redirect`);
  assert.equal(new URL(response.headers.get("location"), redirectOrigin).href, `${origin}/en?migration=smoke`);
}

console.log(`Production migration smoke tests passed for ${origin}.`);
