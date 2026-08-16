import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";

const languages = [
  "de", "en", "zh", "es", "fr", "it", "pt", "hi", "pl",
  "cs", "ko", "sv", "ar", "ja", "el", "ru", "uk",
];
const requiredPrefix = "Noosha Aubel:";
const genericGlobalKeywords = "Oberbürgermeisterin Potsdam, Potsdam Rathaus";

function content(html, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = html.match(new RegExp(`<meta[^>]+(?:name|property)=["']${escaped}["'][^>]+content=["']([^"']*)["']`, "i"));
  return match?.[1];
}

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

try {
  let ready = false;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      if ((await fetch(`${base}/en`)).ok) {
        ready = true;
        break;
      }
    } catch { /* server is starting */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.ok(ready, "production server did not become ready");

  for (const lang of languages) {
    const response = await fetch(`${base}/${lang}`);
    assert.equal(response.status, 200, `/${lang} must return 200`);
    const html = await response.text();
    const title = html.match(/<title>([^<]*)<\/title>/i)?.[1];
    const description = content(html, "description");
    const keywords = content(html, "keywords");

    assert.ok(title?.startsWith(requiredPrefix), `/${lang} title must begin ${requiredPrefix}`);
    assert.ok(description?.startsWith(requiredPrefix), `/${lang} description must begin ${requiredPrefix}`);
    assert.equal(keywords?.split(",")[0]?.trim(), "Noosha Aubel", `/${lang} keywords must begin with the name`);
    assert.ok((keywords?.split(",").length ?? 0) >= 5, `/${lang} must include localized topic keywords`);
    if (lang !== "de") {
      assert.notEqual(keywords?.includes(genericGlobalKeywords), true, `/${lang} must not inherit the German keyword set`);
    }
    assert.equal(content(html, "og:title"), title, `/${lang} Open Graph title mismatch`);
    assert.equal(content(html, "og:description"), description, `/${lang} Open Graph description mismatch`);
    assert.equal(content(html, "twitter:title"), title, `/${lang} Twitter title mismatch`);
    assert.equal(content(html, "twitter:description"), description, `/${lang} Twitter description mismatch`);
    assert.doesNotMatch(
      `${title} ${description}`,
      /breaking news|latest headlines|trending stories/i,
      `/${lang} contains rejected generic news wording`,
    );
    assert.doesNotMatch(`${title} ${description} ${keywords}`, /\bNosha\s+(?:Aubel|Aube|Abell)\b/i);
  }

  console.log(`Metadata-focus checks passed for ${languages.length} localized homepages.`);
} finally {
  server.kill();
}
