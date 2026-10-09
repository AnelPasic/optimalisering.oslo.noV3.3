import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';
import { pageSchema } from '../src/lib/content-schema.ts';

const page = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));
const packages = page.homepage.packages;
const cms = YAML.parse(readFileSync('../.pages.yml', 'utf8'));
const homepageFields = cms.content.find((entry: any) => entry.name === 'homepage').fields.find((field: any) => field.name === 'homepage').fields;

test('shared CMS offer retains protected identity and bounded customer claims', () => {
  assert.deepEqual(packages.items.map((item: any) => item.key), ['optimalisering', 'vekst', 'partner']);
  assert.ok(!/Sprint|ubegrenset|bindingstid|oppsigelsestid|minimumsperiode|oppstartsgebyr|onboarding|fakturavilkår|\d+\s*(?:timer|h\/mnd)/i.test(JSON.stringify(packages).replace('Det betyr ikke at alt gjøres samtidig eller at kapasiteten er ubegrenset.', '')));
});

test('D-054 allows owner-edited work areas and shared cost rules through the same schema', () => {
  const edited = structuredClone(page);
  edited.homepage.packages.areas = ['Område A', 'Område B', 'Område C', 'Område D'];
  for (const key of ['foundationNote', 'adBudgetNote', 'externalCostsNote', 'separateWorkNote', 'capacityNote']) edited.homepage.packages[key] = `CMS ${key}`;
  assert.deepEqual(pageSchema.parse(edited).homepage!.packages.areas, edited.homepage.packages.areas);
  for (const key of ['foundationNote', 'adBudgetNote', 'externalCostsNote', 'separateWorkNote', 'capacityNote']) assert.equal(pageSchema.parse(edited).homepage!.packages[key as 'foundationNote'], edited.homepage.packages[key]);
});

test('D-024 keeps the exact free-check promise and approved bounded manual safeguards', () => {
  assert.equal(page.homepage.form.promise, 'Få våre 3 viktigste funn innen 2 virkedager.');
  const assessment = page.sections.find((section: any) => section.id === 'sjekk');
  assert.match(assessment.body.join(' '), /kort, manuell vurdering.*ikke en full revisjon, prognose eller gratis gjennomføring/);
  assert.equal(page.status, 'REVIEW_REQUIRED');
  assert.equal(page.authority, 'DRAFT / NON-AUTHORITATIVE');
  assert.ok(!/ikke avklart|ikke.*fastsatt/.test(page.faq.find((item: any) => item.question === 'Hva koster videre arbeid?').answer));
});

test('H-007 commercial CMS edits are typed and retain all intended fields', () => {
  assert.equal(pageSchema.safeParse(page).success, true);
  const packageFields = homepageFields.find((field: any) => field.name === 'packages').fields;
  for (const key of Object.keys(packages)) assert.ok(packageFields.some((field: any) => field.name === key), `CMS package field ${key}`);
  const itemFields = packageFields.find((field: any) => field.name === 'items').fields;
  for (const item of packages.items) for (const key of Object.keys(item)) assert.ok(itemFields.some((field: any) => field.name === key), `CMS package item ${key}`);
  assert.equal(homepageFields.find((field: any) => field.name === 'form').fields.find((field: any) => field.name === 'promise').type, 'string');
  for (const price of [-1, 4500.5, '4500', null]) {
    const edited = structuredClone(page);
    edited.homepage.packages.items[0].price = price;
    assert.equal(pageSchema.safeParse(edited).success, false, `invalid price ${price}`);
  }
  const edited = structuredClone(page);
  edited.homepage.packages.items[0].price = 5000;
  assert.equal(pageSchema.safeParse(edited).success, true, 'D-054 exposes the numeric price field; routing stays protected');
});
