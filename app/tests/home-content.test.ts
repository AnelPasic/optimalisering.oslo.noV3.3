import {getHomepageBlock} from '../src/lib/home-builder.ts';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pageSchema } from '../src/lib/content-schema.ts';

const fixture = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));

test('fixed homepage sections cannot be removed or duplicated', () => {
  assert.equal(pageSchema.safeParse(fixture).success, true);
  for (const id of ['mekanisme', 'passer', 'sjekk']) {
    const removed = structuredClone(fixture);
    removed.sections = removed.sections.filter((section: { id: string }) => section.id !== id);
    assert.equal(pageSchema.safeParse(removed).success, false, `required ${id} cannot be omitted`);
    const duplicated = structuredClone(fixture);
    duplicated.sections.push(duplicated.sections.find((section: { id: string }) => section.id === id));
    assert.equal(pageSchema.safeParse(duplicated).success, false, `duplicate ${id} would create duplicate anchors`);
  }
});

test('CMS calculator defaults must be accepted by the rendered input controls', () => {
  const edited = structuredClone(fixture);
  getHomepageBlock(edited,'calculator').content.defaults.visits = 1500.5;
  assert.equal(pageSchema.safeParse(edited).success, false, 'whole visits required by input step=1');
  getHomepageBlock(edited,'calculator').content.defaults.visits = 1500;
  getHomepageBlock(edited,'calculator').content.defaults.conversion = 1.5;
  assert.equal(pageSchema.safeParse(edited).success, true, 'fractional percentage is valid');
});

test('CMS section array accepts reordered composition', () => {
  const edited = structuredClone(fixture);
  [edited.sections[0], edited.sections[1]] = [edited.sections[1], edited.sections[0]];
  assert.equal(pageSchema.safeParse(edited).success, true);
});
