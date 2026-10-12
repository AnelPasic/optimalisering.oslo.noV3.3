import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4344';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 320, height: 600 } });
  await page.goto(base);
  const link = page.locator('a[data-term="roas"]');
  for (const [left, top] of [[0, 0], [260, 0], [0, 570], [260, 570]]) {
    await link.evaluate((element, [left, top]) => Object.assign(element.style, { position: 'fixed', left: left + 'px', top: top + 'px', zIndex: '9999' }), [left, top]);
    await link.hover();
    const rect = await page.locator('[data-term-panel]:not([hidden])').boundingBox();
    assert.ok(rect.x >= 12 && rect.x + rect.width <= 308 && rect.y >= 12 && rect.y + rect.height <= 588, JSON.stringify(rect));
    await page.mouse.move(160, 300);
    await page.waitForFunction(() => document.querySelector('[data-term-panel]').hidden);
  }
  const mobile = await browser.newContext({ viewport: { width: 320, height: 844 }, isMobile: true, hasTouch: true });
  const touch = await mobile.newPage();
  await touch.goto(base);
  const trigger = touch.locator('a[data-term="roas"]');
  await trigger.tap();
  assert.equal(await trigger.getAttribute('aria-expanded'), 'true');
  await trigger.tap();
  assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
  await mobile.close();
  const older = await browser.newContext();
  await older.addInitScript(() => { HTMLElement.prototype.showPopover = undefined; });
  const fallback = await older.newPage();
  await fallback.goto(base);
  const fallbackLink = fallback.locator('a[data-term="roas"]');
  assert.equal(await fallbackLink.getAttribute('role'), null);
  await fallbackLink.click();
  await fallback.waitForURL('**/begreper/#roas');
  await older.close();
  writeFileSync('../coordination/evidence/terminology/edge-checks.json', JSON.stringify({ base, checkedAt: new Date().toISOString(), fourViewportCorners: true, hoverLeaveDismissal: true, secondTapToggle: true, unsupportedPopoverUsesGlossaryLink: true, result: 'PASS' }, null, 2) + '\n');
  console.log('Terminology edges PASS: four viewport corners, hover dismissal, repeated tap and older-browser direct-link fallback.');
} finally { await browser.close(); }
