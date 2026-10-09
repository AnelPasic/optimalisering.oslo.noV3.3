import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import YAML from 'yaml';
import { proofCaseSchema, proofContentSchema, getPublishableCases } from '../src/lib/proof.ts';

// Memory-only synthetic fixture. It never belongs to an Astro content collection.
const complete = {
  id: 'synthetic-proof', clientName: 'Synthetic fixture', anonymizedLabel: 'An approved anonymous business', relationship: null,
  dominantMetric: 'Measured enquiries', before: '10', after: '15', delta: '+50%',
  period: { before: '2025-01', after: '2025-02', comparable: true }, intervention: 'Synthetic comparison change',
  source: 'Memory-only unit test', limitations: 'Comparison does not establish exclusive causation.',
  namingPermission: 'NAME_APPROVED', permissionEvidence: 'Memory-only permission fixture',
  strategyReviewStatus: 'CONTENT_LOCKED', strategyReviewEvidence: 'Memory-only exact-presentation review fixture',
  artifactStatus: 'NOT_IMPORTED', artifactReferences: [], evidenceMetrics: [],
  publicationStatus: 'PUBLISHABLE', publicationApproved: true,
};
const slot = { publicationApproved: true, caseIds: ['synthetic-proof'] };

test('CMS preserves the existing page CTA and exposes only declared proof fields', () => {
  const config = YAML.parse(readFileSync('../.pages.yml', 'utf8'));
  assert.equal(config.content.find((entry: any) => entry.name === 'services').fields.find((field: any) => field.name === 'cta')?.component, 'link');
  const proofFields = config.content.find((entry: any) => entry.name === 'proofCases').fields;
  assert.deepEqual(proofFields.map((field: any) => field.name).sort(), Object.keys(complete).sort());
});

test('proof renders only explicitly selected, complete, permitted and approved records', () => {
  const result = getPublishableCases(slot, [complete]);
  assert.equal(result.length, 1);
  assert.equal(result[0].displayName, 'Synthetic fixture');
  for (const unsafeSlot of [undefined, {}, { caseIds: slot.caseIds }, { ...slot, publicationApproved: false }, { ...slot, publicationApproved: 'true' }, { ...slot, caseIds: [] }, { ...slot, caseIds: ['missing'] }]) {
    assert.deepEqual(getPublishableCases(unsafeSlot, [complete]), []);
  }
  assert.deepEqual(getPublishableCases(slot, [complete, complete]), [], 'ambiguous duplicated IDs fail closed');
  for (const publicationStatus of ['EVIDENCE_ONLY', 'REVIEW_REQUIRED', 'WITHDRAWN']) {
    assert.deepEqual(getPublishableCases(slot, [{ ...complete, publicationStatus }]), []);
  }
  for (const publicationApproved of [false, undefined, 'true', 1]) {
    assert.deepEqual(getPublishableCases(slot, [{ ...complete, publicationApproved }]), []);
  }
  assert.deepEqual(getPublishableCases(slot, [{ ...complete, namingPermission: 'NEEDS_PERMISSION' }]), []);
  assert.deepEqual(getPublishableCases(slot, [{ ...complete, namingPermission: 'GRANTED' }])[0]?.displayName, complete.clientName, 'OWNER-confirmed named-case permission is recognized');
  assert.deepEqual(getPublishableCases(slot, [{ ...complete, namingPermission: 'GRANTED', strategyReviewStatus: 'READY_FOR_STRATEGY_REVIEW' }]), [], 'permission alone does not approve exact public presentation');
  assert.deepEqual(getPublishableCases(slot, [{ ...complete, period: { ...complete.period, comparable: false } }]), []);
});

test('missing fields, empty proof requirements and flags cannot bypass publication', () => {
  for (const key of Object.keys(complete)) {
    const incomplete: any = structuredClone(complete);
    delete incomplete[key];
    assert.deepEqual(getPublishableCases(slot, [incomplete]), [], `missing ${key}`);
  }
  for (const key of ['clientName', 'dominantMetric', 'before', 'after', 'intervention', 'source', 'limitations', 'permissionEvidence', 'strategyReviewEvidence']) {
    assert.deepEqual(getPublishableCases(slot, [{ ...complete, [key]: '   ' }]), [], `empty ${key}`);
  }
  for (const key of ['before', 'after']) assert.deepEqual(getPublishableCases(slot, [{ ...complete, period: { ...complete.period, [key]: null } }]), []);
  const previous = process.env.PUBLISH_PROOF;
  try {
    process.env.PUBLISH_PROOF = 'true';
    assert.deepEqual(getPublishableCases(slot, [{ ...complete, publicationStatus: 'EVIDENCE_ONLY', publicationApproved: false }]), []);
    assert.deepEqual(getPublishableCases(slot, [{ ...complete, forcePublish: true }]), [], 'no fixture/render override');
  } finally {
    if (previous === undefined) delete process.env.PUBLISH_PROOF; else process.env.PUBLISH_PROOF = previous;
  }
});

test('CMS normalization preserves rejection of every incomplete publication record', () => {
  assert.deepEqual(getPublishableCases(slot, [proofContentSchema.parse(complete)]), getPublishableCases(slot, [complete]));
  for (const key of Object.keys(complete)) {
    const incomplete: any = structuredClone(complete);
    delete incomplete[key];
    const normalized = proofContentSchema.safeParse(incomplete);
    if (normalized.success) assert.deepEqual(getPublishableCases(slot, [normalized.data]), [], `normalized missing ${key}`);
  }
});

test('anonymous proof exposes the approved label and no private registry identity or evidence', () => {
  const anonymous = { ...complete, namingPermission: 'ANONYMIZED_APPROVED' };
  const result = getPublishableCases(slot, [anonymous]);
  assert.equal(result[0].displayName, complete.anonymizedLabel);
  assert.ok(!JSON.stringify(result).includes(complete.clientName));
  assert.ok(!('id' in result[0]) && !('source' in result[0]) && !('evidenceMetrics' in result[0]));
  assert.deepEqual(getPublishableCases(slot, [{ ...anonymous, anonymizedLabel: null }]), []);
  assert.deepEqual(getPublishableCases(slot, [{ ...anonymous, intervention: 'Work for Synthetic fixture' }]), [], 'public copy cannot leak an unapproved name');
});

test('anonymous proof refuses wrapped, nonbreaking and Unicode-normalized private names', () => {
  const anonymous = { ...complete, clientName: 'Oslo Privatklinikk', namingPermission: 'ANONYMIZED_APPROVED' };
  for (const name of ['Oslo\nPrivatklinikk', 'Oslo  Privatklinikk', 'Oslo\u00a0Privatklinikk', 'OSLO\tPRIVATKLINIKK', 'Ｏｓｌｏ Privatklinikk', 'Oslo \u2060Privatklinikk']) {
    assert.deepEqual(getPublishableCases(slot, [{ ...anonymous, intervention: `Work for ${name}` }]), [], `private identity ${JSON.stringify(name)}`);
  }
});

test('both imported records preserve supplied measurements and remain evidence only with CMS coverage', () => {
  const records = readdirSync('src/content/proof').filter(file => file.endsWith('.json')).map(file => JSON.parse(readFileSync(`src/content/proof/${file}`, 'utf8')));
  assert.deepEqual(records.map(record => record.clientName).sort(), ['Nysta', 'Oslo Privatklinikk']);
  const config = YAML.parse(readFileSync('../.pages.yml', 'utf8'));
  const editor = config.content.find((entry: any) => entry.name === 'proofCases');
  assert.equal(editor.path, 'app/src/content/proof');
  function coverage(data: any, fields: any[]) {
    for (const [key, value] of Object.entries(data)) {
      const field = fields.find((field: any) => field.name === key);
      assert.ok(field, `CMS proof field ${key}`);
      if (value && typeof value === 'object' && !Array.isArray(value)) coverage(value, field.fields);
      if (Array.isArray(value)) value.filter(item => item && typeof item === 'object').forEach(item => coverage(item, field.fields));
    }
  }
  for (const record of records) {
    assert.equal(proofCaseSchema.safeParse(record).success, true);
    assert.equal(record.publicationStatus, 'EVIDENCE_ONLY');
    assert.equal(record.namingPermission, 'GRANTED');
    assert.equal(record.strategyReviewStatus, 'READY_FOR_STRATEGY_REVIEW');
    assert.equal(record.strategyReviewEvidence, null);
    assert.match(record.permissionEvidence, /2090639.*D-023.*OWNER/);
    assert.equal(record.publicationApproved, false);
    assert.equal(record.artifactStatus, 'NOT_IMPORTED');
    assert.deepEqual(record.artifactReferences, []);
    assert.deepEqual(getPublishableCases({ publicationApproved: true, caseIds: [record.id] }, [record]), []);
    coverage(record, editor.fields);
  }
  const nysta = records.find(record => record.id === 'nysta');
  assert.deepEqual(nysta.evidenceMetrics.map((metric: any) => [metric.before, metric.after, metric.delta, metric.nextPeriod]), [
    ['7.1%', '43.6%', null, '58.1%'], ['0.058%', '1.403%', null, '1.874%'],
    [null, null, '10x orders with 65% fewer visits', null], ['0.10%', '1.93%', null, '2.91%'],
    [null, '31/50 orders and 16 265 / 25 511 kr sales', null, null], [null, '15/26 paid orders used Vipps/MobilePay', null, null],
  ]);
  const clinic = records.find(record => record.id === 'oslo-privatklinikk');
  assert.deepEqual(clinic.evidenceMetrics.map((metric: any) => [metric.before, metric.after, metric.delta]), [
    ['694 kr', '448 kr', '-35%'], ['89', '128', '+44%'], [null, null, '-7%'], ['931 kr', '328 kr', '-65%'], ['16', '35', '+119%'],
  ]);
});
