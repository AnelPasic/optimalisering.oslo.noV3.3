import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { getPublishableCases } from '../src/lib/proof.ts';

const records = readdirSync('src/content/proof').filter(f => f.endsWith('.json')).map(f => JSON.parse(readFileSync(`src/content/proof/${f}`)));
const text = html => html.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/\s+/g, ' ').trim();
for (const [slug, names] of [['home', ['Eurotents', 'Nysta', 'Helt Opplagt']], ['konvertering', ['Nysta']], ['synlighet', ['Helt Opplagt']]]) {
  const page = JSON.parse(readFileSync(`src/content/pages/${slug}.json`));
  const html = readFileSync(slug === 'home' ? 'dist/index.html' : `dist/${slug}/index.html`, 'utf8');
  const slot = slug === 'home' ? page.homepage.proof : page.proof;
  const cases = getPublishableCases(slot, records);
  assert.deepEqual(cases.map(p => p.displayName), names);
  const section = html.match(/<section id="resultater"[^>]*>(.*?)<\/section>/s)?.[1];
  assert.ok(section);
  assert.deepEqual([...section.matchAll(/<h3[^>]*>(.*?)<\/h3>/gs)].map(m => text(m[1])), names);
  assert.equal((section.match(/proof-featured/g) ?? []).length, 1);
  for (const proof of cases) for (const value of [proof.dominantMetric, proof.before, proof.after, proof.delta, proof.period.before, proof.period.after, proof.intervention, proof.limitations].filter(Boolean)) assert.ok(text(section).includes(value), value);
  for (const label of ['eyebrow', 'heading', 'beforeLabel', 'afterLabel', 'changeLabel']) assert.ok(text(section).includes(slot[label]));
  const ids = [...html.matchAll(/<section id="([^"]+)"/g)].map(m => m[1]);
  assert.ok(ids.indexOf('resultater') > ids.indexOf(slug === 'home' ? 'priser' : 'prioritering'));
  assert.ok(ids.indexOf('resultater') < ids.indexOf(slug === 'home' ? 'mekanisme' : 'service-priser'));
  assert.ok(!/Oslo Privatklinikk|Tankeverksted|Oracles|evidenceMetrics|publicationApproved|strategyReviewEvidence|Windsor|coordination\/|1\.403|0\.058|31\/50|16 265/.test(html), 'No private evidence or additional measurements');
  const publicStrings = cases.flatMap(p => [p.displayName, p.dominantMetric, p.before, p.after, p.delta, p.period.before, p.period.after, p.intervention, p.limitations]).filter(Boolean);
  for (const value of publicStrings) assert.ok(!/[–—→“”×]/u.test(value), 'COPY-STYLE');
}
for (const file of readdirSync('src/content/pages').filter(f => f.endsWith('.json'))) {
  const page = JSON.parse(readFileSync(`src/content/pages/${file}`));
  if (['home', 'synlighet', 'konvertering'].includes(page.slug)) continue;
  const html = readFileSync(`dist/${page.slug}/index.html`, 'utf8');
  assert.ok(!/id="resultater"|Eurotents|Nysta|Helt Opplagt|Oslo Privatklinikk/.test(html), 'No proof propagation');
}
assert.ok(!readdirSync('dist').includes('resultater'), 'No standalone results route');
console.log('H-017C static PASS: exact final placements/hierarchy/periods/work/readable caveats, no extra metrics/provenance, COPY-STYLE and no propagation.');
