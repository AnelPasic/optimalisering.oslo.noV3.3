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
  edited.homepage.packages.items[2].pricePrefix = 'fra';
  const bind = createCommercialTextBinding(edited, pricing);
  assert.ok(bind(pricing.faq[0].answer).includes('Partner fra 14 900 kr/mnd'));
  assert.equal(bind('Partner fra 14 900 kr/mnd.'), 'Partner fra 14 900 kr/mnd.');
  assert.equal(bind('fra 4 500 kr/mnd'), 'fra 4 500 kr/mnd');
});
