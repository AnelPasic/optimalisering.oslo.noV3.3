import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync, readFileSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4344';
const directory = '../coordination/evidence/terminology';
mkdirSync(directory, { recursive: true });
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
const routes = readdirSync('src/content/pages').filter(f => f.endsWith('.json')).map(f => JSON.parse(readFileSync(`src/content/pages/${f}`, 'utf8')).slug).map(slug => slug === 'home' ? '/' : `/${slug}/`);
const snapshots = [];
try {
  for (const width of [1440, 900, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of routes) {
      await page.goto(base + route);
      await page.evaluate(() => document.fonts.ready);
      const snapshot = await page.evaluate(() => ({
        text: document.querySelector('main').innerText.replace(/\s+/g, ' ').trim(),
        geometry: [...document.querySelectorAll('main > section, main > div > section, .hero-visual, .hero-proof, .package-card, .proof-card')].map(element => {
          const r = element.getBoundingClientRect();
          return { key: element.id || element.className, x: r.x, y: r.y + scrollY, width: r.width, height: r.height };
        }),
      }));
      snapshots.push({ width, route, ...snapshot });
    }
  }
  if (process.argv.includes('--record')) writeFileSync(`${directory}/baseline.json`, JSON.stringify(snapshots, null, 2) + '\n');
  else {
    const baseline = JSON.parse(readFileSync(`${directory}/baseline.json`));
    assert.deepEqual(snapshots, baseline, 'All 15 existing main texts and measured section/hero/proof/package geometries remain exact at four widths');
    writeFileSync(`${directory}/layout-preservation.json`, JSON.stringify({ base, checkedAt: new Date().toISOString(), snapshots: snapshots.length, exactTextAndGeometry: true, result: 'PASS' }, null, 2) + '\n');
  }
  console.log(`Terminology ${process.argv.includes('--record') ? 'baseline recorded' : 'preservation PASS'}: ${snapshots.length} page/width snapshots.`);
} finally { await browser.close(); }
