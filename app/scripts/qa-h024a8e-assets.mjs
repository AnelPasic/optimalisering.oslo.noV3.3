import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {relative,join} from 'node:path';
import {getGlobalElement} from '../src/lib/home-builder.ts';
const phase=process.env.QA_PHASE;if(!phase)throw new Error('QA_PHASE required');
const baseline=JSON.parse(readFileSync('../coordination/evidence/h024a8e/incoming-assets.json'));
const rows=[];const paths=process.env.QA_CURRENT_BUILD?readdirSync('dist',{recursive:true,withFileTypes:true}).filter(e=>e.isFile()&&e.name!=='_headers').map(e=>relative('dist',join(e.parentPath,e.name)).replaceAll('\\','/')):Object.keys(baseline).filter(path=>path!=='_headers'); // configuration, not a public URL
if(process.env.QA_LIBRARY_FIXTURE&&!paths.includes('design-system/global-elements/index.html'))paths.push('design-system/global-elements/index.html');
const absent=(process.env.QA_ABSENT_ELEMENTS||'').split(',').filter(Boolean).map(id=>{const m=getGlobalElement(id);return m._block==='content'?m.heading:m.content.heading;});
for(let i=0;i<paths.length;i+=6)await Promise.all(paths.slice(i,i+6).map(async path=>{
 const response=await fetch('https://optimalisering-oslo-v33.anel.workers.dev/'+path);assert.ok(response.ok,path);
 const bytes=Buffer.from(await response.arrayBuffer()),hash=createHash('sha256').update(bytes).digest('hex');
 if(process.env.QA_CURRENT_BUILD)assert.equal(hash,createHash('sha256').update(readFileSync('dist/'+path)).digest('hex'),`${path}: exact tested local-build/Worker asset parity`);
 if(process.env.QA_HIDDEN_CALCULATOR&&/\.(?:html|css|js|json|xml|txt|svg)$/.test(path))assert.ok(!bytes.toString('utf8').includes(getGlobalElement('regneeksempel').content.heading),`${path}: hidden master heading leaked`);
 if(/\.(?:html|css|js|json|xml|txt|svg)$/.test(path))for(const heading of absent)assert.ok(!bytes.toString('utf8').includes(heading),`${path}: absent master heading leaked: ${heading}`);
 if(process.env.QA_EXACT_ASSETS&&baseline[path])assert.equal(hash,baseline[path],`${path}: exact default asset parity`);
 rows.push({path,hash,baselineEqual:hash===baseline[path]});
}));
writeFileSync(`../coordination/evidence/h024a8e/${phase}-assets.json`,JSON.stringify({phase,rows:rows.sort((a,b)=>a.path.localeCompare(b.path)),hiddenCalculatorScan:!!process.env.QA_HIDDEN_CALCULATOR,absentMasterHeadings:absent},null,2));
console.log(`${phase}: ${rows.length} actual Worker assets checked.`);
