import {getGlobalElement,homepageBlockSchema} from '../src/lib/home-builder.ts';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pageSchema } from '../src/lib/content-schema.ts';

const fixture = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));

test('fixed homepage sections cannot be removed or duplicated', () => {
  assert.equal(pageSchema.safeParse(fixture).success, true);
  for (const id of ['mekanisme', 'passer', 'sjekk']) {
    const removed = structuredClone(fixture);
    delete removed.sections[id];
    assert.equal(pageSchema.safeParse(removed).success, false, `required ${id} cannot be omitted`);
    const duplicated = structuredClone(fixture);
    duplicated.sections.clone=duplicated.sections[id];
    assert.equal(pageSchema.safeParse(duplicated).success, false, `duplicate ${id} would create duplicate anchors`);
  }
});

test('CMS calculator defaults must be accepted by the rendered input controls', () => {
  const edited = getGlobalElement('regneeksempel');
  edited.content.defaults.visits = 1500.5;
  assert.equal(homepageBlockSchema.safeParse(edited).success, false, 'whole visits required');
  edited.content.defaults.visits = 1500;
  edited.content.defaults.conversion = 1.5;
  assert.equal(homepageBlockSchema.safeParse(edited).success, true, 'fractional percentage is valid');
});

test('fixed source property order cannot silently change rendered original order', () => {
  const edited = structuredClone(fixture);
  edited.sections=Object.fromEntries(Object.entries(edited.sections).reverse());
  assert.deepEqual(pageSchema.parse(edited).sections.map(s=>s.id),pageSchema.parse(fixture).sections.map(s=>s.id));
});
