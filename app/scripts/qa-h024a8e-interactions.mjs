import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
const base='https://optimalisering-oslo-v33.anel.workers.dev',records=[],posts=[];
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try{
 for(const width of [1440,900,390,320]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
  await page.route('**/*',r=>r.request().method()==='POST'?(posts.push(r.request().url()),r.abort()):r.continue());
  await page.goto(base+'/');
  await page.locator('[data-slider=conversion]').waitFor({state:'visible'});
  for(const [id,step] of [['calc-visits',250],['calc-conversion',0.5],['calc-new-conversion',0.5]]){
   const input=page.locator('#'+id),before=Number(await input.inputValue());
   assert.equal(await input.getAttribute('step'),String(step));await input.focus();await page.keyboard.press('ArrowUp');
   assert.equal(Number(await input.inputValue()),before+step,'Native keyboard numeric step');
   if(id!=='calc-visits')assert.equal(Number(await page.locator(`[data-slider=${id==='calc-conversion'?'conversion':'newConversion'}]`).inputValue()),before+step,'Slider synchronized');
  }
  const slider=page.locator('[data-slider=conversion]'),before=Number(await slider.inputValue());
  assert.equal(await slider.isEnabled(),true);await slider.focus();await page.keyboard.press('ArrowRight');
  assert.equal(Number(await page.locator('#calc-conversion').inputValue()),before+0.5);
  const summary=page.locator('#sporsmal summary').first();await summary.focus();await page.keyboard.press('Enter');
  assert.equal(await summary.evaluate(e=>e.parentElement.open),true,'FAQ opens from keyboard');
  assert.equal(await page.locator('[data-home-assessment] button[type=submit]').isDisabled(),true);
  records.push({width,nativeNumericSteps:true,synchronizedKeyboardSlider:true,keyboardFaq:true,intakeDisabled:true});await page.close();
 }
 const robots=await (await fetch(base+'/robots.txt')).text(),sitemap=await (await fetch(base+'/sitemap.xml')).text();
 assert.match(robots,/Disallow: \//);assert.doesNotMatch(sitemap,/<loc>/);assert.equal((await fetch(base+'/api/leads')).status,404);
 assert.deepEqual(posts,[]);writeFileSync('../coordination/evidence/h024a8e/final-interactions.json',JSON.stringify({base,records,posts,robotsDisallowed:true,sitemapEmpty:true,intakeGet404:true},null,2));
 console.log('Final keyboard/form/indexing checks PASS at4 widths; no POSTs.');
}finally{await browser.close();}
