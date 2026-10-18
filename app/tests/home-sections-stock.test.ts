import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import * as builder from '../src/lib/home-builder.ts';
import {cmsJsonSave,entryForFile,resolveField,assertPreservedContent} from './helpers/pages-cms-json.ts';
const input=JSON.parse(readFileSync('src/content/pages/home.json','utf8'));
const order=['behov','regneeksempel','sjekk','priser','resultater','mekanisme','passer','sporsmal'];
const source=()=>{const {optionalSections,...core}=structuredClone(input);return core;};
const optional=(id='ekstra',placement='before:regneeksempel')=>({...structuredClone(source().sections.mekanisme),id,uid:randomUUID(),name:id,heading:'Valgfritt innhold',body:['Kun valgfri seksjon'],items:[],placement});
test('fixed stock source is accepted without display changes and optional slots resolve stably',()=>{
 const p=source();assert.equal(pageSchema.safeParse(p).success,true);
 assert.deepEqual(builder.getHomepageBlocks(pageSchema.parse(p)).map(b=>b.id),order);
 p.optionalSections=[optional('en'),optional('to'),optional('tre','after:sporsmal')];
 assert.deepEqual(builder.getHomepageBlocks(pageSchema.parse(p)).map(b=>b.id),['behov','en','to','regneeksempel',...order.slice(2),'tre']);
 p.optionalSections.reverse();assert.deepEqual(builder.getHomepageBlocks(pageSchema.parse(p)).map(b=>b.id),['behov','to','en','regneeksempel',...order.slice(2),'tre']);
 for(const id of order)for(const side of ['before','after']){p.optionalSections=[optional('flytt',`${side}:${id}`)];const ids=builder.getHomepageBlocks(pageSchema.parse(p)).map(b=>b.id);assert.equal(ids.indexOf('flytt'),ids.indexOf(id)+(side==='before'?-1:1));}
});
test('core identity and optional collision safeguards include hidden records',()=>{
 for(const edit of [(p:any)=>delete p.sections.sjekk,(p:any)=>p.sections.sjekk.uid=randomUUID(),(p:any)=>p.sections.passer.id='mekanisme',(p:any)=>p.sections.priser._block='content',(p:any)=>p.sections.extra=p.sections.behov]){const p=source();edit(p);assert.equal(pageSchema.safeParse(p).success,false);}
 for(const edit of [(b:any)=>b._block='packages',(b:any)=>b.id='email',(b:any)=>b.id='mekanisme',(b:any)=>b.uid=source().sections.passer.uid,(b:any)=>b.placement='before:ukjent']){const p=source(),b=optional();edit(b);p.optionalSections=[b];assert.equal(pageSchema.safeParse(p).success,false);}
 const p=source();p.optionalSections=[optional(),{...optional(),visibility:'hidden'}];assert.equal(pageSchema.safeParse(p).success,false);
});
test('visibility is typed, default published; linked sjekk/priser cannot be hidden',()=>{
 for(const id of ['behov','regneeksempel','resultater','mekanisme','passer','sporsmal']){const p=source();(id==='regneeksempel'?p.sections[id][0]:p.sections[id]).visibility='hidden';const parsed=pageSchema.parse(p);assert.equal(builder.getHomepageBlocks(parsed).find(b=>b.id===id)?.visibility,'hidden');}
 for(const id of ['sjekk','priser']){const p=source();p.sections[id].visibility='hidden';assert.equal(pageSchema.safeParse(p).success,false);}
 for(const value of ['published','draft',false,{}]){const p=source();p.sections.mekanisme.visibility=value;assert.equal(pageSchema.safeParse(p).success,false);}
});
test('hidden section inbound anchors fail the publication check across routes; hidden outbound links do not',()=>{
 const p=source();p.sections.mekanisme.visibility='hidden';const home=pageSchema.parse(p);
 const validate=(builder as any).validateHomepagePublicLinks;assert.equal(typeof validate,'function');
 assert.doesNotThrow(()=>validate(home,[]));
 assert.throws(()=>validate(home,[{slug:'kontakt',cta:{href:'/#mekanisme'}}]),/mekanisme/);
 p.optionalSections=[{...optional('synlig'),links:[{label:'Les mer',href:'/#mekanisme'}]}];assert.throws(()=>validate(pageSchema.parse(p),[]),/mekanisme/);
 p.optionalSections[0].visibility='hidden';assert.doesNotThrow(()=>validate(pageSchema.parse(p),[]));
});
test('stock fixed editors have no row removal or type chooser; only ordinary optional rows can add/delete',()=>{
 const cms=YAML.parse(readFileSync('../.pages.yml','utf8')),entry=entryForFile(cms,'app/src/content/pages/home.json');
 const sections=entry.fields.find((f:any)=>f.name==='sections');assert.equal(sections.type,'object');assert.equal(sections.list,undefined);assert.deepEqual(sections.fields.map((f:any)=>f.name),order);
 for(const field of sections.fields.filter((f:any)=>f.name!=='regneeksempel')){assert.equal(field.type,'object');assert.equal(field.list,undefined);for(const key of ['uid','id','_block'])assert.equal(field.fields.find((f:any)=>f.name===key).readonly,true);const visibility=resolveField(field.fields.find((f:any)=>f.name==='visibility'),cms.components);assert.equal(visibility.readonly===true,['sjekk','priser'].includes(field.name));}
 const list=entry.fields.find((f:any)=>f.name==='optionalSections');assert.equal(list.type,'object');assert.ok(list.list);assert.equal(list.blocks,undefined);assert.deepEqual(list.fields.find((f:any)=>f.name==='placement').options.values.map((v:any)=>v.name),order.flatMap(id=>[`before:${id}`,`after:${id}`]));
 const form=source();form.optionalSections=[optional()];const saved=JSON.parse(cmsJsonSave(source(),form,entry,cms));assertPreservedContent(form,saved);assert.ok(pageSchema.safeParse(saved).success);
});
