import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {resolve} from 'node:path';
import {once} from 'node:events';
import {createAppServer} from '../server/http.mjs';
import {captureH026,compareH026} from './h026-snapshot.mjs';
const phase=process.env.QA_PHASE||'after',out=`../coordination/evidence/h026/${phase}-variants`;mkdirSync(out,{recursive:true});
const baseline=phase==='before'?null:JSON.parse(readFileSync('../coordination/evidence/h026/before-variants/checks.json'));
const slugs=['home','konvertering','priser','vurdering','om','hva-bor-optimaliseres-forst','innsikt'];
const paths=slugs.map(s=>`src/content/pages/${s}.json`).concat('src/content/terminology/glossary.json','src/content/presentation/hero-layouts.json');
const original=new Map(paths.map(path=>[path,readFileSync(path)]));
const sample=JSON.parse(original.get('src/content/pages/konvertering.json')).heroVisual;
const astro=JSON.parse(readFileSync('node_modules/astro/package.json')).bin.astro;
const build=()=>execFileSync(process.execPath,[resolve('node_modules/astro',astro),'build'],{encoding:'utf8',maxBuffer:4e6});
const server=createAppServer({config:{enabled:false},staticRoot:resolve('dist')});server.listen(0,'127.0.0.1');await once(server,'listening');
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true}),base=`http://127.0.0.1:${server.address().port}`,records=[],errors=[],posts=[];
try{for(const preset of ['split-right','split-left','centered','centered-none'])for(const withImage of [false,true]){
 const sources=[];
 for(const [path,bytes] of original){const page=JSON.parse(bytes);if(path.includes('/pages/')){page.hero={...page.hero,layout:preset};if(page.kind==='home')page.hero.visual.kind=withImage?'image':'none';else if(['service','pricing','assessment'].includes(page.kind)){if(withImage)page.heroVisual=structuredClone(sample);else delete page.heroVisual;}if(!withImage||['home','service','pricing','assessment'].includes(page.kind))sources.push({route:page.kind==='home'?'/':`/${page.slug}/`,family:page.kind});}else if(path.includes('/terminology/'))page.hero={layout:preset};else page.notFound.layout=preset;writeFileSync(path,JSON.stringify(page,null,2)+'\n');}
 if(!withImage)sources.push({route:'/begreper/',family:'glossary'},{route:'/404.html',family:'error'});
 writeFileSync(`${out}/${preset}-${withImage?'image':'none'}-build.log`,build());
 for(const {route,family} of sources)for(const width of [1440,900,390,320]){
  const p=await browser.newPage({viewport:{width,height:1100},reducedMotion:'reduce'});p.on('pageerror',e=>errors.push({route,preset,width,error:e.message}));await p.route('**/*',r=>r.request().method()==='POST'?(posts.push(r.request().url()),r.abort()):r.continue());await p.goto(base+route);await p.evaluate(()=>document.fonts.ready);
  const snapshot=await p.evaluate(captureH026);assert.equal(snapshot.h1,1);assert.equal(snapshot.overflow,false);const h=snapshot.heroes[0];assert.ok(h.textFirst);assert.equal(h.layout,preset==='centered-none'?'centered':preset);if(preset==='centered-none'||!withImage)assert.equal(h.images.length,0);else if(['home','service','pricing','assessment'].includes(family))assert.equal(h.images.length,1);
   if(family==='assessment'){assert.equal(await p.locator('.hero-auxiliary .assessment-form').count(),1);assert.equal(await p.locator('.assessment-form').getAttribute('data-enabled'),'false','Existing assessment transport remains off; its JS enables the button for local validation');}
  if(baseline)compareH026(snapshot,baseline.records.find(r=>r.route===route&&r.width===width&&r.preset===preset&&r.withImage===withImage).snapshot,`${route} ${preset} ${withImage} ${width}`);
  if(phase!=='before')assert.equal(await p.locator('.commercial-hero .hero > .hero-content').count(),1);
  if([1440,390].includes(width)&&['home','assessment'].includes(family))await p.locator('.commercial-hero').screenshot({path:`${out}/${family}-${preset}-${withImage?'image':'none'}-${width}.png`});
  records.push({route,family,preset,withImage,width,snapshot});await p.close();
 }
 console.log(`H-026 ${phase} ${preset}/${withImage?'image':'none'} captured; ${records.length} groups.`);
}assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);writeFileSync(`${out}/checks.json`,JSON.stringify({phase,records,errors,posts},null,2)+'\n');console.log(`H-026 actual source ${phase}: ${records.length} preset/image/family/width groups${baseline?' computed/visual geometry parity PASS':''}.`);
}finally{await browser.close();await new Promise(r=>server.close(r));for(const [path,bytes] of original)writeFileSync(path,bytes);writeFileSync(`${out}/restored-build.log`,build());for(const [path,bytes] of original)assert.ok(readFileSync(path).equals(bytes),'Fixture byte restoration');}
