import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const key=process.env.QA_CASE,phase=process.env.QA_PHASE,layout=process.env.QA_LAYOUT;
assert.ok(['service','pricing','home'].includes(key));assert.ok(['changed','restored'].includes(phase));assert.ok(['split-right','split-left','centered'].includes(layout));
const route={service:'/synlighet/',pricing:'/priser/',home:'/'}[key],file={service:'synlighet',pricing:'priser',home:'home'}[key];
const source=JSON.parse(readFileSync(`src/content/pages/${file}.json`)),original=JSON.parse(execFileSync('git',['show',`7973ccd:app/src/content/pages/${file}.json`],{encoding:'utf8'}));
assert.equal(source.hero.layout,layout);
const comparable=structuredClone(source);if(key==='home')comparable.hero.layout=original.hero.layout;else delete comparable.hero;
assert.deepEqual(comparable,original,'Only the actual Hero layout changed; every pre-existing CMS field is preserved');
const baseline=JSON.parse(readFileSync('../coordination/evidence/h025/before/checks.json'));
const out=`../coordination/evidence/h025/cms-${key}-${phase}`;mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true}),records=[],errors=[],posts=[];
try{for(const width of [1440,900,390,320]){
 const page=await browser.newPage({viewport:{width,height:1100},reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));await page.route('**/*',r=>r.request().method()==='POST'?(posts.push(r.request().url()),r.abort()):r.continue());
 await page.goto('https://optimalisering-oslo-v33.anel.workers.dev'+route);await page.evaluate(()=>document.fonts.ready);
 const hero=page.locator('main .commercial-hero');assert.equal(await hero.getAttribute('data-hero-layout'),layout,'Actual deployed Worker layout');
 const rendered=await page.evaluate(()=>{const main=document.querySelector('main').cloneNode(true);main.querySelectorAll('script,style,[aria-hidden=true]').forEach(e=>e.remove());const h=document.querySelector('main .commercial-hero'),c=h.querySelector('.page-hero-copy'),i=h.querySelector('img'),v=h.querySelector('.hero-visual');return {text:main.textContent.replace(/\s+/g,' ').trim(),sections:[...document.querySelectorAll('main section[id]')].map(e=>e.id),image:i?{src:i.getAttribute('src'),alt:i.getAttribute('alt'),position:getComputedStyle(i).objectPosition,fit:getComputedStyle(i).objectFit}:null,copy:c.getBoundingClientRect().toJSON(),visual:v?.getBoundingClientRect().toJSON(),textFirst:!v||!!(c.compareDocumentPosition(v)&Node.DOCUMENT_POSITION_FOLLOWING),textAlign:getComputedStyle(c).textAlign,proof:document.querySelectorAll('.hero-proof').length};});
 const before=baseline.records.find(r=>r.route===route&&r.width===width).snapshot;
 assert.equal(rendered.text,before.text);assert.deepEqual(rendered.sections,before.sections);assert.deepEqual(rendered.image,before.heroImage);assert.ok(rendered.textFirst);assert.equal(rendered.proof,key==='home'?1:0);
 if(layout==='centered'){assert.equal(rendered.textAlign,'center');assert.ok(Math.abs(rendered.copy.x+rendered.copy.width/2-width/2)<=1);if(rendered.visual)assert.ok(Math.abs(rendered.visual.x+rendered.visual.width/2-width/2)<=1,'Centered media is visually centered');}
 if(rendered.visual){if(width<=900||layout==='centered')assert.ok(rendered.visual.y>=rendered.copy.bottom-1);else if(layout==='split-left')assert.ok(rendered.visual.right<=rendered.copy.x+1);else assert.ok(rendered.copy.right<=rendered.visual.x+1);}
 assert.equal(await page.locator('h1').count(),1);assert.match(await page.locator('meta[name=robots]').getAttribute('content'),/noindex/);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 if([1440,390].includes(width))await page.screenshot({path:`${out}/worker-${width}.png`});records.push({width,...rendered});await page.close();
}assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);writeFileSync(`${out}/checks.json`,JSON.stringify({key,phase,layout,commit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),sourceOnlyHeroLayoutChanged:true,records,errors,posts},null,2)+'\n');console.log(`H-025 authenticated CMS ${key} ${phase}: exact source, visible ${layout}, 4 widths, preserved copy/media/order/proof PASS.`);
}finally{await browser.close();}
