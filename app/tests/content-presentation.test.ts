import {sectionRecords} from './helpers/pages-cms-json.ts';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {cmsJsonSave,entryForFile,resolveField,assertPreservedContent,localHomeFixture} from './helpers/pages-cms-json.ts';
import {getGlobalElement,homepageBlockSchema,globalElementIds} from '../src/lib/home-builder.ts';
import {contentLayoutAttribute,paragraphLayoutAttribute} from '../src/lib/content-presentation.ts';
const home=localHomeFixture();
const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const normal=(p:any)=>sectionRecords(p).find((s:any)=>s.id==='cms-local-fixture');

test('ordinary layout and box choices survive primary ingestion independently of surfaces',()=>{
 for(const layout of ['default','two-columns','three-columns','stacked'])for(const boxVariant of ['default','plain','card']){
  const p=structuredClone(home),s=normal(p);s.layout=layout;s.items[0].boxVariant=boxVariant;s.surface='accent';s.items[0].surface='neutral';
  const parsed=normal(pageSchema.parse(p));assert.equal(parsed.layout,layout);assert.equal(parsed.items[0].boxVariant,boxVariant);assert.equal(parsed.surface,'accent');assert.equal(parsed.items[0].surface,'neutral');
 }
 for(const value of ['grid-cols-8','custom','#fff',{},12])for(const field of ['layout','boxVariant']){
  const p=structuredClone(home),s=normal(p);(field==='layout'?s:s.items[0])[field]=value;assert.equal(pageSchema.safeParse(p).success,false);
 }
});

test('new presentation fields preserve automatic rendering defaults and reject protected use',()=>{
 for(const empty of [undefined,null,'','default']){const p=structuredClone(home),s=normal(p);s.layout=empty;s.items[0].boxVariant=empty;const parsed=normal(pageSchema.parse(p));assert.equal(parsed.layout,'default');assert.equal(parsed.items[0].boxVariant,'default');}
 for(const id of globalElementIds.filter(id=>!['mekanisme','passer'].includes(id))){const master:any=getGlobalElement(id);master.layout='stacked';assert.equal(homepageBlockSchema.safeParse(master).success,false,id);}
 const calculator=structuredClone(home);calculator.sections[0].layout='stacked';assert.equal(pageSchema.safeParse(calculator).success,false,'placement cannot accept arbitrary layout');
 const service=JSON.parse(readFileSync('src/content/pages/synlighet.json','utf8'));
 for(const field of ['layout','boxVariant']){const p=structuredClone(service),s=sectionRecords(p).find((s:any)=>s._block==='protected');if(field==='layout')s.layout='stacked';else{s.items=[{title:'Test',text:'Test',boxVariant:'card'}];}assert.equal(pageSchema.safeParse(p).success,false,field);}
});

test('co-located CMS choices expose semantics and round-trip variant/reorder without authority changes',()=>{
 const entry=entryForFile(cms,'app/src/content/pages/home.json'),sections=entry.fields.find((f:any)=>f.name==='sections'),content=sections.blocks.find((b:any)=>b.name==='content');
 const layout=resolveField(content.fields.find((f:any)=>f.name==='layout'),cms.components),items=content.fields.find((f:any)=>f.name==='items'),box=resolveField(items.fields.find((f:any)=>f.name==='boxVariant'),cms.components);
 assert.equal(layout.type,'select');assert.deepEqual(layout.options.values.map((v:any)=>v.name),['default','two-columns','three-columns','stacked']);
 assert.equal(box.type,'select');assert.deepEqual(box.options.values.map((v:any)=>v.name),['default','plain','card']);
 assert.ok(sections.list);
 const ref=sections.blocks.find((b:any)=>b.name==='global');assert.ok(!ref.fields.some((f:any)=>['layout','boxVariant'].includes(f.name)));
 const p=structuredClone(home),s=normal(p);s.layout='stacked';s.items[0].boxVariant='card';
 const saved=JSON.parse(cmsJsonSave(home,p,entry,cms));assertPreservedContent(p,saved);assert.equal(pageSchema.safeParse(saved).success,true);
 const restored=JSON.parse(cmsJsonSave(saved,home,entry,cms));assertPreservedContent(home,restored);
});

test('mixed sections use independent paragraph and card grids, without changing protected layouts',()=>{
 const content={body:['Faktum én','Faktum to','Faktum tre'],layout:'three-columns' as const};
 assert.equal(paragraphLayoutAttribute(content),'three-columns');
 assert.equal(paragraphLayoutAttribute({...content,layout:'two-columns'}),'two-columns');
 for(const layout of ['default','stacked',undefined]) assert.equal(paragraphLayoutAttribute({...content,layout}),undefined);
 assert.equal(paragraphLayoutAttribute({...content,body:['Bare ett']}),undefined);
 assert.equal(paragraphLayoutAttribute({...content,items:[{title:'Boks',text:'Innhold'}]}),'three-columns');
 assert.equal(paragraphLayoutAttribute({...content,items:[{title:'Boks',text:'Innhold'}],layout:'two-columns'}),'two-columns');
 const seoFacts={layout:'three-columns',body:['Fakta A','Fakta B','Fakta C'],items:[{title:'Alternativ A'},{title:'Alternativ B'},{title:'Alternativ C'}]};
 assert.equal(paragraphLayoutAttribute(seoFacts),'three-columns','three facts must stay in columns after adding cards');
 assert.equal(contentLayoutAttribute(seoFacts.layout),'three-columns','card grid must be independent');
 assert.equal(paragraphLayoutAttribute({...seoFacts,body:[]}),undefined);
 assert.equal(paragraphLayoutAttribute(seoFacts,true),undefined);
 assert.equal(paragraphLayoutAttribute({...content,items:[]}), 'three-columns');
 assert.equal(paragraphLayoutAttribute(content,true),undefined);
 assert.equal(paragraphLayoutAttribute({...content,layout:'unsafe-css'}),undefined);
 for(const source of ['src/components/ContentSection.astro','src/components/HomeSection.astro']){
  const component=readFileSync(source,'utf8');
  assert.ok(component.includes('data-content-layout={paragraphLayoutAttribute(section,'),source);
 }
 const css=readFileSync('src/styles/shared.css','utf8');
 assert.ok(css.includes('.body-copy[data-content-layout="three-columns"]'));
 assert.ok(css.includes('grid-template-columns: repeat(3, minmax(0, 1fr))'));
});
