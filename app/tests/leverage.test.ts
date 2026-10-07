import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateLeverage } from '../src/lib/leverage.ts';

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
