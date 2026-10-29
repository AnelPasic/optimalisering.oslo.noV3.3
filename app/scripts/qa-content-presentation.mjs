import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {once} from 'node:events';
import {createAppServer} from '../server/http.mjs';
const out='../coordination/evidence/h024a3',phase=process.env.QA_PHASE||'local';mkdirSync(`${out}/${phase}`,{recursive:true});
const server=process.env.QA_BASE_URL?null:createAppServer({config:{enabled:false},staticRoot:resolve('dist')});
if(server){server.listen(0,'127.0.0.1');await once(server,'listening');}
const base=process.env.QA_BASE_URL||`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true}),records=[],errors=[];
try{
 for(const width of [1440,900,390,320]){
  const page=await browser.newPage({viewport:{width,height:1000}});page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/design-system/');await page.evaluate(()=>document.fonts.ready);
  const layouts={};
  for(const [layout,count] of Object.entries({'default':4,'two-columns':2,'three-columns':3,'stacked':1})){
   const grid=page.locator(`#ds-layout-${layout} .section-items`);
   const actual=await grid.evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length);
   const expected=layout==='default'?(width<=359?1:width<=900?2:4):width<=650?1:count;
   assert.equal(actual,expected,`${layout} at ${width}`);layouts[layout]=actual;
  }
  const boxes=await page.locator('#ds-box-variants article').evaluateAll(es=>es.map(e=>({variant:e.dataset.boxVariant||'default',card:e.classList.contains('card'),radius:getComputedStyle(e).borderTopLeftRadius,padding:getComputedStyle(e).paddingLeft})));
  assert.deepEqual(boxes.map(b=>b.variant),['default','plain','card']);assert.equal(boxes[0].card,false);assert.equal(boxes[1].card,false);assert.equal(boxes[2].card,true);assert.equal(boxes[2].radius,'20px');assert.equal(boxes[1].radius,'0px');
  const colors=await page.locator('#ds-box-colors article').evaluateAll(es=>es.map(e=>({surface:e.dataset.surface,background:getComputedStyle(e).backgroundColor,foreground:getComputedStyle(e).color,radius:getComputedStyle(e).borderTopLeftRadius})));
  assert.equal(new Set(colors.map(c=>c.background)).size,3,'surface selection remains independent of box shape');assert.equal(new Set(colors.map(c=>c.radius)).size,1);
  const dark=colors.find(c=>c.surface==='secondary');assert.notEqual(dark.foreground,colors[0].foreground,'dark surface applies readable foreground');
  assert.equal(await page.locator('h1').count(),1);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.match(await page.locator('meta[name=robots]').getAttribute('content'),/noindex/);
  const duplicateIds=await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);return ids.filter((id,i)=>ids.indexOf(id)!==i);});assert.deepEqual(duplicateIds,[]);
  await page.locator('#cms-content-variants').screenshot({path:`${out}/${phase}/variants-${width}.png`});
  await page.locator('#ds-box-variants').screenshot({path:`${out}/${phase}/boxes-${width}.png`});
  records.push({width,layouts,boxes,colors});await page.close();
 }
 assert.deepEqual(errors,[]);writeFileSync(`${out}/${phase}/variants.json`,JSON.stringify({base,records,errors},null,2)+'\n');console.log(`Content presentation ${phase}: 4 layouts, 3 boxes, 3 independent surfaces at four widths PASS.`);
}finally{await browser.close();if(server)await new Promise(r=>server.close(r));}
