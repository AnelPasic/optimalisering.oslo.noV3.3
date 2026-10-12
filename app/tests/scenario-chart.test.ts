import test from 'node:test';
import assert from 'node:assert/strict';
import { createScenarioIllustration } from '../src/lib/scenario-chart.ts';
import { calculateScenario } from '../src/lib/leverage.ts';

test('six monthly points show compound growth rather than linear interpolation', () => {
  const values = Array.from({ length: 6 }, (_, index) => calculateScenario(2000, 1, 10, 2, index + 1).scenario);
  const chart = createScenarioIllustration(20, values, 480);
  assert.equal(chart.current.length, 6);
  assert.deepEqual(chart.current.map(point => point.value), [20, 20, 20, 20, 20, 20]);
  assert.deepEqual(chart.scenario.map(point => point.value), values);
  assert.ok(Math.abs(values[0] - 44) < 1e-8);
  assert.ok(Math.abs(values[5] - 70.86244) < 1e-8);
  for (let index = 1; index < 6; index++) assert.ok(Math.abs(values[index] / values[index - 1] - 1.1) < 1e-10);
  assert.ok(values[5] - values[4] > values[1] - values[0]);
  assert.ok(chart.scenario[5].y < chart.current[5].y);
  assert.ok(chart.current.every(point => point.y === chart.current[0].y));
});

test('illustration honestly supports lower, equal, zero and maximum outcomes at mobile width', () => {
  for (const [current, scenario] of [[20, 10], [20, 20], [0, 0], [0, 60], [10000000, 17715610000000], [.00001, .00002]]) {
    const values = Array.from({ length: 6 }, () => scenario);
    const chart = createScenarioIllustration(current, values, 256);
    assert.equal(chart.scenario[5].value, scenario);
    for (const point of [...chart.current, ...chart.scenario]) {
      assert.ok(Number.isFinite(point.x) && Number.isFinite(point.y));
      assert.ok(point.x >= 0 && point.x < 256 && point.y >= 20 && point.y <= 88);
    }
    if (scenario < current) assert.ok(chart.scenario[5].y > chart.current[5].y);
    if (scenario === current) assert.deepEqual(chart.current, chart.scenario);
  }
});
