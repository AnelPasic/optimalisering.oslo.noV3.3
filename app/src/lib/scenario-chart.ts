export function createScenarioIllustration(current: number, monthlyScenarios: readonly number[], width: number) {
  // Six outcomes under the selected monthly growth assumption, not a forecast.
  const scenario = monthlyScenarios[5];
  const peak = Math.max(current, ...monthlyScenarios, 1);
  const points = (values: readonly number[]) => values.map((value, index) => {
    return { x: 12 + (width - 104) * index / 5, y: 88 - value / peak * 68, value };
  });
  const baseline = points(Array(6).fill(current)), improved = points(monthlyScenarios);
  const path = (series: typeof baseline) => series.map((point, index) => `${index ? 'L' : 'M'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(' ');
  return {
    current: baseline, scenario: improved, currentPath: path(baseline), scenarioPath: path(improved),
    currentLabelY: baseline[5].y + (scenario > current ? 16 : -10),
    scenarioLabelY: improved[5].y + (scenario > current ? -10 : 16),
  };
}
