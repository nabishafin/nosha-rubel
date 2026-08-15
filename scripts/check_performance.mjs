import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { stat } from "node:fs/promises";
import { resolve } from "node:path";

const KIB = 1024;
const port = await new Promise((resolvePort, reject) => {
  const listener = createServer();
  listener.once("error", reject);
  listener.listen(0, "127.0.0.1", () => {
    const address = listener.address();
    listener.close(() => resolvePort(address.port));
  });
});
const base = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ["node_modules/@react-router/serve/bin.cjs", "build/server/index.js"], {
  env: { ...process.env, PORT: String(port) },
  stdio: "ignore",
});

async function fileSize(path, maximum) {
  const bytes = (await stat(path)).size;
  assert.ok(bytes <= maximum, `${path} is ${bytes} bytes; budget is ${maximum}`);
}

try {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      if ((await fetch(`${base}/robots.txt`)).ok) break;
    } catch {
      // Server is still starting.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }

  const html = await (await fetch(`${base}/en`)).text();
  assert.ok(Buffer.byteLength(html) <= 160 * KIB, "homepage HTML exceeds 160 KiB");

  const preloads = [...html.matchAll(/<link rel="preload" as="image"[^>]*>/g)].map((match) => match[0]);
  assert.equal(preloads.length, 1, "homepage must preload exactly one image");
  assert.match(preloads[0], /potsdam-civic-archive-960\.webp/);
  assert.match(preloads[0], /fetchPriority="high"/);
  assert.doesNotMatch(html, /https?:\/\/[^\"]+\.(?:jpe?g|png|webp)[^\"]*fetchPriority="high"/i);
  assert.match(html, /class="content-auto-section/);
  assert.match(html, /loading="lazy"/);

  const moduleUrls = [...html.matchAll(/<link rel="modulepreload" href="([^"]+)"/g)].map((match) => match[1]);
  let initialJavaScript = 0;
  for (const url of moduleUrls) {
    initialJavaScript += (await stat(resolve("build/client", url.replace(/^\//, "")))).size;
  }
  assert.ok(initialJavaScript <= 550 * KIB, `initial JavaScript is ${initialJavaScript} bytes`);

  const css = html.match(/<link rel="stylesheet" href="\/(assets\/root-[^"]+\.css)"/)?.[1];
  const landing = moduleUrls.find((file) => /\/assets\/landing-.*\.js$/.test(file))?.replace(/^\//, "");
  assert.ok(css && landing, "expected CSS and landing assets in manifest");
  await fileSize(resolve("build/client", css), 75 * KIB);
  await fileSize(resolve("build/client", landing), 50 * KIB);

  await fileSize("public/media/hero/potsdam-civic-archive-640.webp", 50 * KIB);
  await fileSize("public/media/hero/potsdam-civic-archive-960.webp", 90 * KIB);
  await fileSize("public/media/hero/potsdam-civic-archive-1440.webp", 160 * KIB);
  await fileSize("public/media/hero/potsdam-civic-archive-social-1200x630.jpg", 140 * KIB);

  console.log(`Performance checks passed (${Math.round(initialJavaScript / KIB)} KiB initial JS).`);
} finally {
  server.kill();
}
