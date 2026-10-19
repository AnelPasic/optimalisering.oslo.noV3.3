import test from 'node:test';
import assert from 'node:assert/strict';
import {cpSync,mkdtempSync,readFileSync,writeFileSync,rmSync} from 'node:fs';
import {resolve,join,relative} from 'node:path';
import {pathToFileURL} from 'node:url';
import {spawnSync} from 'node:child_process';

test('isolated missing, invalid and identity-corrupt masters fail even with zero page placements',()=>{
 const root=resolve('.'),fixture=mkdtempSync(join(root,'.qa-h024a8e-'));
 const original=readFileSync('src/content/global-elements/mekanisme.json');
 try{
  for(const directory of ['lib','config','content/global-elements'])cpSync(join(root,'src',directory),join(fixture,'src',directory),{recursive:true});
  const module=pathToFileURL(join(fixture,'src/lib/home-builder.ts')).href;
  const run=()=>spawnSync(process.execPath,['--input-type=module','-e',`import {resolveHomepageSections} from ${JSON.stringify(module)}; console.log(resolveHomepageSections({sections:[]}).length);`],{cwd:root,encoding:'utf8'});
  assert.equal(run().status,0,'valid complete archive needs no live instances');
  const master=join(fixture,'src/content/global-elements/mekanisme.json');
  const edited=JSON.parse(original);edited.uid='00000000-0000-4000-8000-000000000000';writeFileSync(master,JSON.stringify(edited));
  assert.notEqual(run().status,0,'unused archive identity is protected');
  writeFileSync(master,original);edited.uid=JSON.parse(original).uid;edited.heading='';writeFileSync(master,JSON.stringify(edited));
  assert.notEqual(run().status,0,'unused archive content must validate');
  writeFileSync(master,original);rmSync(master);
  assert.notEqual(run().status,0,'deleted master import fails independently of placement presence');
  assert.deepEqual(readFileSync('src/content/global-elements/mekanisme.json'),original);
 }finally{
  const inside=relative(root,fixture);
  assert.ok(inside.startsWith('.qa-h024a8e-')&&!inside.includes('..'));
  rmSync(fixture,{recursive:true,force:true});
 }
});
