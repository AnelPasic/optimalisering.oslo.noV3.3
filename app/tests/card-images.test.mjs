import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import YAML from 'yaml';
import { cardImageSchema, resolveCardImage } from '../src/lib/card-image.ts';
import { pageSchema } from '../src/lib/content-schema.ts';
import { sharedContentSchema } from '../src/lib/shared-content.ts';

test('local and global Cards retain CMS images and allow clearing the image', () => {
  const raw = JSON.parse(readFileSync('src/content/pages/chatgpt-ads.json', 'utf8'));
  const section = raw.sections.find(section => section._block === 'content' && section.items?.length);
  const image = { src:'/images/cards/fixture.webp', alt:'A sample card image', positionX:25, positionY:70 };
  const global = {
    _block:'content', id:'card-image-fixture', name:'Card image fixture',
    uid:'bbd0396c-8f26-4abc-b699-57b54da78004', heading:'Card image fixture',
    items:[{...section.items[0], image:[image]}],
  };
  section.items[0].image = [image];
  const parsed = pageSchema.parse(raw).sections.find(candidate => candidate.id === section.id);
  assert.deepEqual(parsed.items[0].image, image);
  assert.deepEqual(sharedContentSchema.parse(global).items[0].image, image);
  section.items[0].image = [];
  global.items[0].image = [];
  assert.equal(pageSchema.parse(raw).sections.find(candidate => candidate.id === section.id).items[0].image, undefined);
  assert.equal(sharedContentSchema.parse(global).items[0].image, undefined);
  assert.deepEqual(cardImageSchema.parse(image), image);
  const cms = YAML.parse(readFileSync('../.pages.yml', 'utf8'));
  assert.equal(cms.components.cardImage.list.max, 1);
  assert.equal(cms.components.cardImage.fields.find(field => field.name === 'src').required, true);
  assert.equal(cms.components.cardImage.fields.find(field => field.name === 'alt').required, true);
  const localCards = cms.components.sectionContent.fields.find(field => field.name === 'items');
  for (const editor of [localCards, cms.components.globalMarkdownItems]) {
    assert.equal(editor.fields.find(field => field.name === 'image').component, 'cardImage');
  }
});

test('card images require an accessible description and an existing local image', () => {
  const file = readdirSync('public/images', {recursive:true}).find(file => /\.(webp|png|jpe?g|avif|svg)$/.test(file));
  assert.ok(file);
  const image = {src:'/images/' + file.replaceAll('\\', '/'), alt:'A sample card image'};
  assert.equal(resolveCardImage(image)?.src, image.src);
  assert.equal(resolveCardImage({...image,src:'/images/cards/missing-fixture.webp'}), undefined);
  assert.equal(cardImageSchema.safeParse({...image,alt:' '}).success, false);
  assert.equal(cardImageSchema.safeParse({...image,src:'https://example.com/image.webp'}).success, false);
  assert.equal(cardImageSchema.safeParse({...image,src:'/images/../private/image.webp'}).success, false);
  assert.equal(cardImageSchema.safeParse([image,image]).success, false);
  assert.equal(cardImageSchema.parse(null), undefined);
});
