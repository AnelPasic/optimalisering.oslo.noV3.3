import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {getGlobalElement} from '../src/lib/home-builder.ts';
import {resolveProofListContent} from '../src/lib/proof-list.ts';
import {getPublishableCases} from '../src/lib/proof.ts';
import {applyProofDisplayOverride} from '../src/lib/proof-presentation.ts';
import {pageSchema} from '../src/lib/content-schema.ts';
import {stripTerminologyLinks} from './terminology-markup.mjs';

const read=file=>JSON.parse(readFileSync(file,'utf8'));
const records=readdirSync('src/content/proof').filter(f=>f.endsWith('.json')).map(f=>read('src/content/proof/'+f));
const global=getGlobalElement('resultater').content;
const text=html=>stripTerminologyLinks(html).replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/\s+/g,' ').trim();
const dirs=['src/content/pages','src/content/pages/managed-services','src/content/pages/managed-articles'];
for(const dir of dirs)for(const file of readdirSync(dir).filter(f=>f.endsWith('.json'))){
 const raw=read(dir+'/'+file),slug=raw.slug,page=pageSchema.parse(raw);
 assert.equal(raw.proof,undefined,slug+': legacy local proof forbidden');
 assert.equal(raw.composition?.service?.proofAfter,undefined,slug+': no automatic insertion');
 const html=readFileSync(slug==='home'?'dist/index.html':'dist/'+slug+'/index.html','utf8');
 const placements=raw.sections.filter(s=>s.visibility!=='hidden'&&(s._block==='proofList'||s._block==='global'&&s.element==='resultater'));
 const expected=new Map();
 for(const row of placements){
  const id=row._block==='global'?'resultater':row.id;
  const slot=row._block==='global'?global:resolveProofListContent(global,row.proofList,records);
  const approved=getPublishableCases(slot,records);
  const ids=[...new Set(slot.caseIds)].filter(caseId=>getPublishableCases({...slot,caseIds:[caseId]},records).length===1);
  if(row._block==='global'&&page.kind!=='home'){
   assert.ok(slot.publicationApproved&&slot.caseIds.length,slug+': global proof approved');
   assert.equal(ids.length,slot.caseIds.length,slug+': all selected cases must have permission and evidence');
  }
  if(!approved.length)continue;
  assert.ok(!expected.has(id),slug+': unique proof anchor');
  expected.set(id,{slot,cases:approved.map((proof,index)=>applyProofDisplayOverride(proof,ids[index],slot.displayOverrides,records)),approved});
 }
 const matches=[...html.matchAll(/<section\b(?=[^>]*\bclass="[^"]*\bproof-section\b)[^>]*>([\s\S]*?)<\/section>/g)];
 assert.equal(matches.length,expected.size,slug+': only explicit approved proof placements render');
 for(const match of matches){
  const opening=match[0].slice(0,match[0].indexOf('>'));
  const id=opening.match(/\bid="([^"]+)"/)?.[1],entry=expected.get(id);
  assert.ok(entry,slug+': unrequested proof section '+id);
  expected.delete(id);
  const section=match[1];
  assert.deepEqual([...section.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map(m=>text(m[1])),entry.cases.map(p=>p.displayName),slug+': selected case order and public identity');
  for(const proof of entry.cases)for(const value of [proof.dominantMetric,proof.before,proof.after,proof.delta,proof.period.before,proof.period.after].filter(Boolean))
   assert.ok(text(section).includes(text(value)),slug+' missing public result '+value);
  for(const proof of entry.approved)for(const hidden of [proof.intervention,proof.limitations].filter(Boolean))
   assert.ok(!text(html).includes(text(hidden)),slug+': internal evidence must not render on the public page');
  for(const label of ['eyebrow','heading','beforeLabel','afterLabel'])assert.ok(text(section).includes(text(entry.slot[label])),slug+' missing '+label);
 }
 assert.equal(expected.size,0,slug+': no selected proof section omitted');
 assert.ok(!/class="proof-work|class="proof-caveat/.test(html));
 assert.ok(!/Oslo Privatklinikk|Tankeverksted|Oracles|evidenceMetrics|publicationApproved|strategyReviewEvidence|Windsor|coordination\//.test(html),'No private evidence may leak: '+slug);
}
assert.ok(!readdirSync('dist').includes('resultater'),'No standalone results route');
console.log('ProofList static PASS: explicit CMS placements and selected approved public projections; no unauthorized data.');
