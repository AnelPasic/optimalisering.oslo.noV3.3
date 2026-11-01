import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import YAML from 'yaml';
import {pageFilePaths} from './helpers/page-sources.ts';
import { pageSchema } from '../src/lib/content-schema.ts';
import { combineFaqItems, hasGlobalFaq } from '../src/lib/faq-items.ts';
import { getGlobalElement } from '../src/lib/home-builder.ts';
import { cmsJsonSave, entryForFile } from './helpers/pages-cms-json.ts';

const cms = YAML.parse(readFileSync('../.pages.yml','utf8'));
const files = pageFilePaths();
const load = (file: string) => JSON.parse(readFileSync('src/content/pages/'+file,'utf8'));

test('all 17 pages expose the same native page-specific FAQ list, without changing the slug/SEO/Hero contract',()=>{
  assert.equal(files.length,17);
  for (const file of files) {
    const path='app/src/content/pages/'+file;
    const entry=entryForFile(cms,path);
    assert.deepEqual(entry.fields.slice(0,3).map((field:any)=>field.name),['slug','seo','hero'],file);
    const faq=entry.fields.find((field:any)=>field.name==='faq');
    assert.ok(faq,file);
    // Pages CMS accepts YAML field aliases; a single schema is reused by all editors.
    assert.equal(faq.type,'object',file);
    assert.deepEqual(faq.fields.map((field:any)=>field.name),['question','answer'],file);
    assert.equal(faq.list.collapsible.summary,'{question}',file);
  }
});

test('owned local FAQ can be saved and restored across every page without modifying global content',()=>{
  const masterBefore=structuredClone(getGlobalElement('sporsmal').content);
  for(const file of files) {
    const source=load(file);
    const entry=entryForFile(cms,'app/src/content/pages/'+file);
    const edited=structuredClone(source);
    const own={question:'Gjelder dette '+source.slug+'?',answer:'Dette svaret gjelder bare '+source.slug+'.'};
    edited.faq=[...(source.faq??[]),own];
    const saved=JSON.parse(cmsJsonSave(source,edited,entry,cms));
    assert.deepEqual(saved.faq,edited.faq,file);
    assert.deepEqual(saved.sections??[],source.sections??[],file);
    assert.deepEqual(saved.hero,source.hero,file);
    assert.deepEqual(saved.seo,source.seo,file);
    assert.ok(pageSchema.safeParse(saved).success,file);
    // CMS form has an explicit empty list when the editor removes all local questions.
    const restored=JSON.parse(cmsJsonSave(saved,{...source,faq:source.faq??[]},entry,cms));
    assert.deepEqual(restored.faq??[],source.faq??[],file);
    assert.deepEqual(restored.sections??[],source.sections??[],file);
  }
  assert.deepEqual(getGlobalElement('sporsmal').content,masterBefore);
});

test('global and page-specific questions combine into one section, global first, without duplicates',()=>{
  const shared=getGlobalElement('sporsmal').content.items;
  const local=[{question:'Et helt lokalt spørsmål?',answer:'Svak til dette.'},
    {question:'  '+shared[0].question.toLocaleUpperCase('nb-NO')+'  ',answer:'Duplikat!'}];
  const all=combineFaqItems(shared,local);
  assert.equal(all.length,shared.length+1);
  assert.deepEqual(all.slice(0,shared.length),shared);
  assert.deepEqual(all.at(-1),local[0]);
  assert.deepEqual(combineFaqItems([],local).length,2,'local FAQ works when global is absent');
  assert.ok(hasGlobalFaq([{globalElement:'sporsmal'}]));
  assert.equal(hasGlobalFaq([{globalElement:'sporsmal',visibility:'hidden'}]),false);
  assert.equal(hasGlobalFaq([{globalElement:'priser'}]),false);
});

test('every global block row gets a visible summary from its position and selected element or local heading',()=>{
  for (const file of files) {
    const entry=entryForFile(cms,'app/src/content/pages/'+file);
    const sections=entry.fields.find((field:any)=>field.name==='sections');
    const summary=sections.list.collapsible.summary as string;
    assert.match(summary,/\{index\}/,file);
    assert.match(summary,/\{element\}/,file);
    assert.ok(summary.includes('{heading}')||summary.includes('{name}'),file);
    assert.ok(sections.blocks.some((block:any)=>block.name==='global'),file);
  }
});

test('all site renderers pass through local FAQ when the global FAQ is placed',()=>{
  const sources=['HomePage','InnerPage','ServiceFamilyPage','PricingPage','InsightIndexPage'].map(name=>readFileSync('src/components/'+name+'.astro','utf8'));
  for(const source of sources)assert.match(source,/faqItems=\{page\.faq\}/);
  const renderer=readFileSync('src/components/HomepageBlock.astro','utf8');
  assert.match(renderer,/combineFaqItems\(block\.content\.items, faqItems\)/);
  assert.match(renderer,/items=\{combineFaqItems/);
});
