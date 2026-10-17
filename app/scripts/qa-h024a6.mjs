import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {once} from 'node:events';
import {createAppServer} from '../server/http.mjs';
import {captureH026,compareH026} from './h026-snapshot.mjs';
const phase=process.env.QA_PHASE||'after',before=phase==='before',out=`../coordination/evidence/h024a6/${phase}`;mkdirSync(out,{recursive:true});
const baseline=before?null:JSON.parse(readFileSync('../coordination/evidence/h024a6/before/checks.json'));
const server=process.env.QA_BASE_URL?null:createAppServer({config:{enabled:false},staticRoot:resolve('dist')});if(server){server.listen(0,'127.0.0.1');await once(server,'listening');}
const base=process.env.QA_BASE_URL||`http://127.0.0.1:${server.address().port}`,browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const routes=readdirSync('src/content/pages').filter(f=>f.endsWith('.json')).map(f=>{const p=JSON.parse(readFileSync('src/content/pages/'+f));return p.kind==='home'?'/':`/${p.slug}/`;}).concat('/begreper/','/404.html','/design-system/');
const records=[],errors=[],posts=[],missing=[];
function inspect(){
 const measure=e=>{if(!e)return null;const s=getComputedStyle(e),r=e.getBoundingClientRect();return {width:r.width,x:r.x,height:r.height,padding:[s.paddingTop,s.paddingRight,s.paddingBottom,s.paddingLeft],gap:s.gap,columns:s.gridTemplateColumns,background:s.backgroundColor,color:s.color,font:s.fontSize,lineHeight:s.lineHeight,radius:s.borderRadius,text:e.textContent.replace(/\s+/g,' ').trim()};};
 const form=document.querySelector('[data-home-assessment]'),faq=document.querySelector('.faq-section');
 const rules=e=>{const found=[];function walk(rs,context=[]){for(const r of rs){if(r.conditionText&&r.constructor.name==='CSSMediaRule'&&!matchMedia(r.conditionText).matches)continue;if(r.cssRules){walk(r.cssRules,[...context,r.name||r.conditionText||r.constructor.name]);continue;}if(r.selectorText&&r.style&&e.matches(r.selectorText)&&['width','max-width','gap','padding','padding-left','padding-right','grid-template-columns'].some(p=>r.style.getPropertyValue(p)))found.push({context,selector:r.selectorText,css:r.style.cssText});}}for(const sheet of document.styleSheets){try{walk(sheet.cssRules,[sheet.href?.split('/').pop()||'inline']);}catch{}}return found;};
 return {assessment:form?{section:measure(form.closest('section')),grid:measure(form.closest('.assessment-grid')),copy:measure(form.closest('section').querySelector('.assessment-copy')),form:measure(form),body:measure(form.querySelector(':scope > .card-body')),fields:[...form.querySelectorAll('input,textarea,button')].map(e=>({id:e.id,name:e.name,type:e.type,disabled:e.disabled,required:e.required,placeholder:e.getAttribute('placeholder'),max:e.maxLength,autocomplete:e.autocomplete})),labels:[...form.querySelectorAll('label')].map(e=>({for:e.htmlFor,text:e.textContent})),action:form.getAttribute('action'),method:form.method,rules:rules(form.closest('.assessment-grid'))}:null,faq:faq?{section:measure(faq),grid:measure(faq.querySelector('.faq-grid')),list:measure(faq.querySelector('.faq-list')),items:[...faq.querySelectorAll('details')].map(e=>({question:e.querySelector('summary').textContent,answer:e.querySelector('.collapse-content').textContent,summary:measure(e.querySelector('summary')),open:e.open})),rules:rules(faq.querySelector('.faq-grid'))}:null,boxes:[...document.querySelectorAll('.content-section .section-items > article')].map(e=>({variant:e.dataset.boxVariant||'default',surface:e.dataset.surface||'default',item:measure(e),body:measure(e.querySelector('.card-body')),rules:rules(e)})),duplicates:[...document.querySelectorAll('[id]')].map(e=>e.id).filter((v,i,a)=>a.indexOf(v)!==i)};
}
function stable(s){
 const result=structuredClone(s);delete result.text;delete result.sections;
 const removeY=o=>{if(!o||typeof o!=='object')return;for(const k of Object.keys(o)){if(k==='y')delete o[k];else removeY(o[k]);}};removeY(result.footer);return result;
}
try{for(const route of routes)for(const width of [1440,900,390,320]){
 if(process.env.QA_FOCUS&&(width!==1440||!['/','/design-system/'].includes(route)))continue;
 const p=await browser.newPage({viewport:{width,height:1100},hasTouch:width===390,reducedMotion:'reduce'});p.on('pageerror',e=>errors.push(e.message));await p.route('**/*',r=>r.request().method()==='POST'?(posts.push(r.request().url()),r.abort()):r.continue());await p.goto(base+route);await p.evaluate(()=>document.fonts.ready);
 const snapshot=await p.evaluate(captureH026),details=JSON.parse(JSON.stringify(await p.evaluate(inspect)));assert.equal(snapshot.h1,1);assert.equal(snapshot.overflow,false);assert.deepEqual(details.duplicates,[]);
 const previous=baseline?.records.find(r=>r.route===route&&r.width===width);
 if(previous){compareH026(stable(snapshot),stable(previous.snapshot),`${route} ${width} accepted Hero/Footer/Card`);if(route!=='/design-system/'){assert.equal(snapshot.text,previous.snapshot.text);assert.deepEqual(snapshot.sections,previous.snapshot.sections);assert.deepEqual(details.assessment?.fields,previous.details.assessment?.fields);assert.deepEqual(details.assessment?.labels,previous.details.assessment?.labels);assert.deepEqual(details.faq?.items.map(({question,answer})=>({question,answer})),previous.details.faq?.items.map(({question,answer})=>({question,answer})));}}
 if(previous&&route!=='/design-system/'){
  if(details.faq){const a=structuredClone(details.faq),b=structuredClone(previous.details.faq);delete a.rules;delete b.rules;assert.deepEqual(a,b,`${route} ${width} accepted FAQ geometry/type/source`);}
  const cards=boxes=>boxes.filter(b=>b.body).map(({item,body})=>({item,body}));assert.deepEqual(cards(details.boxes),cards(previous.details.boxes),`${route} ${width} accepted real Card geometry`);
 }
 if(route==='/'){
  const a=details.assessment;assert.ok(await p.locator('[data-home-assessment] button').isDisabled());assert.equal(a.action,'/api/leads');
  if(!before&&!phase.includes('before')){const aligned=await p.locator('#mekanisme > .shell').evaluate(e=>({x:e.getBoundingClientRect().x,width:e.getBoundingClientRect().width}));if(Math.abs(a.grid.x-aligned.x)>1||Math.abs(a.grid.width-aligned.width)>1)missing.push(`${width}: assessment alignment`);if(!a.body)missing.push(`${width}: missing form card-body`);}
  for(const [selector,name] of [['#sjekk','assessment'],['#sporsmal','faq-closed']])await p.locator(selector).screenshot({path:`${out}/${name}-${width}.png`});
 }
 const summary=p.locator('.faq-list summary').first();if(await summary.count()){
  await summary.focus();await p.keyboard.press('Enter');assert.ok(await summary.evaluate(e=>e.parentElement.open));assert.ok(await summary.locator('..').locator('.collapse-content').isVisible());
  if(route==='/')await p.locator('#sporsmal').screenshot({path:`${out}/faq-open-${width}.png`});
  await p.keyboard.press('Space');assert.equal(await summary.evaluate(e=>e.parentElement.open),false);
 }
 if(route==='/design-system/'){
  await p.locator('#ds-box-variants').screenshot({path:`${out}/box-variants-${width}.png`});
  if(!before&&!phase.includes('before'))for(const [selector,name] of [['#ds-home-assessment','assessment'],['#ds-home-faq','faq']]){if(await p.locator(selector).count())await p.locator(selector).screenshot({path:`${out}/ds-${name}-${width}.png`});else missing.push(`${width}: missing real demo ${name}`);}
  if(!before&&!phase.includes('before'))for(const b of details.boxes.filter(b=>b.variant==='plain'))if(parseFloat(b.item.padding[1])<16)missing.push(`${width}: open box missing horizontal padding`);
 }
 records.push({route,width,snapshot,details});await p.close();
}
 const parity=[];
 if(!before&&!phase.includes('before')&&missing.length===0)for(const width of process.env.QA_FOCUS?[1440]:[1440,900,390,320]){
  const actual=records.find(r=>r.route==='/'&&r.width===width).details,demo=records.find(r=>r.route==='/design-system/'&&r.width===width).details;
  for(const component of ['assessment','faq']){const a=structuredClone(actual[component]),b=structuredClone(demo[component]);delete a.rules;delete b.rules;
   if(component==='assessment'){assert.equal(b.action,null,'Specimen has no endpoint');delete a.action;delete b.action;b.fields.forEach(f=>f.id=f.id.replace(/^ds-home-/,''));b.labels.forEach(l=>l.for=l.for.replace(/^ds-home-/,''));}
   assert.deepEqual(a,b,`${width} real production versus source-backed ${component} demo`);parity.push({width,component,exact:true});
  }
 }
 assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);writeFileSync(`${out}/checks.json`,JSON.stringify({phase,base,records,parity,errors,posts,missing},null,2)+'\n');assert.deepEqual(missing,[],'Actual component parity defects');console.log(`H-024A6 ${phase}: ${records.length} routes/widths, ${parity.length} exact production/demo comparisons, computed CSS/padding, actual FAQ keyboard, protected content/Hero/Footer/Card and zero POSTs/errors PASS.`);
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));}
