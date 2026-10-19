import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {heroSchema,homepageBlocksSchema,getHomepageBlocks,getGlobalElement,globalElementIds} from '../src/lib/home-builder.ts';
import {cmsJsonSave,entryForFile,assertPreservedContent,localHomeFixture} from './helpers/pages-cms-json.ts';
const source=JSON.parse(readFileSync('src/content/pages/home.json','utf8'));
test('Hero retains approved layout choices independently of page placements',()=>{
 const hero={eyebrow:'Overtekst',title:'En hel overskrift.',support:'Ingress',primaryCta:{label:'Les mer',href:'/priser/'},visual:{kind:'none'}};
 assert.equal(heroSchema.parse(hero).layout,'split-right');
 for(const layout of ['split-right','split-left','centered','centered-none'])assert.equal(heroSchema.safeParse({...hero,layout}).success,true);
 assert.equal(heroSchema.safeParse({...hero,layout:'custom'}).success,false);
});
test('derived arrays allow absent modules but reject duplicate identities and unknown types',()=>{
 const blocks=getHomepageBlocks(source);
 assert.equal(homepageBlocksSchema.safeParse([]).success,true);
 for(const value of [[...blocks,blocks[0]],blocks.map((b,i)=>i===0?{...b,_block:'unknown'}:b)])assert.equal(homepageBlocksSchema.safeParse(value).success,false);
 const master=getGlobalElement('regneeksempel');master.uid=randomUUID();assert.equal(homepageBlocksSchema.safeParse([master]).success,false);
});
test('one Hero and eight preserved library originals do not imply eight required page instances',()=>{
 assert.equal(pageSchema.safeParse(source).success,true);
 const incoming=JSON.parse(readFileSync('../coordination/evidence/h024a8e/incoming-home.json','utf8'));
 for(const id of globalElementIds)assert.deepEqual(JSON.parse(readFileSync('src/content/global-elements/'+id+'.json','utf8')),incoming.sections[id]);
 for(const p of source.sections)assert.deepEqual(Object.keys(p).sort(),['_block','element']);
 assert.equal(source.optionalSections,undefined);
});
test('local sections cannot acquire master, form, chart or chrome identities',()=>{
 for(const id of ['behov','regneeksempel','mekanisme','passer','email','website','calc-visits','calculator-error','site-menu']){
  const p=localHomeFixture();p.topSections[0].id=id;assert.equal(pageSchema.safeParse(p).success,false,id);
 }
});
test('actual native field projection preserves page-local content and never stores master payloads in references',()=>{
 const cms=YAML.parse(readFileSync('../.pages.yml','utf8')),entry=entryForFile(cms,'app/src/content/pages/home.json');
 const p=localHomeFixture(),form=structuredClone(p);form.topSections[0].heading+=' CMS';
 const saved=JSON.parse(cmsJsonSave(p,form,entry,cms));assertPreservedContent(form,saved);assert.ok(pageSchema.safeParse(saved).success);
 const invalid=structuredClone(p);invalid.sections[0].content=getGlobalElement('behov').content;assert.equal(pageSchema.safeParse(invalid).success,false);
});
