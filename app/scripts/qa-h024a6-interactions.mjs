import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {once} from 'node:events';
import {createAppServer} from '../server/http.mjs';
const phase=process.env.QA_PHASE||'after',out=`../coordination/evidence/h024a6/${phase}`;mkdirSync(out,{recursive:true});
const server=process.env.QA_BASE_URL?null:createAppServer({config:{enabled:false},staticRoot:resolve('dist')});if(server){server.listen(0,'127.0.0.1');await once(server,'listening');}
const base=process.env.QA_BASE_URL||`http://127.0.0.1:${server.address().port}`,browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true}),records=[],errors=[],posts=[];
try{
 for(const javaScriptEnabled of [true,false])for(const route of ['/','/design-system/','/konvertering/','/priser/','/om/'])for(const width of [1440,390]){
  const p=await browser.newPage({viewport:{width,height:1100},hasTouch:width===390,javaScriptEnabled,reducedMotion:'reduce'});p.on('pageerror',e=>errors.push(e.message));await p.route('**/*',r=>r.request().method()==='POST'?(posts.push(r.request().url()),r.abort()):r.continue());await p.goto(base+route);await p.evaluate(()=>document.fonts.ready);
  const faq=p.locator('.faq-list details').first(),summary=faq.locator('summary');assert.equal(await faq.locator(':scope > .collapse-content > p').count(),1);assert.equal(await faq.evaluate(e=>e.open),false);
  if(width===390)await summary.tap();else{await summary.focus();await p.keyboard.press('Enter');}assert.ok(await faq.evaluate(e=>e.open));assert.ok(await faq.locator('.collapse-content').isVisible());
  const open=await faq.evaluate(e=>{const a=e.querySelector('.collapse-content'),s=e.querySelector('summary');return {answer:a.textContent,answerHeight:a.getBoundingClientRect().height,summaryHeight:s.getBoundingClientRect().height,clipped:a.scrollWidth>a.clientWidth+1,focus:document.activeElement===s};});assert.ok(open.answerHeight>0);assert.ok(!open.clipped);
  if(route==='/design-system/')await p.locator('#ds-home-faq').screenshot({path:`${out}/ds-faq-open-${javaScriptEnabled?'js':'nojs'}-${width}.png`});
  await summary.focus();await p.keyboard.press('Space');assert.equal(await faq.evaluate(e=>e.open),false);
  const form=p.locator('[data-home-assessment]');let guard=null;
  if(await form.count()){
   assert.ok(await form.locator('button').isDisabled());const ids=await form.locator('input,textarea').evaluateAll(es=>es.map(e=>e.id));assert.equal(new Set(ids).size,ids.length);
   if(javaScriptEnabled){guard=await form.evaluate(f=>{const event=new Event('submit',{bubbles:true,cancelable:true}),accepted=f.dispatchEvent(event),status=f.querySelector('.form-status');return {cancelled:!accepted,status:status.textContent,expected:f.dataset.disabledStatus,shown:!status.hidden,focused:document.activeElement===status};});assert.ok(guard.cancelled);assert.equal(guard.status,guard.expected);assert.ok(guard.shown);assert.ok(guard.focused);}
   if(route==='/design-system/')assert.equal(await form.getAttribute('action'),null);
  }
  records.push({route,width,javaScriptEnabled,open,guard});await p.close();
 }
 assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);writeFileSync(`${out}/interactions.json`,JSON.stringify({records,errors,posts},null,2)+'\n');console.log(`H-024A6 ${phase} interactions: ${records.length} actual keyboard/touch/JS/no-JS FAQ states, disabled native forms and synthetic cancel-submit guards; zero real submissions/POSTs/errors.`);
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));}
