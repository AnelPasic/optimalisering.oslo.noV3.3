/** MWS #30 Oslo pilot: verify original computed sizes, apply native CMS tokens, restore.
 * Run after npm run build. Never writes CMS JSON, deploys or submits forms.
 */
import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {resolve} from 'node:path';
import {once} from 'node:events';
import {createAppServer} from '../server/http.mjs';
import {siteChrome} from '../src/lib/site-chrome-data.ts';
import {typographyOverridesCss} from '../src/lib/site-chrome-typography.ts';

const server=createAppServer({config:{enabled:false},staticRoot:resolve('dist')});
server.listen(0,'127.0.0.1');
await once(server,'listening');
const browser=await chromium.launch({headless:true});
const origin='http://127.0.0.1:'+server.address().port;
const cmsCss=typographyOverridesCss(siteChrome.themes,{
 cssVariables:':root { --text-5xl: 3rem; --text-4xl: 2.5rem; --text-base: 1.25rem; }'
});
function clamp(min,vw,max,width){return Math.min(max,Math.max(min,vw*width/100));}
const expected={
 h1:w=>clamp(28,4.5,52,w),
 h2:w=>clamp(32,3.2,48,w),
 body:w=>clamp(16,1.35,18,w)
};
function inspect(){
 return {
  h1:parseFloat(getComputedStyle(document.querySelector('main h1')).fontSize),
  h2:parseFloat(getComputedStyle(document.querySelector('main h2')).fontSize),
  body:parseFloat(getComputedStyle(document.body).fontSize),
  header:parseFloat(getComputedStyle(document.querySelector('.desktop-nav a')??document.querySelector('header a')).fontSize),
  fontHeading:getComputedStyle(document.querySelector('main h1')).fontFamily,
  fontBody:getComputedStyle(document.body).fontFamily,
  overflow:document.documentElement.scrollWidth-innerWidth
 };
}
try{
 for(const width of [390,768,1440]){
  const page=await browser.newPage({viewport:{width,height:900}});
  for(const path of ['/','/synlighet/']){
   const response=await page.goto(origin+path,{waitUntil:'networkidle'});
   assert.equal(response.status(),200,path);
   await page.evaluate(()=>document.fonts.ready);
   for(const theme of ['optimalisering','sunset']){
    await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
    const before=await page.evaluate(inspect);
    for(const key of ['h1','h2','body']){
     const target=expected[key](width);
     assert.ok(Math.abs(before[key]-target)<=.35,path+' '+width+' '+theme+' original '+key+': '+before[key]+' expected '+target);
    }
    assert.match(before.fontHeading,/Instrument Sans/i);
    assert.match(before.fontBody,/Figtree/i);
    assert.ok(before.overflow<=2,'baseline overflow '+path+' '+width+' '+theme);
    await page.addStyleTag({content:cmsCss});
    const after=await page.evaluate(inspect);
    assert.ok(Math.abs(after.h1-48)<=.35,'H1 did not consume --text-5xl: '+after.h1);
    assert.ok(Math.abs(after.h2-40)<=.35,'H2 did not consume --text-4xl: '+after.h2);
    assert.ok(Math.abs(after.body-20)<=.35,'Body did not consume --text-base: '+after.body);
    assert.equal(after.header,before.header,'Navigation size must remain identical');
    assert.equal(after.fontHeading,before.fontHeading,'Heading font changed');
    assert.equal(after.fontBody,before.fontBody,'Body font changed');
    assert.ok(after.overflow<=2,'CMS override caused overflow '+path+' '+width+' '+theme);
    await page.evaluate(()=>[...document.querySelectorAll('style')].filter(s=>s.textContent.includes('--text-5xl:3rem')).forEach(s=>s.remove()));
    const restored=await page.evaluate(inspect);
    for(const key of ['h1','h2','body'])assert.ok(Math.abs(restored[key]-before[key])<=.35,key+' did not restore');
    console.log('PASS',path,width,theme,'baseline',before.h1,before.h2,before.body,'CMS override',after.h1,after.h2,after.body);
   }
  }
  await page.close();
 }
}finally{
 await browser.close();await new Promise(r=>server.close(r));
}
