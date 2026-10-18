import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,readdirSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash,randomUUID} from 'node:crypto';
const file='src/content/pages/home.json',original=readFileSync(file),base=JSON.parse(original),out='../coordination/evidence/h024a8b';mkdirSync(out,{recursive:true});
const run=()=>execFileSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{encoding:'utf8',stdio:'pipe'});
const walk=p=>readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${p}/${e.name}`):`${p}/${e.name}`);
const hash=b=>createHash('sha256').update(b).digest('hex');
const sentinel='h024a8b-private-sentinel',anchor='h024a8b-private-insert';
const core=['behov','regneeksempel','resultater','mekanisme','passer','sporsmal'];
let report;
try{
 const changed=structuredClone(base);
 for(const id of core){const b=changed.sections[id];b.visibility='hidden';const target=b.content??b;target.heading=sentinel+'-'+id;}
 changed.sections.sporsmal.content.items[0].answer=sentinel+'-faq-answer';
 changed.optionalSections=[{...structuredClone(changed.sections.mekanisme),id:anchor,uid:randomUUID(),name:sentinel,heading:sentinel,body:[sentinel],items:[{title:sentinel,text:sentinel}],placement:'after:sporsmal',visibility:'hidden'}];
 writeFileSync(file,JSON.stringify(changed,null,2)+'\n');run();
 execFileSync('cmd.exe',['/d','/c','npm run qa:static'],{encoding:'utf8',stdio:'pipe'});
 const files=walk('dist').filter(p=>/\.(html|js|json|xml|txt|css|svg)$/.test(p));
 for(const p of files){const text=readFileSync(p,'utf8');assert.ok(!text.includes(sentinel)&&!text.includes(anchor),`${p}: hidden source leak`);}
 const home=readFileSync('dist/index.html','utf8');for(const id of core)assert.ok(!home.includes(`id="${id}"`),id);
 assert.ok(!home.includes('class="hero-proof'),'hidden proof derivative');
 assert.ok(home.includes('id="sjekk"')&&home.includes('id="priser"'));
 for(const route of ['priser','synlighet','konvertering'])assert.ok(readFileSync(`dist/${route}/index.html`,'utf8').includes('Partner'),route+' commercial source retained');
 const ds=readFileSync('dist/design-system/index.html','utf8');assert.ok(!ds.includes('id="ds-home-faq"'));assert.ok(!ds.includes('id="ds-layout-'));
 report={hiddenCore:core,hiddenOptional:anchor,publicFilesSearched:files.length,sentinelAbsent:true,hiddenAnchorsAbsent:true,heroProofAbsent:true,commercialRoutesRetained:true,designSystemSpecimensOmitted:true,staticQaOnHiddenState:true};
}finally{writeFileSync(file,original);run();assert.ok(readFileSync(file).equals(original));}
report.restoredSourceSha256=hash(original);report.exactSourceRestore=true;writeFileSync(out+'/visibility-fixture.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
