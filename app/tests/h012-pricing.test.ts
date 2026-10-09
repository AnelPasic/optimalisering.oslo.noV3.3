import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pageSchema } from '../src/lib/content-schema.ts';
import { createCommercialTextBinding } from '../src/lib/commercial-text.ts';
const home = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));
const pricing = JSON.parse(readFileSync('src/content/pages/priser.json', 'utf8'));
test('Partner prefix survives CMS parsing while other packages cannot become from-prices', () => {
  const edited = structuredClone(home);
  edited.homepage.packages.items[2].pricePrefix = 'fra';
  assert.equal(pageSchema.parse(edited).homepage!.packages.items[2].pricePrefix, 'fra');
  edited.homepage.packages.items[0].pricePrefix = 'fra';
  assert.equal(pageSchema.safeParse(edited).success, false);
});
test('repeated Partner facts include the shared prefix exactly once without altering generic from-prices', () => {
  const edited = structuredClone(home);
  // Own the fixture values; OWNER can edit actual package fields under D-054.
  edited.homepage.packages.items.forEach((item: any, index: number) => Object.assign(item, { title: ['Optimalisering', 'Vekst', 'Partner'][index], price: [4500, 6900, 14900][index], priceSuffix: 'kr/mnd' }));
  edited.homepage.packages.items[2].pricePrefix = 'fra';
  const bind = createCommercialTextBinding(edited, pricing);
  assert.ok(bind(pricing.faq[0].answer).includes('Partner fra 14 900 kr/mnd'));
  assert.equal(bind('Partner fra 14 900 kr/mnd.'), 'Partner fra 14 900 kr/mnd.');
  assert.equal(bind('fra 4 500 kr/mnd'), 'fra 4 500 kr/mnd');
});

test('CMS names ending in digits cannot swallow following FAQ price amounts', () => {
  const edited = structuredClone(home);
  edited.homepage.packages.items.forEach((item: any, index: number) => Object.assign(item, { title: `Pakke ${index + 1}`, price: [4567, 6789, 15987][index], priceSuffix: 'kr/mnd' }));
  const answer = createCommercialTextBinding(edited, pricing)(pricing.faq[0].answer);
  for (const [index, item] of edited.homepage.packages.items.entries()) {
    assert.ok(answer.includes(`Pakke ${index + 1}`));
    assert.ok(answer.includes(`${new Intl.NumberFormat('nb-NO').format(item.price).replaceAll('\u00a0', ' ')} kr/mnd`));
  }
  assert.ok(!/4 500 kr\/mnd|6 900 kr\/mnd|14 900 kr\/mnd/.test(answer));
});

test('inserted CMS selection and cost strings retain edited names verbatim', () => {
  const edited = structuredClone(home);
  edited.homepage.packages.items[1].title = 'Vekst Pro';
  edited.homepage.packages.items[1].selectionRule = 'Velg Vekst Pro når to forbedringer kan forsterke hverandre.';
  edited.homepage.packages.externalCostsNote = 'For Vekst Pro kommer eksterne kostnader i tillegg.';
  const bind = createCommercialTextBinding(edited, pricing);
  assert.equal(bind(pricing.faq[1].answer), edited.homepage.packages.items.map((item: any) => item.selectionRule).join(' '));
  const costs = pricing.sections.find((section: any) => section.id === 'kostnader').body[0];
  assert.ok(bind(costs).endsWith(edited.homepage.packages.externalCostsNote));
  assert.ok(!bind(pricing.faq[1].answer).includes('Vekst Pro Pro'));
});
