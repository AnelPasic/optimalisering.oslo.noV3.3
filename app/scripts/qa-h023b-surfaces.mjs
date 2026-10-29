import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import {existsSync,writeFileSync,unlinkSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {resolve} from 'node:path';
import {once} from 'node:events';
import {createAppServer} from '../server/http.mjs';
const fixture='src/pages/h023b-qa-temp.astro',out='../coordination/evidence/h023b';
assert.ok(!existsSync(fixture));mkdirSync(out,{recursive:true});
const build=()=>execFileSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{stdio:'pipe'});
let browser,server;
try{
 writeFileSync(fixture,`---
import Layout from '../layouts/SiteLayout.astro';
import HomeSection from '../components/HomeSection.astro';
import seo from '../content/pages/seo.json';
import ai from '../content/pages/ai-synlighet.json';
import shop from '../content/pages/nettbutikkoptimalisering.json';
import service from '../content/pages/synlighet.json';
const rows=[seo,ai,shop].map(p=>p.sections.find(s=>s.id==='sjekk'));
---
<Layout title="Lokal H-023B kontroll" description="Kun syntetisk lokal kontroll" noindex><div class="invite-home invite-service">
{rows.map((section,i)=><div data-fixture={i}><HomeSection section={{...section,surface:'secondary',headingAlign:'left',items:[{title:'Syntetisk kort',text:'Lokal kontroll av overflater.',surface:'base-100'},{title:'Samme flate',text:'Lokal kontroll av kant.',surface:'secondary'}]}} /></div>)}
<div data-fixture="cards"><HomeSection visualId="behov" section={{...rows[0],surface:'secondary',items:[{title:'Syntetisk kort',text:'Kontroll av samme flate.',surface:'secondary'}]}} /></div>
<div data-fixture="protected"><HomeSection section={{...service.sections.find(s=>s.id==='sjekk'),surface:'secondary'}} /></div>
</div></Layout>`);
 build();
 server=createAppServer({config:{enabled:false},staticRoot:resolve('dist')});server.listen(0,'127.0.0.1');await once(server,'listening');
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const records=[];
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:1000}});await page.goto(`http://127.0.0.1:${server.address().port}/h023b-qa-temp/`);
  for(const i of [0,1,2]){
   const section=page.locator(`[data-fixture="${i}"] section`);
   assert.equal(await section.getAttribute('data-surface'),'secondary','ordinary sjekk remains CMS-editable');
   const values=await section.evaluate(e=>{
    const ctx=document.createElement('canvas').getContext('2d');
    const rgb=c=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=c;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data].slice(0,3);};
    return {section:rgb(getComputedStyle(e).backgroundColor),cards:[...e.querySelectorAll('.info-item')].map(c=>({background:rgb(getComputedStyle(c).backgroundColor),border:parseFloat(getComputedStyle(c).borderTopWidth)})),align:getComputedStyle(e.querySelector('.section-heading')).textAlign};
   });
   assert.deepEqual(values.section,[50,12,67]);assert.deepEqual(values.cards[0].background,[255,255,255]);assert.deepEqual(values.cards[1].background,[50,12,67]);assert.ok(values.cards[1].border>=1,'same-surface distinction retained');assert.equal(values.align,'left');records.push({width,i,values});
  }
  assert.equal(await page.locator('[data-fixture=protected] section').getAttribute('data-surface'),null,'validated protected model stays protected');
  assert.ok(await page.locator('[data-fixture=cards] .card').evaluate(e=>parseFloat(getComputedStyle(e).borderTopWidth)>=1),'same-surface daisyUI card distinction retained');
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.close();
 }
 writeFileSync(`${out}/surface-checks.json`,JSON.stringify({records,protectedModel:true},null,2)+'\n');console.log('H-023B CMS surface regression: 3 ordinary service sjekk sections, flat/card surfaces, same-surface borders, heading alignment and protected model at 2 widths PASS.');
}finally{
 if(browser)await browser.close();if(server)await new Promise(r=>server.close(r));
 if(existsSync(fixture))unlinkSync(fixture);build();
}
