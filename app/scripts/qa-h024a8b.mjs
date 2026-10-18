import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {once} from 'node:events';
import {createAppServer} from '../server/http.mjs';
import {captureH026} from './h026-snapshot.mjs';
const phase=process.env.QA_PHASE||'after',out=`../coordination/evidence/h024a8b/${phase}`;mkdirSync(out,{recursive:true});
const server=process.env.QA_BASE_URL?null:createAppServer({config:{enabled:false},staticRoot:resolve('dist')});if(server){server.listen(0,'127.0.0.1');await once(server,'listening');}
const base=process.env.QA_BASE_URL||`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const routes=process.env.QA_HOME_ONLY?['/','/design-system/']:readdirSync('src/content/pages').filter(f=>f.endsWith('.json')).map(f=>{const p=JSON.parse(readFileSync('src/content/pages/'+f));return p.kind==='home'?'/':`/${p.slug}/`;}).concat('/begreper/','/404.html','/design-system/');
const reference=phase==='before'?null:JSON.parse(readFileSync('../coordination/evidence/h024a8b/before/checks.json'));
const rows=[],errors=[],posts=[];
try {for(const route of routes)for(const width of [1440,900,390,320]){
 const p=await browser.newPage({viewport:{width,height:1000},hasTouch:width===390,reducedMotion:'reduce'});p.on('pageerror',e=>errors.push(e.message));await p.route('**/*',r=>r.request().method()==='POST'?(posts.push(r.request().url()),r.abort()):r.continue());await p.goto(base+route);await p.evaluate(()=>document.fonts.ready);
 const snapshot=await p.evaluate(captureH026);assert.equal(snapshot.overflow,false);assert.equal(snapshot.h1,1);
 const duplicates=await p.evaluate(()=>[...document.querySelectorAll('[id]')].map(e=>e.id).filter((id,i,a)=>a.indexOf(id)!==i));assert.deepEqual(duplicates,[]);
 if(reference&&!process.env.QA_VARIANT)assert.deepEqual(snapshot,reference.records.find(r=>r.route===route&&r.width===width).snapshot,`${route} ${width}: default rendered content/geometry parity`);
 if(route==='/')await p.screenshot({path:`${out}/home-${width}.png`,fullPage:true});
 if(route==='/'||route==='/design-system/'){
  const faq=p.locator('.faq-list details').first();if(await faq.count()){await faq.locator('summary').focus();await p.keyboard.press('Enter');assert.ok(await faq.evaluate(e=>e.open));await p.keyboard.press('Space');assert.equal(await faq.evaluate(e=>e.open),false);}
  assert.equal(await p.locator('[data-home-assessment] button[type=submit]:not(:disabled)').count(),0);
 }
 rows.push({route,width,snapshot});await p.close();
}assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);writeFileSync(`${out}/checks.json`,JSON.stringify({phase,base,records:rows,errors,posts},null,2)+'\n');console.log(`H024A8B ${phase}: ${rows.length} route/width records, no overflow/duplicate IDs/JS errors/POSTs; ${reference&&!process.env.QA_VARIANT?'exact baseline parity':'capture'}.`);
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));}
