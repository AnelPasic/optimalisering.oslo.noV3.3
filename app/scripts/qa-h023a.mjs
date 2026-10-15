import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { once } from 'node:events';
import { createAppServer } from '../server/http.mjs';

const phase = process.env.QA_PHASE || 'after';
const root = resolve('../coordination/evidence/h023a');
mkdirSync(`${root}/${phase}`, { recursive: true });
const server = process.env.QA_BASE_URL ? null : createAppServer({config:{enabled:false},staticRoot:resolve('dist')});
if (server) { server.listen(0, '127.0.0.1'); await once(server, 'listening'); }
const base = process.env.QA_BASE_URL || `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const records = [], errors = [], posts = [];
try {
  for (const width of [1440,900,390,320]) {
    const page = await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
    page.on('pageerror', e => errors.push(e.message));
    page.on('request', r => { if(r.method()==='POST') posts.push(r.url()); });
    assert.equal((await page.goto(base+'/')).status(),200);
    await page.evaluate(()=>document.fonts.ready);
    const text = (await page.locator('main').innerText()).replace(/\s+/g,' ').trim();
    if(phase!=='before') {
      const baseline=JSON.parse(readFileSync(`${root}/before/checks.json`));
      const words = value => value.replace(/ \+(?= |$)/g, ''); // FAQ's decorative + now belongs to daisyUI.
      assert.equal(words(text),words(baseline.records.find(r=>r.width===width).text),'homepage public text preserved');
      assert.ok(await page.locator('.hero-actions .btn-primary').count(),'real homepage uses daisyUI buttons');
      assert.ok(await page.locator('#calc-visits.input').count(),'calculator uses daisyUI input');
    }
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no overflow');
    assert.match(await page.locator('meta[name=robots]').getAttribute('content'),/noindex/);
    assert.equal(await page.locator('.theme-controller').count(),0);
    const typography=await page.locator('h1').evaluate(e=>({size:parseFloat(getComputedStyle(e).fontSize),family:getComputedStyle(e).fontFamily}));
    assert.ok(typography.size>=28, 'approved display scale survives preflight and legacy layering');
    assert.match(typography.family,/Instrument Sans/);
    assert.ok(await page.locator('[data-home-assessment] button[type=submit]').isDisabled());
    await page.waitForFunction(()=>!document.querySelector('[data-slider]').disabled);
    const initial = await page.locator('[data-scenario]').textContent();
    await page.locator('#calc-visits').fill('3000');
    assert.notEqual(await page.locator('[data-scenario]').textContent(),initial,'calculator updates');
    await page.locator('#calc-visits').fill('0');
    assert.match(await page.locator('[data-multiplier]').textContent(),/–/);
    await page.reload(); await page.evaluate(()=>document.fonts.ready);
    const summary=page.locator('#sporsmal summary').first();
    await summary.click(); assert.ok(await summary.evaluate(e=>e.parentElement.open));
    await summary.click();
    if(width<=900) {
      const toggle=page.locator('[data-home-menu]'); await toggle.click();
      assert.equal(await toggle.getAttribute('aria-expanded'),'true');
      await page.keyboard.press('Escape'); assert.equal(await toggle.getAttribute('aria-expanded'),'false');
    }
    if([1440,390].includes(width)) {
      await page.screenshot({path:`${root}/${phase}/home-${width}.png`,fullPage:true});
      await page.screenshot({path:`${root}/${phase}/home-fold-${width}.png`});
    }
    records.push({width,text}); await page.close();
  }
  if(phase!=='before') for(const width of [1440,390]) {
    const page=await browser.newPage({viewport:{width,height:1000},javaScriptEnabled:false});
    page.on('pageerror',e=>errors.push(e.message));
    assert.equal((await page.goto(base+'/design-system/')).status(),200);
    await page.evaluate(()=>document.fonts.ready);
    assert.match(await page.locator('meta[name=robots]').getAttribute('content'),/noindex/);
    const button=page.locator('[data-theme-sample]');
    await button.evaluate(e=>e.style.transition='none');
    const brand=await button.evaluate(e=>getComputedStyle(e).backgroundColor);
    assert.ok(await button.evaluate(e=>['flex','inline-flex'].includes(getComputedStyle(e).display)));
    await page.locator('input[value=light]').check();
    const light=await button.evaluate(e=>getComputedStyle(e).backgroundColor);
    assert.notEqual(brand,light,'theme controller changes component color');
    await page.locator('input[value=optimalisering]').check();
    assert.equal(await button.evaluate(e=>getComputedStyle(e).backgroundColor),brand);
    const expected=JSON.parse(readFileSync(`${root}/theme-values.json`));
    const conversions=await page.locator('[data-theme-root]').evaluate((e,expected)=>{
      const ctx=document.createElement('canvas').getContext('2d',{willReadFrequently:true});
      const rgb=color=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=color;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data].slice(0,3);};
      return Object.entries(expected).filter(([token,value])=>{
        const old=rgb(value.hex),current=rgb(getComputedStyle(e).getPropertyValue('--color-'+token));
        return current.some((v,i)=>Math.abs(v-old[i])>1);
      }).map(([token])=>token);
    },expected);
    assert.deepEqual(conversions,[], 'OKLCH tokens reproduce original sRGB colors within one channel value');
    const pricing=await page.locator('.package-grid').evaluate(e=>({display:getComputedStyle(e).display,columns:getComputedStyle(e).gridTemplateColumns.split(' ').length}));
    assert.equal(pricing.display,'grid','review route loads actual pricing composition');
    assert.equal(pricing.columns,width===1440?3:1);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    const invalid=await page.locator('[data-theme-root]').evaluate(e=>['base-100','base-200','base-300','base-content','primary','primary-content','secondary','secondary-content','accent','accent-content','neutral','neutral-content','info','success','warning','error'].filter(t=>!CSS.supports('color',getComputedStyle(e).getPropertyValue('--color-'+t).trim())));
    assert.deepEqual(invalid,[],'valid semantic colors');
    await page.screenshot({path:`${root}/${phase}/design-system-${width}.png`,fullPage:true});
    await page.screenshot({path:`${root}/${phase}/design-system-fold-${width}.png`});
    await page.close();
  }
  assert.deepEqual(errors,[]); assert.deepEqual(posts,[]);
  writeFileSync(`${root}/${phase}/checks.json`,JSON.stringify({phase,base,records,errors,posts},null,2)+'\n');
  console.log(`H-023A ${phase}: homepage 4 widths, controls, calculator, FAQ, safeguards${phase==='before'?'':', design-system 2 widths and theme switching'} PASS`);
} finally { await browser.close(); if(server) await new Promise(r=>server.close(r)); }
