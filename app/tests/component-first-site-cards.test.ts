import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=path=>readFileSync(path,'utf8');
test('MWS #26 Oslo pilot: automatic visual cards use native ContentCard, plain stays editorial',()=>{
 const home=read('src/components/HomeSection.astro');
 const card=read('src/components/ContentCard.astro');
 const project=read('src/styles/project.css');
 assert.match(home,/cards&&boxVariantAttribute\(item\.boxVariant,protectedRow\)!=='plain'/);
 assert.match(home,/<ContentCard[^>]+linkVariant=\{boxVariantAttribute/);
 assert.doesNotMatch(home,/\{card:cards&&/);
 assert.doesNotMatch(project,/\.info-item\.card\s*\{/,'legacy duplicate card padding must retire');
 for(const part of ['card-body','card-title','card-actions','linkVariant','text-link'])assert.ok(card.includes(part),part);
 assert.match(home,/class:list=\{\['info-item/,'editorial/plain variants stay separate');
});
test('MWS #26 Oslo pilot: package shells are daisyUI and complex offer internals remain unchanged',()=>{
 const markup=read('src/components/PackageSection.astro');
 const css=read('src/styles/compositions/package.css');
 assert.match(markup,/card card-border bg-base-100 border-base-300/);
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
