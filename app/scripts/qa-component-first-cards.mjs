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
   const h3=Math.min(32,Math.max(24,2.2*width/100));
   assert.ok(Math.abs(data.titleSize-h3)<.5,'PageList H3 changed: '+width+'/'+theme+' '+data.titleSize+' vs '+h3);
   assert.ok(Math.abs(data.titleLine-h3*1.2)<.9,'PageList H3 line height changed: '+data.titleLine);
   assert.equal(data.listStillEditorial,true,'Alternating list was converted to cards');
   assert.ok(data.overflow<=2,'Page overflow '+width+'/'+theme+' '+data.overflow);
   const desired=Math.min(data.count,width<=700?1:width<=1100?2:3);
   assert.equal(data.gridColumns,desired,'Unexpected media grid columns '+width+'/'+theme);
   console.log('PASS #26 mediaCards',width,theme,data.count,'cards',data.gridColumns,'columns',data.titleSize,'h3');
  }
  await page.close();
 }
}finally{
 await browser.close();
 await new Promise(r=>server.close(r));
}
