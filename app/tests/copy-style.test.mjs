import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, unlinkSync, rmdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

test('copy-style guard permits formal calculator notation but still rejects ornamental customer prose', () => {
  const root = mkdtempSync(join(tmpdir(), 'h017a-copy-'));
  const pageDir = join(root, 'src/content/pages'), componentDir = join(root, 'src/components');
  const pageFile = join(pageDir, 'fixture.json'), componentFile = join(componentDir, 'HomeLeverage.astro');
  const termDir = join(root, 'src/content/terminology'), termFile = join(termDir, 'glossary.json');
  const guard = resolve('scripts/audit-copy-style.mjs');
  try {
    mkdirSync(pageDir, { recursive: true }); mkdirSync(componentDir);
    writeFileSync(pageFile, '{}');
    mkdirSync(termDir);
    writeFileSync(termFile, readFileSync('src/content/terminology/glossary.json'));
    const math = '<span class="math-equation" data-current-equation>{visits} × {conversion} %</span>\ncurrentEquation.textContent = `${visits} × ${conversion} %`;\n[current, scenario, difference, percentage, currentEquation, scenarioEquation].forEach(output => output.textContent = \'–\');';
    const run = source => { writeFileSync(componentFile, source); return spawnSync(process.execPath, [guard], { cwd: root, encoding: 'utf8' }); };
    assert.equal(run(math).status, 0, 'formal math and numeric unavailable placeholder are functional notation');
    for (const copy of ['<p>Synlighet × konvertering</p>', '<h2>Vekst – for deg</h2>']) assert.notEqual(run(math + copy).status, 0);
  } finally {
    for (const file of [pageFile, componentFile, termFile]) unlinkSync(file);
    for (const dir of [pageDir, termDir, join(root, 'src/content'), componentDir, join(root, 'src'), root]) rmdirSync(dir);
  }
});
