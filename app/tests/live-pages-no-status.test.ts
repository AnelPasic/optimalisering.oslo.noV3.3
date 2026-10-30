import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync} from 'node:fs';
import YAML from 'yaml';
import {pageFilePaths} from './helpers/page-sources.ts';
import {pageSchema} from '../src/lib/content-schema.ts';
import {glossarySchema} from '../src/lib/terminology.ts';
import {proofContentSchema} from '../src/lib/proof.ts';

test('all 17 authored pages are live content without redundant approval metadata',()=>{
 const names=pageFilePaths();
 assert.equal(names.length,17);
 for(const name of names){
  const raw=JSON.parse(readFileSync('src/content/pages/'+name,'utf8'));
  assert.equal(Object.hasOwn(raw,'status'),false,name);
  assert.equal(Object.hasOwn(raw,'authority'),false,name);
  assert.equal(pageSchema.safeParse(raw).success,true,name);
 }
 const glossary=JSON.parse(readFileSync('src/content/terminology/glossary.json','utf8'));
 assert.equal(Object.hasOwn(glossary,'authority'),false);
 assert.equal(glossarySchema.safeParse(glossary).success,true);
 assert.equal(existsSync('src/config/copy-authority.json'),false);
});

test('Pages CMS no longer exposes page or glossary review/authority fields',()=>{
 const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
 const inspect=(entries:any[])=>{
  for(const entry of entries){
   if(entry.path?.startsWith('app/src/content/pages/') || entry.path==='app/src/content/terminology/glossary.json'){
    assert.equal(entry.fields?.some((f:any)=>f.name==='status'||f.name==='authority'),false,entry.path);
   }
   if(entry.items)inspect(entry.items);
  }
 };
 inspect(cms.content);
});

test('independent evidence approval gates remain intact',()=>{
 const cases=readdirSync('src/content/proof').filter(name=>name.endsWith('.json'));
 assert.ok(cases.length>0);
 for(const name of cases){
  const raw=JSON.parse(readFileSync('src/content/proof/'+name,'utf8'));
  assert.equal(proofContentSchema.safeParse(raw).success,true,name);
  assert.equal(typeof raw.publicationApproved,'boolean',name);
  assert.ok('namingPermission' in raw,name);
  assert.ok('publicationStatus' in raw,name);
 }
});
