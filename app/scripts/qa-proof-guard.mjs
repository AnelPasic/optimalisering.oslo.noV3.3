import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const path = 'src/content/pages/home.json';
const original = readFileSync(path);
try {
  // Actual Astro-renderer regression: section approval and an env flag together
  // still cannot publish the two unapproved records. No case fixture is written.
  const edited = JSON.parse(original.toString());
  edited.homepage.proof.publicationApproved = true;
  writeFileSync(path, JSON.stringify(edited, null, 2) + '\n');
  const build = spawnSync('npm run build', { shell: true, encoding: 'utf8', env: { ...process.env, PUBLISH_PROOF: 'true' } });
  assert.equal(build.status, 0, build.stdout + build.stderr);
  const html = readFileSync('dist/index.html', 'utf8');
  assert.ok(!/id="resultater"|class="proof-section|Nysta|Oslo Privatklinikk|EVIDENCE_ONLY|READY_FOR_STRATEGY_REVIEW/.test(html));
  mkdirSync('../coordination/evidence/h007', { recursive: true });
  writeFileSync('../coordination/evidence/h007/proof-renderer-guard.json', JSON.stringify({ checkedAt: new Date().toISOString(), sectionApprovalTemporarilyEnabled: true, attemptedEnvironmentOverride: 'PUBLISH_PROOF=true', importedCaseStatuses: 'EVIDENCE_ONLY / READY_FOR_STRATEGY_REVIEW / namingPermission=GRANTED / publicationApproved=false', syntheticCasesWritten: 0, proofSectionRendered: false, privateCaseNamesRendered: false, originalHomeBytesRestored: true, finalBuild: 'Run npm run verify after this check', result: 'PASS' }, null, 2) + '\n');
  console.log('Actual proof renderer PASS: section approval + env flag cannot publish imported evidence-only cases.');
} finally {
  writeFileSync(path, original);
}
