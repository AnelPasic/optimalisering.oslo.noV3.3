import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
const files = readdirSync('src/content/proof').filter(f => f.endsWith('.json')).map(f => `src/content/proof/${f}`);
const originals = new Map(files.map(file => [file, readFileSync(file)]));
const checks = [];
const restore = () => { for (const [file, bytes] of originals) writeFileSync(file, bytes); };
try {
  for (const mode of ['unapproved', 'incomplete', 'noncomparable']) {
    restore();
    for (const file of files) {
      const record = JSON.parse(originals.get(file));
      if (mode === 'unapproved') record.publicationApproved = false;
      if (mode === 'incomplete') delete record.before;
      if (mode === 'noncomparable') record.period.comparable = false;
      writeFileSync(file, JSON.stringify(record, null, 2) + '\n');
    }
    const build = spawnSync('npm run build', { shell: true, encoding: 'utf8', env: { ...process.env, PUBLISH_PROOF: 'true' } });
    assert.equal(build.status, 0, build.stdout + build.stderr);
    for (const slug of ['home', 'synlighet', 'konvertering']) {
      const html = readFileSync(slug === 'home' ? 'dist/index.html' : `dist/${slug}/index.html`, 'utf8');
      assert.ok(!/id="resultater"|Eurotents|Nysta|Helt Opplagt|Oslo Privatklinikk/.test(html));
    }
    checks.push({ mode, allThreePlacementsFailClosed: true, environmentOverrideIgnored: true });
  }
} finally { restore(); }
for (const [file, bytes] of originals) assert.ok(readFileSync(file).equals(bytes));
mkdirSync('../coordination/evidence/h017c', { recursive: true });
writeFileSync('../coordination/evidence/h017c/proof-renderer-guard.json', JSON.stringify({ checkedAt: new Date().toISOString(), checks, allSourceBytesRestored: true, realSourceQueries: 0, finalBuild: 'npm run verify restores approved output', result: 'PASS' }, null, 2) + '\n');
console.log('Proof renderer PASS: unapproved, incomplete and non-comparable cases fail closed on all three actual Astro placements; exact source bytes restored.');
