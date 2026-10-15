import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
const out='../coordination/evidence/h024a3',state=process.env.QA_CMS_STATE||'variant',base='https://optimalisering-oslo-v33.anel.workers.dev';
const incoming=JSON.parse(readFileSync(`${out}/incoming-home.json`)),original=incoming.sections.map(s=>s.id),expected=state==='variant'?['mekanisme',...original.filter(id=>id!=='mekanisme')]:original;
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});await page.goto(base+'/?h024a3='+state);await page.evaluate(()=>document.fonts.ready);
 const order=await page.locator('.invite-home > section[id]').evaluateAll(es=>es.map(e=>e.id));assert.deepEqual(order,expected);
 const geometry=await page.locator('#mekanisme').evaluate(e=>({columns:getComputedStyle(e.querySelector('.section-items')).gridTemplateColumns.split(' ').length,layout:e.querySelector('.section-items').dataset.contentLayout||'default',box:e.querySelector('article').dataset.boxVariant||'default',radius:getComputedStyle(e.querySelector('article')).borderTopLeftRadius,heading:e.querySelector('h2').textContent}));
 if(state==='variant'){assert.equal(geometry.columns,1);assert.equal(geometry.layout,'stacked');assert.equal(geometry.box,'card');assert.equal(geometry.radius,'20px');}
 else{assert.equal(geometry.layout,'default');assert.equal(geometry.box,'default');assert.equal(geometry.columns,4);}
 assert.ok(await page.locator('[data-home-assessment] button[type=submit]').isDisabled());assert.match(await page.locator('meta[name=robots]').getAttribute('content'),/noindex/);
 const heroFirst=await page.locator('.invite-home').evaluate(e=>e.firstElementChild.classList.contains('commercial-hero'));assert.ok(heroFirst);
 await page.screenshot({path:`${out}/cms-${state}-top.png`});await page.locator('#mekanisme').screenshot({path:`${out}/cms-${state}-section.png`});
 writeFileSync(`${out}/cms-${state}.json`,JSON.stringify({base,state,commit:process.env.QA_CMS_COMMIT,order,geometry,heroFirst,noindex:true,intakeDisabled:true},null,2)+'\n');console.log(`CMS ${state} live PASS: ${order.join(', ')}; ${geometry.columns} columns, ${geometry.box}.`);
}finally{await browser.close();}
