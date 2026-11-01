import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {entryForFile,resolveField,cmsJsonSave} from './helpers/pages-cms-json.ts';
import {pageSchema} from '../src/lib/content-schema.ts';

const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const file='src/content/pages/lokal-seo.json';
const page=JSON.parse(readFileSync(file,'utf8'));
const editor=entryForFile(cms,'app/'+file);
const hero=resolveField(editor.fields.find((field:any)=>field.name==='hero'),cms.components);

test('optional secondary Hero CTA does not require text or URL when empty',()=>{
 const primary=resolveField(hero.fields.find((field:any)=>field.name==='primaryCta'),cms.components);
 const secondary=resolveField(hero.fields.find((field:any)=>field.name==='secondaryCta'),cms.components);
 assert.equal(primary.required,true);
 assert.deepEqual(primary.fields.filter((f:any)=>f.required===true).map((f:any)=>f.name),['label','href'],'primary CTA remains mandatory');
 assert.notEqual(secondary.required,true);
 assert.equal(secondary.type,'object');
 assert.deepEqual(secondary.fields.filter((f:any)=>f.required===true).map((f:any)=>f.name),[],'secondary CTA can be completely empty');
});

test('Lokal SEO saves three Hero tone choices without a secondary CTA',()=>{
 const edited=structuredClone(page);
 edited.hero.toneOverrides={
  eyebrowPreset:'spisspluskomiskplus',
  titlePreset:'spisspluskomiskplus',
  supportPreset:'spisspluskomiskplus',
 };
 edited.hero.secondaryCta={label:'',href:''};
 const saved=JSON.parse(cmsJsonSave(page,edited,editor,cms));
 assert.equal(saved.hero.secondaryCta,undefined,'no empty secondary CTA persisted');
 assert.deepEqual(saved.hero.toneOverrides,edited.hero.toneOverrides);
 assert.equal(saved.hero.title,page.hero.title);
 assert.deepEqual(saved.hero.primaryCta,page.hero.primaryCta);
 assert.deepEqual(saved.sections??[],page.sections??[]);
 assert.deepEqual(saved.faq??[],page.faq??[]);
 assert.ok(pageSchema.safeParse(saved).success,'a CMS save must accept the minimal page with no secondary CTA');
});

test('existing pages retain configured secondary buttons, while partial buttons remain invalid',()=>{
 for(const name of ['home','synlighet']){
  const source=JSON.parse(readFileSync('src/content/pages/'+name+'.json','utf8'));
  const cmsEditor=entryForFile(cms,'app/src/content/pages/'+name+'.json');
  const saved=JSON.parse(cmsJsonSave(source,source,cmsEditor,cms));
  assert.deepEqual(saved.hero.secondaryCta,source.hero.secondaryCta,name+' keeps secondary link');
 }
 const incomplete=structuredClone(page);
 incomplete.hero.secondaryCta={label:'Only text',href:''};
 assert.equal(pageSchema.safeParse(incomplete).success,false,'partial secondary buttons must never be published');
});
