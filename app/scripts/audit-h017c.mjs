import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {getPublishableCases} from '../src/lib/proof.ts';
import {stripTerminologyLinks} from './terminology-markup.mjs';

const read=(path)=>JSON.parse(readFileSync(path,'utf8'));
const records=readdirSync('src/content/proof').filter(f=>f.endsWith('.json')).map(f=>read('src/content/proof/'+f));
const global=read('src/content/global-elements/resultater.json').content;
const approved=getPublishableCases(global,records);
assert.deepEqual(approved.map(c=>c.displayName),['Eurotents','Nysta','Helt Opplagt']);
const text=(html)=>stripTerminologyLinks(html).replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/\s+/g,' ').trim();

for(const file of readdirSync('src/content/pages').filter(f=>f.endsWith('.json'))){
 const page=read('src/content/pages/'+file);
 const html=readFileSync(page.kind==='home'?'dist/index.html':`dist/${page.slug}/index.html`,'utf8');
 const visible=page.sections.some(s=>s._block==='global'&&s.element==='resultater'&&s.visibility!=='hidden');
 const match=html.match(/<section id="resultater"[^>]*>(.*?)<\/section>/s);
 assert.equal(Boolean(match),visible,`${page.slug}: only the global Kunderesultater placement may produce a proof section`);
 assert.equal(Object.hasOwn(page,'proof'),false,`${page.slug}: legacy page.proof cannot return`);
 assert.equal(page.sections.some(s=>s._block==='proof'),false,`${page.slug}: local proof block must not return`);
 if(visible){
  const proof=match[1];
  assert.deepEqual([...proof.matchAll(/<h3[^>]*>(.*?)<\/h3>/gs)].map(x=>text(x[1])),approved.map(x=>x.displayName));
  for(const item of approved){
   for(const value of [item.dominantMetric,item.before,item.after,item.delta,item.period.before,item.period.after].filter(Boolean))
    assert.ok(text(proof).includes(value),`${page.slug}: missing published fact ${value}`);
  }
  for(const key of ['eyebrow','heading','beforeLabel','afterLabel'])
   assert.ok(text(proof).includes(global[key]),`${page.slug}: missing global heading/label ${key}`);
 }
 for(const item of approved){
  for(const internal of [item.intervention,item.limitations].filter(Boolean))
   assert.ok(!text(html).includes(internal),`${page.slug}: private evidence leaked`);
 }
 assert.ok(!/Oslo Privatklinikk|Tankeverksted|Oracles|evidenceMetrics|strategyReviewEvidence|Windsor|coordination\/|1\.403|0\.058|31\/50|16 265/.test(html));
}
assert.equal(readdirSync('src/content/pages').includes('lokal-seo.json'),false,'OWNER deleted Lokal SEO; never restore');
console.log('H-017D proof audit PASS: global-only placements, approved case data, private evidence protection and OWNER deletion retained.');
