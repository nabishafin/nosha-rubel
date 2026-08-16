import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readdir, readFile } from "node:fs/promises";
import { createServer } from "node:net";

const publicFiles = await readdir("public");
assert.equal(publicFiles.filter((name) => /\.(?:pdf|docx?|odt)$/i.test(name)).length, 0, "public must not contain document binaries or working files");
const storedPdfs = (await readdir("storage/documents")).filter((name) => /\.pdf$/i.test(name));
assert.equal(storedPdfs.length, 26, "controlled document storage must contain all 26 PDFs");
assert.ok((await readdir("storage/internal")).includes("META DESCRIPTION FOR WEBSITE.docx"), "working DOCX must be retained outside public delivery");

const [dockerfile, dockerignore] = await Promise.all([
  readFile("Dockerfile", "utf8"),
  readFile(".dockerignore", "utf8"),
]);
assert.match(dockerfile, /COPY --from=build-env \/app\/storage\/documents \/app\/storage\/documents/);
assert.doesNotMatch(dockerfile, /storage\/internal/);
assert.match(dockerignore, /^\/storage\/internal\/$/m);

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
  env: { ...process.env, PORT: String(port), SITE_URL: "https://noosha-aubel.com" },
  stdio: "ignore",
});

try {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try { if ((await fetch(`${base}/robots.txt`)).ok) break; } catch { /* server starting */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const legacyName = storedPdfs.find((name) => name.startsWith("GERMAN - "));
  assert.ok(legacyName, "German legacy filename must exist in controlled storage");
  const legacy = await fetch(`${base}/${encodeURIComponent(legacyName)}`, { redirect: "manual" });
  assert.equal(legacy.status, 301);
  assert.equal(legacy.headers.get("location"), "/en/documents/de/file");

  const controlled = await fetch(`${base}/en/documents/de/file`);
  assert.equal(controlled.status, 200);
  assert.match(controlled.headers.get("content-type") ?? "", /^application\/pdf/);
  assert.equal(controlled.headers.get("x-robots-tag"), "noindex, noarchive");
  assert.equal(new TextDecoder().decode((await controlled.arrayBuffer()).slice(0, 5)), "%PDF-");

  const workingFile = await fetch(`${base}/${encodeURIComponent("META DESCRIPTION FOR WEBSITE.docx")}`, { redirect: "manual" });
  assert.equal(workingFile.status, 410);
  assert.equal(workingFile.headers.get("x-robots-tag"), "noindex, nofollow");

  console.log("Document-containment checks passed (26 controlled PDFs; working DOCX is not deployable).");
} finally {
  server.kill();
}
