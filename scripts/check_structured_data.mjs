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

async function waitForServer() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      if ((await fetch(`${base}/robots.txt`)).ok) return;
    } catch {
      // The production server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("Timed out waiting for the production server");
}

function jsonLd(html) {
  const matches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.ok(matches.length > 0, "expected server-rendered JSON-LD");
  return matches.map((match) => JSON.parse(match[1]));
}

function graph(document) {
  return document["@graph"] ?? [document];
}

try {
  await waitForServer();

  const landingGraph = graph(jsonLd(await (await fetch(`${base}/en`)).text())[0]);
  assert.ok(landingGraph.some((node) => node["@type"] === "WebSite"));
  const collection = landingGraph.find((node) => node["@type"] === "CollectionPage");
  assert.ok(collection, "landing page must be a CollectionPage");
  assert.equal(collection.mainEntity["@type"], "ItemList");
  assert.ok(collection.mainEntity.itemListElement.length > 0);
  assert.ok(
    collection.mainEntity.itemListElement.every(
      (item) => new URL(item.url).pathname.startsWith("/en/news/") && new URL(item.url).origin === new URL(collection.url).origin,
    ),
  );
  assert.ok(!landingGraph.some((node) => node["@type"] === "Organization"), "site ownership must not be invented");

  const articlePath = new URL(collection.mainEntity.itemListElement[0].url).pathname;
  const articleGraph = graph(jsonLd(await (await fetch(`${base}${articlePath}`)).text())[0]);
  assert.ok(articleGraph.some((node) => node["@type"] === "WebPage"));
  assert.ok(articleGraph.some((node) => node["@type"] === "BreadcrumbList"));
  assert.ok(!articleGraph.some((node) => ["Article", "NewsArticle"].includes(node["@type"])));
  const webPage = articleGraph.find((node) => node["@type"] === "WebPage");
  assert.equal(webPage.mainEntity["@id"], webPage.citation);
  assert.notEqual(new URL(webPage.citation).origin, new URL(webPage.url).origin);
  assert.ok(webPage.mainEntity.publisher.name);

  const staticGraph = graph(jsonLd(await (await fetch(`${base}/en/about`)).text())[0]);
  assert.ok(staticGraph.some((node) => node["@type"] === "WebPage"));
  assert.ok(staticGraph.some((node) => node["@type"] === "BreadcrumbList"));

  console.log("Structured-data checks passed.");
} finally {
  server.kill();
}
