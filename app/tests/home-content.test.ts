import {getGlobalElement,homepageBlockSchema,getHomepageBlocks} from '../src/lib/home-builder.ts';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pageSchema} from '../src/lib/content-schema.ts';
const fixture=JSON.parse(readFileSync('src/content/pages/home.json','utf8'));
test('page removal is optional while published price/contact links remain valid',()=>{
 for(const id of ['behov','regneeksempel','resultater','mekanisme','passer','sporsmal']){
  const p=structuredClone(fixture);p.sections=p.sections.filter((s:any)=>s.element!==id);assert.ok(pageSchema.safeParse(p).success,id);
 }
 for(const id of ['sjekk','priser']){const p=structuredClone(fixture);p.sections=p.sections.filter((s:any)=>s.element!==id);assert.equal(pageSchema.safeParse(p).success,false,id);}
});
test('calculator master defaults remain compatible with rendered numeric input types',()=>{
 const edited=getGlobalElement('regneeksempel');edited.content.defaults.visits=1500.5;assert.equal(homepageBlockSchema.safeParse(edited).success,false);
 edited.content.defaults.visits=1500;edited.content.defaults.conversion=1.5;assert.ok(homepageBlockSchema.safeParse(edited).success);
});
test('native array ordering changes actual module order across all local and global placements',()=>{
 const p=structuredClone(fixture);p.sections.reverse();
 assert.deepEqual(getHomepageBlocks(pageSchema.parse(p)).map(s=>s.id),p.sections.map((s:any)=>s.element??s.id));
});
