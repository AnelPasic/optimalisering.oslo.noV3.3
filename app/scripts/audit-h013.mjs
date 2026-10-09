import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const home=JSON.parse(readFileSync('src/content/pages/home.json'));
const html=readFileSync('dist/priser/index.html','utf8');
const text=value=>value.replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/\s+/g,' ').trim();
for(const file of ['dist/index.html','dist/priser/index.html']) {
  const content=readFileSync(file,'utf8');
  const cards=[...content.matchAll(/<article\b[^>]*class="package-card[^>]*>(.*?)<\/article>/gs)].map(m=>m[1]);
  assert.equal(cards.length,3);
  for(const [index,item] of home.homepage.packages.items.entries()) {
    assert.ok(cards[index].includes(`href="${item.cta.href}"`) && text(cards[index]).includes(item.cta.label));
    assert.ok(cards[index].includes('class="package-visual-area'));
    if(file.includes('/priser/')) for(const focus of item.iconItems) assert.ok(text(cards[index]).includes(focus.label));
  }
}
assert.equal((html.match(/<form\b[^>]*data-package-order/g)??[]).length,1);
assert.ok(html.includes('data-enabled="false"'));
assert.match(html,/<button[^>]*type="submit"[^>]*disabled/);
for(const name of ['package','company','website','contact','email','phone','message']) assert.ok(html.includes(`name="${name}"`));
const partner=home.homepage.packages.items[2];
for(const copy of ['Bestill pakken som passer','Velg pakken og send bestillingen. Vi bekrefter oppstart og det avtalte omfanget før arbeidet starter.',`Partner starter ${partner.pricePrefix ? partner.pricePrefix+' ' : ''}${new Intl.NumberFormat('nb-NO').format(partner.price)} ${partner.priceSuffix}`,'Omfang og fast månedspris bekreftes før oppstart.','Usikker på pakken? Ta en gratis sjekk','Send bestilling']) assert.ok(text(html).includes(copy.replace(/\s+/g,' ')));
assert.ok(html.indexOf('id="bestill"')>html.indexOf('id="pricing-multiplier"')&&html.indexOf('id="bestill"')<html.indexOf('id="sporsmal"'));
assert.ok(!/Bestillingen er sendt|Bestillingen er mottatt|Mest valgt|ekstern markedsavdeling/.test(html));
console.log('H-013 static PASS: direct ordering, single disabled review form, locked support/Partner note, independent visual slots and structured focus.');
