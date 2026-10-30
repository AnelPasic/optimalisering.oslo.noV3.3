/** MWS #26 / Oslo pilot: native daisyUI PageList media card geometry and semantics.
 * Uses the existing design-system specimen and local build, never CMS writes or page changes.
 */
import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {resolve} from 'node:path';
import {once} from 'node:events';
import {createAppServer} from '../server/http.mjs';

const server=createAppServer({config:{enabled:false},staticRoot:resolve('dist')});
server.listen(0,'127.0.0.1');
await once(server,'listening');
const browser=await chromium.launch({headless:true});
const origin='http://127.0.0.1:'+server.address().port;

try {
 for(const width of [390,768,1440]){
  const page=await browser.newPage({viewport:{width,height:900}});
  const response=await page.goto(origin+'/design-system/',{waitUntil:'networkidle'});
  assert.equal(response.status(),200,'design-system route');
  await page.evaluate(()=>document.fonts.ready);
  for(const theme of ['optimalisering','sunset']){
   const data=await page.evaluate(theme=>{
    document.documentElement.dataset.theme=theme;
    const grid=document.querySelector('.page-list-mediaCards');
    const cards=[...document.querySelectorAll('.page-list-mediaCards > li > article')];
    const list=document.querySelector('.page-list-alternating');
    const first=cards[0];
    if(!grid||!first)return null;
    const body=first.querySelector('.card-body');
    const heading=first.querySelector('.card-title');
    const action=first.querySelector('.card-actions');
    const titleStyle=heading?getComputedStyle(heading):null;
    return {
     count:cards.length,
     gridColumns:getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length,
     classes:cards.every(card=>card.classList.contains('card')&&card.classList.contains('card-border')&&!card.classList.contains('info-item')),
     body:!!body,
     heading:!!heading,
     titleSize:titleStyle?parseFloat(titleStyle.fontSize):0,
     titleLine:titleStyle?parseFloat(titleStyle.lineHeight):0,
     action:!!action,
     visuals:[...first.querySelectorAll('figure.listing-media .listing-visual')].length,
     border:getComputedStyle(first).borderTopWidth,
     pad:body?parseFloat(getComputedStyle(body).paddingLeft):0,
     listStillEditorial:!!list&&[...list.querySelectorAll('article')].every(card=>!card.classList.contains('card')),
     overflow:document.documentElement.scrollWidth-innerWidth,
    };
   },theme);
   assert.ok(data,'No media card specimen at '+width);
   assert.ok(data.count>0,'Media cards fixture is empty');
   assert.equal(data.classes,true,'Native daisyUI card/card-border classes missing');
   assert.equal(data.body,true,'card-body missing');
   assert.equal(data.heading,true,'card-title missing');
   assert.ok(data.action,'card-actions missing for the specimen');
   assert.ok(data.border==='1px'||parseFloat(data.border)>=1,'Native border was overridden');
   assert.ok(data.pad>=16,'DaisyUI card-body missing padding');
   const h3=width<=1100?Math.min(26,Math.max(22,1.8*width/100)):Math.min(32,Math.max(24,2.2*width/100));
   assert.ok(Math.abs(data.titleSize-h3)<.5,'PageList H3 changed: '+width+'/'+theme+' '+data.titleSize+' vs '+h3);
   assert.ok(Math.abs(data.titleLine-h3*(width<=1100?1.25:1.2))<.9,'PageList H3 line height changed: '+data.titleLine);
   assert.equal(data.listStillEditorial,true,'Alternating list was converted to cards');
   assert.ok(data.overflow<=2,'Page overflow '+width+'/'+theme+' '+data.overflow);
   const desired=Math.min(data.count,width<=700?1:width<=1100?2:3);
   assert.equal(data.gridColumns,desired,'Unexpected media grid columns '+width+'/'+theme);
   console.log('PASS #26 mediaCards',width,theme,data.count,'cards',data.gridColumns,'columns',data.titleSize,'h3');
  }
  await page.close();
 }

 // Native cards on live business sections and pricing retain presentation and behavior.
 for(const width of [390,768,1440]){
  const page=await browser.newPage({viewport:{width,height:900}});
  for(const route of ['/synlighet/','/priser/']){
   const response=await page.goto(origin+route,{waitUntil:'networkidle'});
   assert.equal(response.status(),200,route);
   await page.evaluate(()=>document.fonts.ready);
   for(const theme of ['optimalisering','sunset']){
    const state=await page.evaluate(theme=>{
     document.documentElement.dataset.theme=theme;
     const section=document.querySelector('.home-section-behov');
     const packages=[...document.querySelectorAll('.package-offer .package-card')];
     const cardNodes=section?[...section.querySelectorAll('.section-items > article')]:[];
     const regular=packages.filter(p=>!p.classList.contains('is-recommended'));
     const featured=packages.find(p=>p.classList.contains('is-recommended'));
     const sample=packages[0];
     const rects=packages.map(p=>p.getBoundingClientRect());
     return {
      route:location.pathname,
      count:cardNodes.length,
      sectionCards:cardNodes.length>0&&cardNodes.every(x=>x.classList.contains('card')&&!x.classList.contains('info-item')&&!!x.querySelector('.card-body')),
      sectionLink:cardNodes.length>0&&cardNodes.every(x=>!x.querySelector('a')||!!x.querySelector('.card-actions .text-link')),
      legacyMixed:document.querySelectorAll('.info-item.card').length,
      packageCount:packages.length,
      packageNative:packages.every(p=>p.classList.contains('card')&&p.classList.contains('card-border')&&p.querySelector(':scope > .card-body')!==null),
      packageBodyPadding:sample?parseFloat(getComputedStyle(sample.querySelector('.card-body')).paddingLeft):0,
      packageBorder:regular.map(p=>parseFloat(getComputedStyle(p).borderTopWidth)),
      featuredBorder:featured?parseFloat(getComputedStyle(featured).borderTopWidth):0,
      expandedDetails:packages.filter(p=>p.querySelector('.package-details')).length,
      orderForms:packages.filter(p=>p.querySelector('[data-package-order-form]')).length,
      columnCount:rects.length>1?new Set(rects.map(r=>Math.round(r.top))).size:0,
      overflow:document.documentElement.scrollWidth-innerWidth
     };
    },theme);
    assert.equal(state.legacyMixed,0,'Mixed legacy info-item.card remains '+route);
    if(route==='/synlighet/'&&state.count>0){
     assert.equal(state.sectionCards,true,'Service visual cards must use native ContentCard');
     assert.equal(state.sectionLink,true,'Existing text CTA style is preserved');
    }
    if(route==='/priser/'){
     assert.equal(state.packageCount,3,'Three approved offers remain visible');
     assert.equal(state.packageNative,true,'Pricing packages need native card-body and card-border');
     assert.ok(state.packageBodyPadding>=16,'daisyUI card-body padding missing');
     assert.ok(state.packageBorder.every(v=>v>=1),'Regular package borders missing');
     assert.ok(state.featuredBorder>=2,'Recommended package distinction lost');
     assert.equal(state.expandedDetails,3,'Package details lost');
     assert.equal(state.orderForms,3,'Package order forms lost');
     const expectedRows=width<=900?3:1;
     assert.equal(state.columnCount,expectedRows,'Package grid responsive layout changed '+width);
    }
    assert.ok(state.overflow<=2,'Horizontal overflow '+route+' '+width+' '+theme);
    console.log('PASS #26 sections/packages',route,width,theme,state.count,state.packageCount);
   }
  }
  await page.close();
 }

 // OWNER 30.10: the three home choice cards use native daisyUI Card (no need-card family).
 for(const width of [390,768,1440]){
  const page=await browser.newPage({viewport:{width,height:900}});
  const response=await page.goto(origin+'/',{waitUntil:'networkidle'});
  assert.equal(response.status(),200,'homepage selector route');
  await page.evaluate(()=>document.fonts.ready);
  for(const theme of ['optimalisering','sunset']){
   const data=await page.evaluate(theme=>{
    document.documentElement.dataset.theme=theme;
    const cards=[...document.querySelectorAll('[data-home-selector-card]')];
    const grid=cards[0]?.parentElement;
    return {
     count:cards.length,
     columns:grid?getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length:0,
     native:cards.every(c=>c.classList.contains('card')&&!!c.querySelector(':scope > .card-body')&&!!c.querySelector('.card-actions')),
     noLegacy:document.querySelectorAll('.need-card, [class*="need-card-"], .need-grid').length===0,
     links:cards.map(c=>c.getAttribute('href')),
     colors:cards.map(c=>getComputedStyle(c).backgroundColor),
     padding:cards.map(c=>parseFloat(getComputedStyle(c.querySelector(':scope > .card-body')).paddingLeft)),
     titles:cards.map(c=>parseFloat(getComputedStyle(c.querySelector('h3')).fontSize)),
     iconSizes:cards.map(c=>c.querySelector('svg')?.getBoundingClientRect().width??0),
     rounded:cards.map(c=>parseFloat(getComputedStyle(c).borderTopLeftRadius)),
     overflow:document.documentElement.scrollWidth-innerWidth
    };
   },theme);
   assert.equal(data.count,3,'Three homepage entry choices remain');
   assert.equal(data.native,true,'DaisyUI card/body/actions required');
   assert.equal(data.noLegacy,true,'Legacy selector card classes remain');
   assert.deepEqual(data.links,['/synlighet/','/konvertering/','/#priser']);
   assert.equal(new Set(data.colors).size,3,'Original three distinct theme surfaces are missing');
   assert.ok(data.padding.every(v=>Math.abs(v-(width>1100?32:24))<.6),'Approved 32/24px responsive padding changed');
   assert.ok(data.iconSizes.every(v=>Math.abs(v-34)<.6),'Original 34px selector icons changed');
   assert.ok(data.rounded.every(v=>v>0),'DaisyUI rounded cards missing');
   assert.equal(data.columns,width<=900?1:3,'Three/one column selector layout changed');
   assert.ok(data.overflow<=2,'Homepage overflow '+width+'/'+theme);
   console.log('PASS homepage native selector',width,theme,data.colors.join(' / '));
  }
  await page.close();
 }
}finally{
 await browser.close();
 await new Promise(r=>server.close(r));
}
