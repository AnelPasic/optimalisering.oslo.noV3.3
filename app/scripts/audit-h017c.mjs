import {getHomepageBlock,getHomepageBlocks,isHomepageSectionVisible} from '../src/lib/home-builder.ts';
import {resolveProofListContent} from '../src/lib/proof-list.ts';
import assert from 'node:assert/strict';
import {stripTerminologyLinks} from './terminology-markup.mjs';
import {readFileSync,readdirSync} from 'node:fs';
import {getPublishableCases} from '../src/lib/proof.ts';

const read=file=>JSON.parse(readFileSync(file,'utf8'));
const records=readdirSync('src/content/proof').filter(f=>f.endsWith('.json')).map(f=>read('src/content/proof/'+f));
const global=read('src/content/global-elements/resultater.json').content;
const text=html=>stripTerminologyLinks(html).replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/\s+/g,' ').trim();
const checked=new Set();
for(const [slug,expectedIds] of [
 ['home',['eurotents','nysta','helt-opplagt']],
 ['priser',['eurotents','nysta','helt-opplagt']],
 ['konvertering',['nysta']],
 ['nettbutikkoptimalisering',['helt-opplagt','eurotents']]
 ]){
 const page=read(`src/content/pages/${slug}.json`);
 const html=readFileSync(slug==='home'?'dist/index.html':`dist/${slug}/index.html`,'utf8');
 let sectionId,slot;
 if(slug==='home'){
  slot=getHomepageBlock(page,'proof').content;sectionId='resultater';
  assert.ok(isHomepageSectionVisible(getHomepageBlock(page,'proof')));
  const ids=[...html.matchAll(/<section id="([^"]+)"/g)].map(m=>m[1]);
  const expected=getHomepageBlocks(page).filter(isHomepageSectionVisible).map(b=>b.id);
  assert.deepEqual(ids.filter(id=>expected.includes(id)),expected);
 }else if(slug==='priser'){
  assert.ok(page.sections.some(s=>s._block==='global'&&s.element==='resultater'),'pricing has explicit global Kunderesultater');
  sectionId='resultater';slot=global;
 }else{
  assert.equal(page.proof,undefined,'legacy local proof slot removed');
  assert.equal(page.composition?.service?.proofAfter,undefined,'old auto-insertion removed');
  const placements=page.sections.filter(s=>s._block==='proofList'&&s.visibility!=='hidden');
  assert.equal(placements.length,1,'one visible ProofList on '+slug);
  sectionId=placements[0].id;
  slot=resolveProofListContent(global,placements[0].proofList,records);
 }
 const cases=getPublishableCases(slot,records);
 assert.equal(cases.length,expectedIds.length,slug+' must render each approved case');
 assert.deepEqual(cases.map(p=>p.displayName),expectedIds.map(id=>records.find(record=>record.id===id)?.clientName),slug+' ordered selected cases');
 const matches=[...html.matchAll(new RegExp(`<section id="${sectionId}"[^>]*>(.*?)<\\/section>`,'gs'))];
 assert.equal(matches.length,1,slug+' one and only one proof section');
 const section=matches[0][1];
 assert.deepEqual([...section.matchAll(/<h3[^>]*>(.*?)<\/h3>/gs)].map(m=>text(m[1])),expectedIds.map(id=>records.find(record=>record.id===id)?.clientName));
 for(const proof of cases){
  for(const value of [proof.dominantMetric,proof.before,proof.after,proof.delta,proof.period.before,proof.period.after].filter(Boolean))
   assert.ok(text(section).includes(value),slug+' missing public result '+value);
  for(const hidden of [proof.intervention,proof.limitations])
   assert.ok(!text(html).includes(hidden),'Internal evidence must never render');
 }
 assert.ok(!/class="proof-work|class="proof-caveat/.test(html));
 for(const label of ['eyebrow','heading','beforeLabel','afterLabel'])
  assert.ok(text(section).includes(slot[label]),slug+' missing '+label);
 assert.ok(!/Oslo Privatklinikk|Tankeverksted|Oracles|evidenceMetrics|publicationApproved|strategyReviewEvidence|Windsor|coordination\//.test(html),'No private evidence may leak');
 checked.add(slug);
}
for(const file of readdirSync('src/content/pages').filter(f=>f.endsWith('.json'))){
 const page=read(`src/content/pages/${file}`);
 if(checked.has(page.slug))continue;
 const html=readFileSync(`dist/${page.slug}/index.html`,'utf8');
 assert.ok(!/class="proof-section"/.test(html),'Unexpected proof propagation on '+page.slug);
}
assert.ok(!readdirSync('dist').includes('resultater'),'No standalone results route');
console.log('ProofList static PASS: one global proof master, two ordered local selections, no duplicate local proof, no unauthorized data.');
