import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,readdirSync,mkdirSync} from 'node:fs';
import {relative,join} from 'node:path';
import {createHash} from 'node:crypto';
import {captureH026} from './h026-snapshot.mjs';
import {getHomepageBlocks,isHomepageSectionVisible} from '../src/lib/home-builder.ts';
const phase=process.env.QA_PHASE||'before',out='../coordination/evidence/h024a8g',base=process.env.QA_BASE_URL||'https://optimalisering-oslo-v33.anel.workers.dev';
mkdirSync(`${out}/${phase}`,{recursive:true});
const hash=value=>createHash('sha256').update(value).digest('hex');
const files=readdirSync('dist',{recursive:true,withFileTypes:true}).filter(e=>e.isFile()&&e.name!=='_headers').map(e=>relative('dist',join(e.parentPath,e.name)).replaceAll('\\','/'));
const assets=[];let homeHtml;
for(let i=0;i<files.length;i+=6)await Promise.all(files.slice(i,i+6).map(async path=>{const bytes=readFileSync('dist/'+path),response=await fetch(base+'/'+path);assert.ok(response.ok,path);const worker=Buffer.from(await response.arrayBuffer());assert.equal(hash(worker),hash(bytes),path);assets.push({path,hash:hash(bytes)});if(path==='index.html')homeHtml=bytes.toString();}));
assets.sort((a,b)=>a.path.localeCompare(b.path));

const home=JSON.parse(readFileSync('src/content/pages/home.json')),expected=getHomepageBlocks(home).filter(isHomepageSectionVisible).map(b=>b.id),records=[],errors=[],posts=[];
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try{for(const width of [1440,900,390,320]){
 const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));await page.route('**/*',r=>r.request().method()==='POST'?(posts.push(r.request().url()),r.abort()):r.continue());
 await page.goto(base+'/');await page.evaluate(()=>document.fonts.ready);
 const snapshot=await page.evaluate(captureH026);assert.equal(snapshot.h1,1);assert.equal(snapshot.overflow,false);
 const sections=await page.locator('.invite-home > section[id]').evaluateAll(es=>es.map(e=>({id:e.id,heading:e.querySelector('h2')?.textContent,height:e.getBoundingClientRect().height})));
 assert.deepEqual(sections.map(s=>s.id),expected,'OWNER order preserved');
 const ids=await page.locator('[id]').evaluateAll(es=>es.map(e=>e.id));assert.equal(new Set(ids).size,ids.length);
 assert.equal(await page.locator('[data-home-assessment] button[type=submit]').isDisabled(),true);assert.match(await page.locator('meta[name=robots]').getAttribute('content'),/noindex/);
 const retained=await page.locator('.invite-home > section[id]').evaluateAll(es=>Object.fromEntries(es.filter(e=>['regneeksempel','resultater','priser','sjekk','sporsmal'].includes(e.id)).map(e=>[e.id,e.outerHTML])));
 const positions=await page.locator('#priser,#sjekk').evaluateAll(es=>Object.fromEntries(es.map(e=>[e.id,e.getBoundingClientRect().top+scrollY])));
 const record={width,snapshot,sections,retained,positions,pageHeight:await page.evaluate(()=>document.documentElement.scrollHeight)};
 if(phase!=='before'){
 const prior=JSON.parse(readFileSync(`${out}/before/checks.json`)).records.find(r=>r.width===width);
 assert.deepEqual(snapshot.heroes,prior.snapshot.heroes,'Hero exact');
 const staticRetained=await page.evaluate(h=>{const doc=new DOMParser().parseFromString(h,'text/html');return Object.fromEntries([...doc.querySelectorAll('.invite-home > section[id]')].map(e=>[e.id,e.outerHTML]));},homeHtml);
 assert.deepEqual(staticRetained,JSON.parse(readFileSync(`${out}/before-static-sections.json`)),'Retained static section HTML exact');
 for(const id of ['behov','mekanisme','passer','forbehovsvelger'])assert.equal(await page.locator('#'+id).count(),0,'Removed/hidden section absent');
 assert.equal(await page.getByText('OVerskrift',{exact:true}).count(),0,'Local OWNER heading not public');
}

 records.push(record);await page.screenshot({path:`${out}/${phase}/home-${width}.png`,fullPage:true});await page.close();
}assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);writeFileSync(`${out}/${phase}/checks.json`,JSON.stringify({phase,base,assets,records,errors,posts},null,2)+'\n');if(phase!=='before'){const prior=JSON.parse(readFileSync(`${out}/before/checks.json`));assert.deepEqual(assets.filter(a=>a.path!=='index.html'),prior.assets.filter(a=>a.path!=='index.html'),'All other public artifacts unchanged');}console.log(`${phase}: ${assets.length} exact Worker assets;4 responsive snapshots, source order and safeguards PASS.`);
}finally{await browser.close();}
