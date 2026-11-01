import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import YAML from 'yaml';
import {getPublishableCases,proofContentSchema} from '../src/lib/proof.ts';
import {getGlobalElement} from '../src/lib/home-builder.ts';
import {pageSchema} from '../src/lib/content-schema.ts';
import {cmsJsonSave,entryForFile} from './helpers/pages-cms-json.ts';

const read=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const records=readdirSync('src/content/proof').filter(p=>p.endsWith('.json')).map(p=>read('src/content/proof/'+p));
const global=read('src/content/global-elements/resultater.json').content;
const pages=['home','synlighet','seo','priser','konvertering','nettbutikkoptimalisering'].map(slug=>read('src/content/pages/'+slug+'.json'));

test('only global Kunderesultater controls published proof',()=>{
  assert.deepEqual(getPublishableCases(global,records).map(p=>p.displayName),['Eurotents','Nysta','Helt Opplagt']);
  assert.deepEqual(getGlobalElement('resultater').content,global);
  for(const page of pages){
    assert.equal(Object.hasOwn(page,'proof'),false,page.slug+' has no root proof');
    assert.equal(page.sections.some((s:any)=>s._block==='proof'),false,page.slug+' has no local proof block');
    assert.equal(pageSchema.safeParse(page).success,true,page.slug+' remains valid');
    const hasGlobal=page.sections.some((s:any)=>s._block==='global'&&s.element==='resultater'&&s.visibility!=='hidden');
    assert.equal(hasGlobal,['home','synlighet','seo','priser'].includes(page.slug),page.slug+' proof must be explicitly global');
  }
});

test('proof evidence still requires permission, period comparability and publication approval',()=>{
 for(const id of ['eurotents','nysta','helt-opplagt']){
  const record=records.find(r=>r.id===id);
  assert.equal(getPublishableCases({...global,caseIds:[id]},records).length,1);
  for(const patch of [{period:{...record.period,comparable:false}},{publicationApproved:false},{namingPermission:'NEEDS_PERMISSION'},{strategyReviewStatus:'READY_FOR_STRATEGY_REVIEW'},{before:null}]){
    assert.deepEqual(getPublishableCases({...global,caseIds:[id]},[proofContentSchema.parse({...record,...patch})]),[]);
  }
 }
 assert.deepEqual(getPublishableCases({...global,publicationApproved:false},records),[]);
});

test('CMS cannot create local proof but can still edit the global master and read evidence',()=>{
 const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
 const editor=entryForFile(cms,'app/src/content/pages/konvertering.json');
 const blocks=editor.fields.find((f:any)=>f.name==='sections').blocks;
 assert.equal(editor.fields.some((f:any)=>f.name==='proof'),false);
 assert.equal(blocks.some((b:any)=>b.name==='proof'),false);
 const globalEditor=cms.content.find((e:any)=>e.name==='globalElements').items.find((e:any)=>e.name==='globalProof');
 assert.ok(globalEditor);
 assert.ok(globalEditor.fields.find((f:any)=>f.name==='content').fields.some((f:any)=>f.name==='displayOverrides'));
 const registry=cms.content.find((e:any)=>e.name==='proofCases');
 for(const op of ['create','rename','delete'])assert.equal(registry.operations[op],false);
 for(const page of pages){
   if(page.kind!=='service')continue;
   const saved=JSON.parse(cmsJsonSave(page,page,entryForFile(cms,'app/src/content/pages/'+page.slug+'.json'),cms));
   assert.deepEqual(saved,page);
 }
 const conversion=pages.find(p=>p.slug==='konvertering')!;
 assert.equal(pageSchema.safeParse({...conversion,proof:{}}).success,false);
 assert.equal(pageSchema.safeParse({...conversion,sections:[...conversion.sections,{_block:'proof',id:'resultater',presentation:global}]}).success,false);
});
