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
 cssVariables:':root { --text-6xl: 3rem; --text-4xl: 2.5rem; --text-base: 1.25rem; }'
});
function clamp(min,vw,max,width){return Math.min(max,Math.max(min,vw*width/100));}
const expected={
 h1:w=>clamp(44,4.5,52,w),
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
    assert.ok(Math.abs(after.h1-48)<=.35,'H1 did not consume --text-6xl: '+after.h1);
    assert.ok(Math.abs(after.h2-40)<=.35,'H2 did not consume --text-4xl: '+after.h2);
    assert.ok(Math.abs(after.body-20)<=.35,'Body did not consume --text-base: '+after.body);
    assert.equal(after.header,before.header,'Navigation size must remain identical');
    assert.equal(after.fontHeading,before.fontHeading,'Heading font changed');
    assert.equal(after.fontBody,before.fontBody,'Body font changed');
    assert.ok(after.overflow<=2,'CMS override caused overflow '+path+' '+width+' '+theme);
    await page.evaluate(()=>[...document.querySelectorAll('style')].filter(s=>s.textContent.includes('--text-6xl:3rem')).forEach(s=>s.remove()));
    const restored=await page.evaluate(inspect);
    for(const key of ['h1','h2','body'])assert.ok(Math.abs(restored[key]-before[key])<=.35,key+' did not restore');
    console.log('PASS',path,width,theme,'baseline',before.h1,before.h2,before.body,'CMS override',after.h1,after.h2,after.body);
   }
  }
  // Check semantic H2/H3 computed sizes with code defaults, ignoring OWNER's optional H1 CMS test override.
  // These selectors previously repeated identical font-size/line-height declarations per component.
  for(const sample of [
   {path:'/',selector:'.invite-home .need-card h3',role:'h3'},
   {path:'/synlighet/',selector:'.invite-service .service-package h3',role:'h3'},
   {path:'/begreper/',selector:'.glossary-group h2',role:'h2'}
  ]){
   const response=await page.goto(origin+sample.path,{waitUntil:'networkidle'});
   assert.equal(response.status(),200,'semantic heading route '+sample.path);
   for(const theme of ['optimalisering','sunset']){
    const measured=await page.evaluate(({theme,selector})=>{
     document.documentElement.dataset.theme=theme;
     const heading=document.querySelector(selector);
     if(!heading)return null;
     const style=getComputedStyle(heading);
     return {size:parseFloat(style.fontSize),lineHeight:parseFloat(style.lineHeight),
       maxWidth:style.maxWidth, fontFamily:style.fontFamily};
    },{theme,selector:sample.selector});
    assert.ok(measured,'Missing semantic heading '+sample.selector+' at '+width);
    const target=sample.role==='h2'?clamp(32,3.2,48,width):
      sample.role==='h3'?clamp(24,2.2,32,width):clamp(22,1.8,26,width);
    assert.ok(Math.abs(measured.size-target)<.4,
      sample.selector+' '+width+'/'+theme+' got '+measured.size+' instead of '+target);
    const expectedLeading=sample.role==='h2'?1.12:sample.role==='h3'?1.2:1.25;
    assert.ok(Math.abs(measured.lineHeight-target*expectedLeading)<.85,
      sample.selector+' '+width+'/'+theme+' unexpected line-height: '+measured.lineHeight);
    assert.match(measured.fontFamily,/Instrument Sans/i);
    if(sample.selector.includes('need-card')){
      assert.equal(measured.maxWidth,width<=900?'600px':'390px');
    }
    if(sample.selector.includes('glossary-group'))assert.equal(measured.maxWidth,'320px');
    console.log('PASS semantic heading',sample.path,sample.selector,width,theme,measured.size);
   }
  }
  await page.close();
 }
}finally{
 await browser.close();await new Promise(r=>server.close(r));
}
