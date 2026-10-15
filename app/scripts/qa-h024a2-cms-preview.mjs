import { chromium } from '@playwright/test';
import { writeFileSync,mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';
const state=process.env.QA_CMS_STATE||'reorder',base='https://optimalisering-oslo-v33.anel.workers.dev';
const out='../coordination/evidence/h024a2';mkdirSync(out,{recursive:true});
const expected=[...(state==='reorder'?['priser','behov','regneeksempel']:['behov','regneeksempel','priser']),'resultater','mekanisme','passer','sjekk','sporsmal'];
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});await page.goto(base+'/?cms-proof='+state);await page.evaluate(()=>document.fonts.ready);
 const order=await page.locator('.invite-home > section[id]').evaluateAll(es=>es.map(e=>e.id));assert.deepEqual(order,expected);
 assert.ok(await page.locator('[data-home-assessment] button[type=submit]').isDisabled());assert.match(await page.locator('meta[name=robots]').getAttribute('content'),/noindex/);
 const first=state==='reorder'?'priser':'behov',second=state==='reorder'?'behov':'regneeksempel';
 const positions=await page.evaluate(([a,b])=>({first:document.getElementById(a).offsetTop,second:document.getElementById(b).offsetTop}),[first,second]);assert.ok(positions.first<positions.second);
 await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:`${out}/cms-preview-${state}.png`});
 writeFileSync(`${out}/cms-preview-${state}.json`,JSON.stringify({base,state,commit:process.env.QA_CMS_COMMIT,order,positions,noindex:true,intakeDisabled:true},null,2)+'\n');
 console.log(`Authenticated CMS preview ${state} PASS: ${order.join(', ')}.`);
}finally{await browser.close();}
