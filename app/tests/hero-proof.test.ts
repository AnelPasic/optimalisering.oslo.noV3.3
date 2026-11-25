import {getHomepageBlock} from '../src/lib/home-builder.ts';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { getHeroProof, getSelectedHeroProof } from '../src/lib/hero-proof.ts';
import {getPublishableCases} from '../src/lib/proof.ts';
import {resolvePageHero} from '../src/lib/page-hero.ts';
import {pageSchema} from '../src/lib/content-schema.ts';

const home = JSON.parse(readFileSync('src/content/pages/home.json', 'utf8'));
const records = readdirSync('src/content/proof').filter(file => file.endsWith('.json')).map(file => JSON.parse(readFileSync(`src/content/proof/${file}`, 'utf8')));

test('hero formats the guarded featured public result and follows an explicit reordered selection', () => {
  const slot=getHomepageBlock(home,'proof').content;
  const first=getPublishableCases(slot,records)[0];
  assert.ok(first);
  const featured=getHeroProof(slot,records);
  const [metric,...source]=first.dominantMetric.split(' - ');
  assert.equal(featured?.metric,metric);
  assert.equal(featured?.comparison,first.before+' -> '+first.after);
  assert.equal(featured?.support,[first.displayName,source.join(' - ')].filter(Boolean).join(' · '));
  const reordered={...slot,caseIds:['nysta','eurotents']};
  assert.deepEqual(getHeroProof(reordered,records),getHeroProof({...slot,caseIds:['nysta']},records));
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
  assert.deepEqual(getHeroProof({publicationApproved:true,caseIds:['eurotents','nysta']},invalidFirst),getHeroProof({publicationApproved:true,caseIds:['nysta']},records));
  const anonymized = { ...eurotents, namingPermission: 'ANONYMIZED_APPROVED', anonymizedLabel: 'Norsk nettbutikk' };
  const projected=getHeroProof({publicationApproved:true,caseIds:['eurotents']},[anonymized]);
  assert.ok(projected);
  assert.ok(projected.support.startsWith('Norsk nettbutikk'));
  assert.ok(!projected.support.includes(eurotents.clientName));
});

test('an independently selected Hero proof on any page uses the existing publication guard',()=>{
 const service=JSON.parse(readFileSync('src/content/pages/synlighet.json','utf8'));
 const withSelection={...service,hero:{...service.hero,featuredProofCaseId:'eurotents'}};
 assert.equal(pageSchema.safeParse(withSelection).success,true);
 assert.equal(resolvePageHero(withSelection).featuredProofCaseId,'eurotents');
 const slot={publicationApproved:true,caseIds:[withSelection.hero.featuredProofCaseId]};
 assert.ok(getHeroProof(slot,records),'approved case has a public projection');
 const master=getHomepageBlock(home,'proof').content;
 assert.deepEqual(getSelectedHeroProof('eurotents',master,records),getHeroProof(slot,records));
 assert.equal(getSelectedHeroProof('eurotents',{...master,publicationApproved:false},records),undefined);
 assert.equal(getSelectedHeroProof('eurotents',{...master,caseIds:['nysta']},records),undefined);
 assert.equal(getSelectedHeroProof('eurotents',master,records.map(x=>x.id==='eurotents'?{...x,publicationApproved:false}:x)),undefined);
 assert.equal(getHeroProof(slot,records.map(x=>x.id==='eurotents'?{...x,publicationApproved:false}:x)),undefined);
 assert.equal(getHeroProof(slot,records.map(x=>x.id==='eurotents'?{...x,publicationStatus:'WITHDRAWN'}:x)),undefined);
 assert.equal(getHeroProof(slot,records.filter(x=>x.id!=='eurotents')),undefined);
 const noSelection=structuredClone(service);delete noSelection.hero.featuredProofCaseId;
 const withoutSelection=resolvePageHero(noSelection);
 assert.equal(withoutSelection.featuredProofCaseId,undefined);
 assert.equal(getHeroProof({publicationApproved:true,caseIds:[]},records),undefined);
});
