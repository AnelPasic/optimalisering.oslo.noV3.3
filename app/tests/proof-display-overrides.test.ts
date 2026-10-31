import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import YAML from 'yaml';
import {proofDisplayOverridesSchema,applyProofDisplayOverride} from '../src/lib/proof-presentation.ts';
import {getPublishableCases} from '../src/lib/proof.ts';
import {homepageBlockSchema} from '../src/lib/home-builder.ts';
import {cmsJsonSave,entryForFile,assertPreservedContent} from './helpers/pages-cms-json.ts';

const source=JSON.parse(readFileSync('src/content/global-elements/resultater.json','utf8'));
const registry=readdirSync('src/content/proof').filter(p=>p.endsWith('.json')).map(p=>JSON.parse(readFileSync('src/content/proof/'+p,'utf8')));
const nysta=getPublishableCases({...source.content,caseIds:['nysta']},registry)[0];

test('no override leaves locked case values, periods and name untouched',()=>{
  const original=getPublishableCases(source.content,registry);
  assert.equal(original.length,3);
  assert.deepEqual(proofDisplayOverridesSchema.parse(undefined),[]);
  assert.deepEqual(applyProofDisplayOverride(nysta,'nysta',[],registry),nysta);
  assert.deepEqual(getPublishableCases({...source.content,displayOverrides:[{caseId:'nysta',displayName:'nysta.no'}]},registry),original);
});

test('optional presentation name can differ without changing the approved registry',()=>{
  const override=proofDisplayOverridesSchema.parse([{caseId:'nysta',displayName:'nysta.no'}]);
  const shown=applyProofDisplayOverride(nysta,'nysta',override,registry);
  assert.equal(shown.displayName,'nysta.no');
  assert.equal(shown.before,nysta.before);
  assert.equal(shown.after,nysta.after);
  assert.equal(nysta.displayName,'Nysta');
  assert.equal(registry.find(r=>r.id==='nysta').clientName,'Nysta');
});

test('edited measurements require a source note, cannot bypass approved publication',()=>{
  assert.equal(proofDisplayOverridesSchema.safeParse([{caseId:'nysta',before:'5 %'}]).success,false);
  assert.equal(proofDisplayOverridesSchema.safeParse([{caseId:'nysta',dominantMetric:'Andre måltall'}]).success,false);
  const custom=proofDisplayOverridesSchema.parse([{caseId:'nysta',before:'5 %',after:'15 %',periodAfter:'mai 2026',sourceNote:'Rapport 2026-05, bekreftet av ansvarlig'}]);
  const shown=applyProofDisplayOverride(nysta,'nysta',custom,registry);
  assert.equal(shown.before,'5 %');
  assert.equal(shown.after,'15 %');
  assert.equal(shown.period.after,'mai 2026');
  assert.equal(shown.delta,null,'old approved delta cannot be reused for changed values');
  assert.equal('sourceNote' in shown,false,'internal provenance must never render');
  assert.equal(getPublishableCases({publicationApproved:false,caseIds:['nysta']},registry).length,0);
  assert.deepEqual(applyProofDisplayOverride(nysta,'nysta',custom,registry.map(r=>r.id==='nysta'?{...r,namingPermission:'NEEDS_PERMISSION'}:r)),nysta);
  assert.equal(proofDisplayOverridesSchema.safeParse([{caseId:'nysta',displayName:'Nysta'},{caseId:'nysta',displayName:'nysta.no'}]).success,false);
});

test('anonymous naming cannot be overridden and invalid field values reject',()=>{
  const anonymous=registry.map(r=>r.id==='nysta'?{...r,namingPermission:'ANONYMIZED_APPROVED',anonymizedLabel:'Nettbutikk'}:r);
  const custom=proofDisplayOverridesSchema.parse([{caseId:'nysta',displayName:'nysta.no'}]);
  assert.deepEqual(applyProofDisplayOverride(nysta,'nysta',custom,anonymous),nysta);
  assert.equal(proofDisplayOverridesSchema.safeParse([{caseId:'nysta',displayName:' '.repeat(130)}]).success,false);
  assert.equal(proofDisplayOverridesSchema.safeParse([{caseId:'nysta',displayName:'',before:''}]).success,true,'empty form fields fall back');
});

test('global Kunderesultater CMS can save optional per-case overrides without deleting original fields',()=>{
  const cms=YAML.parse(readFileSync('../.pages.yml','utf8'));
  const globalProof=cms.content.find((e:any)=>e.name==='globalElements').items.find((e:any)=>e.name==='globalProof');
  const content=globalProof.fields.find((f:any)=>f.name==='content');
  const override=content.fields.find((f:any)=>f.name==='displayOverrides');
  assert.equal(override.type,'object');
  assert.ok(override.list);
  assert.deepEqual(override.fields.map((f:any)=>f.name),['caseId','displayName','dominantMetric','before','after','delta','periodBefore','periodAfter','sourceNote']);
  const entry=entryForFile(cms,'app/src/content/global-elements/resultater.json');
  const edit=structuredClone(source);
  edit.content.displayOverrides=[{caseId:'nysta',displayName:'nysta.no'}];
  const saved=JSON.parse(cmsJsonSave(source,edit,entry,cms));
  assertPreservedContent(edit,saved);
  assert.equal(homepageBlockSchema.options[3].parse(saved).content.displayOverrides[0].displayName,'nysta.no');
  assert.deepEqual(saved.content.caseIds,source.content.caseIds);
  assert.deepEqual(saved.content.caseVisuals,source.content.caseVisuals);
});
