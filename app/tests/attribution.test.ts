import test from 'node:test';
import assert from 'node:assert/strict';
import { captureAttribution, forwardAttribution } from '../src/lib/attribution.ts';

test('submission source survives an internal route without cookies or browser storage', () => {
  const href = forwardAttribution('/vurdering/', 'https://optimalisering.oslo.no/seo/?utm_source=google&utm_campaign=search', 'https://search.example/query?private=1');
  const source = captureAttribution(`https://optimalisering.oslo.no${href}`, 'https://optimalisering.oslo.no/seo/');
  assert.equal(source.utm_source, 'google');
  assert.equal(source.utm_campaign, 'search');
  assert.equal(source.landing_page, '/seo/');
  assert.equal(source.referrer, 'https://search.example');
  assert.ok(!href.includes('private'));
});

test('external links, hash links and invalid campaign values are untouched', () => {
  const from = 'https://optimalisering.oslo.no/?utm_source=person%40example.no';
  assert.equal(forwardAttribution('https://other.example/', from, ''), 'https://other.example/');
  assert.equal(forwardAttribution('#sjekk', from, ''), '#sjekk');
  assert.equal(forwardAttribution('/vurdering/', from, ''), '/vurdering/');
  assert.equal(captureAttribution(from, '').utm_source, undefined);
});
