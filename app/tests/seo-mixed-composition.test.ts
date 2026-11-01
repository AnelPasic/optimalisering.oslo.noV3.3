import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {getGlobalElement} from '../src/lib/home-builder.ts';
import {visibleServiceSections, seoGlobalIds} from '../src/lib/service-sections.ts';
import {cmsJsonSave,entryForFile,resolveField,assertPreservedContent} from './helpers/pages-cms-json.ts';

const source=JSON.parse(readFileSync('src/content/pages/seo.json','utf8'));
const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const clone=()=>structuredClone(source);

test('SEO uses one native mixed sequence and references only the canonical package and assessment masters',()=>{
 const positions=source.sections.filter((row:any)=>row._block==='global');
 assert.deepEqual(positions.map((row:any)=>row.element),['priser','sjekk']);
 for(const row of positions)assert.deepEqual(Object.keys(row).sort(),['_block','element']);
 assert.equal(source.sections.some((row:any)=>row.id==='sjekk'),false);
 const parsed=pageSchema.parse(source),sections=visibleServiceSections(parsed);
 assert.equal(sections.filter(row=>row.id==='priser').length,1);
 assert.equal(sections.filter(row=>row.id==='sjekk').length,1);
 for(const key of ['priser','sjekk'] as const) {
   const block=sections.find(row=>row.globalElement===key)!;
   assert.deepEqual(block.content,getGlobalElement(key).content);
 }
 // The approved native CMS permits free ordering of mixed sections. Verify
 // global placements follow the stored sequence, not an obsolete fixed order.
 const sourceOrder=source.sections.filter((row:any)=>row.visibility!=='hidden').map((row:any)=>row._block==='global'?row.element:row.id);
 assert.deepEqual(sections.map(row=>row.id),sourceOrder);
 assert.equal(source.hero.primaryCta.href,'/seo/#sjekk');
 assert.equal(source.faq.length,6);


});

test('native SEO page editor contains section layouts, card treatment and a shared eight-entry global selector',()=>{
 const entry=entryForFile(cms,'app/src/content/pages/seo.json');
 assert.equal(entry?.type,'collection');
 const group=cms.content.find((e:any)=>e.name==='serviceGroup');
 const generic=group.items.find((e:any)=>e.name==='services');
 assert.equal(generic.label,'Alle tjenester');
 assert.ok(!generic.exclude.includes('seo.json'),'SEO belongs in the one editor');
 const sections=entry.fields.find((f:any)=>f.name==='sections');
 const local=resolveField(sections.blocks.find((b:any)=>b.name==='content'),cms.components);
 const global=resolveField(sections.blocks.find((b:any)=>b.name==='global'),cms.components);
 for(const name of ['headingAlign','layout','surface','items','visibility'])assert.ok(local.fields.find((f:any)=>f.name===name),name);
 assert.deepEqual(global.fields.find((f:any)=>f.name==='element').options.values.map((v:any)=>v.name).sort(),[...seoGlobalIds].sort());
 const modified=clone();modified.sections[0].items[0].text+=' Test';
 const saved=JSON.parse(cmsJsonSave(source,modified,entry,cms));
 assertPreservedContent(modified,saved);
 assert.ok(pageSchema.safeParse(saved).success);
});

test('SEO shares the full global catalogue while rejecting duplicates, forgeries and broken links',()=>{
 const add=(element:string)=>{const x=clone();if(element==='sporsmal')x.sections=x.sections.filter((s:any)=>s._block!=='pageFaq');x.sections.push({_block:'global',element});return x};
 const duplicateFaq=clone();duplicateFaq.sections.push({_block:'global',element:'sporsmal'});
 assert.equal(pageSchema.safeParse(duplicateFaq).success,false,'local and global FAQ cannot both occupy the same anchor');
 for(const el of ['resultater','sporsmal','behov','regneeksempel','mekanisme','passer']) {
  assert.equal(pageSchema.safeParse(add(el)).success,true,el);
 }
 assert.equal(pageSchema.safeParse(add('untrusted')).success,false,'unknown global reference');
 for(const el of ['priser','sjekk'])assert.equal(pageSchema.safeParse(add(el)).success,false,'duplicate '+el);
 const forged=clone();forged.sections.push({...getGlobalElement('priser'),globalElement:'priser'});
 assert.equal(pageSchema.safeParse(forged).success,false);
 const withConflict=clone();withConflict.sections.push({_block:'content',id:'priser',heading:'Konflikt',body:[]});
 assert.equal(pageSchema.safeParse(withConflict).success,false);
 const hidden=clone();hidden.sections.find((row:any)=>row.element==='sjekk').visibility='hidden';
 assert.equal(pageSchema.safeParse(hidden).success,false,'hero CTA cannot link to hidden form');
 const removed=clone();removed.sections=removed.sections.filter((row:any)=>row.element!=='sjekk');
 assert.equal(pageSchema.safeParse(removed).success,false,'hero CTA cannot link to missing form');
 const moved=clone();moved.sections.push(moved.sections.shift());
 assert.equal(pageSchema.safeParse(moved).success,true,'CMS section reordering is supported');
});

test('SEO changes do not modify locked package prices, order contract or global form content',()=>{
 const packages=getGlobalElement('priser').content;
 assert.deepEqual(packages.items.map(x=>x.key),['optimalisering','vekst','partner']);
 assert.equal(packages.items.length,3);
 assert.ok(packages.items.every(x=>Number.isFinite(x.price)));
 assert.equal(getGlobalElement('sjekk').content.form.submitLabel,'Ta en gratis sjekk');
 assert.equal(source.sections.some((s:any)=>Object.hasOwn(s,'content')),false);
});
