import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {getGlobalElement} from '../src/lib/home-builder.ts';
const phase=process.env.QA_PHASE;if(!phase)throw new Error('QA_PHASE required');
const baseline=JSON.parse(readFileSync('../coordination/evidence/h024a8e/incoming-assets.json'));
const rows=[];const paths=Object.keys(baseline).filter(path=>path!=='_headers'); // configuration, not a public URL
for(let i=0;i<paths.length;i+=6)await Promise.all(paths.slice(i,i+6).map(async path=>{
 const response=await fetch('https://optimalisering-oslo-v33.anel.workers.dev/'+path);assert.ok(response.ok,path);
 const bytes=Buffer.from(await response.arrayBuffer()),hash=createHash('sha256').update(bytes).digest('hex');
 if(process.env.QA_HIDDEN_CALCULATOR&&/\.(?:html|css|js|json|xml|txt|svg)$/.test(path))assert.ok(!bytes.toString('utf8').includes(getGlobalElement('regneeksempel').content.heading),`${path}: hidden master heading leaked`);
 if(process.env.QA_EXACT_ASSETS)assert.equal(hash,baseline[path],`${path}: exact default asset parity`);
 rows.push({path,hash,baselineEqual:hash===baseline[path]});
}));
writeFileSync(`../coordination/evidence/h024a8e/${phase}-assets.json`,JSON.stringify({phase,rows:rows.sort((a,b)=>a.path.localeCompare(b.path)),hiddenCalculatorScan:!!process.env.QA_HIDDEN_CALCULATOR},null,2));
console.log(`${phase}: ${rows.length} actual Worker assets checked.`);
