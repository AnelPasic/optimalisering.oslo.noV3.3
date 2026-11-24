import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {pageSchema} from '../src/lib/content-schema.ts';
import {getGlobalElement} from '../src/lib/home-builder.ts';
import {getSelectedHeroProof} from '../src/lib/hero-proof.ts';
import {getPublishableCases} from '../src/lib/proof.ts';

const read=(path:string)=>readFileSync(new URL(path,import.meta.url),'utf8');
const page=JSON.parse(read('../src/content/pages/chatgpt-ads.json'));


test('ChatGPT Ads is an editable CMS service and is reachable from navigation',()=>{
 const parsed=pageSchema.safeParse(page);
 assert.equal(parsed.success,true,parsed.success?'':JSON.stringify(parsed.error.issues));
 assert.equal(page.slug,'chatgpt-ads');
 assert.equal(page.kind,'service');
 assert.equal(page.hero.primaryCta.href,'#priser');
 assert.equal(page.hero.secondaryCta.href,'#sjekk');
 if(page.hero.visual.kind==='image')assert.ok(existsSync(new URL('../public'+page.hero.visual.image.src,import.meta.url)),'saved Hero image exists');
 const nav=JSON.parse(read('../src/content/site-chrome/header.json'));
 const links=nav.navigation.flatMap((item:any)=>item.mega?.columns?.flatMap((col:any)=>col.links)??[]);
 assert.equal(links.filter((item:any)=>item.href==='/chatgpt-ads/').length,1);
 assert.match(read('../src/pages/sitemap.xml.ts'),/getCollection\('pages'\)/);
});

test('Current CMS sequence and protected masters remain valid; case publication requires evidence',()=>{
 const parsed=pageSchema.parse(page);
 const visible=parsed.sections.filter(s=>s.visibility!=='hidden');
 assert.equal(new Set(visible.map(s=>s.id)).size,visible.length);
 for(const id of ['priser','sjekk'])assert.equal(page.sections.filter((s:any)=>s._block==='global'&&s.element===id).length,1);
 for(const cta of [page.hero.primaryCta,page.hero.secondaryCta]){
  if(cta?.href.startsWith('#'))assert.ok(visible.some(s=>s.id===cta.href.slice(1)),cta.href);
 }
 const records=readdirSync(new URL('../src/content/proof/',import.meta.url)).filter(f=>f.endsWith('.json')).map(f=>JSON.parse(read('../src/content/proof/'+f)));
 const master=getGlobalElement('resultater').content;
 if(page.hero.featuredProofCaseId) {
  const selection=getSelectedHeroProof(page.hero.featuredProofCaseId,master,records);
  assert.ok(selection,'selected Hero proof must have approval, permission and evidence in the shared master');
 }
 if(page.sections.some((s:any)=>s._block==='global'&&s.element==='resultater'&&s.visibility!=='hidden')){
  assert.ok(master.publicationApproved);
  for(const id of master.caseIds)assert.equal(getPublishableCases({...master,caseIds:[id]},records).length,1,id);
 }

});

test('Project copy QA for new page and no unrequested technical IDs',()=>{
 const forbidden=/[\u2013\u2014\u2011\u2212\u2026\u2192\u2190\u2197\u2198\u201c\u201d\u2018\u2019\u00ab\u00bb\u00d7\u00b7]/u;
 const cliches=/det handler ikke om|ikke bare|med andre ord|kan bidra til|bidrar til å sikre|gjør det mulig å|\bhelhetlig\b|\bsømløs\b|\bskreddersydd\b|\brobust\b|\bdatadrevet\b/i;
 function inspect(v:unknown):void{
  if(typeof v==='string'){assert.equal(forbidden.test(v),false,v);assert.equal(cliches.test(v),false,v);}
  else if(Array.isArray(v))v.forEach(inspect);
  else if(v&&typeof v==='object')Object.values(v).forEach(inspect);
 }
 inspect(page);
 const mws=read('../../coordination/H1-LAB.md');
 assert.match(mws,/Evaluate the \*\*complete Hero\*\*/);
 assert.doesNotMatch(mws,/Read the H1 \*\*alone\*\*/);
});
