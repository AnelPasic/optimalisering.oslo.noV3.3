import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {visibleServiceSections} from '../src/lib/service-sections.ts';
import {cmsJsonSave,entryForFile} from './helpers/pages-cms-json.ts';

const raw=JSON.parse(readFileSync('src/content/pages/priser.json','utf8'));
const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const order:string[]=raw.sections.map((section:any)=>section._block==='pricingModule'?({valg:'pricing-decision',vekst:'pricing-multiplier',sammenligning:'sammenlign'} as const)[section.pricingModule as 'valg'|'vekst'|'sammenligning']:section.element);

test('Prissiden CMS-configured sections appear in the same order as Pages CMS',()=>{
 const names=raw.sections.map((section:any)=>section._block==='pricingModule'?section.pricingModule:section.element);
 const allowed=new Set(['valg','vekst','priser','sammenligning','regneeksempel','resultater']);
 assert.ok(names.every((name:string)=>allowed.has(name)),'Only recognized pricing placements are allowed');
 assert.equal(new Set(names).size,names.length,'Each pricing placement occurs at most once');
 assert.ok(names.includes('priser'),'Shared pricing block must be present');
 assert.deepEqual(pageSchema.parse(raw).sections.map((s:any)=>s.id),order);
 const group=cms.content.find((x:any)=>x.name==='priceGroup');
 const editor=group.items.find((x:any)=>x.name==='pricePage');
 const sectionEditor=editor.fields.find((x:any)=>x.name==='sections');
 assert.equal(sectionEditor.type,'block');
 assert.equal(sectionEditor.blockKey,'_block');
 const module=sectionEditor.blocks.find((x:any)=>x.name==='pricingModule');
 assert.deepEqual(module.fields.find((x:any)=>x.name==='pricingModule').options.values.map((x:any)=>x.name),['valg','vekst','sammenligning']);
 assert.ok(sectionEditor.blocks.some((x:any)=>x.name==='global'));
 assert.equal(group.items.filter((x:any)=>x.path==='app/src/content/global-elements/priser.json').length,1);
});

test('Reordering and hiding pricing sections follows CMS placements',()=>{
 const hidden=JSON.parse(JSON.stringify(raw));
 hidden.sections.find((s:any)=>s._block==='pricingModule'&&s.pricingModule==='vekst').visibility='hidden';
 const parsed=pageSchema.parse(hidden);
 assert.deepEqual(visibleServiceSections({slug:parsed.slug,sections:parsed.sections}).map((s:any)=>s.id),
  order.filter(id=>id!=='pricing-multiplier'));
 const moved=JSON.parse(JSON.stringify(raw));
 const comparisonIndex=moved.sections.findIndex((s:any)=>s._block==='pricingModule'&&s.pricingModule==='sammenligning');
 const comparison=moved.sections.splice(comparisonIndex,1)[0];
 moved.sections.unshift(comparison);
 assert.deepEqual(pageSchema.parse(moved).sections.map((s:any)=>s.id),['sammenlign',...order.filter(id=>id!=='sammenlign')]);
 const renderer=readFileSync('src/components/PricingPage.astro','utf8');
 assert.match(renderer,/section\._block==='pricingModule'/);
 assert.match(renderer,/<PricingDecision packages=\{packages\} \/>/);
 assert.match(renderer,/<PricingMultiplier packages=\{packages\} \/>/);
 assert.match(renderer,/<Comparison packages=\{packages\} \/>/);
 assert.ok(!renderer.includes('hasGlobalPackages'));
 assert.equal((renderer.match(/<Comparison packages=\{packages\} \/>/g)??[]).length,1);
});

test('Duplicate pricing modules or modules on other page types are rejected',()=>{
 const duplicate=JSON.parse(JSON.stringify(raw));
 duplicate.sections.push({...duplicate.sections[0]});
 assert.equal(pageSchema.safeParse(duplicate).success,false);
 const other={...raw,kind:'article',slug:'innsikt/synthetic-pricing'};
 assert.equal(pageSchema.safeParse(other).success,false);
});

test('Original CMS content, shared master and section references retain authority',()=>{
 assert.equal(raw.kind,'pricing');
 assert.equal(raw.slug,'priser');
 assert.ok(raw.hero?.title);
 assert.ok(raw.hero?.visual?.image?.src);
 assert.equal(raw.faq.length,5);
 assert.deepEqual(raw.sections.filter((s:any)=>s._block==='global').map((s:any)=>s.element),['priser','regneeksempel','resultater']);
 const master=JSON.parse(readFileSync('src/content/global-elements/priser.json','utf8'));
 assert.deepEqual(master.content.items.map((i:any)=>i.key),['optimalisering','vekst','partner']);
});

test('Stock Pages CMS saves pricing placements without stripping shared or owner fields',()=>{
 const editor=entryForFile(cms,'app/src/content/pages/priser.json');
 const saved=JSON.parse(cmsJsonSave(raw,raw,editor,cms));
 assert.deepEqual(saved,raw);
 const reordered=JSON.parse(JSON.stringify(raw));
 reordered.sections=[reordered.sections[3],...reordered.sections.filter((_:any,i:number)=>i!==3)];
 const resaved=JSON.parse(cmsJsonSave(raw,reordered,editor,cms));
 assert.deepEqual(resaved.sections,reordered.sections);
 assert.deepEqual(resaved.hero,raw.hero);
 assert.deepEqual(resaved.faq,raw.faq);
});
