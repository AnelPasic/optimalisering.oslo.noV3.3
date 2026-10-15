import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import YAML from 'yaml';
import { pageSchema } from '../src/lib/content-schema.ts';
import { cmsJsonSave,entryForFile,assertPreservedContent } from './helpers/pages-cms-json.ts';
import { heroSchema, homepageBlocksSchema } from '../src/lib/home-builder.ts';

const source=JSON.parse(readFileSync('src/content/pages/home.json','utf8'));
const block=(type:string,id:string=type)=>({_block:type,id,uid:randomUUID(),name:type});
test('Hero allows only the three safe layouts and optional image',()=>{
 const hero={eyebrow:'Overtekst',title:'En hel overskrift.',support:'Ingress',primaryCta:{label:'Les mer',href:'/priser/'},visual:{kind:'none'}};
 assert.equal(heroSchema.parse(hero).layout,'split-right');
 for(const layout of ['split-right','split-left','centered'])assert.equal(heroSchema.parse({...hero,layout}).layout,layout);
 assert.equal(heroSchema.safeParse({...hero,layout:'custom'}).success,false);
 assert.equal(heroSchema.safeParse({...hero,visual:{kind:'video'}}).success,false);
});
test('ordered blocks preserve identity, support content add/remove, reject duplicates and unknowns',()=>{
 const a={...block('content','first'),heading:'Først',body:['Innhold']},b={...block('content','second'),heading:'Så',body:[]};
 assert.deepEqual(homepageBlocksSchema.parse([b,a]).map(s=>s.id),['second','first']);
 assert.equal(homepageBlocksSchema.parse([a])[0].uid,a.uid);
 assert.equal(homepageBlocksSchema.parse([]).length,0);
 for(const [type,id] of Object.entries({selector:'behov',calculator:'regneeksempel',packages:'priser',proof:'resultater',assessment:'sjekk',faq:'sporsmal'})){
  const singleton=block(type,id);
  assert.equal(homepageBlocksSchema.safeParse([singleton]).success,true,type);
  assert.equal(homepageBlocksSchema.safeParse([singleton,{...singleton,uid:randomUUID()}]).success,false,type);
 }
 for(const bad of [[block('unknown')],[{...a,uid:'index-0'}],[a,{...b,uid:a.uid}],[a,{...b,id:a.id}],[{...block('packages','priser'),items:[]}]] )assert.equal(homepageBlocksSchema.safeParse(bad).success,false);
});
test('migrated pilot stores one structured Hero and the expected block identities without locking editor order',()=>{
 assert.equal(heroSchema.safeParse(source.hero).success,true);
 assert.equal(homepageBlocksSchema.safeParse(source.sections).success,true);
 assert.equal(source.title,undefined);assert.equal(source.homepage.heroPhoto,undefined);
 for(const s of source.sections.filter((s:any)=>s._block!=='content'))assert.deepEqual(Object.keys(s).sort(),['_block','id','name','uid']);
});
test('new content anchors cannot take fixed form, chart, ARIA or chrome identities',()=>{
 for(const id of ['email','website','message','calc-visits','calc-conversion-label','calculator-error','scenario-illustration-label','scenario-current-value','site-menu']){
  const p=structuredClone(source);p.sections.unshift({...block('content',id),heading:'Innhold',body:[]});
  assert.equal(pageSchema.safeParse(p).success,false,id);
 }
});
test('actual CMS model replaces ordered arrays without losing UUIDs, content, or singleton authority',()=>{
 const cms=YAML.parse(readFileSync('../.pages.yml','utf8')),entry=entryForFile(cms,'app/src/content/pages/home.json');
 const form=structuredClone(source);form.sections.reverse();
 const saved=JSON.parse(cmsJsonSave(source,form,entry,cms));assertPreservedContent(form,saved);
 assert.deepEqual(pageSchema.parse(saved).sections.map(s=>s.id),form.sections.map((s:any)=>s.id));
 assert.deepEqual(saved.homepage,source.homepage);
 const restored=JSON.parse(cmsJsonSave(saved,source,entry,cms));assertPreservedContent(source,restored);
 for(const edit of [(p:any)=>p.sections.push({...p.sections[0],uid:randomUUID()}),(p:any)=>p.sections[0].heading='Duplicated payload',(p:any)=>p.sections[0]._block='unknown']){
  const p=structuredClone(source);edit(p);assert.equal(pageSchema.safeParse(p).success,false);
 }
 const removed=structuredClone(source);removed.sections=removed.sections.filter((b:any)=>b._block==='content');assert.equal(pageSchema.safeParse(removed).success,true);
});
