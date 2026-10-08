import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pageSchema } from '../src/lib/content-schema.ts';

const fixture = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));

test('CMS edits cannot remove or duplicate a required homepage section', () => {
  assert.equal(pageSchema.safeParse(fixture).success, true);
  for (const id of ['mekanisme', 'passer', 'sjekk', 'medon']) {
    const removed = structuredClone(fixture);
    removed.sections = removed.sections.filter((section: { id: string }) => section.id !== id);
    assert.equal(pageSchema.safeParse(removed).success, false, `missing ${id} must fail before render`);
    const duplicated = structuredClone(fixture);
    duplicated.sections.push(duplicated.sections.find((section: { id: string }) => section.id === id));
    assert.equal(pageSchema.safeParse(duplicated).success, false, `duplicate ${id} would create duplicate anchors`);
  }
});

test('CMS calculator defaults must be accepted by the rendered input controls', () => {
  const edited = structuredClone(fixture);
  edited.homepage.calculator.defaults.visits = 1500.5;
  assert.equal(pageSchema.safeParse(edited).success, false, 'whole visits required by input step=1');
  edited.homepage.calculator.defaults.visits = 1500;
  edited.homepage.calculator.defaults.conversion = 1.5;
  assert.equal(pageSchema.safeParse(edited).success, true, 'fractional percentage is valid');
});

test('CMS section order cannot reverse the diagnostic and qualification sequence', () => {
  const edited = structuredClone(fixture);
  [edited.sections[0], edited.sections[1]] = [edited.sections[1], edited.sections[0]];
  assert.equal(pageSchema.safeParse(edited).success, false);
});
