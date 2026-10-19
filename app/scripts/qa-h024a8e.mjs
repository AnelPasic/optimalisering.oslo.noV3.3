import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {once} from 'node:events';
import {createAppServer} from '../server/http.mjs';
import {captureH026} from './h026-snapshot.mjs';
import {getHomepageBlocks,isHomepageSectionVisible} from '../src/lib/home-builder.ts';
const phase=process.env.QA_PHASE||'baseline',out=`../coordination/evidence/h024a8e/${phase}`;mkdirSync(out,{recursive:true});
const server=process.env.QA_BASE_URL?null:createAppServer({config:{enabled:false},staticRoot:resolve('dist')});if(server){server.listen(0,'127.0.0.1');await once(server,'listening');}
const base=process.env.QA_BASE_URL||`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const routes=process.env.QA_HOME_ONLY?['/']:readdirSync('src/content/pages').filter(f=>f.endsWith('.json')).map(f=>{const p=JSON.parse(readFileSync('src/content/pages/'+f));return p.kind==='home'?'/':`/${p.slug}/`;}).concat('/begreper/','/404.html','/design-system/','/design-system/global-elements/');
const reference=phase==='baseline'?null:JSON.parse(readFileSync('../coordination/evidence/h024a8e/baseline/checks.json'));
const records=[],errors=[],posts=[];
try{for(const route of routes)for(const width of [1440,900,390,320]){
 const page=await browser.newPage({viewport:{width,height:1000},hasTouch:width===390,reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));await page.route('**/*',r=>r.request().method()==='POST'?(posts.push(r.request().url()),r.abort()):r.continue());
 const response=await page.goto(base+route);assert.ok(response.ok()||route==='/404.html');await page.evaluate(()=>document.fonts.ready);
 const snapshot=await page.evaluate(captureH026);assert.equal(snapshot.overflow,false);assert.equal(snapshot.h1,1);
 const duplicates=await page.evaluate(()=>[...document.querySelectorAll('[id]')].map(e=>e.id).filter((id,i,a)=>a.indexOf(id)!==i));assert.deepEqual(duplicates,[]);
 if(route==='/'||route==='/design-system/global-elements/'){
  const all=getHomepageBlocks(JSON.parse(readFileSync('src/content/pages/home.json'))),blocks=all.filter(isHomepageSectionVisible);
  if(route==='/'){const actual=await page.locator('.invite-home > section[id]').evaluateAll(es=>es.map(e=>e.id));assert.deepEqual(actual,blocks.map(b=>b.id),'Actual Worker/local source order');}
  const calculator=blocks.find(b=>b._block==='calculator');
  if(calculator)assert.equal(await page.locator('#regneeksempel h2').innerText(),calculator.content.heading,'Actual visible master heading');
  else assert.equal(await page.locator('#regneeksempel').count(),0,'No hidden/removed calculator instance');
  if(route==='/'){
   for(const block of blocks.filter(b=>b._block==='content'))assert.equal(await page.locator(`#${block.id} h2`).innerText(),block.heading,'Visible local content heading');
   for(const block of all.filter(b=>!isHomepageSectionVisible(b)))assert.equal(await page.locator(`#${block.id}`).count(),0,'Hidden placement omitted from DOM');
  }
  assert.equal(await page.locator('[data-home-assessment] button[type=submit]:not(:disabled)').count(),0);
  if(phase==='baseline'||process.env.QA_SCREENSHOT)await page.screenshot({path:`${out}/${route==='/'?'home':'global-elements'}-${width}.png`,fullPage:true});
 }
 assert.ok(/noindex/.test((await page.locator('meta[name=robots]').getAttribute('content'))||''));
 if(reference&&!process.env.QA_VARIANT&&route!=='/design-system/global-elements/'){
  const expected=structuredClone(reference.records.find(r=>r.route===route&&r.width===width).snapshot),actual=structuredClone(snapshot);
  if(route==='/design-system/'){
   for(const [before,after] of JSON.parse(readFileSync('../coordination/evidence/h024a8e/design-system-guide-changes.json')))expected.text=expected.text.replace(before,after);
   // Only the two technical CMS help paragraphs change. Footer shifts with their
   // height; retain every footer dimension/style/text and compare relative y.
   for(const value of [actual.footer,expected.footer]){const origin=value.root.box.y;const walk=o=>{if(!o||typeof o!=='object')return;if('x' in o&&'y' in o&&'height' in o)o.y-=origin;else for(const child of Object.values(o))walk(child);};walk(value);}
  }
  assert.deepEqual(actual,expected,`${route} ${width} default parity (documented CMS guide correction only)`);
 }
 records.push({route,width,snapshot});await page.close();
}assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);writeFileSync(`${out}/checks.json`,JSON.stringify({phase,base,records,errors,posts},null,2));console.log(`${phase}: ${records.length} route/width records; zero overflow/duplicate IDs/JS errors/POSTs.`);
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));}
