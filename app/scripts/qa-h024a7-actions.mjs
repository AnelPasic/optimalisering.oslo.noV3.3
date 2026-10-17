import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {once} from 'node:events';
import {createAppServer} from '../server/http.mjs';
const phase=process.env.QA_PHASE||'after',out=`../coordination/evidence/h024a7/${phase}`;mkdirSync(out,{recursive:true});
const server=process.env.QA_BASE_URL?null:createAppServer({config:{enabled:false},staticRoot:resolve('dist')});if(server){server.listen(0,'127.0.0.1');await once(server,'listening');}
const base=process.env.QA_BASE_URL||`http://127.0.0.1:${server.address().port}`,browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true}),records=[],errors=[],posts=[];
try{for(const javaScriptEnabled of [true,false])for(const route of ['/','/design-system/'])for(const width of [1440,1100,900,390,320]){
 const p=await browser.newPage({viewport:{width,height:1100},hasTouch:width===390,javaScriptEnabled,reducedMotion:'reduce'});p.on('pageerror',e=>errors.push(e.message));await p.route('**/*',r=>r.request().method()==='POST'?(posts.push(r.request().url()),r.abort()):r.continue());await p.goto(base+route);await p.evaluate(()=>document.fonts.ready);
 const forms=p.locator('[data-home-assessment]'),guards=[];assert.equal(await forms.count(),route==='/'?1:2);
 for(const form of await forms.all()){
  assert.ok(await form.locator('[type=submit]').isDisabled());const fields=form.locator('input,textarea');assert.equal(await fields.count(),3);
  for(const field of await fields.all()){const id=await field.getAttribute('id');assert.equal(await form.locator(`label[for="${id}"]`).count(),1);}
  await fields.nth(0).focus();for(let i=0;i<3;i++){assert.ok(await fields.nth(i).evaluate(e=>e===document.activeElement));await p.keyboard.press('Tab');}assert.ok(await form.locator('.form-privacy a').evaluate(e=>e===document.activeElement),'Website/email/message/privacy tab order stays logical');
  if(route==='/design-system/')assert.equal(await form.getAttribute('action'),null);else assert.equal(await form.getAttribute('action'),'/api/leads');
  if(javaScriptEnabled){const guard=await form.evaluate(f=>{const event=new Event('submit',{cancelable:true,bubbles:true});return {cancelled:!f.dispatchEvent(event),status:f.querySelector('.form-status').textContent,expected:f.dataset.disabledStatus,focused:document.activeElement===f.querySelector('.form-status')};});assert.ok(guard.cancelled);assert.equal(guard.status,guard.expected);assert.ok(guard.focused);guards.push(guard);}
 }
 const details=p.locator('.faq-list details').first(),summary=details.locator('summary');assert.equal(await details.evaluate(e=>e.open),false);if(width===390)await summary.tap();else{await summary.focus();await p.keyboard.press('Enter');}assert.ok(await details.evaluate(e=>e.open));assert.ok(await details.locator('.collapse-content').isVisible());assert.ok(await details.locator('.collapse-content').evaluate(e=>e.scrollWidth<=e.clientWidth+1));await summary.focus();await p.keyboard.press('Space');assert.equal(await details.evaluate(e=>e.open),false);
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);records.push({route,width,javaScriptEnabled,forms:await forms.count(),guards});await p.close();
}assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);writeFileSync(`${out}/actions.json`,JSON.stringify({records,errors,posts},null,2)+'\n');console.log(`H-024A7 ${phase}: ${records.length} five-width JS/no-JS, keyboard/touch, both safe specimen forms, unchanged tab order/disabled guard and FAQ actions; no real submissions/POSTs/errors.`);
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));}
