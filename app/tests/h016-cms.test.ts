import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
const home=JSON.parse(readFileSync('src/content/pages/home.json','utf8'));
const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
const packages=cms.content.find((c:any)=>c.name==='homepage').fields.find((f:any)=>f.name==='homepage').fields.find((f:any)=>f.name==='packages');
function leaves(fields:any[],prefix=''):any[] {return fields.flatMap(f=>f.fields?leaves(f.fields,`${prefix}${f.name}.`):[{path:`${prefix}${f.name}`,field:f}]);}

test('OWNER can edit package CTA wording while order and detail routes remain readonly',()=>{
  const fields=leaves(packages.fields.find((f:any)=>f.name==='items').fields);
  const field=(path:string)=>fields.find(f=>f.path===path)?.field;
  for(const path of ['cta.label','detailLink.label','title','descriptor','compact.fit','compact.situations','fit','price','pricePrefix','priceSuffix','vatSuffix','recommended','badge','visual','visualAsset.src','visualAsset.alt','visualAsset.positionX','visualAsset.positionY','visualCaption.label','visualCaption.support','situations','typicalBusiness','scope','distinction','selectionRule','priceNote','iconItems.icon','iconItems.compactLabel','iconItems.label','iconItems.description']) {
    assert.ok(field(path),`CMS field exists: ${path}`);assert.notEqual(field(path).readonly,true,path);
  }
  for(const {path,field:shared}of leaves(packages.fields.filter((f:any)=>f.name!=='items')))assert.notEqual(shared.readonly,true,`Shared field ${path}`);
  for(const path of ['key','cta.href','detailLink.href']) assert.equal(field(path)?.readonly,true,path);
  assert.ok(!/låst|scoped.*handoff/i.test(JSON.stringify(packages)),'Editor guidance must allow routine safe OWNER editing');
  assert.ok(!/lås/i.test(cms.content.find((c:any)=>c.name==='homepage').label),'The package editor entry also uses a neutral label');
  assert.equal(field('visualAsset.src').options.media,'packageVisuals');
  assert.deepEqual(field('visualAsset.src').options.extensions,['svg','webp','png']);
});

test('schema accepts independent CTA/detail labels but rejects edited routing and package intent',()=>{
  const edited=structuredClone(home);
  edited.homepage.packages.items[0].cta.label='Bestill denne pakken';
  edited.homepage.packages.items[0].detailLink.label='Les detaljene';
  assert.equal(pageSchema.parse(edited).homepage!.packages.items[0].cta.label,'Bestill denne pakken');
  for(const [field,value] of [['key','partner'],['cta.href','/priser/?pakke=partner#bestill'],['detailLink.href','/priser/#feil']]) {
    const invalid=structuredClone(edited),item=invalid.homepage.packages.items[0];
    if(field==='key')item.key=value;else {const [parent,key]=field.split('.');item[parent][key]=value;}
    assert.equal(pageSchema.safeParse(invalid).success,false,field);
  }
});

test('all CMS select fields provide the documented options.values object',()=>{
  function check(fields:any[]) {
    for(const field of fields) {
      if(field.type==='select') {
        assert.ok(field.options && !Array.isArray(field.options),`${field.name}: options is an object`);
        assert.ok(Array.isArray(field.options.values)&&field.options.values.length>0,`${field.name}: options.values supplies choices`);
      }
      if(field.fields)check(field.fields);
    }
  }
  for(const entry of cms.content)check(entry.fields??[]);
});
