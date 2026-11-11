import {getHomepageBlock} from '../src/lib/home-builder.ts';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const packages=getHomepageBlock(JSON.parse(readFileSync('src/content/pages/home.json')),'packages').content;
const text=html=>html.replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/\s+/g,' ').trim();
for(const file of ['dist/index.html','dist/priser/index.html','dist/seo/index.html']) {
  const html=readFileSync(file,'utf8');
  const cards=[...html.matchAll(/<article\b[^>]*class="package-card[^"]*"[^>]*>(.*?)<\/article>/gs)].map(m=>m[1]);
  assert.equal(cards.length,3);
  for(const [index,card] of cards.entries()) {
    const item=packages.items[index];
    assert.ok(card.includes('class="package-situations"')&&card.includes('package-icon-items'),'Compact situations and service icons both render');
    assert.ok(card.includes('<details class="package-details">'),'Mer om pakken must exist and remain closed by default on both routes');
    const detailsHtml=card.split('<details class="package-details">')[1]?.split('</details>')[0]??'';
    const beforeDetails=card.split('<details class="package-details">')[0];
    assert.ok(detailsHtml.includes('Systemer inkludert')&&detailsHtml.includes('data-service-category="Systemer"'),'System tools moved into accordion');
    assert.ok(!beforeDetails.includes('data-service-category="Systemer"'),'System tools are not duplicated ahead of Bestill');
    assert.ok(text(detailsHtml).includes(text(item.compact.fit))&&item.compact.situations.every(goal=>text(detailsHtml).includes(text(goal))),'Goals and fit are under Mer om pakken');
    if(item.scope)assert.ok(detailsHtml.includes(item.scope.trim()),'Existing scope copy remains in accordion');
    assert.ok(text(card).includes(item.cta.label)&&text(card).includes(item.detailLink.label),'CTA and disclosure labels follow CMS');
    assert.ok(card.includes(`id="package-order-${item.key}"`) && card.includes(`name="package" value="${item.key}"`),'Inline order uses the protected package key');
    const svg=item.visualSvg;
    assert.ok(svg && !/<(?:text|image|foreignObject|script)\b/i.test(svg),'Illustration uses the SVG code without baked-in caption text');
    assert.ok(card.includes('class="package-animation"') && card.includes(`src="data:image/svg+xml,${encodeURIComponent(svg)}"`),'Both cards render the canonical SVG in image context');
    for(const copy of Object.values(item.visualCaption??{}))assert.ok(text(card).includes(copy),'Caption follows current CMS fields');
    for(const copy of [item.scope,item.distinction,item.priceNote].filter(Boolean))assert.ok(text(card).includes(copy),'Details consume the same full CMS source');
    assert.ok(!/problem/i.test(text(card)),'No problem wording on the customer package surface');
    assert.ok(!text(card).includes('Optimalisering er ikke laget for to uavhengige vekstspor samtidig.'));
    assert.ok(!text(card).includes('Velg Vekst hvis resultatet avhenger av at to ting forbedres samtidig.'));
  }
}
console.log('H-016 static PASS: shared cards, SVG animations, editable captions, native details and protected ordering.');
