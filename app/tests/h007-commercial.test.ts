import {homepageBlockEditor} from './helpers/pages-cms-json.ts';
import {getHomepageBlock, getGlobalElement, homepageBlockSchema} from '../src/lib/home-builder.ts';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';
import { pageSchema } from '../src/lib/content-schema.ts';

const page = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));
const packages = getHomepageBlock(page,'packages').content;
const cms = YAML.parse(readFileSync('../.pages.yml', 'utf8'));
const packageEditor=homepageBlockEditor(cms,'packages');

test('shared CMS offer retains protected identity and bounded customer claims', () => {
  assert.deepEqual(packages.items.map((item: any) => item.key), ['optimalisering', 'vekst', 'partner']);
  assert.ok(!/Sprint|ubegrenset|bindingstid|oppsigelsestid|minimumsperiode|oppstartsgebyr|onboarding|fakturavilkår|\d+\s*(?:timer|h\/mnd)/i.test(JSON.stringify(packages).replace('Det betyr ikke at alt gjøres samtidig eller at kapasiteten er ubegrenset.', '')));
});

test('D-054 allows owner-edited work areas and shared cost rules through the same schema', () => {
  const edited = getGlobalElement('priser');
  edited.content.areas = ['Område A', 'Område B', 'Område C', 'Område D'];
  for (const key of ['foundationNote', 'adBudgetNote', 'externalCostsNote', 'separateWorkNote', 'capacityNote'] as const) edited.content[key] = `CMS ${key}`;
  const parsed = homepageBlockSchema.parse(edited); assert.equal(parsed._block,'packages');
  if(parsed._block==='packages') assert.deepEqual(parsed.content,edited.content);
});

test('D-024 keeps the exact free-check promise and approved bounded manual safeguards', () => {
  assert.equal(getHomepageBlock(page,'assessment').content.form.promise, 'Få våre 3 viktigste funn innen 2 virkedager.');
  const assessment = getHomepageBlock(page,'assessment').content.section;
  assert.match(assessment.body.join(' '), /kort, manuell vurdering.*ikke en full revisjon, prognose eller gratis gjennomføring/);


  assert.ok(!/ikke avklart|ikke.*fastsatt/.test(getHomepageBlock(page,'faq').content.items.find((item: any) => item.question === 'Hva koster videre arbeid?')!.answer));
});

test('H-007 commercial CMS edits are typed and retain all intended fields', () => {
  assert.equal(pageSchema.safeParse(page).success, true);
  const packageFields = packageEditor.fields;
  for (const key of Object.keys(packages)) assert.ok(packageFields.some((field: any) => field.name === key), `CMS package field ${key}`);
  const itemFields = packageFields.find((field: any) => field.name === 'items').fields;
  for (const item of packages.items) for (const key of Object.keys(item)) assert.ok(itemFields.some((field: any) => field.name === key), `CMS package item ${key}`);
  assert.equal(homepageBlockEditor(cms,'assessment').fields.find((field:any)=>field.name==='form').fields.find((field: any) => field.name === 'promise').type, 'string');
  for (const price of [-1, 4500.5, '4500', null]) {
    const edited = getGlobalElement('priser');
    (edited.content.items[0] as any).price = price;
    assert.equal(homepageBlockSchema.safeParse(edited).success, false, `invalid price ${price}`);
  }
  const edited = getGlobalElement('priser');
  edited.content.items[0].price = 5000;
  assert.equal(homepageBlockSchema.safeParse(edited).success, true, 'D-054 exposes the numeric price field; routing stays protected');
});
