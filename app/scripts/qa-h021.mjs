import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { once } from 'node:events';
import { createAppServer } from '../server/http.mjs';

const phase=process.env.QA_PHASE||'after';
const output=resolve(`../coordination/evidence/h021/${phase}`);mkdirSync(output,{recursive:true});
const server=process.env.QA_BASE_URL?null:createAppServer({config:{enabled:false},staticRoot:resolve('dist')});
if(server){server.listen(0,'127.0.0.1');await once(server,'listening');}
const base=process.env.QA_BASE_URL||`http://127.0.0.1:${server.address().port}`;
const routes=['/',...readdirSync('src/content/pages').filter(f=>f.endsWith('.json')).map(f=>JSON.parse(readFileSync(`src/content/pages/${f}`,'utf8')).slug).filter(s=>s!=='home').map(s=>`/${s}/`),'/begreper/'];
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const records=[],errors=[],posts=[];
try{
  for(const width of [1440,900,390,320]){
    const context=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:false,reducedMotion:'reduce'});
    const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.method()==='POST')posts.push(r.url());});
    for(const route of routes){
      assert.equal((await page.goto(base+route)).status(),200);await page.evaluate(()=>document.fonts.ready);
      const snapshot=await page.evaluate(()=>[...document.querySelectorAll('main,main *,.site-header,.site-header *,.site-footer,.site-footer *')].filter(e=>!e.matches('script,style')).map(e=>{
        const s=getComputedStyle(e),r=e.getBoundingClientRect();return{tag:e.tagName,text:[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('').replace(/\s+/g,' ').trim(),rect:[r.x,r.y,r.width,r.height].map(v=>Math.round(v*100)/100),style:Object.fromEntries(['fontFamily','fontSize','fontWeight','lineHeight','color','backgroundColor','textAlign','padding','margin','borderRadius','borderWidth','boxShadow','display','gap'].map(k=>[k,s[k]]))};
      }));
      const fingerprint=createHash('sha256').update(JSON.stringify(snapshot)).digest('hex');
      if(phase!=='before'){
        const before=JSON.parse(readFileSync('../coordination/evidence/h021/before/checks.json','utf8')).records.find(r=>r.route===route&&r.width===width);
        assert.equal(fingerprint,before.fingerprint,`${route} ${width}: default content/style/geometry preserved`);
      }
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${route} ${width}: overflow`);
      if(route==='/innsikt/'){
        const links=await page.locator('#guider .text-link').evaluateAll(nodes=>nodes.map(e=>({text:e.textContent.trim(),href:e.getAttribute('href')})));
        assert.deepEqual(links,[{text:'Les startguiden',href:'/innsikt/hva-bor-optimaliseres-forst/'},{text:'Les måleguiden',href:'/innsikt/male-effekt-av-optimalisering/'}]);
        await page.screenshot({path:`${output}/innsikt-${width}.png`,fullPage:true});
        await page.locator('#guider a').first().focus();assert.equal(await page.locator('#guider a').first().evaluate(e=>e===document.activeElement),true);
      }
      records.push({route,width,fingerprint,elements:snapshot.length,noJS:true});
    }
    await context.close();
  }
  assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);
  writeFileSync(`${output}/checks.json`,JSON.stringify({base,records,errors,posts},null,2)+'\n');
  console.log(`H-021 ${phase}: ${records.length} route/width/no-JS checks PASS; default content/style/geometry preserved.`);
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));}
