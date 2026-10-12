import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';
import { glossary, glossarySchema, explainTerms } from '../src/lib/terminology.ts';
import { cmsJsonSave, entryForFile, assertPreservedContent } from './helpers/pages-cms-json.ts';

test('glossary has the requested entries, unique anchors and unambiguous aliases', () => {
  const required = ['seo', 'lokal-seo', 'ai-synlighet', 'aeo', 'aio', 'geo', 'organisk-trafikk', 'google-search-console', 'google-ads', 'meta-ads', 'roas', 'cpc', 'ctr', 'cpa', 'konvertering', 'konverteringsrate', 'cro', 'cta', 'landingsside', 'checkout', 'ga4', 'attribusjon', 'relevant-trafikk', 'ordreverdi', 'margin'];
  assert.ok(glossary.terms.length >= required.length);
  for (const id of required) assert.ok(glossary.terms.some(term => term.id === id), id);
  assert.equal(glossarySchema.safeParse({ ...glossary, terms: [...glossary.terms, glossary.terms[0]] }).success, false);
  const conflicting = structuredClone(glossary);
  conflicting.terms[1].aliases.push('SEO');
  assert.equal(glossarySchema.safeParse(conflicting).success, false);
  const unsafe = structuredClone(glossary);
  unsafe.terms[0].id = '../intake';
  assert.equal(glossarySchema.safeParse(unsafe).success, false);
  const duplicate = structuredClone(glossary);
  duplicate.terms[1].shortDefinition = duplicate.terms[0].shortDefinition;
  assert.equal(glossarySchema.safeParse(duplicate).success, false);
});

test('inline selection preserves every character, chooses longest alias and explains a term once', () => {
  const seen = new Set<string>();
  const input = 'Lokal SEO, SEO, AI-synlighet og konverteringsoptimalisering. SEO igjen; seologi er et annet ord.';
  const parts = explainTerms(input, ['seo', 'lokal-seo', 'ai-synlighet', 'cro'], seen);
  assert.equal(parts.map(part => part.text).join(''), input);
  assert.deepEqual(parts.flatMap(part => part.id ? [part.id] : []), ['lokal-seo', 'seo', 'ai-synlighet', 'cro']);
  assert.deepEqual(explainTerms('SEO og CRO', ['seo', 'cro'], seen), [{ text: 'SEO og CRO' }]);
  assert.deepEqual(explainTerms('Bedriften har margin og omsetning', ['roas'], new Set()), [{ text: 'Bedriften har margin og omsetning' }]);
  assert.equal(explainTerms('ROAS 4,3x', ['roas'], new Set())[0].text, 'ROAS');
});

test('CMS exposes safe terminology fields, keeps anchors and authority read-only, and round-trips content', () => {
  const cms = YAML.parse(readFileSync('../.pages.yml', 'utf8'));
  const entry = entryForFile(cms, 'app/src/content/terminology/glossary.json');
  assert.ok(entry);
  const terms = entry.fields.find((field: any) => field.name === 'terms');
  assert.equal(terms.fields.find((field: any) => field.name === 'id').readonly, true);
  assert.equal(entry.fields.find((field: any) => field.name === 'authority').readonly, true);
  assert.deepEqual(terms.fields.map((field: any) => field.name).sort(), ['id', 'term', 'fullName', 'aliases', 'category', 'shortDefinition', 'fullDefinition', 'simpleExample'].sort());
  const form = structuredClone(glossary);
  form.terms[0].shortDefinition = 'En ufarlig redigering av forklaringen.';
  const saved = JSON.parse(cmsJsonSave(glossary, form, entry, cms));
  assertPreservedContent(form, saved);
  assert.deepEqual(glossarySchema.parse(saved), glossarySchema.parse(form));
  assert.ok(!JSON.stringify(entry).match(/publicationApproved|caseIds|leadEndpoint|orderHref/));
  const empty = structuredClone(glossary);
  empty.terms[0].fullName = '';
  empty.terms[0].simpleExample = '';
  assert.ok(glossarySchema.safeParse(JSON.parse(cmsJsonSave(glossary, empty, entry, cms))).success);
});
