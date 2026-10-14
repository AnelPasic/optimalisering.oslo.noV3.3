// Reversible source-backed fixtures. Never published; source bytes and dist restored.
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync, unlinkSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { once } from 'node:events';
import { resolve } from 'node:path';
import { createAppServer } from '../server/http.mjs';

const output=resolve('../coordination/evidence/h021/variants');mkdirSync(output,{recursive:true});
const path='src/content/pages/innsikt.json',bytes=readFileSync(path);
const fixturePath='src/content/pages/h021-fixture.json';assert.equal(existsSync(fixturePath),false);
const original=JSON.parse(bytes.toString()), first='innsikt/hva-bor-optimaliseres-forst',second='innsikt/male-effekt-av-optimalisering';
const fixture={...JSON.parse(readFileSync('src/content/pages/hva-bor-optimaliseres-forst.json','utf8')),slug:'innsikt/h021-fixture',title:'H-021 synthetic fixture',seo:{title:'H-021 synthetic fixture',description:'Local fixture only'},listing:{title:'H-021 tredje artikkel',summary:'Syntetisk lokal test. Ikke publiserbart innhold.',label:'Åpne testartikkel',order:30,visible:true}};
const build=()=>execFileSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{stdio:'pipe'});
const server=createAppServer({config:{enabled:false},staticRoot:resolve('dist')});
const variants=[
  {name:'automatic-third',edit:{},slugs:[first,second,fixture.slug]},
  {name:'manual',edit:{mode:'manual',selected:[{slug:second},{slug:first}],limit:1},slugs:[second,first]},
  {name:'compact',edit:{layout:'compact'},slugs:[first,second,fixture.slug]},
  {name:'links',edit:{layout:'links'},slugs:[first,second,fixture.slug]},
  {name:'hidden',edit:{},hidden:true,slugs:[first,second]},
  {name:'styled',edit:{layout:'compact'},styled:true,slugs:[first,second,fixture.slug]},
];
const records=[],errors=[],posts=[];let browser;
try{
  server.listen(0,'127.0.0.1');await once(server,'listening');
  browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  for(const variant of variants){
    const content=structuredClone(original);Object.assign(content.sections[0].pageList,variant.edit);
    if(variant.styled){content.sections[0].surface='dark';content.sections[0].headingAlign='left';}
    writeFileSync(path,JSON.stringify(content,null,2)+'\n');
    writeFileSync(fixturePath,JSON.stringify({...fixture,listing:{...fixture.listing,visible:!variant.hidden}},null,2)+'\n');build();
    for(const width of [1440,900,390,320]){
      const context=await browser.newContext({viewport:{width,height:1000},javaScriptEnabled:false});const page=await context.newPage();
      page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.method()==='POST')posts.push(r.url());});
      assert.equal((await page.goto(`http://127.0.0.1:${server.address().port}/innsikt/`)).status(),200);await page.evaluate(()=>document.fonts.ready);
      const links=page.locator('#guider a');assert.deepEqual(await links.evaluateAll(nodes=>nodes.map(e=>e.getAttribute('href'))),variant.slugs.map(s=>`/${s}/`));
      assert.equal(await page.locator('#guider h3').count(),variant.edit.layout==='links'?0:variant.slugs.length);
      if(variant.edit.layout==='links')assert.equal(await page.locator('#guider .info-item').count(),0);
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      if(variant.styled){assert.equal(await page.locator('#guider').getAttribute('data-surface'),'dark');assert.equal(await page.locator('#guider .section-heading').evaluate(e=>getComputedStyle(e).textAlign),'left');}
      for(let i=0;i<variant.slugs.length;i++){
        await links.nth(i).focus();assert.equal(await links.nth(i).evaluate(e=>e===document.activeElement),true);
        assert.ok((await links.nth(i).innerText()).trim());
      }
      if([1440,390].includes(width))await page.locator('#guider').screenshot({path:`${output}/${variant.name}-${width}.png`});
      records.push({variant:variant.name,width,noJS:true,slugs:variant.slugs,keyboard:true,noOverflow:true});await context.close();
    }
  }
}finally{
  writeFileSync(path,bytes);if(existsSync(fixturePath))unlinkSync(fixturePath);
  if(browser)await browser.close();if(server.listening)await new Promise(r=>server.close(r));build();
}
assert.deepEqual(readFileSync(path),bytes);assert.equal(existsSync(fixturePath),false);assert.deepEqual(errors,[]);assert.deepEqual(posts,[]);
writeFileSync(`${output}/checks.json`,JSON.stringify({records,errors,posts,sourceRestored:true,fixtureRemoved:true,restoredSHA256:createHash('sha256').update(bytes).digest('hex'),authenticatedCMS:false},null,2)+'\n');
console.log(`H-021 variants PASS: ${records.length} source-backed no-JS/keyboard/layout checks; source and default build restored.`);
