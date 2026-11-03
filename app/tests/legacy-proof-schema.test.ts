import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {compositionSchema} from '../src/lib/route-family.ts';
import {getGlobalElement} from '../src/lib/home-builder.ts';
import {sharedContentSchema} from '../src/lib/shared-content.ts';
import {entryForFile} from './helpers/pages-cms-json.ts';

const read=(slug:string)=>JSON.parse(readFileSync('src/content/pages/'+slug+'.json','utf8'));
const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));

test('deprecated page-level proof is rejected across page archetypes rather than silently restored',()=>{
 for(const slug of ['home','konvertering','nettbutikkoptimalisering','seo','innsikt','priser','kontakt']){
  const page=read(slug);
  assert.equal(pageSchema.safeParse(page).success,true,slug+' is currently valid');
  const old={...page,proof:{publicationApproved:true,caseIds:['nysta'],eyebrow:'Old',heading:'Old',beforeLabel:'Before',afterLabel:'After',changeLabel:'Change'}};
  const validation=pageSchema.safeParse(old);
  assert.equal(validation.success,false,slug+' must reject old page-level proof');
  if(!validation.success)assert.ok(validation.error.issues.some(issue=>issue.path.includes('proof')),slug+' shows the obsolete field');
 }
});

test('service composition no longer exposes automatic proofAfter',()=>{
 const page=read('konvertering');
 assert.equal(compositionSchema.safeParse(page.composition).success,true);
 assert.equal(Object.hasOwn(page.composition.service,'proofAfter'),false);
 const legacy={...page.composition,service:{...page.composition.service,proofAfter:'prioritering'}};
 assert.equal(compositionSchema.safeParse(legacy).success,false,'old automatic proof anchor is rejected');
 assert.equal(pageSchema.safeParse({...page,composition:legacy}).success,false);
});

test('canonical global result master and existing ProofList placements stay supported',()=>{
 const master=getGlobalElement('resultater');
 assert.equal(master._block,'proof');
 assert.deepEqual(master.content.caseIds,['eurotents','nysta','helt-opplagt']);
 for(const slug of ['home','priser']){
  const p=read(slug);
  assert.ok(p.sections.some((s:any)=>s._block==='global'&&s.element==='resultater'),slug+' shares global Kunderesultater');
 }
 for(const slug of ['konvertering','nettbutikkoptimalisering']){
  const p=read(slug);
  assert.equal(p.sections.filter((s:any)=>s._block==='proofList').length,1,slug+' retains owner selection');
 }
 const service=entryForFile(cms,'app/src/content/pages/konvertering.json');
 const blocks=service.fields.find((f:any)=>f.name==='sections').blocks.map((b:any)=>b.name);
 for(const type of ['global','sharedContent','proofList'])assert.ok(blocks.includes(type),'CMS supports '+type);
 const global=service.fields.find((f:any)=>f.name==='sections').blocks.find((b:any)=>b.name==='global');
 assert.ok(cms.components[global.component].fields.find((f:any)=>f.name==='element').options.values.some((v:any)=>v.name==='resultater'));
 const library=JSON.parse(readFileSync('src/content/global-content/lafoitems.json','utf8'));
 assert.equal(sharedContentSchema.safeParse(library).success,true);
 assert.equal(sharedContentSchema.safeParse({...library,_block:'proofList'}).success,false,'custom text blocks are not a second proof master');
});

test('no page JSON or old Pages CMS form persists a local proof source',()=>{
 const pages=readdirSync('src/content/pages').filter(file=>file.endsWith('.json'));
 for(const file of pages)assert.equal(Object.hasOwn(JSON.parse(readFileSync('src/content/pages/'+file,'utf8')),'proof'),false,file);
 const services=entryForFile(cms,'app/src/content/pages/seo.json');
 assert.equal(services.fields.some((f:any)=>f.name==='proof'),false);
 const master=cms.content.find((group:any)=>group.name==='globalElements').items.find((item:any)=>item.name==='globalProof');
 assert.ok(master);
});
