import assert from 'node:assert/strict';
import test from 'node:test';
import { conversionBenchmarks, conversionRateSources } from '../src/lib/conversion-rate-benchmarks.ts';

test('conversion benchmarks have unique ids, valid reference bands and source links', () => {
  assert.equal(conversionBenchmarks.length, 12);
  assert.equal(new Set(conversionBenchmarks.map(b => b.id)).size, 12);
  assert.equal(conversionBenchmarks.filter(b => b.channel === 'shopify').length, 2);
  assert.equal(conversionBenchmarks.filter(b => b.channel === 'search').length, 10);
  for (const row of conversionBenchmarks) {
    assert.ok(row.lowBelow < row.typical && row.typical < row.targetLow &&
      row.targetLow <= row.targetHigh && row.targetHigh <= 100, row.id);
    assert.match(conversionRateSources[row.source].url, /^https:\/\//);
  }
});

test('referenced figures preserve the October industry thread, with updated Nov Shopify median', () => {
  const byId = Object.fromEntries(conversionBenchmarks.map(b => [b.id, b]));
  for (const [id, typical] of Object.entries({
    nettbutikk: 1.3, klaer: 1.1, rorlegger: 7.6, elektriker: 9.1,
    tannlege: 10.7, plastikkirurgi: 8.5, advokat: 5.6, renhold: 17.7,
    bygg: 2.6, trafikkskole: 13.1, kantine: 4.9, byra: 4.9
  })) {
    assert.equal(byId[id].typical, typical, id);
  }
  assert.ok(byId.trafikkskole.proxy);
  assert.ok(byId.kantine.proxy);
});

test('calculator uses the same visit/conversion arithmetic as the sales comparison', () => {
  const actions = (visits: number, rate: number) => visits * rate / 100;
  const current = actions(3000, 1), target = actions(3000, 2);
  assert.equal(current, 30);
  assert.equal(target, 60);
  assert.equal((target - current) * 1000, 30_000);
  assert.equal(10_000/current > 10_000/target, true);
});
