import {homepageBlockEditor} from './helpers/pages-cms-json.ts';
import {getHomepageBlock} from '../src/lib/home-builder.ts';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import YAML from 'yaml';
import { resolveFeaturedProofVisual } from '../src/lib/proof-presentation.ts';
import { getPublishableCases } from '../src/lib/proof.ts';
import { pageSchema } from '../src/lib/content-schema.ts';
import { cmsJsonSave, entryForFile, assertPreservedContent, resolveField } from './helpers/pages-cms-json.ts';

const home = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));
const records = readdirSync('src/content/proof').filter(f => f.endsWith('.json')).map(f => JSON.parse(readFileSync(`src/content/proof/${f}`, 'utf8')));
const visual = { caseId: 'eurotents', src: '/images/proof/eurotents-ask-review.webp', alt: 'Ask-helårstelt fra Eurotents ved en innsjø.', positionX: 50, positionY: 50 };

test('presentation media binds only to its first publishable named case and cannot grant publication', () => {
  const slot = getHomepageBlock(home,'proof').content;
  const original = getPublishableCases(slot, records);
  assert.deepEqual(resolveFeaturedProofVisual(visual, slot, records), visual);
  for (const input of [undefined, {}, { ...visual, src: '' }, { ...visual, alt: '' }, { ...visual, src: '/images/proof/missing.webp' }, { ...visual, src: 'https://example.com/image.webp' }, { ...visual, src: '/images/proof/../home/hero-customer.webp' }]) assert.equal(resolveFeaturedProofVisual(input, slot, records), undefined);
  assert.equal(resolveFeaturedProofVisual(visual, { ...slot, publicationApproved: false }, records), undefined);
  assert.equal(resolveFeaturedProofVisual(visual, { ...slot, caseIds: ['nysta', 'eurotents'] }, records), undefined);
  for (const change of [{ publicationApproved: false }, { namingPermission: 'NEEDS_PERMISSION' }, { namingPermission: 'ANONYMIZED_APPROVED', anonymizedLabel: 'Anonymisert kunde' }, { strategyReviewStatus: 'READY_FOR_STRATEGY_REVIEW' }]) {
    assert.equal(resolveFeaturedProofVisual(visual, slot, records.map(record => record.id === 'eurotents' ? { ...record, ...change } : record)), undefined);
  }
  assert.deepEqual(getPublishableCases({ ...slot, featuredVisual: visual }, records), original);
});

test('safe homepage CMS image/crop edits and clearing preserve public projection and all authority', () => {
  const cms = YAML.parse(readFileSync('../.pages.yml', 'utf8'));
  const entry = entryForFile(cms, 'app/src/content/pages/home.json');
  const proof = homepageBlockEditor(cms,'proof');
  const field = resolveField(proof.fields.find((f: any) => f.name === 'featuredVisual'), cms.components);
  assert.equal(field.fields.find((f: any) => f.name === 'caseId').readonly, true);
  assert.equal(field.fields.find((f: any) => f.name === 'src').options.media, 'proofImages');
  assert.deepEqual(field.fields.map((f: any) => f.name), ['caseId', 'src', 'alt', 'positionX', 'positionY']);
  const original=structuredClone(home);getHomepageBlock(original,'proof').content.featuredVisual=visual;
  for (const edit of [{ ...visual, positionX: 25, positionY: 75, alt: 'Ask-telt fra Eurotents.' }, { ...visual, src: '' }, { ...visual, alt: '' }]) {
    const form = structuredClone(original); getHomepageBlock(form,'proof').content.featuredVisual = edit;
    const saved = JSON.parse(cmsJsonSave(original, form, entry, cms));
    assertPreservedContent(form, saved);
    const parsed = pageSchema.parse(saved);
    assert.deepEqual(getPublishableCases(getHomepageBlock(parsed,'proof').content, records), getPublishableCases(getHomepageBlock(home,'proof').content, records));
    assert.equal(saved.authority, home.authority);
    assert.deepEqual(getHomepageBlock(saved,'proof').content.caseIds, getHomepageBlock(home,'proof').content.caseIds);
    if (!edit.src || !edit.alt) assert.equal(resolveFeaturedProofVisual(getHomepageBlock(parsed,'proof').content.featuredVisual, getHomepageBlock(parsed,'proof').content, records), undefined);
    else assert.deepEqual(resolveFeaturedProofVisual(getHomepageBlock(parsed,'proof').content.featuredVisual, getHomepageBlock(parsed,'proof').content, records), edit);
  }
});
