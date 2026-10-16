import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync,readdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {resolve} from 'node:path';
import {once} from 'node:events';
import {createAppServer} from '../server/http.mjs';
const out='../coordination/evidence/h025/variants';mkdirSync(out,{recursive:true});
const files=readdirSync('src/content/pages').filter(f=>f.endsWith('.json')).map(f=>'src/content/pages/'+f).concat('src/content/terminology/glossary.json','src/content/presentation/hero-layouts.json');
const original=new Map(files.map(p=>[p,readFileSync(p)])),data=()=>[...original].filter(([p])=>p.includes('/pages/')).map(([path,bytes])=>({path,page:JSON.parse(bytes)}));
const media=data().find(r=>r.page.slug==='synlighet').page.heroVisual;
const representatives=['home','synlighet','priser','innsikt',data().find(r=>r.page.kind==='article').page.slug,'vurdering','kontakt'];
const routes=data().filter(({page})=>representatives.includes(page.slug)).map(({page})=>({route:page.kind==='home'?'/':`/${page.slug}/`,family:page.kind})).concat({route:'/begreper/',family:'glossary'},{route:'/404.html',family:'error'});
const astro=JSON.parse(readFileSync('node_modules/astro/package.json')).bin.astro;
const build=()=>execFileSync(process.execPath,[resolve('node_modules/astro',astro),'build'],{encoding:'utf8',maxBuffer:4e6});
const server=createAppServer({config:{enabled:false},staticRoot:resolve('dist')});server.listen(0,'127.0.0.1');await once(server,'listening');const base=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true}),records=[],errors=[],posts=[];
try{
 for(const layout of ['centered','split-right','split-left'])for(const withImage of [true,false]){
  if(process.env.QA_CASE&&process.env.QA_CASE!==`${layout}-${withImage?'image':'none'}`)continue;
  for(const {path,page} of data()){
   if(page.kind==='home'){page.hero.layout=layout;page.hero.visual.kind=withImage?'image':'none';}
   else{page.hero={layout};if(withImage)page.heroVisual=structuredClone(media);else delete page.heroVisual;}
   writeFileSync(path,JSON.stringify(page,null,2)+'\n');
  }
  const glossary=JSON.parse(original.get('src/content/terminology/glossary.json'));glossary.hero={layout};writeFileSync('src/content/terminology/glossary.json',JSON.stringify(glossary,null,2)+'\n');writeFileSync('src/content/presentation/hero-layouts.json',JSON.stringify({notFound:{layout}},null,2)+'\n');
  writeFileSync(`${out}/${layout}-${withImage?'image':'none'}-build.log`,build());
  for(const {route,family} of routes)for(const width of [1440,900,390,320]){
   const page=await browser.newPage({viewport:{width,height:1000},hasTouch:width===390});page.on('pageerror',e=>errors.push(e.message));await page.route('**/*',r=>r.request().method()==='POST'?(posts.push(r.request().url()),r.abort()):r.continue());await page.goto(base+route);await page.evaluate(()=>document.fonts.ready);
   const hero=page.locator('main .commercial-hero');assert.equal(await hero.count(),1);assert.equal(await hero.getAttribute('data-hero-layout'),layout);assert.equal(await hero.getAttribute('data-hero-family'),family);assert.equal(await page.locator('h1').count(),1);
   if(family!=='assessment')assert.equal(await hero.locator('.hero-auxiliary').count(),0,'Conditional empty slots must not create phantom visuals');
   const geometry=await hero.evaluate(e=>{const copy=e.querySelector('.page-hero-copy'),visual=e.querySelector('.hero-frame > .hero-visual,.hero-frame > .hero-auxiliary,.hero-frame > .hero-aside');return {copy:copy.getBoundingClientRect().toJSON(),visual:visual?.getBoundingClientRect().toJSON(),textFirst:!visual||!!(copy.compareDocumentPosition(visual)&Node.DOCUMENT_POSITION_FOLLOWING)};});assert.ok(geometry.textFirst);if(layout==='centered')assert.ok(Math.abs((geometry.copy.left+geometry.copy.right)/2-width/2)<=1,`${family} truly centered: ${JSON.stringify(geometry.copy)}`);
   if(geometry.visual){if(layout==='centered')assert.ok(Math.abs((geometry.visual.left+geometry.visual.right)/2-width/2)<=1,`${family} centered media/form is truly centered`);if(layout==='centered'||width<=650||(withImage&&width<=900))assert.ok(geometry.visual.y>=geometry.copy.bottom-1,`${family} ${layout} ${width}: copy above media/form`);else if(width>900&&layout==='split-left')assert.ok(geometry.visual.right<=geometry.copy.x+1,`${family} split-left ${width}: ${JSON.stringify(geometry)}`);else if(width>900)assert.ok(geometry.copy.right<=geometry.visual.x+1,`${family} split-right ${width}: ${JSON.stringify(geometry)}`);}
   if(family==='assessment'){assert.equal(await page.locator('form[data-assessment]').count(),1);assert.equal(await hero.locator('.hero-links').count(),0);assert.equal(await page.locator('form[data-assessment]').getAttribute('data-enabled'),'false','Existing local validation remains usable; transport stays disabled');if(withImage){const boxes=await hero.locator('.hero-aside').evaluate(e=>[...e.children].map(c=>c.getBoundingClientRect().toJSON()));assert.ok(boxes[1].y>=boxes[0].bottom-1,'Optional media never overlaps assessment form');}}
   if(family!=='home'||!withImage)assert.equal(await hero.locator('.hero-proof').count(),0);
   if(!['home','glossary','error'].includes(family)&&withImage){const img=hero.locator('img');assert.equal(await img.getAttribute('src'),media.src);assert.equal(await img.getAttribute('alt'),media.alt);assert.equal(await img.evaluate(e=>getComputedStyle(e).objectPosition),`${media.positionX}% ${media.positionY}%`);}
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${family} ${layout} ${width} overflow`);assert.match(await page.locator('meta[name=robots]').getAttribute('content'),/noindex/);
   if(width===1440||width===390)await hero.screenshot({path:`${out}/${family}-${layout}-${withImage?'image':'none'}-${width}.png`});
   const cta=hero.locator('a.button').first();if(await cta.count()&&(width===1440||width===390)){const expected=new URL(await cta.getAttribute('href'),base+route);if(width===390)await cta.tap();else{await cta.focus();await page.keyboard.press('Enter');}await page.waitForURL(u=>u.pathname===expected.pathname&&u.hash===expected.hash);}
   records.push({family,route,layout,withImage,width,geometry});await page.close();
  }
 }
 assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);writeFileSync(`${out}/checks.json`,JSON.stringify({records,errors,posts},null,2)+'\n');console.log(`H-025 variants PASS: ${records.length} real-source/render groups, text-first layout, media/CTA/form/proof guards.`);
}finally{
 await browser.close();await new Promise(r=>server.close(r));for(const [path,bytes] of original)writeFileSync(path,bytes);writeFileSync(`${out}/restored-build.log`,build());for(const [path,bytes] of original)assert.ok(readFileSync(path).equals(bytes),path+' restored');
}
