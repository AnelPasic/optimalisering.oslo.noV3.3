import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {once} from 'node:events';
import {createAppServer} from '../server/http.mjs';
import {captureH026,compareH026} from './h026-snapshot.mjs';
const phase=process.env.QA_PHASE||'after',out=`../coordination/evidence/h026/${phase}`;mkdirSync(out,{recursive:true});
const baseline=phase==='before'?null:JSON.parse(readFileSync('../coordination/evidence/h026/before/checks.json'));
const server=process.env.QA_BASE_URL?null:createAppServer({config:{enabled:false},staticRoot:resolve('dist')});if(server){server.listen(0,'127.0.0.1');await once(server,'listening');}
const base=process.env.QA_BASE_URL||`http://127.0.0.1:${server.address().port}`,browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const routes=readdirSync('src/content/pages').filter(f=>f.endsWith('.json')).map(f=>{const p=JSON.parse(readFileSync('src/content/pages/'+f));return p.kind==='home'?'/':`/${p.slug}/`;}).concat('/begreper/','/404.html','/design-system/');
const records=[],errors=[],posts=[];
try{for(const route of routes)for(const width of [1440,900,390,320]){
 const p=await browser.newPage({viewport:{width,height:1100},reducedMotion:'reduce'});p.on('pageerror',e=>errors.push({route,width,message:e.message}));await p.route('**/*',r=>r.request().method()==='POST'?(posts.push(r.request().url()),r.abort()):r.continue());await p.goto(base+route);await p.evaluate(()=>document.fonts.ready);
 const snapshot=await p.evaluate(captureH026);assert.equal(snapshot.h1,1);assert.equal(snapshot.overflow,false,route+' overflow');assert.ok(snapshot.heroes.every(h=>h.textFirst));assert.match(await p.locator('meta[name=robots]').getAttribute('content'),/noindex/);
 if(baseline)compareH026(snapshot,baseline.records.find(r=>r.route===route&&r.width===width).snapshot,`${route} ${width}`);
 if(!phase.includes('before')){assert.equal(await p.locator('main .commercial-hero .hero > .hero-content').count(),snapshot.heroes.length,'Genuine shared Hero parts');assert.equal(await p.locator('.site-footer .footer .footer-title').count(),1,'Existing brand is Footer title');assert.ok(await p.locator('.site-footer .footer nav').evaluateAll(es=>es.every(e=>getComputedStyle(e).display==='grid')),'Native daisyUI nav grid');}
 if(route==='/'||([1440,390].includes(width)&&['/konvertering/','/priser/','/om/','/vurdering/','/innsikt/','/innsikt/hva-bor-optimaliseres-forst/','/begreper/','/404.html'].includes(route))){const name=route==='/'?'home':route.replaceAll('/','-').replaceAll('.','').replace(/^-|-$/g,'');await p.locator('main .commercial-hero').screenshot({path:`${out}/${name}-hero-${width}.png`});if(route==='/')await p.locator('.site-footer').screenshot({path:`${out}/footer-${width}.png`});}
 if(route==='/design-system/'&&[1440,390].includes(width))for(const preset of ['split-right','split-left','centered','centered-none'])await p.locator(`[data-cms-hero-preset="${preset}"]`).screenshot({path:`${out}/demo-${preset}-${width}.png`});
 if(route==='/'&&width===1440){const links=p.locator('.site-footer a');await links.first().focus();for(let i=0;i<await links.count();i++){assert.ok(await links.nth(i).evaluate(e=>e===document.activeElement),'Footer keyboard order');if(i<await links.count()-1)await p.keyboard.press('Tab');}}
 records.push({route,width,snapshot});await p.close();
}assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);writeFileSync(`${out}/checks.json`,JSON.stringify({phase,base,records,errors,posts},null,2)+'\n');console.log(`H-026 ${phase}: ${records.length} actual route/width snapshots, visible Hero/Footer geometry/type/content/links and Card roles${baseline?' unchanged':''}; no errors/POSTs.`);
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));}
