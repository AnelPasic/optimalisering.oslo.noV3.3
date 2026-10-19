import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
const base=process.env.QA_BASE_URL||'https://optimalisering-oslo-v33.anel.workers.dev',records=[],posts=[];
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
  for(const id of ['priser','sjekk']){
   const cta=page.locator('.commercial-hero a[href="/#'+id+'"]');await cta.click();
   assert.equal(new URL(page.url()).hash,'#'+id);
   const top=await page.locator('#'+id).evaluate(e=>e.getBoundingClientRect().top);assert.ok(top>=-1&&top<300,'Hero anchor scrolls into view');
  }
  for(const a of await page.locator('#priser a[href*="#"]').all()){
   const href=await a.getAttribute('href');const url=new URL(href,base);
   if(url.pathname==='/'&&url.hash){assert.equal(await page.locator(url.hash).count(),1);await a.click();assert.equal(new URL(page.url()).hash,url.hash);}
  }
  assert.equal(await page.locator('[data-chart-month]').count(),12);
  assert.match(await page.locator('[data-scenario-chart] figcaption').textContent(),/Illustrasjon - ikke prognose/);
  const scenario=await page.locator('[data-scenario]').textContent();
  await page.locator('#calc-new-conversion').fill('0');assert.notEqual(await page.locator('[data-scenario]').textContent(),scenario);
  const faqs=await page.locator('#sporsmal details').evaluateAll(es=>es.map(e=>({question:e.querySelector('summary').textContent.trim(),answer:e.querySelector('.collapse-content')?.textContent.trim()})));
  const structured=await page.locator('script[type="application/ld+json"]').evaluateAll(es=>es.map(e=>JSON.parse(e.textContent)));assert.deepEqual(structured,JSON.parse(readFileSync('../coordination/evidence/h024a8g/before-structured-data.json')),'Existing structured data exact');
  const faqLd=await page.locator('script[type="application/ld+json"]').evaluateAll(es=>es.flatMap(e=>{const d=JSON.parse(e.textContent);return Array.isArray(d)?d:d['@graph']||[d]}).filter(d=>d['@type']==='FAQPage'));
  for(const faq of faqLd)assert.deepEqual(faq.mainEntity.map(q=>({question:q.name,answer:q.acceptedAnswer.text})),faqs);
  if(width<=900){const toggle=page.locator('button[aria-controls="mobile-menu"]');await toggle.click();assert.equal(await toggle.getAttribute('aria-expanded'),'true');await toggle.click();assert.equal(await toggle.getAttribute('aria-expanded'),'false');}
  const summary=page.locator('#sporsmal summary').first();await summary.focus();await page.keyboard.press('Enter');
  assert.equal(await summary.evaluate(e=>e.parentElement.open),true,'FAQ opens from keyboard');
  assert.equal(await page.locator('[data-home-assessment] button[type=submit]').isDisabled(),true);
  records.push({width,anchors:true,packageTargets:true,chart12Months:true,hypothetical:true,faqStructuredRecords:faqLd.length,mobileMenu:width<=900,nativeNumericSteps:true,synchronizedKeyboardSlider:true,keyboardFaq:true,intakeDisabled:true});await page.close();
 }
 const robots=await (await fetch(base+'/robots.txt')).text(),sitemap=await (await fetch(base+'/sitemap.xml')).text();
 assert.match(robots,/Disallow: \//);assert.doesNotMatch(sitemap,/<loc>/);const intakeGetStatus=(await fetch(base+'/api/leads')).status;assert.equal(intakeGetStatus,new URL(base).hostname==='127.0.0.1'?403:404);
 assert.deepEqual(posts,[]);writeFileSync(`../coordination/evidence/h024a8g/${process.env.QA_PHASE||'live'}-interactions.json`,JSON.stringify({base,records,posts,robotsDisallowed:true,sitemapEmpty:true,intakeGetStatus},null,2));
 console.log('Final keyboard/form/indexing checks PASS at4 widths; no POSTs.');
}finally{await browser.close();}
