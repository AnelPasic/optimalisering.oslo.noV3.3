import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
import * as builder from '../src/lib/home-builder.ts';
import {entryForFile,cmsJsonSave,assertPreservedContent} from './helpers/pages-cms-json.ts';

test('calculator placement resolves one protected library master without copying its payload',()=>{
 const api=builder as any;
 assert.equal(typeof api.getGlobalElement,'function');
 const master=api.getGlobalElement('regneeksempel');
 const placement={_block:'global',element:'regneeksempel',uid:master.uid};
 assert.deepEqual(api.resolveGlobalPlacement(placement),master);
 assert.equal(api.resolveGlobalPlacement({...placement,visibility:'hidden'}).visibility,'hidden');
 assert.throws(()=>api.resolveGlobalPlacement({...placement,element:'unknown'}));
 assert.throws(()=>api.resolveGlobalPlacement({...placement,content:master.content}));
 assert.equal('content' in placement,false);
});

test('native typed library editor protects file operations and models every master field',()=>{
 const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
 const file='app/src/content/global-elements/regneeksempel.json';
 const entry=entryForFile(cms,file);
 assert.ok(entry,'discoverable global library file');
 assert.deepEqual(entry.operations,{create:false,rename:false,delete:false});
 const master=JSON.parse(readFileSync(file.slice(4),'utf8'));
 const edited=structuredClone(master);edited.content.heading+=' CMS-prøve';
 assertPreservedContent(edited,JSON.parse(cmsJsonSave(master,edited,entry,cms)));
 assert.equal(entry.fields.some((f:any)=>f.name==='visibility'),false,'visibility belongs to page placement');
});
