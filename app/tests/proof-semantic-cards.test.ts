import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source=readFileSync('src/components/HomeProof.astro','utf8');
const master=JSON.parse(readFileSync('src/content/global-elements/resultater.json','utf8'));

test('proof section and cards use theme-safe daisyUI color pairs',()=>{
  assert.ok(source.includes('proof-section section-space bg-base-200 text-base-content'));
  assert.ok(source.includes('card card-border bg-base-100 text-base-content h-full overflow-hidden'));
  assert.ok(source.includes("'proof-featured bg-secondary text-secondary-content':'bg-info text-info-content'"));
  assert.doesNotMatch(source, /#[0-9a-f]{6}\b/i, 'proof CSS should not hardcode colors');
  assert.doesNotMatch(source, /\[border:var\(--border-subtle\)\]/, 'native card-border owns card borders');
});

test('all mediaCards use one value typography and still use approved case projection',()=>{
  assert.ok(source.includes('getPublishableCases(content, records)'));
  assert.ok(source.includes("layout==='mediaCards'"));
  assert.ok(source.includes('data-proof-index={index}'));
  assert.ok(source.includes('resolveProofCaseVisual(id,content,content,records)'));
  assert.match(source,/\.proof-values strong\s*\{[^}]*font-size:\s*var\(--type-h3\)/s);
  assert.doesNotMatch(source,/\.proof-home\s*>\s*li:first-child\s+\.proof-values\s+strong/, 'no first-card-only oversized figures');
  assert.ok(source.includes('.proof-primary .proof-featured .proof-comparison strong'), 'legacy featured service hierarchy stays scoped');
  assert.deepEqual(master.content.caseIds,['eurotents','nysta','helt-opplagt']);
  assert.equal(master.content.layout,'mediaCards');
  assert.equal(master.content.featuredVisual.src,'/images/proof/eurotents.jpg');
  assert.equal(master.content.caseVisuals.nysta.src,'/images/proof/nysta.jpg');
  assert.equal(master.content.caseVisuals['helt-opplagt'].src,'/images/proof/heltopplagt.jpg');
});
