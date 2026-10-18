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
test('derived block arrays reject missing and duplicated protected records',()=>{
 const blocks=Object.values<any>(source.sections);
 assert.equal(homepageBlocksSchema.safeParse(blocks).success,true);
 for(const value of [[],blocks.slice(1),[...blocks,blocks[0]],blocks.map((b:any,i:number)=>i===0?{...b,_block:'unknown'}:b)])assert.equal(homepageBlocksSchema.safeParse(value).success,false);
});

test('fixed source stores one structured Hero and complete co-located records',()=>{
 assert.equal(heroSchema.safeParse(source.hero).success,true);assert.equal(pageSchema.safeParse(source).success,true);
 assert.equal(source.title,undefined);assert.equal(source.homepage.heroPhoto,undefined);
 for(const s of Object.values<any>(source.sections).filter(s=>s._block!=='content'))assert.deepEqual(Object.keys(s).sort(),['_block','content','id','name','uid']);
});

test('new content anchors cannot take fixed form, chart, ARIA or chrome identities',()=>{
 for(const id of ['email','website','message','calc-visits','calc-conversion-label','calculator-error','scenario-illustration-label','scenario-current-value','site-menu']){
  const p=structuredClone(source);p.optionalSections=[{...block('content',id),heading:'Innhold',body:[],placement:'after:sporsmal'}];assert.equal(pageSchema.safeParse(p).success,false,id);
 }
});

test('actual CMS fixed-object merge preserves UUIDs and singleton authority',()=>{
 const cms=YAML.parse(readFileSync('../.pages.yml','utf8')),entry=entryForFile(cms,'app/src/content/pages/home.json');
 const form=structuredClone(source);form.sections.behov.content.heading+=' CMS';
 const saved=JSON.parse(cmsJsonSave(source,form,entry,cms));assertPreservedContent(form,saved);assert.equal(pageSchema.safeParse(saved).success,true);
 const restored=JSON.parse(cmsJsonSave(saved,source,entry,cms));assertPreservedContent(source,restored);
 for(const edit of [(p:any)=>p.sections.extra={...p.sections.behov,uid:randomUUID()},(p:any)=>p.sections.behov.heading='Duplicated payload',(p:any)=>p.sections.behov._block='unknown']){const p=structuredClone(source);edit(p);assert.equal(pageSchema.safeParse(p).success,false);}
});
