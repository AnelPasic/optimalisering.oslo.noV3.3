import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateLeverage } from '../src/lib/leverage.ts';
import * as leverage from '../src/lib/leverage.ts';

test('illustrative example keeps percentage units correct', () => {
  assert.equal(calculateLeverage(1000, 1), 10);
  assert.equal(calculateLeverage(1000, 2), 20);
  assert.equal(calculateLeverage(0, 2), 0);
  assert.equal(calculateLeverage(1500, 1.5), 22.5);
});

test('invalid or impossible calculator inputs fail', () => {
  for (const values of [[-1, 1], [1000, 101], [1000, -1], [Infinity, 1], [1000, NaN]]) {
    assert.throws(() => calculateLeverage(values[0], values[1]));
  }
});

test('traffic and conversion compound rather than adding their effects', () => {
  assert.equal(typeof leverage.calculateScenario, 'function', 'combined scenario calculation is required');
  assert.deepEqual(leverage.calculateScenario(1000, 1, 50, 2), { current: 10, scenarioVisits: 1500, scenario: 30, difference: 20, increase: 200 });
  assert.equal(leverage.calculateScenario(1000, 1, 50, 1).scenario, 15);
  assert.equal(leverage.calculateScenario(1000, 1, 0, 2).scenario, 20);
  assert.equal(leverage.calculateScenario(1000, 1, 0, 1).difference, 0);
});

test('zero baseline has no defined percentage increase and fractional outcomes stay precise', () => {
  assert.equal(typeof leverage.calculateScenario, 'function');
  assert.deepEqual(leverage.calculateScenario(1000, 0, 0, 2), { current: 0, scenarioVisits: 1000, scenario: 20, difference: 20, increase: null });
  assert.equal(leverage.calculateScenario(0, 1, 50, 2).increase, null);
  assert.equal(leverage.calculateScenario(1500, 1.5, 20, 1).difference, -4.5);
});

test('combined scenario rejects impossible or non-finite inputs', () => {
  assert.equal(typeof leverage.calculateScenario, 'function');
  const invalid: [number, number, number, number][] = [[-1, 1, 0, 2], [1000, 101, 0, 2], [1000, 1, -1, 2], [1000, 1, 0, 101], [1000, 1, NaN, 2], [Infinity, 1, 0, 2], [1000, 1, 0, Infinity]];
  for (const input of invalid) {
    assert.throws(() => leverage.calculateScenario(...input), RangeError);
  }
});

test('a tiny baseline does not produce an infinite percentage claim', () => {
  assert.equal(leverage.calculateScenario(1000, 1e-308, 50, 2).increase, null);
});
