// Presentation-only proof checks. No source fixtures, CMS edits or proof queries.
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFileSync,writeFileSync,mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { once } from 'node:events';
import { createAppServer } from '../server/http.mjs';
const phase=process.env.QA_PHASE||'after',out=resolve(`../coordination/evidence/h022-revised/${phase}`);mkdirSync(out,{recursive:true});
const server=process.env.QA_BASE_URL?null:createAppServer({config:{enabled:false},staticRoot:resolve('dist')});
if(server){server.listen(0,'127.0.0.1');await once(server,'listening');}
const base=process.env.QA_BASE_URL||`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const cases=[...[1440,900,390,320].map(width=>({route:'/',width})),...['/synlighet/','/konvertering/'].flatMap(route=>[1440,390].map(width=>({route,width})))];
const records=[],errors=[],posts=[];
try{
 for(const {route,width} of cases){
  const context=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:false,reducedMotion:'reduce'}),page=await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.method()==='POST')posts.push(r.url());});
  assert.equal((await page.goto(base+route)).status(),200);await page.evaluate(()=>document.fonts.ready);
  const section=page.locator('#resultater');assert.equal(await section.count(),1);
  const text=(await section.innerText()).replace(/\s+/g,' ').trim();
  const geometry=await section.evaluate(root=>{
   const origin=root.getBoundingClientRect(),rect=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y-origin.y,width:r.width,height:r.height,right:r.right};};
   return [...root.querySelectorAll('.proof-card')].map(card=>({box:rect(card),name:card.querySelector('h3').textContent,context:card.querySelector('.proof-context')?rect(card.querySelector('.proof-context')):null,comparison:rect(card.querySelector('.proof-comparison')),arrow:rect(card.querySelector('.proof-arrow')),deltaSize:parseFloat(getComputedStyle(card.querySelector('.proof-delta')).fontSize),numbers:[...card.querySelectorAll('strong')].map(e=>{const range=document.createRange();range.selectNodeContents(e);return{text:e.textContent,size:parseFloat(getComputedStyle(e).fontSize),lineHeight:parseFloat(getComputedStyle(e).lineHeight),rect:rect(e),textRects:[...range.getClientRects()].map(r=>({width:r.width,height:r.height})),scroll:e.scrollWidth,client:e.clientWidth};})}));
  });
  const snapshot=await section.evaluate(root=>[root,...root.querySelectorAll('*')].filter(e=>!e.matches('.proof-context, .proof-identity, .proof-result-area, .proof-result-main')).map(e=>{const r=e.getBoundingClientRect(),origin=root.getBoundingClientRect(),s=getComputedStyle(e);return{tag:e.tagName,text:[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('').replace(/\s+/g,' ').trim(),rect:[r.x,r.y-origin.y,r.width,r.height].map(v=>Math.round(v*100)/100),style:Object.fromEntries(['fontFamily','fontSize','fontWeight','lineHeight','color','backgroundColor','padding','margin','borderRadius','display','gap'].map(k=>[k,s[k]]))};}));
  const fingerprint=createHash('sha256').update(JSON.stringify(snapshot)).digest('hex');
  assert.deepEqual(geometry.map(c=>c.name),route==='/'?['Eurotents','Nysta','Helt Opplagt']:route==='/synlighet/'?['Helt Opplagt']:['Nysta']);
  if(phase!=='before'){
   const before=JSON.parse(readFileSync('../coordination/evidence/h022/before/checks.json','utf8')).records.find(r=>r.route===route&&r.width===width);
   assert.deepEqual(text.split(' ').sort(),before.text.split(' ').sort(),'exact visible proof words and values; editorial order may change');
   if(route!=='/')assert.equal(fingerprint,before.fingerprint,'service proof appearance exact');
   else{
    assert.ok(geometry[0].context,'featured context is separate from the dominant comparison');
    for(const card of geometry)for(const n of card.numbers){assert.ok(n.size>card.deltaSize,'values dominate support');assert.ok(n.scroll<=n.client+1,'number unclipped');assert.ok(n.textRects.length===1,'unwrapped number');}
    for(const card of geometry)assert.ok(Math.abs(card.arrow.y+card.arrow.height/2-card.numbers[0].rect.y-card.numbers[0].rect.height/2)<2,'arrow centered on numbers, independent of period wrapping');
    if(width>=900){const [featured,a,b]=geometry;assert.ok(featured.context.right<featured.comparison.x,'two-part featured composition');assert.ok(featured.comparison.width>featured.box.width*.3,'result occupies substantial separate area');assert.equal(a.box.y,b.box.y);assert.equal(a.box.width,b.box.width);assert.equal(a.box.height,b.box.height);}
    else{for(let i=1;i<geometry.length;i++)assert.ok(geometry[i].box.y>geometry[i-1].box.y);}
   }
  }
  if(route==='/'){
   assert.equal(await section.locator('.proof-result-featured > *').count(),2,'exactly two approved result tiles');
   assert.equal(await section.locator('a[href*="resultater"]').count(),0,'no invented case route');
   const media=section.locator('.proof-media img'); assert.equal(await media.count(),1);
   await media.scrollIntoViewIfNeeded();
   await media.evaluate(async img=>{await img.decode();});
   const m=await media.evaluate(img=>({loaded:img.complete&&img.naturalWidth>0,alt:img.alt,fit:getComputedStyle(img).objectFit,position:getComputedStyle(img).objectPosition}));
   assert.ok(m.loaded);assert.ok(m.alt);assert.equal(m.fit,'cover');assert.equal(m.position,'50% 50%');
   await media.evaluate(img=>img.style.objectPosition='25% 75%');
   assert.equal(await media.evaluate(img=>getComputedStyle(img).objectPosition),'25% 75%');
   await media.evaluate(img=>img.style.objectPosition='50% 50%');
   if(width>=900) assert.ok(geometry[0].box.height<=geometry[0].context.height+1,'desktop visual fills featured region');
   assert.ok(geometry[0].numbers[0].size>geometry[1].numbers[0].size,'featured result dominates supporting results');
  }
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no viewport overflow');
  assert.equal(await section.locator('.proof-arrow:not([aria-hidden="true"])').count(),0);
  assert.equal(await section.locator('dl').count(),route==='/'?6:2);
  await section.screenshot({path:`${out}/${route==='/'?'home':route.replaceAll('/','')}-${width}.png`});
  if(route==='/'){
   await section.locator('.proof-media').evaluate(e=>e.remove());
   const fallback=await section.locator('.proof-context').first().boundingBox();
   assert.ok(fallback.height<150,'no missing-image dead region');
   assert.equal(await section.locator('img').count(),0);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'fallback has no overflow');
  }
  records.push({route,width,text,geometry,fingerprint,noJS:true});await context.close();
 }
 assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);
 writeFileSync(`${out}/checks.json`,JSON.stringify({phase,records,errors,posts},null,2)+'\n');
 console.log(`H-022 ${phase}: ${records.length} proof/width/no-JS groups PASS; ${phase==='before'?'baseline captured':'exact copy and service proof preserved'}.`);
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));}
