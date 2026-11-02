import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import YAML from 'yaml';
import {proofListSchema,resolveProofListContent,proofListAnchorSchema} from '../src/lib/proof-list.ts';
import {getPublishableCases} from '../src/lib/proof.ts';
import {resolveHomepageSections} from '../src/lib/home-builder.ts';
import {pageSchema} from '../src/lib/content-schema.ts';
import {cmsJsonSave,entryForFile} from './helpers/pages-cms-json.ts';

const read=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const master=read('src/content/global-elements/resultater.json').content;
const records=readdirSync('src/content/proof').filter(p=>p.endsWith('.json')).map(p=>read('src/content/proof/'+p));
const home=read('src/content/pages/home.json');
const service=read('src/content/pages/seo.json');

test('empty ProofList inherits global selection and layout without modifying master',()=>{
 const original=structuredClone(master);
 const result=resolveProofListContent(master,{},records);
 assert.deepEqual(result.caseIds,master.caseIds);
 assert.equal(result.layout,master.layout);
 assert.deepEqual(master,original);
});

test('multiple approved cases follow exactly the local ordered choices',()=>{
 const selected=proofListSchema.parse({layout:'mediaCards',entries:[{caseId:'nysta'},{caseId:'eurotents'}]});
 const result=resolveProofListContent(master,selected,records);
 assert.deepEqual(result.caseIds,['nysta','eurotents']);
 assert.equal(result.layout,'mediaCards');
 assert.deepEqual(getPublishableCases(result,records).map(c=>c.displayName),['Nysta','Eurotents']);
 assert.deepEqual(master.caseIds,['eurotents','nysta','helt-opplagt']);
 assert.equal(result.featuredVisual?.caseId,master.featuredVisual?.caseId);
});

test('invalid or unauthorised selections cannot become public proof',()=>{
 assert.equal(proofListSchema.safeParse({entries:[{caseId:'nysta'},{caseId:'nysta'}]}).success,false);
 assert.equal(proofListSchema.safeParse({layout:'unknown'}).success,false);
 assert.equal(proofListAnchorSchema.safeParse('resultater').success,false);
 assert.equal(proofListAnchorSchema.safeParse('proof-kunder').success,true);
 assert.throws(()=>resolveProofListContent(master,{entries:[{caseId:'ukjent'}]},records));
 const blocked=records.map(x=>x.id==='nysta'?{...x,publicationStatus:'WITHDRAWN'}:x);
 assert.throws(()=>resolveProofListContent(master,{entries:[{caseId:'nysta'}]},blocked));
 assert.throws(()=>resolveProofListContent({...master,publicationApproved:false},{entries:[{caseId:'nysta'}]},records));
});

test('ProofList is optional and independently movable on home and standard pages',()=>{
 const cfg={layout:'alternating',entries:[{caseId:'helt-opplagt'},{caseId:'nysta'}]};
 const row={_block:'proofList',id:'proof-kunder',proofList:cfg};
 const homepage={...home,sections:[...home.sections,row]};
 const parsedHome=resolveHomepageSections(homepage);
 assert.ok(parsedHome.some(x=>x._block==='proofList'&&x.id==='proof-kunder'));
 assert.equal(pageSchema.safeParse(homepage).success,true);
 const draft={...service,sections:[...service.sections,row]};
 assert.equal(pageSchema.safeParse(draft).success,true);
 assert.equal(pageSchema.safeParse({...service,sections:[...service.sections,row,row]}).success,false);
 assert.equal(pageSchema.safeParse({...service,sections:[...service.sections,{...row,id:'resultater'}]}).success,false);
});

test('native Pages CMS exposes ProofList in every ordinary section builder and roundtrips ordered cases',()=>{
 const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
 const group=cms.content.find((g:any)=>g.name==='serviceGroup');
 const serviceEditor=group.items.find((e:any)=>e.name==='services');
 const homeEditor=cms.content.find((e:any)=>e.name==='homepage');
 const indexEditor=cms.content.find((e:any)=>e.name==='insight').items.find((e:any)=>e.name==='insightOverview');
 for(const editor of [serviceEditor,homeEditor,indexEditor]){
  const section=editor.fields.find((f:any)=>f.name==='sections');
  const block=section.blocks.find((b:any)=>b.name==='proofList');
  assert.ok(block,editor.name+' must include ProofList');
  assert.equal(block.component,'sectionProofList');
 }
 const block=cms.components.sectionProofList;
 const cfg=block.fields.find((f:any)=>f.name==='proofList');
 const entries=cfg.fields.find((f:any)=>f.name==='entries');
 assert.equal(entries.type,'object');
 assert.ok(entries.list);
 const reference=entries.fields.find((f:any)=>f.name==='caseId');
 assert.equal(reference.options.collection,'proofCases');
 assert.equal(reference.type,'reference');
 const row={_block:'proofList',id:'proof-kunder',proofList:{layout:'mediaCards',entries:[{caseId:'nysta'},{caseId:'eurotents'}]}};
 for(const [slug,source] of [['seo',service],['home',home]] as const){
  const editor=entryForFile(cms,'app/src/content/pages/'+slug+'.json');
  const edited={...source,sections:[...source.sections,row]};
  const result=JSON.parse(cmsJsonSave(source,edited,editor,cms));
  assert.deepEqual(result.sections.at(-1),row,slug+' selection and ordering must survive save');
  assert.deepEqual(result.hero,source.hero);
  assert.deepEqual(result.seo,source.seo);
 }
});

test('public renderers provide a ProofList branch without disturbing legacy proof',()=>{
 const paths=[
 'src/components/HomepageBlock.astro','src/components/ServiceFamilyPage.astro',
 'src/components/InnerPage.astro','src/components/PricingPage.astro','src/components/InsightIndexPage.astro'
 ];
 for(const path of paths)assert.match(readFileSync(path,'utf8'),/ProofList/,path);
 const proof=readFileSync('src/components/HomeProof.astro','utf8');
 assert.match(proof,/<section id=\{sectionId\}/);
 assert.match(proof,/sectionId = 'resultater'/);
 for(const slug of ['konvertering','nettbutikkoptimalisering']){
  const page=read('src/content/pages/'+slug+'.json');
  assert.equal(page.proof,undefined,'legacy service proof has been removed: '+slug);
  assert.equal(page.sections.filter((section:any)=>section._block==='proofList').length,1);
 }
});
