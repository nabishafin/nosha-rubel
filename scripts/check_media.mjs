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

  const html = await (await fetch(`${base}/en`)).text();
  const banner = html.slice(html.indexOf("<section"), html.indexOf("</section>") + 10);
  assert.match(html, /<picture aria-hidden="true">/);
  assert.match(html, /potsdam-civic-archive-640\.webp 640w/);
  assert.match(html, /width="1440" height="810" alt="" fetchPriority="high"/);
  const head = html.slice(0, html.indexOf("</head>"));
  assert.doesNotMatch(head, /rel="preload"[^>]+https?:\/\//, "must not preload a third-party image");
  assert.match(head, /rel="preload"[^>]+potsdam-civic-archive-960\.webp/);
  assert.doesNotMatch(banner, /https?:\/\//, "homepage hero must not hotlink a third-party image");
  assert.match(html, /property="og:image" content="https:\/\/www\.berlinertageszeitung\.de\/media\/shared\/articles\/news\/2026-06\/Noosha_Aubel_und_Dietmar_Woidke_-_Skandal_um_schwerbehindertes_Kind_in_Potsdam_und_Brandenburg_7161\.jpg"/);

  for (const asset of [
    "/media/hero/potsdam-civic-archive-640.webp",
    "/media/hero/potsdam-civic-archive-960.webp",
    "/media/hero/potsdam-civic-archive-1440.webp",
    "/media/hero/potsdam-civic-archive-social-1200x630.jpg",
  ]) {
    const response = await fetch(`${base}${asset}`);
    assert.equal(response.status, 200, `${asset} status`);
    assert.match(response.headers.get("content-type") ?? "", /^image\//, `${asset} content type`);
  }

  console.log("Media checks passed.");
} finally {
  server.kill();
}
