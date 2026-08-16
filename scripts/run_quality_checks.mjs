import { spawnSync } from "node:child_process";

const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error("Run this quality suite through npm: npm run check:quality");
const steps = [
  "typecheck",
  "build",
  "check:identity",
  "check:metadata-focus",
  "check:trust-claims",
  "check:locale-routes",
  "check:crawl-controls",
  "check:feed",
  "check:structured-data",
  "check:media",
  "check:media-governance",
  "check:documents",
  "check:document-containment",
  "check:video",
  "check:performance",
  "check:ssr",
  "check:semantics",
  "check:http",
  "check:outbound-links",
  "check:external-source-monitoring",
  "check:language-semantics",
  "check:accessible-names",
  "check:keyboard-focus",
  "check:responsive-accessibility",
  "check:security",
  "check:migration-readiness",
  "check:monitoring-contract",
  "check:internal-links",
];

for (const step of steps) {
  console.log(`\n=== ${step} ===`);
  const result = spawnSync(process.execPath, [npmCli, "run", step], {
    stdio: "inherit",
    shell: false,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

console.log("\nAll release quality gates passed.");
