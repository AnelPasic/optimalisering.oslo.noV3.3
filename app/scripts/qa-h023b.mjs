import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdirSync,readFileSync,readdirSync,writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { once } from 'node:events';
import { createAppServer } from '../server/http.mjs';

const phase=process.env.QA_PHASE||'after',out=resolve(`../coordination/evidence/h023b/${phase}`);
mkdirSync(out,{recursive:true});
const server=process.env.QA_BASE_URL?null:createAppServer({config:{enabled:false},staticRoot:resolve('dist')});
if(server){server.listen(0,'127.0.0.1');await once(server,'listening');}
const base=process.env.QA_BASE_URL||`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const pages=readdirSync('src/content/pages').filter(n=>n.endsWith('.json')).map(n=>JSON.parse(readFileSync('src/content/pages/'+n)));
const routes=pages.map(p=>p.slug==='home'?'/':`/${p.slug}/`).concat('/begreper/','/design-system/','/404.html');
const representatives=new Set(['/','/seo/','/synlighet/','/konvertering/','/ai-synlighet/','/nettbutikkoptimalisering/','/innsikt/','/innsikt/hva-bor-optimaliseres-forst/','/priser/','/vurdering/','/personvern/','/kontakt/']);
const records=[],errors=[],posts=[];
const baseline=phase==='before'?null:JSON.parse(readFileSync('../coordination/evidence/h023b/before/checks.json'));
try{
 for(const route of routes) for(const width of representatives.has(route)?[1440,900,390,320]:[1440,390]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
  await page.route('**/*',route=>route.request().method()==='POST'?route.abort():route.continue());
  page.on('pageerror',e=>errors.push({route,width,message:e.message}));page.on('request',r=>{if(r.method()==='POST')posts.push(r.url());});
  await page.goto(base+route);await page.evaluate(()=>document.fonts.ready);
  const snapshot=await page.evaluate(()=>{
   const main=document.querySelector('main').cloneNode(true);main.querySelectorAll('script,style,[aria-hidden=true]').forEach(e=>e.remove());
   const clean=v=>v.replace(/\s+/g,' ').trim();
   return {text:clean(main.textContent),title:document.title,description:document.querySelector('meta[name=description]').content,canonical:document.querySelector('link[rel=canonical]').href,sections:[...document.querySelectorAll('main section[id]')].map(e=>e.id)};
  });
  if(baseline&&route!=='/design-system/'){
   const original=baseline.records.find(r=>r.route===route&&r.width===width).snapshot;
   assert.equal(snapshot.text,original.text,route+': exact main copy');
   for(const k of ['title','description','canonical']) assert.equal(snapshot[k],original[k],route+': '+k);
   assert.deepEqual(snapshot.sections.filter(id=>original.sections.includes(id)),original.sections,route+': section order');
  }
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route+': overflow');
  assert.match(await page.locator('meta[name=robots]').getAttribute('content'),/noindex/);
  if(route!=='/design-system/') assert.equal(await page.locator('.theme-controller').count(),0);
  if(phase!=='before'){
   assert.equal(await page.locator('body').getAttribute('data-ui-shell'),'true');
   assert.equal(await page.locator('[data-home-menu]').count(),1,route+': shared chrome');
   const theme=await page.locator('body').evaluate(e=>{const s=getComputedStyle(e);return {ink:s.getPropertyValue('--ink'),font:s.fontFamily};});
   assert.match(theme.font,/Figtree/);
   if(width<=900){const menu=page.locator('[data-home-menu]');await menu.focus();await page.keyboard.press('Enter');assert.equal(await menu.getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await menu.getAttribute('aria-expanded'),'false');}
   const faq=page.locator('.faq-list summary').first();if(await faq.count()){await faq.focus();await page.keyboard.press('Enter');assert.ok(await faq.evaluate(e=>e.parentElement.open));await page.keyboard.press('Enter');}
   if(route==='/design-system/'){
    assert.equal(await page.locator('.ds-type-specimen').count(),8);
    assert.equal(await page.locator('.ds-grid-demo').count(),3);
    assert.ok(await page.locator('.ds-type-specimen').evaluateAll(rows=>rows.every(e=>parseFloat(getComputedStyle(e).paddingTop)>=28)),'type specimens have deliberate spacing');
    assert.ok(await page.locator('.ds-section').evaluateAll(rows=>rows.every(e=>parseFloat(getComputedStyle(e).paddingTop)>=48)),'major sections separated locally');
    const sample=page.locator('[data-theme-sample]');await sample.evaluate(e=>e.style.transition='none');
    const brand=await sample.evaluate(e=>getComputedStyle(e).backgroundColor);await page.locator('input[value=light]').check();assert.notEqual(await sample.evaluate(e=>getComputedStyle(e).backgroundColor),brand);await page.locator('input[value=optimalisering]').check();assert.equal(await sample.evaluate(e=>getComputedStyle(e).backgroundColor),brand);
    await page.locator('.ds-type-specimen').first().scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/design-type-${width}.png`});
    await page.locator('.ds-grid-demo').first().scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/design-cards-${width}.png`});
   }
   if(route==='/priser/'&&width===390){
    await page.goto(base+'/priser/?pakke=vekst#bestill');await page.waitForFunction(()=>document.querySelector('#order-package').value==='vekst');
    await page.locator('#order-package').selectOption('partner');assert.ok(new URL(page.url()).searchParams.get('pakke')==='partner');assert.ok(await page.locator('#partner-order-note').isVisible());assert.ok(await page.locator('[data-package-order] button[type=submit]').isDisabled());
   }
   if(route==='/vurdering/'&&width===390){
    await page.locator('#website').fill('javascript:invalid');await page.locator('#email').fill('synthetic@example.invalid');await page.locator('[data-assessment] button[type=submit]').click();assert.ok(await page.locator('#website-error').isVisible());
   }
  }
  if((route==='/seo/'&&[1440,390].includes(width))||(phase!=='before'&&representatives.has(route)&&width===390)){
   await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
   await page.screenshot({path:`${out}/${route==='/'?'home':route.replaceAll('/','_')}-${width}.png`,fullPage:route==='/seo/'});
  }
  records.push({route,width,snapshot});await page.close();
 }
 if(phase!=='before') for(const route of ['/seo/','/innsikt/','/priser/','/design-system/']){
  const page=await browser.newPage({viewport:{width:390,height:1000},javaScriptEnabled:false});await page.goto(base+route);
  if(route==='/design-system/'){await page.locator('input[value=light]').check();assert.ok(await page.locator('input[value=light]').isChecked());}
  const summary=page.locator('.faq-list summary').first();if(await summary.count()){await summary.click();assert.ok(await summary.evaluate(e=>e.parentElement.open));}
  if(route==='/innsikt/')assert.ok(await page.locator('.page-list a[href^="/innsikt/"]').count()>0);
  if(route==='/priser/')assert.ok(await page.locator('[data-package-order] button[type=submit]').isDisabled());
  await page.close();
 }
 assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);
 writeFileSync(`${out}/checks.json`,JSON.stringify({phase,records,errors,posts},null,2)+'\n');
 console.log(`H-023B ${phase}: ${records.length} route/width groups; copy/metadata/order, responsive, chrome/FAQ and safeguards PASS.`);
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));}
