import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {getH015Captions} from './h015-contract.mjs';
import {resolvePackageAsset} from '../src/lib/package-visual.ts';
const home=JSON.parse(readFileSync('src/content/pages/home.json')), expected=getH015Captions();
const baseline=JSON.parse(readFileSync('../coordination/evidence/h015/baseline.json'));
const originalCopy=structuredClone(home);
for(const [index,item] of originalCopy.homepage.packages.items.entries()) {
  assert.deepEqual(item.visualCaption,expected[index],'Exact optional H-015 semantic callouts');
  delete item.visualCaption;
}
// Asset source is intentionally editable; ordinary verify checks every supplied
// field via schema/resolver. Baseline invariance of actual source belongs to QA.
const originalWithoutAssets=structuredClone(baseline.homeSource);
for(const item of originalCopy.homepage.packages.items) delete item.visualAsset;
for(const item of originalWithoutAssets.homepage.packages.items) delete item.visualAsset;
assert.deepEqual(originalCopy,originalWithoutAssets,'All prior H-014 copy/data/status/authority is preserved');
for(const file of ['dist/index.html','dist/priser/index.html']) {
  const html=readFileSync(file,'utf8');
  const cards=[...html.matchAll(/<article\b[^>]*class="package-card[^>]*>(.*?)<\/article>/gs)].map(m=>m[1]);
  for(const [index,card] of cards.entries()) {
    const supplied=resolvePackageAsset(home.homepage.packages.items[index].visualAsset);
    if(supplied) {assert.ok(card.includes('class="package-visual-asset"'));assert.ok(!card.includes('package-visual-caption'));}
    else {
      assert.ok(card.includes('data-editorial="true"'));
      assert.equal((card.match(/class="package-input"/g)??[]).length,index+1,'One lever / two merged inputs / three journeys');
      for(const copy of Object.values(expected[index])) assert.ok(card.includes(copy),'Callout text is semantic HTML');
      const svg=card.match(/<svg class="package-visual[^>]*>(.*?)<\/svg>/s)[1];
      assert.ok(!/<text|<image|<foreignObject|<script|\d+\s*%|https?:/i.test(svg),'No baked text, raster, external dependency or performance claim');
    }
  }
}
console.log('H-015 static PASS: exact HTML callouts, semantic isolated SVG motifs, retained H-014 source/copy/order, optional supplied artwork override.');
