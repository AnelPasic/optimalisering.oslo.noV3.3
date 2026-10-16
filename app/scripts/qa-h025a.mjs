import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {resolve} from 'node:path';
import {once} from 'node:events';
import YAML from 'yaml';
import {createAppServer} from '../server/http.mjs';
const out='../coordination/evidence/h025a',phase=process.env.QA_PHASE||'local';mkdirSync(`${out}/${phase}`,{recursive:true});
const originals=new Map(['home','konvertering','priser'].map(slug=>[`src/content/pages/${slug}.json`,readFileSync(`src/content/pages/${slug}.json`)]));
const basePages=[...originals].map(([path,bytes])=>({path,page:JSON.parse(bytes)}));
const sampleMedia=basePages.find(p=>p.page.slug==='konvertering').page.heroVisual;
const options=YAML.parse(readFileSync('../.pages.yml','utf8')).components.heroLayoutChoice.options.values;
const astro=JSON.parse(readFileSync('node_modules/astro/package.json')).bin.astro;
const build=()=>execFileSync(process.execPath,[resolve('node_modules/astro',astro),'build'],{encoding:'utf8',maxBuffer:4e6});
const server=process.env.QA_BASE_URL?null:createAppServer({config:{enabled:false},staticRoot:resolve('dist')});if(server){server.listen(0,'127.0.0.1');await once(server,'listening');}
const base=process.env.QA_BASE_URL||`http://127.0.0.1:${server.address().port}`,browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true}),records=[],errors=[],posts=[];
try{
 // The OWNER-liked lower source and actual rendered section markup must remain exact.
 const source=readFileSync('src/pages/design-system.astro','utf8'),marker='   <section class={ds.section}><div class={ds.group}><h2>Knapper og status</h2>';
 assert.equal(source.slice(source.indexOf(marker)),readFileSync(`${out}/design-system-lower-before.txt`,'utf8'));
 const oldHtml=readFileSync(`${out}/design-system-before.html`,'utf8');
 for(const width of [1440,900,390,320]){const p=await browser.newPage({viewport:{width,height:1000}});await p.goto(base+'/design-system/');await p.evaluate(()=>document.fonts.ready);
  const choices=await p.locator('[data-cms-hero-preset]').evaluateAll(es=>es.map(e=>({name:e.getAttribute('data-cms-hero-preset'),label:e.querySelector('h3').textContent})));assert.deepEqual(choices,options,'Four exact demo/CMS options, one-to-one');
  for(const key of ['short','long','service','pricing']){const demo=p.locator(`[data-hero-demo="${key}"]`);assert.equal(await demo.getAttribute('data-cms-hero-preset'),null);assert.match(await demo.locator('p.eyebrow').first().textContent(),/ikke eget CMS-valg/);}
  assert.equal(await p.locator('h1').count(),1);const noImage=p.locator('[data-cms-hero-preset="centered-none"]');assert.equal(await noImage.locator('img,.hero-proof').count(),0);assert.equal(await noImage.locator('.commercial-hero').getAttribute('data-hero-layout'),'centered');
  const currentHtml=await (await p.request.get(base+'/design-system/')).text(); const same=await p.evaluate(({html,currentHtml})=>{const old=new DOMParser().parseFromString(html,'text/html'),current=new DOMParser().parseFromString(currentHtml,'text/html');const lower=d=>{const sections=[...d.querySelectorAll('.design-system > div > section')],index=sections.findIndex(s=>s.querySelector('h2')?.textContent==='Knapper og status');return sections.slice(index).map(s=>s.outerHTML);};return {before:lower(old),after:lower(current)};},{html:oldHtml,currentHtml});assert.ok(same.before.length>=6);for(let i=0;i<same.before.length;i++)if(same.before[i]!==same.after[i]){let n=0;while(same.before[i][n]===same.after[i][n])n++;writeFileSync(out+'/lower-difference.json',JSON.stringify(same));throw new Error('Lower demo '+i+' differs at '+n+': '+JSON.stringify({before:same.before[i].slice(n-70,n+170),after:same.after[i].slice(n-70,n+170)}));}
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));if([1440,390].includes(width)){await noImage.screenshot({path:`${out}/${phase}/demo-none-${width}.png`});await p.locator('[data-hero-demo="split-right"]').screenshot({path:`${out}/${phase}/demo-right-${width}.png`});}
  records.push({kind:'demo-parity',width,choices,lowerSectionsExact:same.after.length});await p.close();
 }
 if(!process.env.QA_BASE_URL){for(const preset of options.map(o=>o.name))for(const withImage of [true,false]){
  for(const {path,page:initial} of basePages){const source=structuredClone(initial);source.hero={...source.hero,layout:preset};if(source.kind==='home')source.hero.visual.kind=withImage?'image':'none';else if(withImage)source.heroVisual=structuredClone(sampleMedia);else delete source.heroVisual;writeFileSync(path,JSON.stringify(source,null,2)+'\n');}
  writeFileSync(`${out}/${phase}/${preset}-${withImage?'image':'none'}-build.log`,build());
  for(const {page:source} of basePages)for(const width of [1440,900,390,320]){const route=source.kind==='home'?'/':`/${source.slug}/`,p=await browser.newPage({viewport:{width,height:1000}});p.on('pageerror',e=>errors.push(e.message));await p.route('**/*',r=>r.request().method()==='POST'?(posts.push(r.request().url()),r.abort()):r.continue());await p.goto(base+route);await p.evaluate(()=>document.fonts.ready);
   const hero=p.locator('main .commercial-hero'),hidden=preset==='centered-none'||!withImage;assert.equal(await hero.getAttribute('data-hero-layout'),preset==='centered-none'?'centered':preset);assert.equal(await hero.locator('img').count(),hidden?0:1);assert.equal(await hero.locator('.hero-proof').count(),source.kind==='home'&&!hidden?1:0);
   assert.equal(await p.locator('h1').count(),1);assert.equal(await hero.locator('h1').innerText(),source.kind==='home'?source.hero.title.replace('. ','.\n'):source.kind==='pricing'?JSON.parse(readFileSync('src/content/pages/home.json')).sections.find(s=>s._block==='packages').content.heading:source.title);assert.equal(await hero.locator('a.button').getAttribute('href'),source.kind==='home'?source.hero.primaryCta.href:source.cta.href);
   const geometry=await hero.evaluate(e=>{const c=e.querySelector('.page-hero-copy'),v=e.querySelector('.hero-visual');return {copy:c.getBoundingClientRect().toJSON(),visual:v?.getBoundingClientRect().toJSON(),textFirst:!v||!!(c.compareDocumentPosition(v)&Node.DOCUMENT_POSITION_FOLLOWING)};});assert.ok(geometry.textFirst);if(preset.startsWith('centered')){assert.ok(Math.abs(geometry.copy.x+geometry.copy.width/2-width/2)<=1);if(geometry.visual)assert.ok(Math.abs(geometry.visual.x+geometry.visual.width/2-width/2)<=1);}if(geometry.visual){if(width<=900||preset==='centered')assert.ok(geometry.visual.y>=geometry.copy.bottom-1);else if(preset==='split-left')assert.ok(geometry.visual.right<=geometry.copy.x+1);else assert.ok(geometry.copy.right<=geometry.visual.x+1);}
   if(!hidden&&source.kind!=='home'){assert.equal(await hero.locator('img').getAttribute('alt'),sampleMedia.alt);assert.equal(await hero.locator('img').evaluate(e=>getComputedStyle(e).objectPosition),`${sampleMedia.positionX}% ${sampleMedia.positionY}%`);}
   assert.match(await p.locator('meta[name=robots]').getAttribute('content'),/noindex/);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));if(preset==='centered-none'&&withImage&&[1440,390].includes(width))await p.screenshot({path:`${out}/${phase}/${source.kind}-no-image-${width}.png`});records.push({kind:'actual-source-variant',family:source.kind,preset,withImage,width,geometry});await p.close();
  }
 }}
 assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);writeFileSync(`${out}/${phase}/checks.json`,JSON.stringify({phase,records,errors,posts},null,2)+'\n');console.log(`H-025A ${phase} PASS: ${records.length} source/browser groups; exact four CMS/demo choices; lower demos identical; preserved media/CTA/proof/reading order.`);
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));if(!process.env.QA_BASE_URL){for(const [path,bytes] of originals)writeFileSync(path,bytes);writeFileSync(`${out}/${phase}/restored-build.log`,build());for(const [path,bytes] of originals)assert.ok(readFileSync(path).equals(bytes));}}
