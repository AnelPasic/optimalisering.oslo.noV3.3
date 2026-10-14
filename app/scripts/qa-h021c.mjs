// Focused geometry proof only; no whole-site fixture matrix. Run from app/.
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFileSync,writeFileSync,mkdirSync,existsSync,unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { once } from 'node:events';
import { createAppServer } from '../server/http.mjs';

const phase=process.env.QA_PHASE||'after',out=resolve(`../coordination/evidence/h021c/${phase}`);mkdirSync(out,{recursive:true});
const baseline=phase==='before',live=!!process.env.QA_BASE_URL;
const server=live?null:createAppServer({config:{enabled:false},staticRoot:resolve('dist')});
if(server){server.listen(0,'127.0.0.1');await once(server,'listening');}
const base=process.env.QA_BASE_URL||`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const indexPath='src/content/pages/innsikt.json',indexBytes=readFileSync(indexPath);
const fixturePath='src/content/pages/h021c-fixture.json',imagePath='public/images/listing/h021c-fixture.png';
const records=[],errors=[],posts=[];
const build=()=>execFileSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{stdio:'pipe'});
async function inspect(name,width,layout,expectedCount){
 const context=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:false,reducedMotion:'reduce'}),page=await context.newPage();
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.method()==='POST')posts.push(r.url());});
 assert.equal((await page.goto(base+'/innsikt/')).status(),200);await page.evaluate(()=>document.fonts.ready);
 const items=page.locator('#guider .listing-item');assert.equal(await items.count(),expectedCount);
 const snapshot=()=>items.evaluateAll(nodes=>nodes.map(e=>{
  const c=e.querySelector('.listing-copy'),v=e.querySelector('.listing-visual'),cr=c.getBoundingClientRect(),vr=v?.getBoundingClientRect();
  return{kind:v?.getAttribute('data-kind')??'none',text:c.innerText,href:c.querySelector('a').getAttribute('href'),font:getComputedStyle(c.querySelector('h3')).fontSize,c:{x:cr.x,y:cr.y,width:cr.width,height:cr.height},v:vr?{x:vr.x,y:vr.y,width:vr.width,height:vr.height}:null};
 }));
 const rows=await snapshot();
 function check(current){
  current.forEach((row,i)=>{
   if(!row.v)return;
   if(layout==='alternating'){
    if(width>700){assert.ok(i%2?row.v.x<row.c.x:row.c.x<row.v.x);const share=row.v.width/(row.v.width+row.c.width);
     if(!baseline&&row.kind==='icon'){assert.ok(share>=.28&&share<=.36);assert.ok(row.v.height<=240);}
     if(row.kind==='image')assert.ok(share>=.45&&share<=.55);
    }else{assert.ok(row.c.y<row.v.y);if(!baseline&&row.kind==='icon')assert.ok(row.v.height>=140&&row.v.height<=190);}
   }
  });
 }
 check(rows);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 for(const icon of await page.locator('#guider .listing-visual svg').all())assert.equal(await icon.getAttribute('aria-hidden'),'true');
 for(const img of await page.locator('#guider .listing-visual img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(e=>e.decode());assert.equal(await img.evaluate(e=>getComputedStyle(e).objectFit),'cover');}
 if([1440,390].includes(width)&&name!=='mediaCards'){
  await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`${out}/${name}-${width}.png`,fullPage:true});
 }
 if(!baseline){
  const before=JSON.parse(readFileSync('../coordination/evidence/h021c/before/checks.json','utf8')).records.find(r=>r.name===name&&r.width===width);
  assert.deepEqual(rows.map(r=>({kind:r.kind,text:r.text,href:r.href,font:r.font})),before.rows.map(r=>({kind:r.kind,text:r.text,href:r.href,font:r.font})));
  if(name==='mediaCards')assert.deepEqual(rows,before.rows,'mediaCards geometry exact');
  if(name==='default')rows.forEach((r,i)=>assert.ok(r.v.height<before.rows[i].v.height,'icon panel materially shallower'));
 }
 // Same rendered component with 1/2/3/4 final children; CSS alternation is structural.
 if(name==='mixed'){
  for(let count=4;count>=1;count--){
   if(count===4)await items.last().evaluate(e=>e.parentElement.parentElement.append(e.parentElement.cloneNode(true)));
   else await page.locator('#guider .page-list > li').last().evaluate(e=>e.remove());
   assert.equal(await items.count(),count);check(await snapshot());
  }
 }
 const link=page.locator('#guider a').first();await link.focus();assert.equal(await link.evaluate(e=>e===document.activeElement),true);
 records.push({name,width,noJS:true,rows});await context.close();
}
try{
 for(const width of [1440,900,390,320])await inspect('default',width,'alternating',2);
 if(!live){
  assert.equal(existsSync(fixturePath),false);assert.equal(existsSync(imagePath),false);
  writeFileSync(imagePath,Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6d4sAAAAASUVORK5CYII=','base64'));
  const article=JSON.parse(readFileSync('src/content/pages/hva-bor-optimaliseres-forst.json','utf8'));
  article.slug='innsikt/h021c-fixture';article.title='H-021C local fixture';article.seo={title:article.title,description:'Local fixture only'};
  article.listing={title:'H-021C local image fixture',summary:'Syntetisk lokal test. Ikke publiserbart innhold.',label:'Åpne test',visible:true,visual:[{kind:'image',src:'/images/listing/h021c-fixture.png',alt:'Syntetisk testpiksel',positionX:20,positionY:80}]};
  writeFileSync(fixturePath,JSON.stringify(article,null,2)+'\n');
  for(const layout of ['alternating','mediaCards']){
   const index=JSON.parse(indexBytes.toString());Object.assign(index.sections[0].pageList,{layout,mode:'manual',selected:[{slug:article.slug},{slug:'innsikt/hva-bor-optimaliseres-forst'},{slug:'innsikt/male-effekt-av-optimalisering'}]});
   // The mixed fixture is image/icon/image through a second temporary source override.
   const measurementPath='src/content/pages/male-effekt-av-optimalisering.json',saved=readFileSync(measurementPath);
   try{const measurement=JSON.parse(saved.toString());measurement.listing.visual=article.listing.visual;writeFileSync(measurementPath,JSON.stringify(measurement,null,2)+'\n');writeFileSync(indexPath,JSON.stringify(index,null,2)+'\n');build();
    for(const width of layout==='alternating'?[1440,900,390,320]:[1440,390])await inspect(layout==='alternating'?'mixed':'mediaCards',width,layout,3);
   }finally{writeFileSync(measurementPath,saved);}
  }
 }
 assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);
 writeFileSync(`${out}/checks.json`,JSON.stringify({phase,records,errors,posts},null,2)+'\n');
 console.log(`H-021C ${phase}: ${records.length} focused no-JS width/layout checks PASS.`);
}finally{
 if(!live){writeFileSync(indexPath,indexBytes);for(const path of [fixturePath,imagePath])if(existsSync(path))unlinkSync(path);build();}
 await browser.close();if(server)await new Promise(r=>server.close(r));
}
