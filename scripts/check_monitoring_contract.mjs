import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [monitor, packageJson, framework, evidence] = await Promise.all([
  readFile("scripts/monitor_production.mjs", "utf8"),
  readFile("package.json", "utf8"),
  readFile("docs/qa-monitoring-kpi-framework.md", "utf8"),
  readFile("docs/release-evidence-template.md", "utf8"),
]);

assert.equal(JSON.parse(packageJson).scripts["monitor:production"], "node scripts/monitor_production.mjs");
for (const contract of ["DEPLOYMENT_URL", "sitemap.xml", "canonicalHostValid", "hreflangHostValid", "forbiddenIdentity", "externalEvidenceRequired"]) {
  assert.ok(monitor.includes(contract), `production monitor must include ${contract}`);
}
for (const cadence of ["Daily for 14 days", "Weekly for 90 days", "Monthly ongoing", "Quarterly"]) {
  assert.ok(framework.includes(cadence), `monitoring framework must define ${cadence}`);
}
for (const evidenceField of ["Release identifier", "Before evidence", "After evidence", "Rollback decision", "Residual risk"]) {
  assert.ok(evidence.includes(evidenceField), `release evidence template must include ${evidenceField}`);
}

console.log("QA, monitoring, and KPI contract checks passed.");

