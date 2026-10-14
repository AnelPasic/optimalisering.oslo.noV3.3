import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFileSync,writeFileSync,readdirSync,mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { once } from 'node:events';
import { resolve } from 'node:path';
import { createAppServer } from '../server/http.mjs';

const phase=process.env.QA_PHASE||'after', output=resolve(`../coordination/evidence/h020/${phase}`);
mkdirSync(output,{recursive:true});
const server=process.env.QA_BASE_URL?null:createAppServer({config:{enabled:false},staticRoot:resolve('dist')});
if(server){server.listen(0,'127.0.0.1');await once(server,'listening');}
const base=process.env.QA_BASE_URL||`http://127.0.0.1:${server.address().port}`;
const routes=['/',...readdirSync('src/content/pages').filter(f=>f.endsWith('.json')).map(f=>JSON.parse(readFileSync(`src/content/pages/${f}`,'utf8')).slug).filter(s=>s!=='home').map(s=>`/${s}/`),'/begreper/'];
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const records=[],variants=[],errors=[],posts=[];
const hash=s=>createHash('sha256').update(JSON.stringify(s)).digest('hex');
const properties=['color','backgroundColor','fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','textAlign','width','maxWidth','padding','margin','borderRadius','borderWidth','borderColor','boxShadow','display','gridTemplateColumns','gap','objectFit','objectPosition'];
async function inspect(page){
  return page.evaluate(properties=>[...document.querySelectorAll('main,main *,.site-header,.site-header *,.site-footer,.site-footer *')].map(e=>{
    const s=getComputedStyle(e),r=e.getBoundingClientRect();
    return{tag:e.tagName,id:e.id,classes:typeof e.className==='string'?e.className:'',text:[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join(''),rect:[r.x,e.matches('.scenario-chart circle')?null:r.y,r.width,r.height],style:Object.fromEntries(properties.map(p=>[p,s[p]])),heading:!!e.closest('.section-heading')};
  }),properties);
}
try{
  for(const width of [1440,900,390,320]){
    const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
    page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.method()==='POST')posts.push(r.url());});
    for(const route of routes){
      assert.equal((await page.goto(base+route)).status(),200);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(200);
      const snapshot=await inspect(page),fingerprint=hash(snapshot);
      const headings=await page.locator('.section-heading').evaluateAll(nodes=>nodes.map(e=>({text:e.querySelector('h2')?.textContent,align:getComputedStyle(e).textAlign,width:e.getBoundingClientRect().width,attribute:e.getAttribute('data-heading-align')})));
      for(const h of headings)assert.equal(h.align,'center');
      assert.equal(await page.locator('.section-heading-split').count(),0);
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      if(phase!=='before'){
        const before=JSON.parse(readFileSync('../coordination/evidence/h020/before/checks.json','utf8')).records.find(r=>r.route===route&&r.width===width);
        assert.equal(fingerprint,before.fingerprint,`${route} ${width}: unchanged default rendering`);
      }
      if(['/','/synlighet/'].includes(route))await page.screenshot({path:`${output}/${route==='/'?'home':'synlighet'}-${width}.png`,fullPage:true});
      records.push({route,width,fingerprint,elementCount:snapshot.length,headings});
      if(phase!=='before'&&['/','/synlighet/','/seo/'].includes(route)){
        const targets=route==='/'?['#mekanisme .section-heading']:route==='/synlighet/'?['#behov .section-heading','#sjekk .section-heading']:['.section-heading'];
        for(const selector of targets){
          await page.evaluate(()=>scrollTo(0,0));
          const heading=page.locator(selector).first();const original=await inspect(page);
          await heading.evaluate(e=>e.setAttribute('data-heading-align','left'));
          const actual=await inspect(page);
          const normal=s=>s.map(n=>n.heading?{...n,style:{...n.style,textAlign:'center'}}:n);
          assert.deepEqual(normal(actual),normal(original),`${route} ${width}: alignment affects only heading text`);
          const aligned=await heading.evaluate(e=>[e,...e.querySelectorAll('p,h2,.body-copy')].map(n=>getComputedStyle(n).textAlign));
          assert.ok(aligned.every(v=>v==='left'));
          assert.ok(await page.evaluate(()=>[...document.querySelectorAll('.invite-home .body-copy,.invite-home .section-heading h2')].every(e=>getComputedStyle(e).maxWidth==='none')));
          assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
          const name=route==='/'?'home':route.split('/')[1],kind=selector.includes('#sjekk')?'protected':'ordinary';
          await heading.screenshot({path:`${output}/${name}-${kind}-left-${width}.png`});
          await heading.evaluate(e=>e.removeAttribute('data-heading-align'));
          await page.evaluate(()=>scrollTo(0,0));
          assert.deepEqual(await inspect(page),original,`${route}: exact center restoration`);
          await heading.screenshot({path:`${output}/${name}-${kind}-center-${width}.png`});
          variants.push({route,width,selector,aligned,unrelatedStyleAndGeometryExact:true,restored:true});
        }
      }
    }
    await page.close();
  }
  assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);
  writeFileSync(`${output}/checks.json`,JSON.stringify({phase,base,records,variants,errors,posts},null,2));
  console.log(`H-020 ${phase} PASS: ${records.length} default groups; ${variants.length} center/left/restore groups; frozen geometry/type/surfaces/cards/links, no overflow/errors/POST.`);
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));}
