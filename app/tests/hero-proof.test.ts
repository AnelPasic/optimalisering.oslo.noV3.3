import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { getHeroProof } from '../src/lib/hero-proof.ts';

const home = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));
const records = readdirSync('src/content/proof').filter(file => file.endsWith('.json')).map(file => JSON.parse(readFileSync(`src/content/proof/${file}`, 'utf8')));

test('hero uses only the guarded featured public result and source label', () => {
  assert.deepEqual(getHeroProof(home.homepage.proof, records), {
    metric: 'ROAS', comparison: '4,3x -> 17,2x', support: 'Eurotents · Google Ads',
  });
  const reordered = { ...home.homepage.proof, caseIds: ['nysta', 'eurotents'] };
  assert.deepEqual(getHeroProof(reordered, records), {
    metric: 'Fullført checkout', comparison: '7,1 % -> 43,6 %', support: 'Nysta · Shopify',
  });
});

test('hero disappears for absent, duplicate, unapproved or incomplete proof', () => {
  const eurotents = records.find(record => record.id === 'eurotents');
  const slot = { publicationApproved: true, caseIds: ['eurotents'] };
  for (const mutation of [
    { publicationApproved: false }, { publicationStatus: 'WITHDRAWN' },
    { namingPermission: 'NEEDS_PERMISSION' }, { strategyReviewStatus: 'READY_FOR_STRATEGY_REVIEW' },
    { period: { ...eurotents.period, comparable: false } }, { before: null },
    { limitations: null }, { permissionEvidence: null },
  ]) assert.equal(getHeroProof(slot, [{ ...eurotents, ...mutation }]), undefined);
  assert.equal(getHeroProof(slot, []), undefined);
  assert.equal(getHeroProof(slot, [eurotents, eurotents]), undefined);
  assert.equal(getHeroProof({ ...slot, publicationApproved: false }, records), undefined);
  assert.equal(getHeroProof({ ...slot, caseIds: [] }, records), undefined);
});

test('hero follows the first publishable selection and respects anonymized public names', () => {
  const eurotents = records.find(record => record.id === 'eurotents');
  const invalidFirst = records.map(record => record.id === 'eurotents' ? { ...record, publicationApproved: false } : record);
  assert.equal(getHeroProof(home.homepage.proof, invalidFirst)?.support, 'Nysta · Shopify');
  const anonymized = { ...eurotents, namingPermission: 'ANONYMIZED_APPROVED', anonymizedLabel: 'Norsk nettbutikk' };
  assert.equal(getHeroProof({ publicationApproved: true, caseIds: ['eurotents'] }, [anonymized])?.support, 'Norsk nettbutikk · Google Ads');
});
