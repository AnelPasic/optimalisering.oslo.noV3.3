import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {randomUUID} from 'node:crypto';
import assert from 'node:assert/strict';
const path='src/content/pages/home.json',bytes=readFileSync(path),source=JSON.parse(bytes),out='../coordination/evidence/h024a2';
mkdirSync(out,{recursive:true});
const build=()=>execFileSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{encoding:'utf8',stdio:'pipe'});
const cases=['selector','calculator','packages','proof','assessment','faq'].map(type=>({name:'duplicate-'+type,edit:p=>{const b=structuredClone(p.sections.find(b=>b._block===type));b.uid=randomUUID();p.sections.push(b);},message:'Duplicate homepage singleton'}));
cases.push({name:'duplicate-uid',edit:p=>p.sections[1].uid=p.sections[0].uid,message:'Block UUID and anchor must be unique'},
 {name:'duplicate-anchor',edit:p=>p.sections[5].id=p.sections[4].id,message:'Block UUID and anchor must be unique'},
 {name:'missing-required',edit:p=>p.sections.pop(),message:'Missing required homepage block'},
 {name:'unknown-type',edit:p=>p.sections[0]._block='unknown',message:'InvalidContentEntryDataError'});
const results=[];
try{
 for(const item of cases){
  const p=structuredClone(source);item.edit(p);writeFileSync(path,JSON.stringify(p,null,2));
  let output='',exit=0;try{output=build();}catch(error){exit=error.status;output=String(error.stdout)+String(error.stderr);}
  assert.notEqual(exit,0,item.name+' must fail');assert.match(output,/InvalidContentEntryDataError/,item.name+' fails primary content ingestion');assert.ok(output.includes(item.message),item.name+' useful diagnostic');
  results.push({case:item.name,rejectedBeforeRender:true,exit,message:item.message});
 }
}finally{writeFileSync(path,bytes);build();assert.ok(readFileSync(path).equals(bytes));}
writeFileSync(`${out}/primary-astro-validation.json`,JSON.stringify({cases:results,sourceBytesRestored:true,normalBuildRestored:true},null,2)+'\n');
console.log(`H-024A2 primary Astro validation PASS: ${results.length} malformed source states rejected before render; source/build restored.`);
