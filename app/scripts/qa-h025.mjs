import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {once} from 'node:events';
import {createAppServer} from '../server/http.mjs';
const phase=process.env.QA_PHASE||'after',out=process.env.QA_OUTPUT_DIR||`../coordination/evidence/h025/${phase}`;mkdirSync(out,{recursive:true});
const routes=readdirSync('src/content/pages').filter(f=>f.endsWith('.json')).map(f=>{const p=JSON.parse(readFileSync(`src/content/pages/${f}`));return p.kind==='home'?'/':`/${p.slug}/`;}).concat('/begreper/','/404.html');
const baseline=phase==='before'?null:JSON.parse(readFileSync('../coordination/evidence/h025/before/checks.json'));
const server=process.env.QA_BASE_URL?null:createAppServer({config:{enabled:false},staticRoot:resolve('dist')});if(server){server.listen(0,'127.0.0.1');await once(server,'listening');}
const base=process.env.QA_BASE_URL||`http://127.0.0.1:${server.address().port}`,browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const records=[],errors=[],posts=[],differences=[];
try{
 for(const route of routes)for(const width of [1440,900,390,320]){
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});page.on('pageerror',e=>errors.push({route,width,message:e.message}));await page.route('**/*',r=>r.request().method()==='POST'?(posts.push(r.request().url()),r.abort()):r.continue());
  await page.goto(base+route);await page.evaluate(()=>document.fonts.ready);
  const snapshot=await page.evaluate(()=>{
   const main=document.querySelector('main').cloneNode(true);main.querySelectorAll('script,style,[aria-hidden=true]').forEach(e=>e.remove());
   const hero=document.querySelector('main .commercial-hero,main .service-hero,main .pricing-hero,main .inner-hero,main .glossary-hero,main .error-page');
   const box=e=>e?Object.fromEntries(['x','y','width','height'].map(k=>[k,e.getBoundingClientRect()[k]])):null;
   const heading=hero.querySelector('h1'),intro=[...hero.querySelectorAll('p')].find(e=>!e.classList.contains('eyebrow')),cta=hero.querySelector('a.button'),image=hero.querySelector('img');
   return {text:main.textContent.replace(/\s+/g,' ').trim(),title:document.title,description:document.querySelector('meta[name=description]').content,canonical:document.querySelector('link[rel=canonical]').href,sections:[...document.querySelectorAll('main section[id]')].map(e=>e.id),hero:{box:box(hero),heading:box(heading),intro:box(intro),cta:box(cta),image:box(image)},heroImage:image?{src:image.getAttribute('src'),alt:image.getAttribute('alt'),position:getComputedStyle(image).objectPosition,fit:getComputedStyle(image).objectFit}:null,cta:cta?{href:cta.getAttribute('href'),text:cta.textContent.replace(/\s+/g,' ').trim()}:null};
  });
  if(baseline){try{const before=baseline.records.find(r=>r.route===route&&r.width===width).snapshot;for(const key of ['text','title','description','sections','heroImage','cta'])assert.deepEqual(snapshot[key],before[key],`${route} ${width} ${key}`);assert.equal(new URL(snapshot.canonical).pathname,new URL(before.canonical).pathname);for(const [part,rect] of Object.entries(snapshot.hero)){const original=before.hero[part];assert.equal(Boolean(rect),Boolean(original),`${route} ${part} presence`);if(rect)for(const key of ['x','y','width','height'])assert.ok(Math.abs(rect[key]-original[key])<=1,`${route} ${width} ${part}.${key}: ${rect[key]} vs ${original[key]}`);}}catch(error){if(!process.env.QA_DIAGNOSTIC)throw error;differences.push({route,width,message:error.message});}}
  assert.equal(await page.locator('h1').count(),1);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route+' overflow');assert.match(await page.locator('meta[name=robots]').getAttribute('content'),/noindex/);
  const ids=await page.locator('[id]').evaluateAll(es=>es.map(e=>e.id));assert.equal(new Set(ids).size,ids.length,route+' duplicate IDs');
  if(route!=='/')assert.equal(await page.locator('.hero-proof').count(),0,'No unapproved microproof');
  if(width===1440||width===390)await page.screenshot({path:`${out}/${route==='/'?'home':route.replaceAll('/','').replace('.html','')}-${width}.png`});
  records.push({route,width,snapshot});await page.close();
 }
 if(differences.length){writeFileSync(`${out}/differences.json`,JSON.stringify(differences,null,2));assert.deepEqual(differences,[]);}
 assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);writeFileSync(`${out}/checks.json`,JSON.stringify({phase,records,errors,posts},null,2)+'\n');console.log(`H-025 ${phase}: ${records.length} route/width groups, content/SEO/image/CTA/default geometry/noindex PASS.`);
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));}
