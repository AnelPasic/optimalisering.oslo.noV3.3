import {sectionRecords} from './helpers/pages-cms-json.ts';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {getHomepageBlocks} from '../src/lib/home-builder.ts';
import {homepageBlockEditor,cmsJsonSave,entryForFile} from './helpers/pages-cms-json.ts';
const source=JSON.parse(readFileSync('src/content/pages/home.json','utf8'));
test('assessment legacy/empty choice keeps split; horizontal is bounded and leaves all form source intact',()=>{
 for(const value of [undefined,null,'','split','horizontal']){
  const page=structuredClone(source),block=sectionRecords(page).find((s:any)=>s._block==='assessment');if(value!==undefined)block.content.layout=value;
  const parsed=getHomepageBlocks(pageSchema.parse(page)).find(s=>s._block==='assessment')!;
  assert.equal(parsed._block,'assessment');if(parsed._block==='assessment'){assert.equal(parsed.content.layout,value==='horizontal'?'horizontal':'split');assert.deepEqual(parsed.content.form,block.content.form);assert.deepEqual(parsed.content.section,block.content.section);}
 }
 const page=structuredClone(source);sectionRecords(page).find((s:any)=>s._block==='assessment').content.layout='custom-css';assert.equal(pageSchema.safeParse(page).success,false);
});
test('native CMS assessment choice saves horizontal and clear restores the original source object',()=>{
 const cms=YAML.parse(readFileSync('../.pages.yml','utf8')),editor=homepageBlockEditor(cms,'assessment'),choice=editor.fields.find((f:any)=>f.name==='layout');assert.ok(choice);assert.deepEqual(choice.options.values.map((v:any)=>v.name),['','horizontal']);assert.equal(choice.default,undefined);
 const entry=entryForFile(cms,'app/src/content/pages/home.json'),form=structuredClone(source);sectionRecords(form).find((s:any)=>s._block==='assessment').content.layout='horizontal';
 const saved=JSON.parse(cmsJsonSave(source,form,entry,cms));assert.deepEqual(saved,form);sectionRecords(form).find((s:any)=>s._block==='assessment').content.layout='';
 const restored=JSON.parse(cmsJsonSave(saved,form,entry,cms));assert.deepEqual(restored,source);
});
