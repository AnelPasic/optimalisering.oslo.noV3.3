import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const pixelSource = readFileSync('src/components/OpenAiAdsPixel.astro', 'utf8');
const snippet = pixelSource.match(/<script is:inline>([\s\S]*?)<\/script>/)?.[1];
assert.ok(snippet, 'Inline pixel bootstrap must exist');
const consentKey = 'optimalisering.oslo.no:openai-ads-consent';

function fixture(initial = null) {
  const store = new Map(initial ? [[consentKey, initial]] : []);
  const listeners = new Map();
  const inserted = [];
  const window = {
    localStorage: {
      getItem: key => store.get(key) ?? null,
      setItem: (key, val) => store.set(key, val),
    },
    addEventListener: (key, cb) => listeners.set(key, cb),
    dispatchEvent: () => {},
  };
  const document = {
    head: { appendChild: el => inserted.push(el) },
    createElement: name => ({ tagName: name }),
  };
  vm.runInNewContext(snippet, { window, document, Event: class { constructor(type) { this.type = type; } } });
  return { window, inserted, store, listeners, queued: () => window.oaiq?.q?.q ?? [] };
}

test('No SDK load or measurement before explicit consent', () => {
  const env = fixture();
  assert.equal(env.inserted.length, 0);
  assert.equal(env.window.oaiq, undefined);
  assert.equal(env.window.OptimaliseringOpenAIAds.getChoice(), null);
});

test('Refusing does not load SDK and remembers refusal', () => {
  const env = fixture();
  env.window.OptimaliseringOpenAIAds.setChoice('no');
  assert.equal(env.inserted.length, 0);
  assert.equal(env.window.OptimaliseringOpenAIAds.getChoice(), 'no');
});

test('Accept loads SDK and initializes the exact pixel only once', () => {
  const env = fixture();
  env.window.OptimaliseringOpenAIAds.setChoice('yes');
  env.window.OptimaliseringOpenAIAds.setChoice('yes');
  assert.equal(env.inserted.length, 1);
  assert.equal(env.inserted[0].src, 'https://bzrcdn.openai.com/sdk/oaiq.min.js');
  const calls = env.queued().map(args => [...args]);
  assert.deepEqual(calls.map(a => a[0]), ['consent', 'init', 'consent']);
  assert.equal(calls[1][1].pixelId, 'X6jHpYi7S193GRHHHfndZ4');
  assert.equal(calls[1][1].debug, true);
});

test('Revoke after accepting sends denial to SDK and allows reconsent', () => {
  const env = fixture('yes');
  env.window.OptimaliseringOpenAIAds.setChoice('no');
  assert.equal(env.window.OptimaliseringOpenAIAds.getChoice(), 'no');
  env.window.OptimaliseringOpenAIAds.setChoice('yes');
  assert.equal(env.inserted.length, 1);
  assert.deepEqual(env.queued().map(args => args[0]), ['consent', 'init', 'consent', 'consent']);
  assert.equal(env.queued()[2][1], false);
  assert.equal(env.queued()[3][1], true);
});

test('Cross-tab denial stops SDK consent', () => {
  const env = fixture('yes');
  env.store.set(consentKey, 'no');
  env.listeners.get('storage')({ key: consentKey, newValue: 'no' });
  assert.equal(env.queued().at(-1)[0], 'consent');
  assert.equal(env.queued().at(-1)[1], false);
});

test('Footer and privacy offer a way to change or withdraw consent', () => {
  const footer = readFileSync('src/components/HomeFooter.astro', 'utf8');
  const banner = readFileSync('src/components/OpenAiAdsConsent.astro', 'utf8');
  const privacy = JSON.parse(readFileSync('src/content/pages/personvern.json', 'utf8'));
  assert.match(footer, /data-openai-ads-manage/);
  assert.match(banner, /data-openai-ads-reject/);
  assert.match(banner, /data-openai-ads-accept/);
  assert.ok(privacy.sections.some(section => section.id === 'annonsemaaling'));
});
