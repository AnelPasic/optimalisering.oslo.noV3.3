import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {once} from 'node:events';
import {createAppServer} from '../server/http.mjs';
const server=process.env.QA_BASE_URL?null:createAppServer({config:{enabled:false},staticRoot:resolve('dist')});if(server){server.listen(0,'127.0.0.1');await once(server,'listening');}
const base=process.env.QA_BASE_URL||`http://127.0.0.1:${server.address().port}`,phase=process.env.QA_PHASE||'local',out='../coordination/evidence/h026';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true}),records=[],errors=[],posts=[];
try{for(const width of [1440,390]){
 const p=await browser.newPage({viewport:{width,height:1000},hasTouch:width===390,reducedMotion:'reduce'});p.on('pageerror',e=>errors.push(e.message));await p.route('**/*',r=>r.request().method()==='POST'?(posts.push(r.request().url()),r.abort()):r.continue());await p.goto(base+'/');
 const primary=p.locator('main .commercial-hero a.button'),href=await primary.getAttribute('href');
 if(width===390)await primary.tap();else {await primary.focus();await primary.press('Enter');}
 await p.waitForURL(new URL(href,base).href);assert.equal(await p.locator('#sjekk button[type=submit]').isDisabled(),true,'Homepage review form remains disabled');
 const glossary=p.locator('.site-footer a[href="/begreper/"]');if(width===390)await glossary.tap();else {await glossary.focus();await glossary.press('Enter');}await p.waitForURL(base+'/begreper/');assert.equal(await p.locator('h1').count(),1);assert.ok(await p.locator('.glossary-navigation a').count()>0);
 await p.goto(base+'/vurdering/');assert.equal(await p.locator('.hero-auxiliary .assessment-form').getAttribute('data-enabled'),'false');assert.equal(await p.locator('.hero-auxiliary #website').count(),1);
 records.push({width,heroPrimary:href,heroKeyboardOrTap:true,footerGlossaryKeyboardOrTap:true,glossaryNavigation:true,assessmentTransportDisabled:true});await p.close();
}assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);writeFileSync(`${out}/${phase}-actions.json`,JSON.stringify({base,phase,records,errors,posts},null,2)+'\n');console.log(`H-026 ${phase}: actual Hero/Footer keyboard and touch navigation PASS; existing form gates retained; no errors/POSTs.`);
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));}
