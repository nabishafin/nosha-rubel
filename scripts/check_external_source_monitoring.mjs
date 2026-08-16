import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [monitor, workflow, policy, packageJson] = await Promise.all([
  readFile("scripts/monitor_external_sources.mjs", "utf8"),
  readFile(".github/workflows/external-source-monitoring.yml", "utf8"),
  readFile("docs/outbound-link-policy.md", "utf8"),
  readFile("package.json", "utf8"),
]);
assert.equal(JSON.parse(packageJson).scripts["monitor:external-sources"], "node scripts/monitor_external_sources.mjs");
for (const field of ["requestedUrl", "finalUrl", "redirected", "observedTitle", "classification", "confirmed-missing", "manual-review"]) {
  assert.ok(monitor.includes(field), `source monitor must record ${field}`);
}
assert.match(workflow, /schedule:[\s\S]+cron:/);
assert.match(workflow, /SOURCE_MONITOR_OUTPUT: external-source-report\.json/);
assert.match(workflow, /if: always\(\)/);
assert.match(policy, /must not be replaced automatically/i);
assert.match(policy, /editorial\/legal review/i);
console.log("External-source monitoring contract checks passed.");

