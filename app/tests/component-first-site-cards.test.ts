import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=(path:string)=>readFileSync(path,'utf8');
test('MWS #26 Oslo pilot: automatic visual cards use native ContentCard, plain stays editorial',()=>{
 const home=read('src/components/HomeSection.astro');
 const card=read('src/components/ContentCard.astro');
 const project=read('src/styles/project.css');
 assert.match(home,/cards&&boxVariantAttribute\(item\.boxVariant,protectedRow\)!=='plain'/);
 assert.match(home,/<ContentCard[^>]+linkVariant=\{boxVariantAttribute/);
 assert.doesNotMatch(home,/\{card:cards&&/);
 assert.doesNotMatch(project,/\.info-item\.card\s*\{/,'legacy duplicate card padding must retire');
 for(const part of ['card-body','card-title','card-actions','linkVariant','text-link','transparent'])assert.ok(card.includes(part),part);
 assert.match(home,/class:list=\{\['info-item/,'editorial/plain variants stay separate');
});
test('MWS #26 Oslo pilot: package shells are daisyUI and complex offer internals remain unchanged',()=>{
 const markup=read('src/components/PackageSection.astro');
 const css=read('src/styles/compositions/package.css');
 assert.match(markup,/card card-border min-w-0/);
 assert.match(markup,/\?'is-recommended bg-base-300 border-2 border-secondary':'bg-base-100 border-base-300'/);
 assert.match(markup,/is-recommended bg-base-300 border-2 border-secondary/);
 assert.match(markup,/<div class="card-body min-w-0 gap-0">/);
 for(const part of ['<PackageOrder item={item}','class="package-details"','<Visual kind={item.visual}','item.price','item.iconItems'])assert.ok(markup.includes(part),part);
 for(const bad of [
 '.invite-home .package-offer .package-card { background:',
 '.invite-home .package-offer .package-card { min-height: 770px; padding:',
 '.invite-home .package-card { background:',
 '.invite-home .package-card.is-recommended { border-top-color:',
 ])assert.ok(!css.includes(bad),'parallel card paint/padding should be removed: '+bad);
 assert.match(css,/\.invite-home \.package-offer \.package-card \{ min-height: 770px; \}/,'pricing min-height is a permitted business-specific layout');
 assert.match(css,/\.package-order-inline/,'specialized pricing behavior is preserved');
});

test('Oslo homepage three selector cards use semantic daisyUI background AND matching foreground',()=>{
 const markup=read('src/components/HomepageBlock.astro');
 for (const pair of ['bg-info text-info-content','bg-base-300 text-base-content','bg-secondary text-secondary-content'])
  assert.ok(markup.includes(pair),'missing theme-safe color pair: '+pair);
 assert.doesNotMatch(markup,/bg-secondary text-info(?!-content)/,'never mix secondary and info text colors');
 assert.doesNotMatch(markup,/text-\(--muted\)/,'description should inherit the semantic card foreground');
 assert.match(markup,/text-inherit/,'card descriptions inherit the correct content color');
});

test('calculator uses matching daisyUI surface/content pairs, not fixed light text or chart ink',()=>{
 const view=read('src/components/HomeLeverage.astro');
 const css=read('src/styles/compositions/calculator.css');
 for(const pair of ['bg-secondary text-secondary-content','leverage-result bg-base-200 text-base-content','leverage-comparison bg-accent text-accent-content','scenario-chart bg-base-200 text-base-content'])
  assert.ok(view.includes(pair),'Missing calculator semantic color pair: '+pair);
 assert.doesNotMatch(css,/color:\s*var\(--color-base-100\)/,'section background must not use base-100 as foreground');
 assert.doesNotMatch(css,/background:\s*var\(--color-accent\)/,'result card colors should come from daisyUI');
 assert.doesNotMatch(view,/#(?:[0-9a-fA-F]{3,8})\b/,'hardcoded chart ink needs theme tokens');
 assert.doesNotMatch(view,/color:\s*#[a-fA-F0-9]+/,'hardcoded calculator text must be removed');
 for(const color of ['--color-base-content','--color-base-300','--color-primary'])
  assert.ok(view.includes(color),'missing theme-derived SVG presentation token: '+color);
});
