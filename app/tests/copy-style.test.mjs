import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, unlinkSync, rmdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import { spawnSync } from 'node:child_process';

test('copy-style guard permits formal calculator notation but still rejects ornamental customer prose', () => {
  const root = mkdtempSync(join(tmpdir(), 'h017a-copy-'));
  const pageDir = join(root, 'src/content/pages'), componentDir = join(root, 'src/components');
  const pageFile = join(pageDir, 'home.json'), componentFile = join(componentDir, 'HomeLeverage.astro');
  // Every write below is confined to this mkdtemp fixture, never repository content.
  assert.notEqual(resolve(pageFile),resolve('src/content/pages/home.json'));
  assert.ok(resolve(pageFile).startsWith(resolve(root)+sep));
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
    const owner={uid:'8ac621d2-d9aa-40ae-9875-ea9c7a2c2462',body:['Avsnitt i denne seksjonen. Felles pakketekster og priser redigeres under Forside → Seksjoner → Pakker og priser.']};
    writeFileSync(pageFile,JSON.stringify({optionalSections:[owner]}));
    assert.equal(run(math).status,0,'exact incoming OWNER sentence survives required preservation');
    writeFileSync(pageFile,JSON.stringify({optionalSections:[{...owner,body:[owner.body[0]+' → nytt']}]}));
    assert.notEqual(run(math).status,0,'exception does not permit new arrow prose');
    writeFileSync(pageFile,'{}');
    const glossary = readFileSync(termFile, 'utf8');
    writeFileSync(termFile, JSON.stringify({ terms: [{ fullDefinition: 'Et søk etter «tannlege Ski».', simpleExample: 'Knappen «Bestill time».' }] }));
    assert.equal(run(math).status, 0, 'preserved glossary quotes are permitted in explanations and examples');
    for (const fixture of [
      { terms: [{ shortDefinition: 'Kort «forklaring».' }] },
      { terms: [{ fullDefinition: 'Vekst – for deg' }] },
      { terms: [{ simpleExample: 'En skreddersydd løsning' }] },
    ]) {
      writeFileSync(termFile, JSON.stringify(fixture));
      assert.notEqual(run(math).status, 0, 'the exception does not weaken other fields, punctuation or phrase rules');
    }
    writeFileSync(termFile, glossary);
    for (const copy of ['<p>Synlighet × konvertering</p>', '<h2>Vekst – for deg</h2>']) assert.notEqual(run(math + copy).status, 0);
  } finally {
    for (const file of [pageFile, componentFile, termFile]) unlinkSync(file);
    for (const dir of [pageDir, termDir, join(root, 'src/content'), componentDir, join(root, 'src'), root]) rmdirSync(dir);
  }
});
