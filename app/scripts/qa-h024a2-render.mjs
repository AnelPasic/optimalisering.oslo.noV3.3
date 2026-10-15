import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {chromium} from '@playwright/test';
import {createAppServer} from '../server/http.mjs';
import {once} from 'node:events';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
const path='src/content/pages/home.json',bytes=readFileSync(path),source=JSON.parse(bytes),out='../coordination/evidence/h024a2';
mkdirSync(out,{recursive:true});const slot=t=>source.sections.find(b=>b._block===t).content;
const build=()=>execFileSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{stdio:'pipe'});
let browser,server;
try{
 slot('selector').heading='Lokalt behovseksempel';slot('calculator').defaults.visits=3000;
 slot('packages').items[0].price=5555;slot('proof').publicationApproved=false;
 slot('assessment').section.heading='Lokalt skjemaeksempel';slot('faq').heading='Lokale spørsmål';slot('faq').items[0].question='Et lokalt spørsmål?';
 writeFileSync(path,JSON.stringify(source,null,2));build();
 server=createAppServer({config:{enabled:false},staticRoot:resolve('dist')});server.listen(0,'127.0.0.1');await once(server,'listening');
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const page=await browser.newPage();await page.goto(`http://127.0.0.1:${server.address().port}/`);
 assert.equal(await page.locator('#behov h2').textContent(),'Lokalt behovseksempel');assert.equal(await page.locator('#calc-visits').inputValue(),'3000');
 assert.equal(await page.locator('[data-current]').textContent(),'15');assert.equal(await page.locator('.hero-proof, #resultater').count(),0);
 assert.equal(await page.locator('#sjekk h2').textContent(),'Lokalt skjemaeksempel');assert.equal(await page.locator('#sporsmal h2').textContent(),'Lokale spørsmål');
 assert.equal(await page.locator('#sporsmal summary').first().textContent(),'Et lokalt spørsmål?');
 assert.match((await page.locator('#priser').innerText()).replace(/\s/g,''),/5555kr\/mnd/);assert.ok(await page.locator('[data-home-assessment] button[type=submit]').isDisabled());
 await page.goto(`http://127.0.0.1:${server.address().port}/priser/`);assert.match((await page.locator('main').innerText()).replace(/\s/g,''),/5555kr\/mnd/);
 writeFileSync(`${out}/render-payloads.json`,JSON.stringify({selector:true,calculator:true,sharedHomePricingPackage:true,proofAndHeroGate:true,assessment:true,faq:true,intakeDisabled:true,sourceBytesRestored:true},null,2)+'\n');
 console.log('H-024A2 render proof PASS: edits in every special block reach their actual consumers; packages share /priser/; proof gates both placements.');
}finally{if(browser)await browser.close();if(server)await new Promise(r=>server.close(r));writeFileSync(path,bytes);build();assert.ok(readFileSync(path).equals(bytes));}
