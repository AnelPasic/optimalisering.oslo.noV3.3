import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getH014Compact } from './h014-contract.mjs';
const packages = JSON.parse(readFileSync('src/content/pages/home.json')).homepage.packages;
const expected = getH014Compact();
for (const [index, item] of packages.items.entries()) {
  assert.deepEqual(item.compact, { fit: expected[index].fit, situations: expected[index].situations }, 'D-048 exact compact fit/situations');
  assert.deepEqual(item.iconItems.map(icon => icon.compactLabel), expected[index].iconLabels, 'D-048 exact compact icon labels');
}
for (const [file, full] of [['dist/index.html', false], ['dist/priser/index.html', true]]) {
  const html = readFileSync(file, 'utf8');
  const cards = [...html.matchAll(/<article\b[^>]*class="package-card[^>]*>(.*?)<\/article>/gs)].map(m => m[1]);
  assert.equal(cards.length, 3);
  cards.forEach((card, index) => {
    const item = packages.items[index];
    assert.ok(card.includes(item.compact.fit));
    assert.ok(card.includes(`href="${item.cta.href}"`));
    if (full) {
      const detail = card.match(/<details class="package-details">(.*?)<\/details>/s)?.[1];
      assert.ok(detail && detail.startsWith('<summary>Se detaljer'), 'Native collapsed disclosure after CTA');
      assert.ok(card.indexOf('class="button"') < card.indexOf('<details class="package-details">'));
      const visible = card.split('<details class="package-details">')[0];
      for (const text of [...item.compact.situations, ...item.iconItems.map(icon => icon.compactLabel)]) assert.ok(visible.includes(text));
      for (const text of [item.fit, item.typicalBusiness, item.scope, item.distinction, item.priceNote, item.selectionRule, ...item.situations, ...item.iconItems.flatMap(icon => [icon.label, icon.description])].filter(Boolean)) assert.ok(detail.includes(text), 'Full H-012/H-013 copy remains in the disclosure');
      for (const text of [item.typicalBusiness, item.scope, item.distinction, item.priceNote, item.selectionRule, ...item.iconItems.map(icon => icon.description)].filter(Boolean)) assert.ok(!visible.includes(text), 'Long text is absent from default card');
    } else {
      assert.ok(!card.includes('package-details') && !card.includes('package-icon-items') && !card.includes('package-situations'));
      assert.ok(card.includes('Se pakken'));
    }
  });
}
console.log('H-014 static PASS: exact compact copy, preserved full copy in native collapsed disclosure, short home, unchanged direct-order source.');
