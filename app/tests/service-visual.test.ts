import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pageSchema } from '../src/lib/content-schema.ts';
import YAML from 'yaml';
const fixture = JSON.parse(readFileSync('src/content/pages/synlighet.json', 'utf8'));
test('CMS service visual accepts optional content and rejects external paths, missing alt and invalid crops', () => {
  assert.equal(pageSchema.safeParse(fixture).success, true);
  const valid = { kind: 'illustration', src: '/images/services/visibility.webp', alt: 'Relevant business discovered', positionX: 50, positionY: 50 };
  const parsed = pageSchema.parse({ ...fixture, heroVisual: valid });
  assert.deepEqual(parsed.heroVisual, valid, 'CMS visual must survive schema parsing');
  for (const changes of [{ src: 'https://example.com/image.webp' }, { src: '/images/home/hero-customer.webp' }, { src: '/images/services/../home/a.webp' }, { alt: '' }, { positionX: -1 }, { positionY: 101 }, { kind: 'dashboard' }]) {
    assert.equal(pageSchema.safeParse({ ...fixture, heroVisual: { ...valid, ...changes } }).success, false);
  }
});
test('CMS exposes the visual contract without moving SEO fields or making company disclosure casual copy', () => {
  const cms = YAML.parse(readFileSync('../.pages.yml', 'utf8'));
  const fields = cms.content.find((item: any) => item.name === 'services').fields;
  assert.deepEqual(fields.find((field: any) => field.name === 'seo').fields.map((field: any) => field.name), ['title', 'description']);
  assert.deepEqual(fields.find((field: any) => field.name === 'heroVisual').fields.map((field: any) => field.name), ['kind', 'src', 'alt', 'positionX', 'positionY']);
  assert.equal(cms.media.find((item: any) => item.name === 'serviceHeroImages').input, 'app/public/images/services');
  const home = cms.content.find((item: any) => item.name === 'homepage');
  const chrome = home.fields.find((field: any) => field.name === 'homepage').fields.find((field: any) => field.name === 'chrome');
  assert.equal(chrome.fields.find((field: any) => field.name === 'providerText').readonly, true);
});
