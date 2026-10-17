import {readFileSync,writeFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
const path='src/content/pages/home.json',original=readFileSync(path),out='../coordination/evidence/h024a7';
const astro=JSON.parse(readFileSync('node_modules/astro/package.json')).bin.astro;
const build=()=>execFileSync(process.execPath,[resolve('node_modules/astro',astro),'build'],{encoding:'utf8',maxBuffer:4e6});
try{const page=JSON.parse(original);page.sections.find(s=>s._block==='assessment').content.layout='horizontal';writeFileSync(path,JSON.stringify(page,null,2)+'\n');writeFileSync(out+'/horizontal-build.log',build());writeFileSync(out+'/horizontal.log',execFileSync(process.execPath,['scripts/qa-h024a7.mjs'],{encoding:'utf8',maxBuffer:4e6,env:{...process.env,QA_PHASE:'local-horizontal',QA_LAYOUT:'horizontal',QA_CONTACT_ONLY:'1',QA_BASE_URL:''}}));}
finally{writeFileSync(path,original);writeFileSync(out+'/restored-build.log',build());assert.ok(readFileSync(path).equals(original));console.log('Horizontal source fixture restored byte-exact; normal build restored.');}
