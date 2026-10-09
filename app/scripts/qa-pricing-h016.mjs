import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, relative } from 'node:path';
const snapshot = process.argv.includes('--baseline');
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4321';
const output = resolve(process.env.QA_EVIDENCE_DIR || '../coordination/evidence/h016');
const baselineFile = resolve('../coordination/evidence/h016/baseline.json');
const root = resolve('..'), frozen = {};
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const routes = ['/', '/priser/', '/synlighet/', '/konvertering/'];
function collect(directory, include = () => true) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) collect(path, include);
    else if (include(path)) frozen[relative(root, path).replaceAll('\\', '/')] = hash(readFileSync(path));
  }
}
for (const directory of ['system', 'project', 'app/src/config']) collect(resolve(root, directory));
collect(resolve('src/content'), path => path !== resolve('src/content/pages/home.json'));
collect(resolve('server'), path => path.endsWith('.mjs'));
for (const file of ['copy-authority.json']) frozen[`app/src/config/${file}`] = hash(readFileSync(`src/config/${file}`));
collect(resolve('dist'), path => path.endsWith('.html') && !['/', '/priser/'].some(route => path === resolve('dist', route === '/' ? 'index.html' : route.slice(1) + 'index.html')));
collect(resolve('dist/_astro'), path => path.endsWith('.css'));
for (const file of ['home-invite.css', 'pricing-invite.css', 'service-invite.css']) frozen[`app/dist/styles/${file}`] = hash(readFileSync(`dist/styles/${file}`));
const homeOutsidePackages = JSON.parse(readFileSync('src/content/pages/home.json'));
delete homeOutsidePackages.homepage.packages;
const baseline = snapshot ? { source: '9068011f73ec263a82ab8f19d9bf20bae014398b', layoutSource: '97ec754a896f104c6e81b88f0e16d117d70a0a55', frozen, homeOutsidePackages, preserved: {}, cardHeights: {}, packageMarkup: {}, homeSource: JSON.parse(readFileSync('src/content/pages/home.json')), serviceCss: readFileSync('dist/styles/service-invite.css', 'utf8') } : JSON.parse(readFileSync(baselineFile));
if (snapshot) {
  const delivered = JSON.parse(readFileSync('../coordination/evidence/h015-live/deployment.json'));
  for (const route of routes) assert.equal(hash(readFileSync(resolve('dist', route === '/' ? 'index.html' : route.slice(1) + 'index.html'))), delivered.assets.find(asset => asset.path === route).sha256, 'Baseline uses actual delivered H-015 HTML');
} else {
  // Delivery-only preservation check; routine CMS builds use audit-h016.mjs.
  const expected=structuredClone(baseline.homeSource.homepage.packages);
  expected.items[0].descriptor='Ett viktig forbedringsområde om gangen.';
  expected.items[0].distinction='';
  expected.items[1].selectionRule='Velg Vekst når to forbedringer kan forsterke hverandre.';
  expected.decisionStrip.items[0]='Velg Optimalisering når ett forbedringsområde er tydelig viktigst.';
  expected.labels={situations:'Typiske situasjoner',typicalBusiness:'Typisk virksomhet',focus:'Fokus',combinations:'Populære kombinasjoner',workAreas:'Arbeidsområder',uncertain:'Usikker? Ta en gratis sjekk'};
  assert.deepEqual(JSON.parse(readFileSync('src/content/pages/home.json')).homepage.packages,expected,'Only authorized H-016 default copy/labels change; original prices and artwork remain');
  assert.deepEqual(homeOutsidePackages, baseline.homeOutsidePackages, 'Home source unchanged outside shared packages');
  assert.deepEqual(frozen, baseline.frozen, 'All incoming content/proof/protected/backend and frozen HTML/CSS hashes match');
  assert.ok(readFileSync('dist/styles/service-invite.css', 'utf8').startsWith(baseline.serviceCss), 'Existing service styling unchanged; only scoped visual rules appended');
}
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage(), errors = [], checks = [], cardHeights = {};
let posts = 0;
page.on('pageerror', error => errors.push(error.message));
page.on('request', request => { if (request.method() === 'POST') posts++; });
async function geometry(selector) {
  return page.locator(selector).evaluate(root => {
    const anchor = root.getBoundingClientRect();
    return [root, ...root.querySelectorAll('*')].filter(el => !['SCRIPT', 'STYLE'].includes(el.tagName) && !el.closest('.package-visual-area')).map(el => {
      const r = el.getBoundingClientRect(), s = getComputedStyle(el);
      return { rect: [r.x - anchor.x, r.y - anchor.y, r.width, r.height], style: Object.fromEntries(['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','color','backgroundColor','padding','gap','borderRadius'].map(key => [key, s[key]])) };
    });
  });
}
// Hidden zero-size elements have no visible position. Their browser rect is
// the document origin, so an authorized preceding text-height change shifts
// its relative coordinate. Preserve styles/counts, normalize only that rect.
const visibleGeometry = entries => entries.map(entry => entry.rect[2] === 0 && entry.rect[3] === 0 ? { ...entry, rect: [0, 0, 0, 0] } : entry);
try {
  for(const width of [1440,390,320]) {
    await page.setViewportSize({width,height:width===1440?1000:844});
    const anatomies=[];
    for(const route of routes) {
      assert.equal((await page.goto(base+route)).status(),200); await page.evaluate(()=>document.fonts.ready);
      const selectors=route==='/'?['.site-header','.site-footer','.home-hero','#behov','#regneeksempel','#mekanisme','#passer','#sjekk']:route==='/priser/'?['.site-header','.site-footer','#pricing-hero','#pricing-multiplier','#bestill','#arbeidsomrader','#kostnader','#gratis','#sporsmal']:['.site-header','.site-footer','#service-hero',...(route==='/synlighet/'?['#behov','#kanaler']:['#friksjon','#kvalitet']),'#prioritering','#sammenheng','#sjekk','#sporsmal'];
      for(const selector of selectors){const key=`${route}:${width}:${selector}`,current=await geometry(selector);if(snapshot)baseline.preserved[key]=current;else assert.deepEqual(visibleGeometry(current),visibleGeometry(baseline.preserved[key]),key+': protected geometry/styles');}
      if(route==='/'||route==='/priser/') {
        const key=`${route}:${width}`,cards=page.locator('#priser .package-card');
        cardHeights[key]=await cards.evaluateAll(nodes=>nodes.map(node=>Math.round(node.getBoundingClientRect().height*100)/100));
        if(snapshot){baseline.cardHeights[key]=cardHeights[key];continue;}
        const packages=JSON.parse(readFileSync('src/content/pages/home.json')).homepage.packages;
        for(const [index,item] of packages.items.entries()){
          const card=cards.nth(index),detail=card.locator('.package-details');
          assert.equal(await detail.locator('.package-detail').isVisible(),route==='/priser/','Page presentation controls initial details');
          assert.equal(await detail.locator('summary').innerText(),item.detailLink.label);
          assert.equal(await card.locator('.button').getAttribute('href'),item.cta.href); assert.ok((await card.locator('.button').innerText()).startsWith(item.cta.label));
          assert.deepEqual(await card.locator('.package-situations li').allTextContents(),item.compact.situations);
          assert.deepEqual(await card.locator('.package-icon-items span').allTextContents(),item.iconItems.map(icon=>icon.compactLabel));
          assert.equal(await card.locator('.package-fit').innerText(),item.compact.fit);
          assert.ok(!/problem|Optimalisering er ikke laget for to uavhengige|Velg Vekst hvis resultatet/.test(await card.textContent()));
          const initial=route==='/priser/'; await detail.locator('summary').focus(); await page.keyboard.press('Enter');
          assert.equal(await detail.locator('.package-detail').isVisible(),!initial,'Native keyboard toggles either initial state');
          if(route==='/priser/'&&index===0&&width!==320)await card.screenshot({animations:'disabled',path:resolve(output,`pricing-manually-collapsed-${width}.png`)});
          await page.keyboard.press('Space'); assert.equal(await detail.locator('.package-detail').isVisible(),initial);
          await detail.locator('summary').evaluate(el=>el.blur());
        }
        assert.ok(await page.locator('.package-visual-area').evaluateAll(frames=>frames.every(frame=>{const box=frame.getBoundingClientRect();return [...frame.querySelectorAll('.package-visual-caption,.package-visual-caption p,svg')].every(el=>{const r=el.getBoundingClientRect();return r.right<=box.right+1&&r.bottom<=box.bottom+1&&r.y>=box.y-1&&el.scrollWidth<=el.clientWidth+1;});})), 'Visuals/captions remain compact');
        anatomies.push(await cards.evaluateAll(nodes=>nodes.map(node=>{
          const copy=node.cloneNode(true);copy.removeAttribute('id');copy.querySelector(':scope > span[aria-hidden]')?.remove();copy.querySelector('details').removeAttribute('open');
          const heading=copy.querySelector('.package-heading :is(h2,h3)');const plain=document.createElement('span');plain.textContent=heading.textContent;heading.replaceWith(plain);
          return copy.outerHTML.replaceAll('package-home-','package-context-').replaceAll('package-pricing-','package-context-');
        })));
        if(width!==320){await page.locator('#priser').screenshot({animations:'disabled',path:resolve(output,`${route==='/'?'home-packages':'pricing-initial'}-${width}.png`)});if(route==='/priser/')await page.screenshot({animations:'disabled',fullPage:true,path:resolve(output,`pricing-page-${width}.png`)});}
      }
      if(!snapshot){assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No default/expanded overflow');assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'),'noindex, nofollow');assert.equal(await page.locator('#resultater,.proof-section,a[href^="/en/"]').count(),0);checks.push({route,width,preserved:true,noOverflow:true});}
    }
    if(!snapshot)assert.deepEqual(anatomies[0],anatomies[1],'One shared card anatomy, only title level/anchor/context/detail state differ');
  }
  if(!snapshot){
    await page.setViewportSize({ width: 1440, height: 1000 });
    for (const key of ['optimalisering','vekst','partner']) {
      await page.goto(`${base}/priser/?pakke=${key}#bestill`);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('#order-package').inputValue(), key);
      assert.equal(await page.locator('#partner-order-note').isVisible(), key === 'partner');
      assert.ok((await page.locator('#order-selection').innerText()).replace(/\s/g, ' ').includes(key === 'partner' ? 'fra 14 900' : key === 'vekst' ? '6 900' : '4 500'));
      await page.locator('#bestill').screenshot({ animations: 'disabled', path: resolve(output, `order-${key}-1440.png`) });
      await page.goto(base + '/');
      await page.locator(`a[href="/priser/?pakke=${key}#bestill"]`).click();
      await expect(page.locator('#order-package')).toHaveValue(key);
      await page.locator('#priser .package-card').nth(2).locator('.button').click();
      await expect(page.locator('#order-package')).toHaveValue('partner');
    }
    await page.goto(`${base}/priser/?pakke=invalid#bestill`);
    assert.equal(await page.locator('#order-package').inputValue(), '', 'Unknown query is not accepted or reflected');
    await page.locator('#order-package').selectOption('optimalisering');
    assert.equal(new URL(page.url()).searchParams.get('pakke'),'optimalisering');
    await page.locator('#priser .package-card').nth(1).locator('.button').click();
    assert.equal(await page.locator('#order-package').inputValue(),'vekst');
    await page.goBack(); await expect(page.locator('#order-package')).toHaveValue('optimalisering');
    for (const [name,value] of Object.entries({company:'Synthetic AS',website:'example.test',contact:'Synthetic Buyer',email:'synthetic@example.test'})) await page.locator(`[name="${name}"]`).fill(value);
    await page.locator('[data-package-order]').evaluate(form => {
      form.querySelector('button').disabled = false;
      form.requestSubmit();
      form.querySelector('button').disabled = true;
    });
    assert.equal(await page.locator('[data-package-order]').getAttribute('data-enabled'),'false');
    assert.ok(!/Bestillingen er (sendt|mottatt)|Takk!/.test(await page.locator('#bestill').innerText()), 'No false order acknowledgement');
    await page.setViewportSize({width:390,height:844});
    await page.locator('#order-package').selectOption('partner');
    await page.locator('#bestill').screenshot({animations:'disabled',path:resolve(output,'order-partner-390.png')});
    const noJs = await browser.newPage({ javaScriptEnabled: false });
    noJs.on('request',request=>{if(request.method()==='POST')posts++;});
    await noJs.goto(`${base}/priser/?pakke=partner#bestill`);
    for (const detail of await noJs.locator('.package-details').all()) {
      assert.equal(await detail.locator('.package-detail').isVisible(),true);
      await detail.locator('summary').click();
      assert.equal(await detail.locator('.package-detail').isVisible(),false,'Initially open full detail collapses without JavaScript');
      await detail.locator('summary').click();
      assert.equal(await detail.locator('.package-detail').isVisible(),true);
    }
    await noJs.locator('.multiplier-detail summary').click();
    assert.equal(await noJs.locator('.multiplier-detail .body-copy').first().isVisible(),true,'Multiplier logic also works without JS');
    assert.equal(await noJs.locator('[data-package-order] button').isDisabled(),true);
    await noJs.locator('#order-package').selectOption('partner');
    for (const [name,value] of Object.entries({company:'Synthetic AS',website:'example.test',contact:'Synthetic Buyer',email:'synthetic@example.test'})) await noJs.locator(`[name="${name}"]`).fill(value);
    await noJs.locator('#order-email').press('Enter');
    assert.equal(await noJs.locator('[data-package-order]').count(),1);
    await noJs.close();
  }
  assert.deepEqual(errors,[]);assert.equal(posts,0);
  if(snapshot)writeFileSync(baselineFile,JSON.stringify(baseline,null,2)+'\n');
  else writeFileSync(resolve(output,'checks.json'),JSON.stringify({base,checkedAt:new Date().toISOString(),baselineSource:baseline.source,frozenFilesChecked:Object.keys(frozen).length,retainedSnapshots:Object.keys(baseline.preserved).length,checks,cardHeights:{before:baseline.cardHeights,after:cardHeights},sameCardAnatomy:true,homeCollapsed:true,pricingInitiallyOpenAndCollapsible:true,keyboardAndNoJs:true,copyCleanup:true,order:{queryHomePricingManualHistoryInvalid:true,disabledProgrammaticAndNoJs:true},errors,posts,liveEmailsSent:0},null,2)+'\n');
  console.log(`H-016 ${snapshot?'baseline':'QA'} PASS: ${Object.keys(frozen).length} frozen files, home/pricing modes, preserved service pages, ordering and no-JS.`);
}finally{await browser.close();}
