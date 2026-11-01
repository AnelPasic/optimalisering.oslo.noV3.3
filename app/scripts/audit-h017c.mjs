import {getHomepageBlock,getHomepageBlocks,isHomepageSectionVisible} from '../src/lib/home-builder.ts';
import assert from 'node:assert/strict';
import {stripTerminologyLinks} from './terminology-markup.mjs';
import {readFileSync,readdirSync} from 'node:fs';
import {getPublishableCases} from '../src/lib/proof.ts';

const records=readdirSync('src/content/proof').filter(f=>f.endsWith('.json')).map(f=>JSON.parse(readFileSync('src/content/proof/'+f)));
const text=html=>stripTerminologyLinks(html).replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/\s+/g,' ').trim();
const global=JSON.parse(readFileSync('src/content/global-elements/resultater.json')).content;
const expected=[
 ['home',['Eurotents','Nysta','Helt Opplagt']],
 ['konvertering',['Nysta']],
 ['lokal-seo',['Eurotents','Nysta','Helt Opplagt']],
 ['priser',['Eurotents','Nysta','Helt Opplagt']],
];
for(const [slug,names] of expected){
 const page=JSON.parse(readFileSync('src/content/pages/'+slug+'.json'));
 const html=readFileSync(slug==='home'?'dist/index.html':`dist/${slug}/index.html`,'utf8');
 const slot=slug==='home'?getHomepageBlock(page,'proof').content:slug==='konvertering'?page.sections.find(s=>s._block==='proof').presentation:global;
 const cases=getPublishableCases(slot,records);
 assert.deepEqual(cases.map(p=>p.displayName),names,slug+' proof selection');
 const section=html.match(/<section id="resultater"[^>]*>(.*?)<\/section>/s)?.[1];
 if(slug==='home'&&!isHomepageSectionVisible(getHomepageBlock(page,'proof'))){assert.equal(section,undefined);continue}
 assert.ok(section,slug+' proof section');
 assert.deepEqual([...section.matchAll(/<h3[^>]*>(.*?)<\/h3>/gs)].map(m=>text(m[1])),names);
 assert.equal((section.match(/proof-featured/g)??[]).length,1);
 for(const proof of cases){
  for(const val of [proof.dominantMetric,proof.before,proof.after,proof.delta,proof.period.before,proof.period.after].filter(Boolean))assert.ok(text(section).includes(val),slug+' missing '+val);
  for(const internal of [proof.intervention,proof.limitations])assert.ok(!text(html).includes(internal),'internal records must not render');
 }
 assert.ok(!/class="proof-work|class="proof-caveat/.test(html));
 for(const key of ['eyebrow','heading','beforeLabel','afterLabel'])assert.ok(text(section).includes(slot[key]),slug+' '+key);
 const ids=[...html.matchAll(/<section id="([^"]+)"/g)].map(x=>x[1]);
 if(slug==='home'){
  const expectedSections=getHomepageBlocks(page).filter(isHomepageSectionVisible).map(b=>b.id);
  assert.deepEqual(ids.filter(id=>expectedSections.includes(id)),expectedSections);
 }else if(slug==='konvertering'){
  assert.ok(ids.indexOf('resultater')>ids.indexOf('prioritering'));
  assert.ok(ids.indexOf('resultater')<ids.indexOf('service-priser'));
 }
 assert.ok(!/Oslo Privatklinikk|Tankeverksted|Oracles|evidenceMetrics|strategyReviewEvidence|Windsor|coordination\/|1\.403|0\.058|31\/50|16 265/.test(html));
}
for(const file of readdirSync('src/content/pages').filter(f=>f.endsWith('.json'))){
 const page=JSON.parse(readFileSync('src/content/pages/'+file));
 if(expected.some(([slug])=>slug===page.slug))continue;
 const html=readFileSync(`dist/${page.slug}/index.html`,'utf8');
 assert.ok(!/<section id="resultater"/.test(html),page.slug+' leaked proof');
}
console.log('H-017D proof audit PASS: same approved evidence, exact placements and no private proof exposure.');
