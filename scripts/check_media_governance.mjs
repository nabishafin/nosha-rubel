import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const governance = JSON.parse(await readFile("app/data/media-governance.json", "utf8"));
const articles = JSON.parse(await readFile("app/data/articles.generated.json", "utf8"));
assert.equal(governance.schemaVersion, 1);

const required = ["owner", "source", "creator", "creditLine", "license", "rightsStatus", "purpose", "altPolicy", "caption", "focalPoint", "language", "permittedTransformations"];
const declaredFiles = new Map();
for (const family of governance.firstPartyFamilies) {
  for (const field of required) assert.ok(field in family, `${family.id} missing ${field}`);
  for (const [url, checksum] of Object.entries(family.files)) {
    assert.ok(!declaredFiles.has(url), `duplicate media record: ${url}`);
    declaredFiles.set(url, checksum);
    const bytes = await readFile(`public${url.replaceAll("/", join("/"))}`);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), checksum, `${url} checksum changed; review provenance and update deliberately`);
  }
}

async function imageFiles(directory) {
  const output = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, item.name);
    if (item.isDirectory()) output.push(...await imageFiles(path));
    else if ([".jpg", ".jpeg", ".png", ".webp", ".ico", ".avif"].includes(extname(item.name).toLowerCase())) output.push(path);
  }
  return output;
}
const actualFiles = (await imageFiles("public"))
  .map((path) => `/${path.replace(/^public[\\/]/, "").replaceAll("\\", "/")}`)
  .sort();
assert.deepEqual([...declaredFiles.keys()].sort(), actualFiles, "every first-party production image must have exactly one governance record");

const externalRequired = ["owner", "creator", "creditLine", "license", "rightsStatus", "purpose", "altPolicy", "caption", "focalPoint", "language", "permittedTransformations", "deliveryPolicy"];
for (const field of externalRequired) assert.ok(field in governance.externalCoveragePolicy, `external coverage policy missing ${field}`);
for (const article of articles) {
  const image = new URL(article.image);
  assert.equal(image.protocol, "https:", `${article.id} external image must use HTTPS`);
  assert.ok(article.sourceName?.trim(), `${article.id} must identify the image source publication`);
  assert.ok(article.sourceUrl?.trim(), `${article.id} must retain the source record URL`);
  assert.ok(article.title?.trim() && article.language?.trim(), `${article.id} must provide accessibility and language context`);
}

const unresolvedFirstParty = governance.firstPartyFamilies.filter((family) => family.rightsStatus !== "approved").length;
console.log(`Media-governance checks passed (${actualFiles.length} first-party files, ${articles.length} external records; ${unresolvedFirstParty} first-party families still require owner evidence).`);

