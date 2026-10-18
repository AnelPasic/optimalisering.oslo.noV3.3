// Actual Worker state oracle for authenticated CMS commits, not a CMS simulation.
import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {getHomepageBlocks,isHomepageSectionVisible} from '../src/lib/home-builder.ts';
const source=JSON.parse(readFileSync('src/content/pages/home.json','utf8')),blocks=getHomepageBlocks(source),phase=process.env.QA_PHASE;
assert.ok(phase);const out=`../coordination/evidence/h024a8b/${phase}`;mkdirSync(out,{recursive:true});
const base='https://optimalisering-oslo-v33.anel.workers.dev',browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const expected=blocks.filter(isHomepageSectionVisible).map(b=>b.id),rows=[],errors=[],posts=[];
try{for(const width of [1440,900,390,320]){
 const page=await browser.newPage({viewport:{width,height:1000},hasTouch:width===390,reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));await page.route('**/*',r=>r.request().method()==='POST'?(posts.push(r.request().url()),r.abort()):r.continue());
 await page.goto(base+'/?h024a8b='+phase);await page.evaluate(()=>document.fonts.ready);
 const state=await page.evaluate(()=>({ids:[...document.querySelectorAll('main section[id]')].map(e=>e.id),allIds:[...document.querySelectorAll('[id]')].map(e=>e.id),text:document.querySelector('main').innerText,overflow:document.documentElement.scrollWidth>innerWidth,heroProof:!!document.querySelector('.hero-proof'),enabledSubmits:document.querySelectorAll('button[type=submit]:not(:disabled)').length,card:document.querySelector('#h024a8b-test-a .content-card')?.className}));
 assert.deepEqual(state.ids.filter(id=>id!=='home-hero'),expected,phase+' actual Worker source order');assert.equal(state.overflow,false);assert.equal(state.enabledSubmits,0);assert.equal(new Set(state.allIds).size,state.allIds.length);assert.equal(state.heroProof,isHomepageSectionVisible(blocks.find(b=>b._block==='proof')));
 for(const hidden of blocks.filter(b=>!isHomepageSectionVisible(b))){assert.ok(!state.allIds.includes(hidden.id));if(hidden._block==='content')assert.ok(!state.text.includes(hidden.heading));}
 await page.screenshot({path:`${out}/worker-${width}.png`,fullPage:true});
 await page.goto(base+'/design-system/');const html=await page.content();
 for(const hidden of blocks.filter(b=>!isHomepageSectionVisible(b)))if(hidden._block==='content')assert.ok(!html.includes(hidden.heading));
 const ordinary=blocks.find(b=>b.id==='mekanisme'),faq=blocks.find(b=>b._block==='faq');assert.equal(await page.locator('#ds-layout-default').count(),isHomepageSectionVisible(ordinary)?1:0);assert.equal(await page.locator('#ds-home-faq').count(),isHomepageSectionVisible(faq)?1:0);
 rows.push({width,...state});await page.close();
}assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);writeFileSync(`${out}/worker.json`,JSON.stringify({phase,expected,rows,errors,posts},null,2)+'\n');console.log(`${phase}: four actual Worker widths, source order, hidden/visible specimens and Hero proof, zero JS errors/POSTs.`);
}finally{await browser.close();}
