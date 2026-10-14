// Reversible local fixtures only. Source/media bytes and default dist are restored.
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync, unlinkSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { once } from 'node:events';
import { resolve } from 'node:path';
import { createAppServer } from '../server/http.mjs';

const output=resolve('../coordination/evidence/h021b/variants');mkdirSync(output,{recursive:true});
const names=['innsikt','hva-bor-optimaliseres-forst','male-effekt-av-optimalisering'];
const sources=names.map(name=>({path:`src/content/pages/${name}.json`,bytes:readFileSync(`src/content/pages/${name}.json`)}));
const originals=sources.map(source=>JSON.parse(source.bytes.toString()));
const fixturePaths=['src/content/pages/h021b-fixture-3.json','src/content/pages/h021b-fixture-4.json'];
const imagePath='public/images/listing/h021b-fixture.png';
for(const path of [...fixturePaths,imagePath])assert.equal(existsSync(path),false);
const first=originals[1].slug,second=originals[2].slug,third='innsikt/h021b-fixture-3',fourth='innsikt/h021b-fixture-4';
const slugs=[first,second,third,fourth];
const variants=[
 ...[1,2,3,4].map(count=>({name:`alternating-${count}`,layout:'alternating',count,slugs:slugs.slice(0,count)})),
 {name:'alternating-filter',layout:'alternating',count:4,hidden:second,excluded:fourth,slugs:[first,third]},
 {name:'alternating-mixed',layout:'alternating',count:4,mixed:true,slugs},
 {name:'manual-reversed',layout:'alternating',count:4,manual:[fourth,third,second,first],slugs:[fourth,third,second,first]},
 {name:'mediaCards-mixed',layout:'mediaCards',count:4,mixed:true,slugs},
 {name:'mediaCards-two',layout:'mediaCards',count:2,slugs:[first,second]},
 {name:'cards',layout:'cards',count:2,slugs:[first,second]},
 {name:'compact',layout:'compact',count:2,slugs:[first,second]},
 {name:'links',layout:'links',count:2,slugs:[first,second]},
 {name:'dark-alternating',layout:'alternating',count:2,dark:true,slugs:[first,second]},
 {name:'dark-mediaCards',layout:'mediaCards',count:4,mixed:true,dark:true,slugs},
].filter(variant=>!process.env.QA_VARIANT||variant.name===process.env.QA_VARIANT);
const build=()=>execFileSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{stdio:'pipe'});
const server=createAppServer({config:{enabled:false},staticRoot:resolve('dist')});
const records=[],errors=[],posts=[];let browser;
try{
 server.listen(0,'127.0.0.1');await once(server,'listening');
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 // Test-only PNG: simple colored panels rendered locally, no customer/editorial imagery.
 const fixturePage=await browser.newPage({viewport:{width:600,height:400}});
 await fixturePage.setContent('<html><body style="margin:0;background:#e0f0ef;display:flex;height:400px"><div style="width:30%;background:#320c43"></div><div style="width:30%;background:#f1edf8"></div></body></html>');
 await fixturePage.screenshot({path:resolve(imagePath)});await fixturePage.close();
 for(const variant of variants){
  const index=structuredClone(originals[0]);const config=index.sections[0].pageList;
  Object.assign(config,{mode:variant.manual?'manual':'automatic',sort:'editorial',layout:variant.layout,limit:variant.manual?1:variant.count,selected:(variant.manual??[]).map(slug=>({slug})),excluded:variant.excluded?[{slug:variant.excluded}]:[]});
  if(variant.dark){index.sections[0].surface='dark';index.sections[0].headingAlign='left';}
  const articles=[structuredClone(originals[1]),structuredClone(originals[2]),...[third,fourth].map((slug,i)=>({...structuredClone(originals[1]),slug,title:`H-021B fixture ${i+3}`,seo:{title:`H-021B fixture ${i+3}`,description:'Local synthetic fixture'},listing:{title:`H-021B artikkel ${i+3}`,summary:'Syntetisk lokal test. Ikke publiserbart innhold.',label:'Åpne testartikkel',order:(i+3)*10,visible:true,visual:[{kind:'icon',icon:i?'trend':'page'}]}}))];
  if(variant.hidden)articles.find(a=>a.slug===variant.hidden).listing.visible=false;
  if(variant.mixed){
   articles[0].listing.visual=[{kind:'image',src:'/images/listing/h021b-fixture.png',alt:'Syntetisk mønster med tre fargefelt',positionX:20,positionY:80}];
   articles[2].listing.visual=[{kind:'none'}];
   articles[3].listing.visual=[{kind:'image',src:'/images/listing/h021b-missing.png',alt:'Manglende lokal testfil'}];
  }
  writeFileSync(sources[0].path,JSON.stringify(index,null,2)+'\n');
  for(let i=0;i<2;i++)writeFileSync(sources[i+1].path,JSON.stringify(articles[i],null,2)+'\n');
  for(let i=0;i<2;i++)writeFileSync(fixturePaths[i],JSON.stringify(articles[i+2],null,2)+'\n');build();
  for(const width of [1440,900,390,320]){
   const context=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:false,reducedMotion:'reduce'});const page=await context.newPage();
   page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.method()==='POST')posts.push(r.url());});
   assert.equal((await page.goto(`http://127.0.0.1:${server.address().port}/innsikt/`)).status(),200);await page.evaluate(()=>document.fonts.ready);
   const links=page.locator('#guider .text-link');assert.deepEqual(await links.evaluateAll(nodes=>nodes.map(e=>e.getAttribute('href'))),variant.slugs.map(s=>`/${s}/`));
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   const items=page.locator('#guider .listing-item');
   if(variant.layout==='alternating'){
    assert.equal(await items.count(),variant.slugs.length);
    const positions=await items.evaluateAll(nodes=>nodes.map(e=>{const c=e.querySelector('.listing-copy').getBoundingClientRect(),v=e.querySelector('.listing-visual')?.getBoundingClientRect();return{cx:c.x,cy:c.y,vx:v?.x,vy:v?.y,columns:getComputedStyle(e).gridTemplateColumns};}));
    positions.forEach((p,i)=>p.vx==null?assert.equal(p.columns.trim().split(' ').length,1):width>700?assert.ok(i%2?p.vx<p.cx:p.cx<p.vx):assert.ok(p.cy<p.vy));
   }
   if(variant.layout==='mediaCards'){
    assert.equal(await items.count(),variant.slugs.length);
    const colors=await page.locator('#guider .listing-item').evaluateAll(nodes=>nodes.flatMap(card=>[...card.querySelectorAll('h3,p,a')].map(e=>({tag:e.tagName,fg:getComputedStyle(e).color,bg:getComputedStyle(card).backgroundColor,ink:getComputedStyle(e).getPropertyValue('--ink'),muted:getComputedStyle(e).getPropertyValue('--muted')}))));
    const luminance=rgb=>rgb.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);
    for(const c of colors){const a=luminance(c.fg),b=luminance(c.bg);assert.ok((Math.max(a,b)+.05)/(Math.min(a,b)+.05)>=4.5,`${variant.name}: ${JSON.stringify(c)}`);}
    if(variant.mixed){
     const img=page.locator('#guider .listing-visual img');await img.scrollIntoViewIfNeeded();
     await img.evaluate(e=>e.decode());assert.equal(await img.getAttribute('alt'),'Syntetisk mønster med tre fargefelt');
     assert.equal(await img.evaluate(e=>getComputedStyle(e).objectPosition),'20% 80%');assert.equal(await img.evaluate(e=>getComputedStyle(e).objectFit),'cover');
     assert.equal(await img.getAttribute('width'),'1200');assert.equal(await img.getAttribute('height'),'800');
     assert.equal(await page.locator('#guider .listing-visual').count(),2); // image + icon; none/missing omit chrome
     assert.equal(await page.locator('#guider img').count(),1);
     const rectangles=await items.evaluateAll(nodes=>nodes.map(e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,height:r.height};}));
     if(width===1440){assert.equal(rectangles[0].y,rectangles[2].y);assert.equal(rectangles[0].height,rectangles[2].height);}
     if(width===900){assert.equal(rectangles[0].y,rectangles[1].y);assert.ok(rectangles[2].y>rectangles[0].y);}
    }
   }
   if(['cards','compact','links'].includes(variant.layout))assert.equal(await page.locator('#guider .listing-visual').count(),0);
   for(const icon of await page.locator('#guider .listing-visual svg').all())assert.equal(await icon.getAttribute('aria-hidden'),'true');
   if(variant.dark){assert.equal(await page.locator('#guider').getAttribute('data-surface'),'dark');assert.equal(await page.locator('#guider .section-heading').evaluate(e=>getComputedStyle(e).textAlign),'left');}
   if(variant.name==='cards'){
    const actual=await page.screenshot({fullPage:true});const before=readFileSync(`../coordination/evidence/h021b/before/innsikt-${width}.png`);
    assert.ok(actual.equals(before),`cards ${width}: exact legacy screenshot`);
   }
   if([1440,390].includes(width)){
    await page.evaluate(()=>scrollTo(0,0));
    await page.screenshot({path:`${output}/${variant.name}-${width}.png`,fullPage:true});
   }
   for(let i=0;i<variant.slugs.length;i++){await links.nth(i).focus();assert.equal(await links.nth(i).evaluate(e=>e===document.activeElement),true);}
   records.push({variant:variant.name,width,noJS:true,slugs:variant.slugs,keyboard:true,noOverflow:true});await context.close();
  }
 }
}finally{
 for(const source of sources)writeFileSync(source.path,source.bytes);
 for(const path of [...fixturePaths,imagePath])if(existsSync(path))unlinkSync(path);
 if(browser)await browser.close();if(server.listening)await new Promise(r=>server.close(r));build();
}
for(const source of sources)assert.deepEqual(readFileSync(source.path),source.bytes);
assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);
writeFileSync(`${output}/checks.json`,JSON.stringify({records,errors,posts,sourceRestored:true,fixturesRemoved:true,restored:sources.map(s=>({path:s.path,sha256:createHash('sha256').update(s.bytes).digest('hex')})),authenticatedCMS:false},null,2)+'\n');
console.log(`H-021B variants PASS: ${records.length} source-backed no-JS/keyboard/layout groups; source/media and default build restored.`);
