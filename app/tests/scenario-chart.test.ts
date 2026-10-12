import test from 'node:test';
import assert from 'node:assert/strict';
import { createScenarioIllustration } from '../src/lib/scenario-chart.ts';

test('six illustrative steps keep current flat and reach the scenario exactly', () => {
  const chart = createScenarioIllustration(20, 60, 480);
  assert.equal(chart.current.length, 6);
  assert.deepEqual(chart.current.map(point => point.value), [20, 20, 20, 20, 20, 20]);
  assert.deepEqual(chart.scenario.map(point => point.value), [20, 28, 36, 44, 52, 60]);
  assert.ok(chart.scenario[5].y < chart.current[5].y);
  assert.ok(chart.current.every(point => point.y === chart.current[0].y));
});

test('illustration honestly supports lower, equal, zero and maximum outcomes at mobile width', () => {
  for (const [current, scenario] of [[20, 10], [20, 20], [0, 0], [0, 60], [10000000, 110000000], [.00001, .00002]]) {
    const chart = createScenarioIllustration(current, scenario, 256);
    assert.equal(chart.scenario[0].value, current);
    assert.equal(chart.scenario[5].value, scenario);
    for (const point of [...chart.current, ...chart.scenario]) {
      assert.ok(Number.isFinite(point.x) && Number.isFinite(point.y));
      assert.ok(point.x >= 0 && point.x < 256 && point.y >= 20 && point.y <= 88);
    }
    if (scenario < current) assert.ok(chart.scenario[5].y > chart.current[5].y);
    if (scenario === current) assert.deepEqual(chart.current, chart.scenario);
  }
});
