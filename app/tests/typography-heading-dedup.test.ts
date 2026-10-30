import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path: string) => readFileSync('src/styles/' + path, 'utf8');

test('h3 type scale has one shared owner, not one declaration per card', () => {
  const shared = read('shared.css');
  const home = read('compositions/home.css');
  const packages = read('compositions/package.css');
  const assessment = read('compositions/assessment.css');
  const sections = read('compositions/sections.css');
  const pricing = read('compositions/pricing.css');
  const service = read('compositions/service.css');
  const terminology = read('terminology.css');

  assert.match(shared, /h3\s*\{\s*font-size:\s*var\(--type-h3\);\s*line-height:\s*var\(--leading-h3\);\s*letter-spacing:\s*-.035em;\s*\}/);
  assert.doesNotMatch(home, /need-card/);
  const selector = readFileSync('src/components/HomepageBlock.astro','utf8');
  assert.ok(selector.includes('max-w-[390px] max-[900px]:max-w-[600px]'));
  assert.doesNotMatch(packages, /\.invite-home \.package-card h3\s*\{/);
  assert.doesNotMatch(assessment, /\.invite-home \.form-heading h3\s*\{/);
  assert.match(shared, /\.form-heading h3\s*\{\s*margin-bottom:\s*27px;\s*\}/);
  assert.doesNotMatch(shared, /\.assessment-copy h2\s*\{/);
  assert.doesNotMatch(sections, /\.invite-home h2\s*\{/);
  assert.doesNotMatch(pricing, /\.invite-pricing \.package-card h2\s*\{/);
  assert.doesNotMatch(service, /\.invite-service \.service-package h3\s*\{/);
  assert.match(terminology, /\.glossary-group h2\s*\{\s*max-width:\s*320px;\s*\}/);
});

test('intentional smaller heading variants remain untouched', () => {
  const shared = read('shared.css');
  const packages = read('compositions/package.css');

  assert.match(shared, /\.process-items h3\s*\{\s*font-size:\s*var\(--type-h4\);\s*line-height:\s*var\(--leading-h4\);\s*\}/);
  assert.match(packages, /\.package-offer \.package-heading h2, \.invite-home \.package-offer \.package-heading h3\s*\{\s*font-size:\s*var\(--type-h4\);\s*line-height:\s*var\(--leading-h4\);\s*\}/);
  assert.match(shared, /\.info-item h3\s*\{\s*margin-bottom:\s*16px;\s*\}/);
  assert.match(read('compositions/sections.css'), /\.invite-home \.info-item h3\s*\{\s*font-size:\s*var\(--type-h4\);\s*line-height:\s*var\(--leading-h4\);\s*\}/);
});
