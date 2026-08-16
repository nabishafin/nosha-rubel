import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { readFile } from "node:fs/promises";

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
    try { if ((await fetch(`${base}/robots.txt`)).ok) break; } catch { /* starting */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const response = await fetch(`${base}/en`, { headers: { "X-Forwarded-Proto": "https" } });
  const html = await response.text();
  const csp = response.headers.get("content-security-policy") ?? "";
  const nonce = csp.match(/'nonce-([^']+)'/)?.[1];
  assert.ok(nonce, "CSP must include a per-response nonce");
  assert.match(html, new RegExp(`nonce="${nonce.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
  assert.match(csp, /frame-ancestors 'none'/);
  assert.match(csp, /frame-src https:\/\/www\.youtube-nocookie\.com/);
  assert.match(csp, /font-src 'self' data:/);
  assert.doesNotMatch(csp, /fonts\.(?:googleapis|gstatic)\.com/);
  assert.doesNotMatch(html, /fonts\.(?:googleapis|gstatic)\.com/);
  assert.doesNotMatch(csp, /script-src[^;]*'unsafe-inline'/);
  assert.doesNotMatch(csp, /'unsafe-eval'/);
  assert.equal(response.headers.get("strict-transport-security"), "max-age=31536000");
  assert.equal(response.headers.get("referrer-policy"), "no-referrer");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(response.headers.get("cross-origin-opener-policy"), "same-origin");
  assert.equal(response.headers.get("permissions-policy"), "camera=(), geolocation=(), microphone=(), payment=(), usb=(), browsing-topics=()");
  assert.equal(response.headers.get("set-cookie"), null);

  const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  assert.equal(packageJson.engines.node, ">=24.0.0 <25");
  for (const name of ["react-router", "@react-router/node", "@react-router/serve"]) {
    assert.equal(packageJson.dependencies[name], "8.3.0");
  }
  assert.equal(packageJson.devDependencies["@react-router/dev"], "8.3.0");

  console.log("Security-header and dependency-baseline checks passed.");
} finally {
  server.kill();
}
