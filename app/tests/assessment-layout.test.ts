import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {homepageBlockSchema} from '../src/lib/home-builder.ts';
import {homepageBlockEditor,cmsJsonSave,entryForFile} from './helpers/pages-cms-json.ts';
const source=JSON.parse(readFileSync('src/content/global-elements/sjekk.json','utf8'));
test('assessment legacy/empty choice keeps split; horizontal is bounded and leaves all form source intact',()=>{
 for(const value of [undefined,null,'','split','horizontal']){
  const block=structuredClone(source);if(value!==undefined)block.content.layout=value;
  const parsed=homepageBlockSchema.parse(block);
  assert.equal(parsed._block,'assessment');if(parsed._block==='assessment'){assert.equal(parsed.content.layout,value==='horizontal'?'horizontal':'split');assert.deepEqual(parsed.content.form,block.content.form);assert.deepEqual(parsed.content.section,block.content.section);}
 }
 const block=structuredClone(source);block.content.layout='custom-css';assert.equal(homepageBlockSchema.safeParse(block).success,false);
});
test('native CMS assessment choice saves horizontal and clear restores the original source object',()=>{
 const cms=YAML.parse(readFileSync('../.pages.yml','utf8')),editor=homepageBlockEditor(cms,'assessment'),choice=editor.fields.find((f:any)=>f.name==='layout');assert.ok(choice);assert.deepEqual(choice.options.values.map((v:any)=>v.name),['','horizontal']);assert.equal(choice.default,undefined);
 const entry=entryForFile(cms,'app/src/content/global-elements/sjekk.json'),form=structuredClone(source);form.content.layout='horizontal';
 const saved=JSON.parse(cmsJsonSave(source,form,entry,cms));assert.deepEqual(saved,form);form.content.layout='';
 const restored=JSON.parse(cmsJsonSave(saved,form,entry,cms));assert.deepEqual(restored,source);
});
