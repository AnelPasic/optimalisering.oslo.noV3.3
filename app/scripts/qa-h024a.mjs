import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdirSync,readFileSync,writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { once } from 'node:events';
import { createAppServer } from '../server/http.mjs';
const phase=process.env.QA_PHASE||'after',out=resolve(`../coordination/evidence/h024a/${phase}`);
mkdirSync(out,{recursive:true});
const server=process.env.QA_BASE_URL?null:createAppServer({config:{enabled:false},staticRoot:resolve('dist')});
if(server){server.listen(0,'127.0.0.1');await once(server,'listening');}
const base=process.env.QA_BASE_URL||`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const records=[],errors=[],posts=[];
const baseline=phase==='before'?null:JSON.parse(readFileSync('../coordination/evidence/h024a/before/checks.json'));
try{
 for(const width of [1440,900,390,320]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
  await page.route('**/*',r=>r.request().method()==='POST'?r.abort():r.continue());
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.method()==='POST')posts.push(r.url());});
  await page.goto(base);await page.evaluate(()=>document.fonts.ready);
  const snapshot=await page.evaluate(()=>{
   const main=document.querySelector('main').cloneNode(true);main.querySelectorAll('script,style,[aria-hidden=true]').forEach(e=>e.remove());
   const box=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};};
   return {text:main.textContent.replace(/\s+/g,' ').trim(),title:document.title,description:document.querySelector('meta[name=description]').content,sections:[...document.querySelectorAll('.invite-home > section')].map(e=>({id:e.id,box:box(e)})),hero:['.hero-copy','.hero-copy h1','.hero-photo','.hero-proof'].map(s=>({selector:s,box:box(document.querySelector(s))}))};
  });
  if(baseline)assert.deepEqual(snapshot,baseline.records.find(r=>r.width===width).snapshot,`default copy/order/geometry at ${width}`);
  assert.equal(await page.locator('h1').count(),1);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.match(await page.locator('meta[name=robots]').getAttribute('content'),/noindex/);
  assert.ok(await page.locator('[data-home-assessment] button[type=submit]').isDisabled());
  await page.screenshot({path:`${out}/home-${width}.png`});
  if(phase!=='before'){
   if(width<=900){const menu=page.locator('[data-home-menu]');await menu.focus();await page.keyboard.press('Enter');assert.equal(await menu.getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');}
   const visits=page.locator('#calc-visits');{const old=await page.locator('[data-current]').textContent();await visits.fill('3000');await visits.dispatchEvent('input');assert.notEqual(await page.locator('[data-current]').textContent(),old);}
   assert.equal(await page.locator('.hero-actions a').first().getAttribute('href'),'/#sjekk');
   assert.ok(await page.locator('#priser a[href*="pakke="]').count()>=3);
   const faq=page.locator('#sporsmal summary').first();await faq.focus();await page.keyboard.press('Enter');assert.ok(await faq.evaluate(e=>e.parentElement.open));
  }
  records.push({width,snapshot});await page.close();
 }
 if(phase!=='before'){
  for(const width of [1440,390]){
   const page=await browser.newPage({viewport:{width,height:1000}});await page.goto(base+'/design-system/');await page.evaluate(()=>document.fonts.ready);
   for(const layout of ['split-right','split-left','centered','centered-none','long']){
    const demo=page.locator(`[data-hero-demo="${layout}"]`),hero=demo.locator('.commercial-hero');
    assert.equal(await hero.locator('h1').count(),0,'demo uses H2, leaving one document H1');
    assert.equal(await hero.locator('.hero-copy').count(),1);
    const boxes=await hero.evaluate(e=>{const c=e.querySelector('.hero-copy'),v=e.querySelector('.hero-visual');return {copy:c.getBoundingClientRect().toJSON(),visual:v?.getBoundingClientRect().toJSON(),textFirst:!v||!!(c.compareDocumentPosition(v)&Node.DOCUMENT_POSITION_FOLLOWING)};});
    assert.ok(boxes.textFirst);if(layout==='centered-none')assert.equal(boxes.visual,undefined);
    if(boxes.visual){if(width===390||layout==='centered'||layout==='long')assert.ok(boxes.visual.y>=boxes.copy.bottom);else if(layout==='split-left')assert.ok(boxes.visual.x<boxes.copy.x);else assert.ok(boxes.visual.x>boxes.copy.x);}
    await demo.screenshot({path:`${out}/hero-${layout}-${width}.png`});
   }
   assert.equal(await page.locator('h1').count(),1);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.close();
  }
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}}),page=await context.newPage();await page.goto(base);const faq=page.locator('#sporsmal summary').first();await faq.click();assert.ok(await faq.evaluate(e=>e.parentElement.open));assert.ok(await page.locator('[data-home-assessment] button[type=submit]').isDisabled());await context.close();
 }
 assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);writeFileSync(`${out}/checks.json`,JSON.stringify({phase,records,errors,posts},null,2)+'\n');console.log(`H-024A ${phase}: 4 homepage widths, ${phase==='before'?0:10} Hero variant checks; exact default preservation, no errors/POSTs.`);
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));}
