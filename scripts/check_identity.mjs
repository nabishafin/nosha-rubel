import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../app/", import.meta.url));
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".css"]);
const FORBIDDEN = [
  { label: "legacy NewsHub identity", pattern: /NewsHub/i },
  { label: "legacy Dhaka News Times identity", pattern: /Dhaka News Times/i },
  { label: "legacy HRD Media identity", pattern: /HRD Media/i },
  { label: "protected-name misspelling", pattern: /\bNosha\s+Aubel\b/i },
];

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return sourceFiles(path);
      return SOURCE_EXTENSIONS.has(extname(entry.name)) ? [path] : [];
    }),
  );
  return files.flat();
}

const failures = [];
for (const file of await sourceFiles(ROOT)) {
  const content = await readFile(file, "utf8");
  const lines = content.split(/\r?\n/);
  for (const { label, pattern } of FORBIDDEN) {
    lines.forEach((line, index) => {
      if (pattern.test(line)) {
        failures.push(`${relative(ROOT, file)}:${index + 1}: ${label}`);
      }
    });
  }
}

if (failures.length > 0) {
  console.error("Identity check failed:\n" + failures.join("\n"));
  process.exit(1);
}

console.log("Identity check passed.");
