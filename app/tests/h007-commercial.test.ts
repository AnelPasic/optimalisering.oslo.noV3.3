import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';
import { pageSchema } from '../src/lib/content-schema.ts';

const page = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));
const packages = page.homepage.packages;
const cms = YAML.parse(readFileSync('../.pages.yml', 'utf8'));
const homepageFields = cms.content.find((entry: any) => entry.name === 'homepage').fields.find((field: any) => field.name === 'homepage').fields;

test('H-007 renders the exact reconfirmed ladder, VAT and Vekst recommendation', () => {
  assert.deepEqual(packages.items.map((item: any) => [item.title, item.price, item.priceSuffix, item.vatSuffix, item.recommended]), [
    ['Optimalisering', 4500, 'kr/mnd', 'eks. mva.', false],
    ['Vekst', 6900, 'kr/mnd', 'eks. mva.', true],
    ['Partner', 14900, 'kr/mnd', 'eks. mva.', false],
  ]);
  assert.deepEqual(packages.items.map((item: any) => item.descriptor), ['Ett prioritert hovedområde', 'To områder som jobber sammen', 'Helheten + større kapasitet']);
  assert.equal(packages.items[1].badge, 'Anbefalt');
  assert.ok(!/Sprint|ubegrenset|bindingstid|oppsigelsestid|minimumsperiode|oppstartsgebyr|onboarding|fakturavilkår|\d+\s*(?:timer|h\/mnd)/i.test(JSON.stringify(packages)));
});

test('H-007 keeps four work areas, shared measurement, budget and separate-cost rules', () => {
  assert.deepEqual(packages.areas, ['Konvertering', 'Synlighet: SEO + Lokal SEO + AI-søk / AI-synlighet', 'Google Ads', 'Meta Ads']);
  assert.equal(packages.adBudgetNote, 'Annonsebudsjett kommer i tillegg.');
  assert.match(packages.foundationNote, /Måling & sporing/);
  assert.match(packages.externalCostsNote, /tillegg.*avtalt/);
  assert.match(packages.separateWorkNote, /landingssider.*nettsider.*teknisk arbeid.*redesign.*prises separat/);
  assert.match(packages.capacityNote, /Ubrukt kapasitet.*ikke/);
});

test('H-007 adds the supplied free-check promise and retains manual bounded safeguards', () => {
  assert.equal(page.homepage.form.promise, 'Få våre 3 viktigste funn innen 2 virkedager.');
  const assessment = page.sections.find((section: any) => section.id === 'sjekk');
  assert.match(assessment.body.join(' '), /avgrenset, manuell.*Ingen automatisk poengsum, full revisjon, prognose eller gratis gjennomføring/);
  assert.equal(page.status, 'REVIEW_REQUIRED');
  assert.equal(page.authority, 'DRAFT / NON-AUTHORITATIVE');
  assert.ok(!/ikke avklart|ikke.*fastsatt/.test(page.faq.find((item: any) => item.question === 'Hva koster videre arbeid?').answer));
});

test('H-007 commercial CMS edits are typed and retain all intended fields', () => {
  assert.equal(pageSchema.safeParse(page).success, true);
  const packageFields = homepageFields.find((field: any) => field.name === 'packages').fields;
  for (const key of Object.keys(packages)) assert.ok(packageFields.some((field: any) => field.name === key), `CMS package field ${key}`);
  const itemFields = packageFields.find((field: any) => field.name === 'items').fields;
  for (const key of Object.keys(packages.items[0])) assert.ok(itemFields.some((field: any) => field.name === key), `CMS package item ${key}`);
  assert.equal(homepageFields.find((field: any) => field.name === 'form').fields.find((field: any) => field.name === 'promise').type, 'string');
  for (const price of [-1, 4500.5, '4500', null]) {
    const edited = structuredClone(page);
    edited.homepage.packages.items[0].price = price;
    assert.equal(pageSchema.safeParse(edited).success, false, `invalid price ${price}`);
  }
  const edited = structuredClone(page);
  edited.homepage.packages.items[0].price = 5000;
  assert.equal(pageSchema.safeParse(edited).success, true, 'CMS can change a price without component edits after a scoped commercial instruction');
});
