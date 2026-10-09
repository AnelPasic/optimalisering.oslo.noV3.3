import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getH012Contract } from './h012-contract.mjs';
import { resolvePackageAsset } from '../src/lib/package-visual.ts';
const expected = getH012Contract();
const source = JSON.parse(readFileSync('src/content/pages/home.json')).homepage.packages;
// D-045 supersedes only the primary CTA; D-046 stores the same focus copy as
// structured icon items. All H-012 offer sentences remain exact.
for (const [index, item] of expected.items.entries()) item.cta = { label: `Bestill ${item.title}`, href: `/priser/?pakke=${['optimalisering','vekst','partner'][index]}#bestill` };
const projected = { ...source, items: source.items.map(item => {
  const { key, iconItems, visualAsset, visualCaption, compact, ...offer } = item;
  return key === 'vekst' ? { ...offer, combinations: iconItems.map(focus => ({ title: focus.label, text: focus.description })) } : { ...offer, focusAreas: iconItems.map(focus => focus.label) };
}) };
for (const key of Object.keys(expected)) assert.deepEqual(projected[key], expected[key], `D-041 exact shared ${key}`);
const normalize = html => html.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
for (const [path, full] of [['dist/index.html', false], ['dist/priser/index.html', true]]) {
  const html = readFileSync(path, 'utf8');
  const section = html.match(/<section id="priser"[^>]*>(.*?)<\/section>/s)[1];
  const cards = [...section.matchAll(/<article\b[^>]*class="package-card[^>]*>(.*?)<\/article>/gs)].map(match => match[1]);
  assert.equal(cards.length, 3);
  for (const [index, card] of cards.entries()) {
    const item = expected.items[index], text = normalize(card);
    for (const copy of [item.title, item.descriptor, item.cta.label, ...(full ? [item.fit, item.typicalBusiness, item.scope, item.distinction, item.priceNote, item.selectionRule, ...item.situations, ...(item.focusAreas ?? []), ...(item.combinations ?? []).flatMap(pair => [pair.title, pair.text])] : [item.detailLink.label])].filter(Boolean)) assert.ok(text.includes(copy), `${path}: exact ${copy}`);
    const asset = resolvePackageAsset(source.items[index].visualAsset);
    assert.equal((card.match(/class="package-curve"/g) ?? []).length, asset ? 0 : index === 2 ? 3 : 1, 'Supplied asset replaces conceptual fallback');
    assert.equal((card.match(/class="package-visual-asset"/g) ?? []).length, asset ? 1 : 0);
    assert.equal((card.match(/class="package-price-prefix"/g) ?? []).length, index === 2 ? 1 : 0);
    assert.ok(!/\d+(?:[.,]\d+)?\s*%|Mest valgt/i.test(text), 'No unsupported package percentages/popularity');
    assert.ok(card.includes(`href="${item.cta.href}"`));
    if (!full) assert.ok(!text.includes(item.selectionRule) && !text.includes(item.situations[0]), 'Compact home does not duplicate full detail');
  }
  assert.ok(!/Mest valgt|ekstern markedsavdeling/i.test(normalize(html)));
  if (full) {
    for (const copy of [expected.decisionStrip.heading, ...expected.decisionStrip.items, ...Object.values(expected.multiplier)]) assert.ok(normalize(html).includes(copy));
    assert.ok(normalize(html).includes('Partner fra 14 900 kr/mnd'), 'Repeated Partner fact includes prefix');
    assert.ok(!/\d+(?:[.,]\d+)?\s*%/.test(normalize(html)), 'Pricing page has no uplift percentages');
  }
}
console.log('H-012 static PASS: exact locked shared copy, compact/full views, selection/distinction/CRO combinations, Partner prefix, conceptual visuals/no unsupported claims.');
