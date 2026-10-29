import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const phase=process.env.QA_PHASE;
assert.ok(['changed','restored'].includes(phase));
const base='https://optimalisering-oslo-v33.anel.workers.dev',out=`../coordination/evidence/h024a4/cms-${phase}`;
mkdirSync(out,{recursive:true});
const incoming=JSON.parse(readFileSync('../coordination/evidence/h024a4/preservation.json')).incoming;
const original=JSON.parse(execFileSync('git',['show',`${incoming}:app/src/content/pages/home.json`],{encoding:'utf8'}));
const expected=structuredClone(original);expected.sections.find(s=>s.id==='passer').items[1].boxVariant=phase==='changed'?'plain':'card';
assert.deepEqual(JSON.parse(readFileSync('src/content/pages/home.json')),expected,'CMS save changes only the actual second passer box variant');
const baseline=JSON.parse(readFileSync('../coordination/evidence/h024a4/before/card-checks.json'));
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true}),records=[],errors=[],posts=[];
try{for(const width of [1440,900,390,320]){
 const p=await browser.newPage({viewport:{width,height:1100},reducedMotion:'reduce'});
 p.on('pageerror',e=>errors.push(e.message));await p.route('**/*',r=>r.request().method()==='POST'?(posts.push(r.request().url()),r.abort()):r.continue());
 await p.goto(base+'/');await p.evaluate(()=>document.fonts.ready);
 const snapshot=await p.evaluate(()=>({sections:[...document.querySelectorAll('main section[id]')].map(e=>e.id),text:document.querySelector('main').textContent.replace(/\s+/g,' ').trim(),cards:[...document.querySelectorAll('#passer .section-items > article')].map(e=>{const s=getComputedStyle(e),b=e.querySelector(':scope > .card-body'),bs=b&&getComputedStyle(b);return {variant:e.dataset.boxVariant,radius:s.borderRadius,surface:e.dataset.surface,background:s.backgroundColor,color:s.color,body:!!b,padding:bs?.paddingTop,gap:bs?.gap,links:[...e.querySelectorAll('a')].map(a=>a.getAttribute('href'))};}),mechanism:(()=>{const e=document.querySelector('#mekanisme');return {html:e.outerHTML,rect:e.getBoundingClientRect().toJSON(),items:[...e.querySelectorAll('.section-items > article')].map(n=>({html:n.outerHTML,rect:n.getBoundingClientRect().toJSON()}))};})()}));
 assert.deepEqual(snapshot.sections,original.sections.map(s=>s.id));
 assert.deepEqual(snapshot.mechanism,baseline.records.find(r=>r.width===width).mechanism);
 assert.equal(snapshot.cards.length,2);
 for(const [i,c] of snapshot.cards.entries()){
  const card=i===0||phase==='restored';assert.equal(c.body,card);assert.equal(c.variant,card?'card':'plain');assert.equal(c.radius,card?'20px':'0px');assert.equal(c.surface,i===0?'secondary':'base-200');assert.deepEqual(c.links,[]);
  if(card){assert.equal(c.padding,'24px');assert.equal(c.gap,'20px');}
 }
 assert.equal(await p.locator('h1').count(),1);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 assert.match(await p.locator('meta[name=robots]').getAttribute('content'),/noindex/);assert.ok(await p.locator('button[type=submit]').isDisabled());
 if([1440,390].includes(width))await p.locator('#passer').screenshot({path:`${out}/passer-${width}.png`});
 records.push({width,...snapshot});await p.close();
}assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);writeFileSync(`${out}/checks.json`,JSON.stringify({phase,base,sourceOnlyVariant:true,records,errors,posts},null,2)+'\n');console.log(`H-024A4 actual CMS ${phase}: exact source delta, visible same-section variant, unchanged mechanism/order, 4 widths PASS.`);
}finally{await browser.close();}
