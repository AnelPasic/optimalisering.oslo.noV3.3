import { writeFileSync,unlinkSync,mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { chromium } from '@playwright/test';
import { createAppServer } from '../server/http.mjs';
import { once } from 'node:events';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
const file='src/pages/h024a-fixture-temp.astro',out='../coordination/evidence/h024a';
mkdirSync(out,{recursive:true});
const build=()=>execFileSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{stdio:'pipe'});
let browser,server;
try{
 writeFileSync(file,`---
import Layout from '../layouts/SiteLayout.astro';
import HomePage from '../components/HomePage.astro';
import { pageSchema } from '../lib/content-schema';
import original from '../content/pages/home.json';
const cases=['reorder','remove','add','no-singletons','proof-off','left-none'];
const pages=cases.map(kind=>{const p=structuredClone(original);if(kind==='reorder'){const a=p.sections.findIndex(b=>b.id==='mekanisme');[p.sections[a],p.sections[a+1]]=[p.sections[a+1],p.sections[a]];}if(kind==='remove')p.sections=p.sections.filter(b=>b.id!=='passer');if(kind==='add')p.sections.push({_block:'content',uid:'ec5663b5-cbfa-40a3-a179-c50166ed47f3',id:'ekstra',name:'Ekstra',heading:'Ekstra innholdsseksjon',body:['Lokalt eksempel']});if(kind==='no-singletons')p.sections=p.sections.filter(b=>b._block==='content');if(kind==='proof-off')p.homepage.proof.publicationApproved=false;if(kind==='left-none'){p.hero.layout='split-left';p.hero.visual={kind:'none'};}return {kind,page:pageSchema.parse(p)};});
---
<Layout title="Local QA" description="Local QA" noindex>{pages.map(({kind,page})=><div data-case={kind}><HomePage page={page} /></div>)}</Layout>`);
 build();server=createAppServer({config:{enabled:false},staticRoot:resolve('dist')});server.listen(0,'127.0.0.1');await once(server,'listening');
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const page=await browser.newPage({javaScriptEnabled:false,viewport:{width:1440,height:1000}});await page.goto(`http://127.0.0.1:${server.address().port}/h024a-fixture-temp/`);
 const ids=kind=>page.locator(`[data-case=${kind}] .invite-home > section[id]`).evaluateAll(es=>es.map(e=>e.id));
 assert.deepEqual(await ids('reorder'),['behov','regneeksempel','priser','resultater','passer','mekanisme','sjekk','sporsmal']);
 assert.ok(!(await ids('remove')).includes('passer'));
 assert.equal(await page.locator('[data-case=add] #ekstra h2').textContent(),'Ekstra innholdsseksjon');
 assert.deepEqual(await ids('no-singletons'),['mekanisme','passer']);
 assert.equal(await page.locator('[data-case=proof-off] #resultater, [data-case=proof-off] .hero-proof').count(),0);
 const left=await page.locator('[data-case=left-none] .commercial-hero').evaluate(e=>({shell:e.clientWidth,copy:e.querySelector('.hero-copy').clientWidth,visual:e.querySelector('.hero-visual')}));assert.equal(left.visual,null);assert.ok(left.copy>left.shell*0.9,'no implicit empty column without image');
 const sections=await page.locator('[data-case=reorder] .invite-home > section[id]').evaluateAll(es=>es.map(e=>({id:e.id,text:e.textContent.replace(/\s+/g,'').trim()})));
 const defaults=await (await fetch(`http://127.0.0.1:${server.address().port}/`)).text();assert.ok(defaults.includes('id="mekanisme"'));
 for(const kind of ['remove','add','no-singletons','proof-off','left-none']){
  const actual=await page.locator(`[data-case=${kind}] .invite-home > section[id]`).evaluateAll(es=>es.map(e=>({id:e.id,text:e.textContent.replace(/\s+/g,'').trim()})));
  for(const section of actual.filter(s=>s.id!=='ekstra'))assert.equal(section.text,sections.find(s=>s.id===section.id).text);
 }
 writeFileSync(`${out}/fixtures.json`,JSON.stringify({cases:['reorder','remove','add','no-singletons','proof-off','left-none'],exactUnrelatedSectionText:true,temporaryRouteRemoved:true},null,2)+'\n');console.log('H-024A render fixtures PASS: reorder, add/remove, absent singletons, proof publication gate, unchanged unrelated section copy.');
}finally{if(browser)await browser.close();if(server)await new Promise(r=>server.close(r));unlinkSync(file);build();}
