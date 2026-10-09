import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';
import { pageSchema } from '../src/lib/content-schema.ts';
const home = JSON.parse(readFileSync('src/content/pages/home.json','utf8'));
test('three independent package assets and structured icons survive schema with strict local paths', () => {
  const fixture = structuredClone(home);
  fixture.homepage.packages.items.forEach((item: any, index: number) => {
    item.visualAsset = { src: `/images/pricing/option-${index}.svg`, alt: 'Conceptual growth', positionX: 50, positionY: 50 };
    item.iconItems = [{ icon: 'search', label: 'SEO / AI-synlighet', compactLabel: 'SEO / AI-synlighet' }];
  });
  const parsed = pageSchema.parse(fixture);
  for (let i=0;i<3;i++) {
    assert.deepEqual(parsed.homepage!.packages.items[i].visualAsset, fixture.homepage.packages.items[i].visualAsset);
    assert.deepEqual(parsed.homepage!.packages.items[i].iconItems, fixture.homepage.packages.items[i].iconItems);
  }
  for (const changes of [{ src: 'https://example.test/a.svg' }, { src: '/images/home/hero-customer.webp' }, { src: '/images/pricing/../a.svg' }, { src: '/images/pricing/a.html' }, { alt: '' }, { positionX: -1 }]) {
    const invalid = structuredClone(fixture); Object.assign(invalid.homepage.packages.items[0].visualAsset,changes);
    assert.equal(pageSchema.safeParse(invalid).success,false);
  }
  const invalid=structuredClone(fixture); invalid.homepage.packages.items[0].iconItems[0].icon='emoji';
  assert.equal(pageSchema.safeParse(invalid).success,false);
});
test('CMS exposes dedicated pricing media, structured icons and safe readonly order paths', () => {
  const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
  assert.equal(cms.media.find((m: any)=>m.name==='packageVisuals')?.input,'app/public/images/pricing');
  const fields=cms.content.find((c: any)=>c.name==='homepage').fields.find((f: any)=>f.name==='homepage').fields.find((f: any)=>f.name==='packages').fields.find((f: any)=>f.name==='items').fields;
  assert.ok(fields.find((f: any)=>f.name==='visualAsset'));
  assert.ok(fields.find((f: any)=>f.name==='iconItems'));
  assert.equal(fields.find((f: any)=>f.name==='cta').fields.find((f: any)=>f.name==='href').readonly,true);
});
