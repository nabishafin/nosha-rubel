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

try {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      if ((await fetch(`${base}/robots.txt`)).ok) break;
    } catch {
      // Server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  for (const locale of ["en", "de", "ar"]) {
    const html = await (await fetch(`${base}/${locale}`)).text();
    assert.match(html, new RegExp(`<div lang="${locale === "en" ? "en-US" : "de"}" class="flex flex-col justify-center`));
    assert.match(html, /cc_lang_pref=de&amp;cc_load_policy=1/);
    for (const [id, language] of [["DUZxtW_3LzQ", "en"], ["sko9O0RIUsI", "de"]]) {
      assert.ok(html.includes(`https://www.youtube-nocookie.com/embed/${id}?cc_lang_pref=${language}&amp;cc_load_policy=1`), `${locale}: missing ${language} embed`);
      assert.ok(html.includes(`https://www.youtube.com/shorts/${id}`), `${locale}: missing original video link`);
    }
    assert.equal((html.match(/<iframe\b/g) ?? []).length, 3, `${locale}: all three videos must be present`);
    for (const iframe of html.match(/<iframe\b[^>]*>/g) ?? []) {
      assert.match(iframe, /loading="lazy"/);
      assert.match(iframe, /title="[^"]+"/);
    }
    if (locale === "de") {
      assert.match(html, /Deutschsprachiger Videobericht/);
      assert.match(html, /kein geprüftes Transkript/);
      assert.doesNotMatch(html, /German-language video|not a verified transcript/);
    } else {
      assert.match(html, /German-language video/);
      assert.match(html, /not a verified transcript/);
    }
    assert.doesNotMatch(html, /"@type":"VideoObject"/);
  }

  console.log("Video checks passed.");
} finally {
  server.kill();
}
