import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolvePackageAsset} from '../src/lib/package-visual.ts';
const packages=JSON.parse(readFileSync('src/content/pages/home.json')).homepage.packages;
const text=html=>html.replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
for(const [file,open] of [['dist/index.html',false],['dist/priser/index.html',true]]) {
  const html=readFileSync(file,'utf8'),section=html.match(/<section id="priser"[^>]*>(.*?)<\/section>/s)[1];
  const cards=[...section.matchAll(/<article\b[^>]*class="package-card[^>]*>(.*?)<\/article>/gs)].map(m=>m[1]);
  assert.equal(cards.length,3);
  for(const [index,card] of cards.entries()) {
    const item=packages.items[index];
    assert.ok(card.includes('class="package-situations"')&&card.includes('package-icon-items'),'Both pages use the standard compact chooser');
    assert.ok(card.includes(`<details class="package-details"${open?' open':''}>`),'Native detail state follows page presentation');
    assert.ok(text(card).includes(item.cta.label)&&text(card).includes(item.detailLink.label),'CTA and disclosure labels follow CMS');
    assert.ok(card.includes(`href="/priser/?pakke=${item.key}#bestill"`));
    const supplied=resolvePackageAsset(item.visualAsset);
    if(supplied) {
      assert.ok(card.includes(`src="${supplied.src}"`) && card.includes('class="package-visual-asset"'));
      assert.ok(!card.includes('package-visual-caption'),'Supplied asset replaces motif/caption');
    } else {
      assert.equal((card.match(/class="package-input"/g)??[]).length,{controlled:1,accelerating:2,tracks:3}[item.visual],'CMS chooses the fallback motif');
      for(const copy of Object.values(item.visualCaption??{}))assert.ok(text(card).includes(copy),'Caption follows current CMS fields');
      const svg=card.match(/<svg class="package-visual[^>]*>(.*?)<\/svg>/s)?.[1];
      assert.ok(svg&&!/<text|<image|<foreignObject|<script|\d+\s*%|https?:/i.test(svg),'Conceptual SVG has no baked copy or numeric performance claim');
    }
    for(const copy of [item.fit,item.selectionRule,item.scope,item.distinction,item.priceNote,...item.situations,...item.iconItems.flatMap(icon=>[icon.label,icon.description])].filter(Boolean))assert.ok(text(card).includes(copy),'Details consume the same full CMS source');
    assert.ok(!/problem/i.test(text(card)),'No problem wording on the customer package surface');
    assert.ok(!text(card).includes('Optimalisering er ikke laget for to uavhengige vekstspor samtidig.'));
    assert.ok(!text(card).includes('Velg Vekst hvis resultatet avhenger av at to ting forbedres samtidig.'));
  }
  if(open)assert.ok(!/problem/i.test(text(html)),'No problem wording on the pricing page');
  if(open)for(const copy of [packages.eyebrow,packages.heading,packages.intro,packages.areasLabel,...packages.areas,packages.foundationNote,packages.decisionStrip.heading,...packages.decisionStrip.items,...Object.values(packages.multiplier)])assert.ok(text(html).includes(copy),'Shared editor fields render on pricing');
}
console.log('H-016 static PASS: shared standard cards, page-specific native details, editable CMS labels, protected ordering and copy cleanup.');
