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
    writeFileSync(termFile, '{}');
    const math = '<span class="math-equation" data-current-equation>{visits} × {conversion} %</span>\ncurrentEquation.textContent = `${visits} × ${conversion} %`;\n[current, scenario, difference, percentage, currentEquation, scenarioEquation].forEach(output => output.textContent = \'–\');';
    const run = source => { writeFileSync(componentFile, source); return spawnSync(process.execPath, [guard], { cwd: root, encoding: 'utf8' }); };
    assert.equal(run(math).status, 0, 'formal math and numeric unavailable placeholder are functional notation');
    const advanced={headerJs:'window.note="→";\u2028',footerJs:'<img src="/pixel.gif" alt="«code»">'};
    writeFileSync(pageFile,JSON.stringify({advanced}));
    assert.equal(run(math).status,0,'advanced JavaScript and HTML are not editorial prose');
    writeFileSync(pageFile,JSON.stringify({advanced,hero:{title:'Vekst – for deg'}}));
    assert.notEqual(run(math).status,0,'advanced code never exempts ordinary customer copy');
    const owner={uid:'8ac621d2-d9aa-40ae-9875-ea9c7a2c2462',body:['Avsnitt i denne seksjonen. Felles pakketekster og priser redigeres under Forside → Seksjoner → Pakker og priser.']};
    writeFileSync(pageFile,JSON.stringify({sections:[owner]}));
    assert.equal(run(math).status,0,'exact incoming OWNER sentence survives required preservation');
    writeFileSync(pageFile,JSON.stringify({sections:[{...owner,body:[owner.body[0]+' → nytt']}]}));
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


test('hidden formatting is rejected in decoded CMS copy including nested articles; normal line breaks remain valid', () => {
  const root = mkdtempSync(join(tmpdir(), 'mws-hidden-copy-'));
  const guard = resolve('scripts/audit-copy-style.mjs');
  const pageDir = join(root, 'src/content/pages'), articleDir = join(pageDir, 'managed-articles');
  const termDir = join(root, 'src/content/terminology'), componentDir = join(root, 'src/components');
  const article = join(articleDir, 'example.json'), term = join(termDir, 'glossary.json');
  try {
    mkdirSync(articleDir, { recursive: true }); mkdirSync(termDir); mkdirSync(componentDir);
    writeFileSync(term, '{}');
    const run = value => {
      writeFileSync(article, JSON.stringify({hero:{title:'En god overskrift'},sections:[{body:[value],href:'/example\u200b'}]}));
      return spawnSync(process.execPath, [guard], {cwd:root, encoding:'utf8'});
    };
    assert.equal(run('Vanlig avsnitt.\n\n- Liste\r\n- Neste punkt').status, 0);
    for (const char of ['\u000b','\u000c','\u0085','\u00ad','\u200b','\u2028','\u2029','\u2060','\ufeff','\r']) {
      const result = run('Ord'+char+'ord');
      assert.notEqual(result.status, 0);
      const cp = 'U+'+char.codePointAt(0).toString(16).toUpperCase().padStart(4,'0');
      assert.ok(result.stderr.includes(cp), result.stderr);
      assert.ok(result.stderr.includes('managed-articles'));
    }
  } finally {
    unlinkSync(article); unlinkSync(term);
    for (const dir of [articleDir,pageDir,termDir,join(root,'src/content'),componentDir,join(root,'src'),root]) rmdirSync(dir);
  }
});

test('all eleven absolute phrase rules remain hard failures; ASCII punctuation is valid', () => {
  const root = mkdtempSync(join(tmpdir(), 'copy-phrase-'));
  const guard = resolve('scripts/audit-copy-style.mjs');
  const pages = join(root, 'src/content/pages'), terms = join(root, 'src/content/terminology');
  const components = join(root, 'src/components'), page = join(pages, 'example.json'), term = join(terms, 'glossary.json');
  try {
    mkdirSync(pages,{recursive:true}); mkdirSync(terms); mkdirSync(components);
    writeFileSync(term,'{}');
    const run = value => {
      writeFileSync(page, JSON.stringify({hero:{title:value}}));
      return spawnSync(process.execPath,[guard],{cwd:root,encoding:'utf8'});
    };
    const ok = run('En tydelig overskrift - med vanlig tegnsetting.');
    assert.equal(ok.status,0,ok.stderr);
    for (const phrase of ['det handler ikke om','ikke bare','med andre ord','kan bidra til','bidrar til å sikre','gjør det mulig å','helhetlig','sømløse','skreddersydd','robuste','datadrevet']) {
      const result=run(phrase);
      assert.notEqual(result.status,0,phrase);
      assert.match(result.stderr,/avoid template-like phrase/);
    }
    const ellipsis=run('Vent...');
    assert.notEqual(ellipsis.status,0);
    assert.match(ellipsis.stderr,/avoid ellipsis/);
  } finally {
    unlinkSync(page); unlinkSync(term);
    for (const dir of [pages,terms,join(root,'src/content'),components,join(root,'src'),root]) rmdirSync(dir);
  }
});
