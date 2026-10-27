import {getHomepageBlock} from '../src/lib/home-builder.ts';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { getHeroProof } from '../src/lib/hero-proof.ts';
import {resolvePageHero} from '../src/lib/page-hero.ts';
import {pageSchema} from '../src/lib/content-schema.ts';

const home = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));
const records = readdirSync('src/content/proof').filter(file => file.endsWith('.json')).map(file => JSON.parse(readFileSync(`src/content/proof/${file}`, 'utf8')));

test('hero uses only the guarded featured public result and source label', () => {
  assert.deepEqual(getHeroProof(getHomepageBlock(home,'proof').content, records), {
    metric: 'ROAS', comparison: '4,3x -> 17,2x', support: 'Eurotents · Google Ads',
  });
  const reordered = { ...getHomepageBlock(home,'proof').content, caseIds: ['nysta', 'eurotents'] };
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
  assert.equal(getHeroProof(getHomepageBlock(home,'proof').content, invalidFirst)?.support, 'Nysta · Shopify');
  const anonymized = { ...eurotents, namingPermission: 'ANONYMIZED_APPROVED', anonymizedLabel: 'Norsk nettbutikk' };
  assert.equal(getHeroProof({ publicationApproved: true, caseIds: ['eurotents'] }, [anonymized])?.support, 'Norsk nettbutikk · Google Ads');
});

test('an independently selected Hero proof on any page uses the existing publication guard',()=>{
 const service=JSON.parse(readFileSync('src/content/pages/synlighet.json','utf8'));
 const withSelection={...service,hero:{...service.hero,featuredProofCaseId:'eurotents'}};
 assert.equal(pageSchema.safeParse(withSelection).success,true);
 assert.equal(resolvePageHero(withSelection).featuredProofCaseId,'eurotents');
 const slot={publicationApproved:true,caseIds:[withSelection.hero.featuredProofCaseId]};
 assert.deepEqual(getHeroProof(slot,records),{
   metric:'ROAS',comparison:'4,3x -> 17,2x',support:'Eurotents · Google Ads'
 });
 assert.equal(getHeroProof(slot,records.map(x=>x.id==='eurotents'?{...x,publicationApproved:false}:x)),undefined);
 assert.equal(getHeroProof(slot,records.map(x=>x.id==='eurotents'?{...x,publicationStatus:'WITHDRAWN'}:x)),undefined);
 assert.equal(getHeroProof(slot,records.filter(x=>x.id!=='eurotents')),undefined);
 const withoutSelection=resolvePageHero(service);
 assert.equal(withoutSelection.featuredProofCaseId,undefined);
 assert.equal(getHeroProof({publicationApproved:true,caseIds:[]},records),undefined);
});
