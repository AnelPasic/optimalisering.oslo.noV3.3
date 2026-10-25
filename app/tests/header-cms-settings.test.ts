import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';
import { homeSectionDataSchema } from '../src/lib/home-section-data.ts';
import { cmsJsonSave, entryForFile } from './helpers/pages-cms-json.ts';

const original = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));
const cms = YAML.parse(readFileSync('../.pages.yml', 'utf8'));
const schema = homeSectionDataSchema.shape.chrome;
const cmsEntry = entryForFile(cms, 'app/src/content/pages/home.json');

test('Header CMS exposes all switches and one CTA label/link/variant selector', () => {
  const homepage = cmsEntry.fields.find((field: any) => field.name === 'homepage');
  const chrome = homepage.fields.find((field: any) => field.name === 'chrome');
  const options = chrome.fields.find((field: any) => field.name === 'headerOptions');
  assert.ok(options);
  for (const name of ['sticky', 'showLanguageSwitch', 'showSearch', 'showCta']) {
    const field = options.fields.find((value: any) => value.name === name);
    assert.equal(field?.type, 'boolean', name);
  }
  const cta = chrome.fields.find((field: any) => field.name === 'assessmentLink');
  assert.deepEqual(['label', 'href', 'variant'], cta.fields.map((field: any) => field.name));
  assert.equal(cta.fields.find((field: any) => field.name === 'variant')?.type, 'select');
});

test('Native CMS-equivalent save roundtrips false toggles and secondary CTA without touching content', () => {
  const edited = structuredClone(original);
  edited.homepage.chrome.headerOptions = {
    sticky: false, showLanguageSwitch: false, showSearch: false, showCta: false,
  };
  edited.homepage.chrome.assessmentLink = {
    label: 'Kontakt oss', href: '/kontakt/', variant: 'secondary',
  };
  const saved = JSON.parse(cmsJsonSave(original, edited, cmsEntry, cms));
  assert.deepEqual(saved.homepage.chrome.headerOptions, edited.homepage.chrome.headerOptions);
  assert.deepEqual(saved.homepage.chrome.assessmentLink, edited.homepage.chrome.assessmentLink);
  assert.deepEqual(schema.parse(saved.homepage.chrome), schema.parse(edited.homepage.chrome));
  assert.deepEqual(saved.sections, original.sections);
  assert.deepEqual(saved.hero, original.hero);
  assert.deepEqual(saved.homepage.chrome.navigation, original.homepage.chrome.navigation);
});

test('CTA accepts only supported palette variants', () => {
  for (const variant of ['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error']) {
    assert.equal(schema.safeParse({ ...original.homepage.chrome,
      assessmentLink: { ...original.homepage.chrome.assessmentLink, variant } }).success, true, variant);
  }
  assert.equal(schema.safeParse({ ...original.homepage.chrome,
    assessmentLink: { ...original.homepage.chrome.assessmentLink, variant: 'custom-pink' } }).success, false);
});

test('Header settings require actual booleans', () => {
  const chrome = structuredClone(original.homepage.chrome);
  chrome.headerOptions.sticky = 'true';
  assert.equal(schema.safeParse(chrome).success, false);
});
