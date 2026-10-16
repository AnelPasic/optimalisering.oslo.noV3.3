import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {resolve} from 'node:path';
const out='../coordination/evidence/h025',paths=['src/content/pages/synlighet.json','src/content/pages/home.json'],original=new Map(paths.map(p=>[p,readFileSync(p)]));
const astro=JSON.parse(readFileSync('node_modules/astro/package.json')).bin.astro;
const build=()=>execFileSync(process.execPath,[resolve('node_modules/astro',astro),'build'],{encoding:'utf8',maxBuffer:4e6});
const cases=[{name:'service-invalid-layout',path:paths[0],edit:p=>p.hero={layout:'raw-class'}},{name:'service-duplicated-copy',path:paths[0],edit:p=>p.hero={layout:'centered',title:'Duplicated Hero source'}},{name:'home-invalid-layout',path:paths[1],edit:p=>p.hero.layout='raw-class'}],records=[];
try{for(const fixture of cases){for(const [path,bytes] of original)writeFileSync(path,bytes);const p=JSON.parse(original.get(fixture.path));fixture.edit(p);writeFileSync(fixture.path,JSON.stringify(p,null,2));let rejected=false;try{build();}catch(error){assert.match(`${error.stdout}${error.stderr}`,/InvalidContentEntryDataError/);rejected=true;}assert.ok(rejected,fixture.name+' fails actual Astro ingestion before render');records.push({name:fixture.name,rejectedBeforeRender:true});}}
finally{for(const [path,bytes] of original)writeFileSync(path,bytes);writeFileSync(`${out}/primary-restored-build.log`,build());for(const [path,bytes] of original)assert.ok(readFileSync(path).equals(bytes));}
writeFileSync(`${out}/primary-validation.json`,JSON.stringify({records,exactSourceRestored:true},null,2)+'\n');console.log('H-025 primary Astro ingestion: 3 malformed sources rejected before render; exact bytes restored.');
