import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, rmSync, mkdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { chromium } from '@playwright/test';

const slugs = ['synlighet', 'konvertering'];
const originals = slugs.map(slug => readFileSync(`src/content/pages/${slug}.json`));
const asset = resolve('public/images/services/h011-layout-fixture.png');
assert.equal(existsSync(asset), false, 'Never overwrite an existing service asset');
const build = () => execFileSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build'], { stdio: 'pipe' });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage(), originalHeroes = {}, checks = [];
const errors = [];
page.on('pageerror', error => errors.push(error.message));
async function hero(slug, width) {
  await page.setViewportSize({ width, height: 1000 });
  assert.equal((await page.goto(`http://127.0.0.1:4321/${slug}/`)).status(), 200);
  await page.evaluate(() => document.fonts.ready);
  return page.locator('#service-hero').evaluate(el => {
    const r = el.getBoundingClientRect();
    return { html: el.innerHTML, rect: [r.x, r.y, r.width, r.height] };
  });
}
try {
  for (const slug of slugs) for (const width of [1440, 390, 320]) originalHeroes[`${slug}:${width}`] = await hero(slug, width);
  for (const [index, slug] of slugs.entries()) {
    const content = JSON.parse(originals[index]);
    content.heroVisual = { kind: index ? 'photo' : 'illustration', src: '/images/services/h011-layout-fixture.png', alt: 'Layout test asset', positionX: 35, positionY: 65 };
    writeFileSync(`src/content/pages/${slug}.json`, JSON.stringify(content, null, 2));
  }
  build();
  for (const slug of slugs) for (const width of [1440, 390, 320]) {
    assert.deepEqual(await hero(slug, width), originalHeroes[`${slug}:${width}`], 'Configured missing asset preserves exact text hero and geometry');
    assert.equal(await page.locator('.service-hero img').count(), 0);
  }
  // One neutral pixel exercises the actual image branch, not final artwork.
  writeFileSync(asset, Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64'));
  build();
  for (const [index, slug] of slugs.entries()) for (const width of [1440, 390, 320]) {
    await hero(slug, width);
    const image = page.locator('.service-hero-visual img');
    assert.equal(await image.count(), 1);
    await image.evaluate(img => img.decode());
    assert.equal(await image.evaluate(img => img.naturalWidth), 1);
    assert.equal(await image.getAttribute('alt'), 'Layout test asset');
    assert.equal(await image.evaluate(img => getComputedStyle(img).objectPosition), '35% 65%');
    assert.equal(await image.evaluate(img => getComputedStyle(img).objectFit), index ? 'cover' : 'contain');
    assert.equal(await page.locator('h1').innerText(), JSON.parse(originals[index]).title);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    const outside = await page.evaluate(() => [...document.querySelectorAll('main *')].filter(el => { const r = el.getBoundingClientRect(); return r.width && (r.left < -1 || r.right > innerWidth + 1); }).length);
    assert.equal(outside, 0);
    const visualBox = await page.locator('.service-hero-visual').boundingBox();
    const copyBox = await page.locator('.service-hero-copy').boundingBox();
    assert.ok(width === 1440 ? visualBox.x > copyBox.x + copyBox.width : visualBox.y >= copyBox.y + copyBox.height, 'Desktop split/mobile stacking');
    checks.push({ slug, width, missingAssetExactFallback: true, suppliedFileLoads: true, responsiveLayout: true, correctModeAndCrop: true });
  }
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
  for (const [index, slug] of slugs.entries()) writeFileSync(`src/content/pages/${slug}.json`, originals[index]);
  if (existsSync(asset)) rmSync(asset);
  build();
}
for (const [index, slug] of slugs.entries()) assert.ok(readFileSync(`src/content/pages/${slug}.json`).equals(originals[index]));
assert.equal(existsSync(asset), false);
mkdirSync('../coordination/evidence/h011', { recursive: true });
writeFileSync('../coordination/evidence/h011/visual-fixture.json', JSON.stringify({ checkedAt: new Date().toISOString(), actualAstroRenderer: true, checks, originalsRestored: true, assetRemoved: true, finalArtworkCreated: false, errors, result: 'PASS' }, null, 2) + '\n');
console.log('H-011 visual fixture PASS: both real heroes, missing-file exact fallback, photo/illustration branches at 1440/390/320; all fixtures restored/removed.');
