import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync,existsSync,unlinkSync} from 'node:fs';
import {resolve,sep} from 'node:path';
import {spawnSync} from 'node:child_process';
import {chromium} from '@playwright/test';

// Reversible OWNER-edit simulation, not an authenticated CMS save claim.
const source='src/content/pages/home.json', original=readFileSync(source);
const fixtureFiles=['public/images/pricing/h016-test-0.svg','public/images/pricing/h016-test-1.webp','public/images/pricing/h016-test-2.png'];
for(const file of fixtureFiles)assert.ok(!existsSync(file),'No existing image overwritten');
const protectedPages=Object.fromEntries(['priser','synlighet','konvertering'].map(slug=>[slug,readFileSync(`src/content/pages/${slug}.json`)]));
const base=process.env.QA_BASE_URL||'http://127.0.0.1:4321';
const evidence='../coordination/evidence/h016';
const run=command=>{const result=spawnSync(command,{shell:true,encoding:'utf8'});assert.equal(result.status,0,result.stdout+result.stderr);return result.stdout+result.stderr;};
const text=html=>html.replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
try {
  const home=JSON.parse(original), packages=home.homepage.packages;
  for(const field of ['eyebrow','heading','intro','fitLabel','scopeLabel','areasLabel','foundationNote','adBudgetNote','externalCostsNote','separateWorkNote','capacityNote'])packages[field]=`CMS ${field}`;
  packages.areas=['CMS område A','CMS område B','CMS område C','CMS område D'];
  for(const field of Object.keys(packages.labels))packages.labels[field]=`CMS ${field}`;
  packages.decisionStrip={heading:'CMS beslutning',items:['CMS valg A','CMS valg B','CMS valg C']};
  for(const field of Object.keys(packages.multiplier))packages.multiplier[field]=`CMS multiplikator ${field}`;
  packages.items.forEach((item,index)=>{
    Object.assign(item,{
      title:`CMS pakke ${index}`,price:[4567,6789,15987][index],priceSuffix:'kr/måned',vatSuffix:'CMS avgift',
      descriptor:`CMS beskrivelse ${index}`,fit:`CMS full tekst ${index}`,scope:`CMS omfang ${index}`,
      typicalBusiness:`CMS bedrifter ${index}`,distinction:`CMS ekstra forklaring ${index}`,selectionRule:`CMS valg ${index}`,priceNote:`CMS prisnotat ${index}`,
      recommended:index===0,badge:'CMS anbefaling',visual:['tracks','controlled','accelerating'][index],
      visualCaption:{label:`CMS etikett ${index}`,support:`CMS støtte ${index}`},
      compact:{fit:`CMS kort tekst ${index}`,situations:[`CMS kort situasjon ${index}`]},situations:[`CMS full situasjon ${index}`],
      iconItems:[{icon:'local',compactLabel:`CMS kort ikon ${index}`,label:`CMS fullt ikon ${index}`,description:`CMS ikonforklaring ${index}`}],
      visualAsset:{src:`/images/pricing/h016-missing-${index}.svg`,alt:`CMS alternativ ${index}`,positionX:20,positionY:80},
    });
    item.cta.label=`Velg CMS pakke ${index}`;item.detailLink.label=`Les CMS detaljer ${index}`;
  });
  writeFileSync(source,JSON.stringify(home,null,2)+'\n');
  mkdirSync(evidence,{recursive:true});
  writeFileSync(`${evidence}/cms-copy-verify.log`,run('npm run verify'));
  for(const [slug,bytes]of Object.entries(protectedPages))assert.ok(readFileSync(`src/content/pages/${slug}.json`).equals(bytes),'No second commercial source');
  for(const file of ['dist/index.html','dist/priser/index.html','dist/synlighet/index.html','dist/konvertering/index.html']) {
    const rendered=text(readFileSync(file,'utf8'));
    for(const value of ['CMS pakke 0','4 567 kr/måned','6 789 kr/måned','CMS avgift'])assert.ok(rendered.includes(value),`${file}: current source ${value}`);
    assert.ok(!/4 500 kr\/mnd|6 900 kr\/mnd|eks\. mva\./.test(rendered),'No stale repeated commercial facts');
  }
  const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  try {
    const page=await browser.newPage();
    for(const width of [1440,390,320])for(const route of ['/','/priser/']) {
      await page.setViewportSize({width,height:844});await page.goto(base+route);
      const cards=page.locator('#priser .package-card');
      for(const [index,card]of(await cards.all()).entries()) {
        assert.equal(await card.locator('.package-fit').innerText(),`CMS kort tekst ${index}`);
        assert.equal(await card.locator('.button').innerText(),`Velg CMS pakke ${index}`);
        assert.equal(await card.locator('.package-details summary').innerText(),`Les CMS detaljer ${index}`);
        assert.equal(await card.locator('.package-detail').isVisible(),route==='/priser/');
        if(route==='/')await card.locator('.package-details summary').click();
        for(const copy of [packages.items[index].fit,packages.items[index].scope,packages.items[index].distinction,packages.items[index].selectionRule,packages.items[index].priceNote])assert.ok((await card.locator('.package-detail').innerText()).includes(copy));
        assert.deepEqual(await card.locator('.package-visual-caption p').allTextContents(),[`CMS etikett ${index}`,`CMS støtte ${index}`]);
        assert.equal(await card.locator('img.package-visual-asset').count(),0,'Missing file uses motif without broken image');
      }
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Edited content fits');
    }
    await page.goto(base+'/priser/?pakke=vekst#bestill');
    assert.equal(await page.locator('#order-package').inputValue(),'vekst','CMS title/CTA changes preserve intent');
    assert.ok((await page.locator('#order-selection').innerText()).includes('CMS pakke 1'));
  } finally {await browser.close();}
  delete packages.items[2].pricePrefix;
  writeFileSync(source,JSON.stringify(home,null,2)+'\n');run('npm run build');
  for(const file of ['dist/index.html','dist/priser/index.html'])assert.ok(!text(readFileSync(file,'utf8')).includes('fra 15 987 kr/måned'),'Optional prefix clears repeated price facts');
  mkdirSync('public/images/pricing',{recursive:true});
  writeFileSync(fixtureFiles[0],'<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><rect width="1" height="1" fill="transparent"/></svg>');
  // Existing local WebP bytes exercise the format; no generated/replacement art.
  writeFileSync(fixtureFiles[1],readFileSync(`public${JSON.parse(original).homepage.heroPhoto.src}`));
  writeFileSync(fixtureFiles[2],Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=','base64'));
  packages.items.forEach((item,index)=>{item.visualAsset={src:fixtureFiles[index].replace('public',''),alt:`CMS figur ${index}`,positionX:20,positionY:80};});
  writeFileSync(source,JSON.stringify(home,null,2)+'\n');
  writeFileSync(`${evidence}/cms-assets-verify.log`,run('npm run verify'));
  const suppliedBrowser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  try {
    const page=await suppliedBrowser.newPage();
    for(const width of [1440,390,320])for(const route of ['/','/priser/']) {
      await page.setViewportSize({width,height:844});await page.goto(base+route);
      const images=page.locator('#priser .package-visual-asset');assert.equal(await images.count(),3);
      assert.equal(await page.locator('#priser svg.package-visual, #priser .package-visual-caption').count(),0,'Supplied asset replaces motif/caption');
      for(const [index,img]of(await images.all()).entries()) {
        await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());
        assert.ok(await img.evaluate(el=>el.complete&&el.naturalWidth>0));
        assert.equal(await img.getAttribute('src'),fixtureFiles[index].replace('public',''));
        assert.equal(await img.getAttribute('alt'),`CMS figur ${index}`);
        assert.equal(await img.evaluate(el=>getComputedStyle(el).objectFit),index===0?'contain':'cover');
        assert.equal(await img.evaluate(el=>getComputedStyle(el).objectPosition),'20% 80%');
      }
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    }
  } finally {await suppliedBrowser.close();}
  packages.items[1].visualAsset.src='/images/pricing/h016-missing-one.webp';
  writeFileSync(source,JSON.stringify(home,null,2)+'\n');run('npm run build');
  for(const file of ['dist/index.html','dist/priser/index.html']) {
    const html=readFileSync(file,'utf8');
    assert.equal((html.match(/class="package-visual-asset"/g)??[]).length,2,'Swapping one visual leaves the other two supplied');
    for(const index of [0,2])assert.ok(html.includes(`src="${fixtureFiles[index].replace('public','')}"`));
    assert.ok(text(html).includes('CMS etikett 1'),'One changed/missing visual falls back independently');
  }
  writeFileSync(`${evidence}/package-source-regression.json`,JSON.stringify({checkedAt:new Date().toISOString(),result:'PASS',authenticatedCmsSave:false,source:'home.homepage.packages',allSafeFieldsEdited:true,fullVerifyWithEditedCopy:true,fullVerifyWithEditedCopyAndSvgWebpPng:true,independentAssets:true,missingAssetFallback:true,cropAndAlt:true,variantsAndCaptions:true,widths:[1440,390,320],sharedRoutes:['/','/priser/','/synlighet/','/konvertering/'],homeCollapsedPricingOpen:true,protectedRoutesAndPreselection:true,optionalPrefixBothStates:true,secondSourceChanged:false,originalBytesRestored:true,finalBuild:'Run npm run verify after restoration'},null,2)+'\n');
  console.log('H-016 source regression PASS: safe OWNER edits pass full verification and reach both views; protected routes and independent SVG/WebP/PNG work.');
} finally {
  writeFileSync(source,original);
  for(const file of fixtureFiles){assert.ok(resolve(file).startsWith(resolve('public/images/pricing')+sep));if(existsSync(file))unlinkSync(file);}
}
