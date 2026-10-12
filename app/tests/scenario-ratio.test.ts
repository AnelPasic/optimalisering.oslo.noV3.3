import test from 'node:test';
import assert from 'node:assert/strict';
import { formatScenarioRatio } from '../src/lib/scenario-ratio.ts';

test('scenario ratio shows the total relative level, not percentage increase', () => {
  assert.deepEqual(formatScenarioRatio(20, 110), { multiplier: '5,5X', percentage: '(550%)' });
  assert.deepEqual(formatScenarioRatio(20, 70.86244), { multiplier: '3,5X', percentage: '(354%)' });
  assert.deepEqual(formatScenarioRatio(20, 20), { multiplier: '1X', percentage: '(100%)' });
  assert.deepEqual(formatScenarioRatio(20, 10), { multiplier: '0,5X', percentage: '(50%)' });
  assert.deepEqual(formatScenarioRatio(20, 0), { multiplier: '0X', percentage: '(0%)' });
});

test('zero and non-finite baselines do not invent a multiplier', () => {
  for (const [current, scenario] of [[0, 0], [0, 20], [-1, 20], [20, -1], [NaN, 20], [Infinity, 20], [20, Infinity], [1e-308, 20]]) {
    assert.equal(formatScenarioRatio(current, scenario), null);
  }
});
