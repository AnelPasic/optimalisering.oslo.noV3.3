// Reversible source-to-render proof when an authenticated CMS browser is unavailable.
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { once } from 'node:events';
import { resolve } from 'node:path';
import { createAppServer } from '../server/http.mjs';

const output=resolve('../coordination/evidence/h020/source-render');
mkdirSync(output,{recursive:true});
const fixtures=[
  {name:'home',route:'/',ids:['mekanisme']},
  {name:'synlighet',route:'/synlighet/',ids:['behov','sjekk']},
  {name:'seo',route:'/seo/',ids:[JSON.parse(readFileSync('src/content/pages/seo.json','utf8')).sections[0].id]},
].map(f=>({...f,path:`src/content/pages/${f.name}.json`,bytes:readFileSync(`src/content/pages/${f.name}.json`)}));
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const build=()=>execFileSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{stdio:'pipe'});
const server=createAppServer({config:{enabled:false},staticRoot:resolve('dist')});
let browser;
const records=[];
try{
  server.listen(0,'127.0.0.1');await once(server,'listening');
  browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  for(const align of ['left','center']){
    for(const f of fixtures){const page=JSON.parse(f.bytes.toString());for(const s of page.sections)if(f.ids.includes(s.id))s.headingAlign=align;writeFileSync(f.path,JSON.stringify(page,null,2)+'\n');}
    build();
    for(const width of [1440,900,390,320]){
      const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
      for(const f of fixtures){
        assert.equal((await page.goto(`http://127.0.0.1:${server.address().port}${f.route}`)).status(),200);await page.evaluate(()=>document.fonts.ready);
        for(const id of f.ids){
          const heading=page.locator(`#${id} .section-heading`);
          assert.equal(await heading.getAttribute('data-heading-align'),align==='left'?'left':null);
          assert.ok((await heading.evaluate(e=>[e,...e.querySelectorAll('p,h2,.body-copy')].map(n=>getComputedStyle(n).textAlign))).every(v=>v===align));
          assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
          await heading.screenshot({path:`${output}/${f.name}-${id}-${align}-${width}.png`});
          records.push({route:f.route,id,align,width,renderedFromSource:true});
        }
      }
      await page.close();
    }
  }
}finally{
  for(const f of fixtures)writeFileSync(f.path,f.bytes);
  if(browser)await browser.close();
  if(server.listening)await new Promise(r=>server.close(r));
  build();
}
for(const f of fixtures)assert.deepEqual(readFileSync(f.path),f.bytes);
writeFileSync(`${output}/checks.json`,JSON.stringify({records,restored:fixtures.map(f=>({path:f.path,sha256:sha(f.bytes),exact:true})),authenticatedCMS:false},null,2)+'\n');
console.log(`H-020 source-render PASS: ${records.length} source-backed heading/width/alignment checks; all source bytes and default build restored. Not an authenticated CMS test.`);
