import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';
import { cmsJsonSave, entryForFile } from './helpers/pages-cms-json.ts';

// Configuration-only test. Does not claim authenticated Pages CMS Save or Worker deployment.
const read = (path: string) => readFileSync(path, 'utf8');
const cms = YAML.parse(read('../.pages.yml'));
const entry = entryForFile(cms, 'coordination/CONTENT-TONE.json');
const raw = read('../coordination/CONTENT-TONE.json');
const settings = JSON.parse(raw);
const presets = ['noktern', 'medon', 'spiss'];
const overrides = ['inherit', ...presets];
const overridesFields = ['heroPreset', 'servicePreset', 'explanationPreset', 'faqPreset'];

test('one native Pages CMS editor safely owns tone preferences outside rendered site content', () => {
  assert.equal(entry?.name, 'contentTone');
  assert.equal(entry?.type, 'file');
  assert.equal(entry?.format, 'json');
  assert.deepEqual(entry?.operations, { create: false, rename: false, delete: false });
  assert.equal(cms.content.filter((x: any) => x.name === 'contentTone').length, 1);
  assert.equal(entry.fields.find((x: any) => x.name === 'defaultPreset').type, 'select');
  assert.deepEqual(entry.fields.find((x: any) => x.name === 'defaultPreset').options.values.map((x: any) => x.name), presets);
  for (const name of overridesFields) {
    const field = entry.fields.find((x: any) => x.name === name);
    assert.equal(field.required, true);
    assert.deepEqual(field.options.values.map((x: any) => x.name), overrides);
  }
  assert.equal(settings.defaultPreset, 'medon');
  assert.equal(settings.explanationPreset, 'spiss');
  assert.ok(settings.editorNotes);
});

test('changing just one tone selector preserves every other preference and existing source content', () => {
  const change = structuredClone(settings);
  change.servicePreset = 'spiss';
  const saved = JSON.parse(cmsJsonSave(settings, change, entry, cms));
  assert.deepEqual(saved, change);
  assert.equal(saved.heroPreset, settings.heroPreset);
  assert.equal(saved.defaultPreset, settings.defaultPreset);
  assert.equal(saved.explanationPreset, settings.explanationPreset);
  assert.equal(read('../coordination/CONTENT-TONE.json'), raw, 'read-only CMS fixture never writes');
  const invalid = structuredClone(change);
  invalid.defaultPreset = 'unapproved' as never;
  assert.throws(() => cmsJsonSave(settings, invalid, entry, cms), /select choice/);
  invalid.defaultPreset = 'medon';
  invalid.servicePreset = 'unapproved' as never;
  assert.throws(() => cmsJsonSave(settings, invalid, entry, cms), /select choice/);
});

test('voice selector must be loaded by content agents, not treated as a public automatic rewrite trigger', () => {
  const agent = read('../AGENTS.md');
  const profile = read('../coordination/CONTENT-VOICE-PROFILE.md');
  assert.match(agent, /CONTENT-TONE\.json/);
  assert.match(profile, /CONTENT-TONE\.json/);
  assert.match(profile, /automatisk|automatically|automatic/i);
});
