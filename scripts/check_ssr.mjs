import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";

const port = await new Promise((resolve, reject) => {
  const listener = createServer();
  listener.once("error", reject);
  listener.listen(0, "127.0.0.1", () => {
    const address = listener.address();
    listener.close(() => resolve(address.port));
  });
});
const base = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ["node_modules/@react-router/serve/bin.cjs", "build/server/index.js"], {
  env: { ...process.env, PORT: String(port) },
  stdio: "ignore",
});

function withoutScripts(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");
}

async function get(path, status = 200) {
  const response = await fetch(`${base}${path}`);
  const html = await response.text();
  assert.equal(response.status, status, `${path} status`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html/);
  return { html, visible: withoutScripts(html), response };
}

try {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      if ((await fetch(`${base}/robots.txt`)).ok) break;
    } catch {
      // Server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const home = await get("/en");
  assert.match(home.visible, /<html lang="en-US" dir="ltr">/);
  assert.match(home.visible, /<title>Noosha Aubel: Mayor of Potsdam Coverage and Public Records<\/title>/);
  assert.match(home.visible, /rel="canonical" href="[^"]+\/en"/);
  assert.match(home.visible, /rel="alternate" hrefLang="de"/);
  assert.match(home.visible, /<h1[^>]*>\s*Noosha Aubel\s*<\/h1>/);
  assert.match(home.visible, /href="\/en\/news\//);
  assert.match(home.html, /type="application\/ld\+json"/);

  const germanHome = await get("/de");
  assert.match(germanHome.visible, /Vollständige Biografie, Themen und Primärquellen/);
  assert.match(germanHome.visible, /Quellenbasiertes Pressedossier/);
  assert.match(germanHome.visible, /Noosha Aubel aktuell in Potsdam/);
  assert.doesNotMatch(germanHome.visible, /Each internal record provides|Coverage Record/);

  const profile = await get("/de/noosha-aubel");
  assert.match(profile.visible, /<h1[^>]*>\s*Noosha Aubel: Biografie und Amt in Potsdam\s*<\/h1>/);
  assert.match(profile.visible, /Offizielle Biografie der Landeshauptstadt Potsdam/);
  assert.match(profile.visible, /Amtliche Quellen und weiterführende Einordnung/);
  assert.match(profile.visible, /Häufige Fragen zu Noosha Aubel/);
  assert.match(profile.visible, /rel="canonical" href="[^"]+\/de\/noosha-aubel"/);
  assert.match(profile.html, /"@type":"AboutPage"/);
  assert.match(profile.html, /"@type":"Person"/);

  const firstArticlePath = home.visible.match(/href="(\/en\/news\/[^"]+)"/)?.[1];
  assert.ok(firstArticlePath, "expected a crawlable article URL in raw HTML");
  const article = await get(firstArticlePath);
  assert.match(article.visible, /<h1[^>]*>[^<]+<\/h1>/);
  assert.match(article.visible, /original dossier summary/i);
  assert.match(article.visible, /What the cited publication reports/i);
  assert.match(article.visible, /Verification status/i);
  assert.match(article.visible, /target="_blank" rel="noopener noreferrer"/);
  assert.match(article.visible, /rel="canonical" href="[^"]+\/en\/news\//);
  assert.match(article.html, /"@type":"WebPage"/);
  assert.doesNotMatch(article.html, /"@type":"NewsArticle"/);

  const document = await get("/en/documents/de");
  assert.match(document.visible, /<h1[^>]*>\s*German Wikipedia snapshot\s*<\/h1>/);
  assert.match(document.visible, /not an official biography/i);
  assert.match(document.visible, /href="\/en\/documents\/de\/file"/);

  const search = await get("/en/search?q=Potsdam");
  assert.match(search.visible, /name="robots" content="noindex, follow"/);
  assert.match(search.visible, /value="Potsdam"/);
  assert.equal(search.response.headers.get("x-robots-tag"), "noindex, follow");

  assert.match(await (await fetch(`${base}/en`)).text(), /window\.__reactRouterContext/);
  console.log("SSR checks passed with scripts removed from all tested templates.");
} finally {
  server.kill();
}
