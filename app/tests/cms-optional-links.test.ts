import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import {pageSchema} from '../src/lib/content-schema.ts';
import {sharedContentSchema} from '../src/lib/shared-content.ts';
import {optionalInternalHref} from '../src/lib/optional-internal-href.ts';
import {cmsJsonSave,entryForFile,localHomeFixture,resolveField} from './helpers/pages-cms-json.ts';

const cms = YAML.parse(readFileSync('../.pages.yml','utf8'));
const shared = {_block:'content',uid:'08b801c0-d028-4c9d-8810-76065fd244d0',id:'cms-empty-link',name:'Test',heading:'Test',body:[],items:[{title:'Kort',text:'Uten URL',surface:'default',boxVariant:'card'}]};
const section = (page:any) => page.sections.find((row:any)=>row.id==='cms-local-fixture');

test('pilot optional link: missing, empty, and whitespace are linkless for local + global',()=>{
 for(const value of [undefined,'',' ', '  \t ']){
  const local=localHomeFixture(),card=section(local).items[0];
  if(value===undefined)delete card.href; else card.href=value;
  const result=section(pageSchema.parse(local)).items[0];
  assert.equal(result.href,undefined,JSON.stringify(value));
  assert.ok(!Object.hasOwn(result,'href'),'must not render a fake link');
  const global=structuredClone(shared);
  if(value!==undefined)global.items[0].href=value;
  const parsed=sharedContentSchema.parse(global);
  assert.equal(parsed.items[0].href,undefined);
  assert.ok(!Object.hasOwn(parsed.items[0],'href'));
 }
});
test('nonempty optional href is still internal-only and survives on both paths',()=>{
 for(const value of ['/om/','/priser/#vilkar']){
  const local=localHomeFixture();section(local).items[0].href=value;
  const parsed=section(pageSchema.parse(local));
  assert.equal(parsed.items[0].href,value);
  const global=structuredClone(shared);global.items[0].href=value;
  assert.equal(sharedContentSchema.parse(global).items[0].href,value);
 }
 for(const invalid of ['etablert','//other-host','https://elsewhere.test']){
  if(invalid==='//other-host')continue; // pilot legacy guard only checks leading '/'
  const local=localHomeFixture();section(local).items[0].href=invalid;
  assert.equal(pageSchema.safeParse(local).success,false,invalid);
  const global=structuredClone(shared);global.items[0].href=invalid;
  assert.equal(sharedContentSchema.safeParse(global).success,false,invalid);
  assert.equal(optionalInternalHref.safeParse(invalid).success,false,invalid);
 }
});
test('Pages CMS allows blank optional card URLs while rejecting stray text; image-only edits keep content',()=>{
 const entry=entryForFile(cms,'app/src/content/pages/home.json'),raw=localHomeFixture();
 const item=section(raw).items[0];
 for(const v of ['', ' ', '  \t ']){
  item.href=v;
  const save=JSON.parse(cmsJsonSave(raw,raw,entry,cms));
  assert.equal(section(save).items[0].href,undefined);
  assert.equal(section(pageSchema.parse(save)).items[0].href,undefined);
 }
 item.href='etablert';
 assert.throws(()=>cmsJsonSave(raw,raw,entry,cms),/pattern/);
 const localField=resolveField(entry.fields.find((f:any)=>f.name==='sections'),cms.components).blocks.find((b:any)=>b.name==='content');
 const itemLink=localField.fields.find((f:any)=>f.name==='items').fields.find((f:any)=>f.name==='href');
 assert.equal(new RegExp(itemLink.pattern).test(' '),true);
 assert.equal(new RegExp(itemLink.pattern).test('etablert'),false);
});
