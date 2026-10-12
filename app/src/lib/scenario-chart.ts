export function createScenarioIllustration(current: number, scenario: number, width: number) {
  // Six equal visual steps between two monthly outcomes, not a forecast model.
  const peak = Math.max(current, scenario, 1);
  const points = (end: number) => Array.from({ length: 6 }, (_, index) => {
    const value = index === 5 ? end : current + (end - current) * index / 5;
    return { x: 12 + (width - 104) * index / 5, y: 88 - value / peak * 68, value };
  });
  const baseline = points(current), improved = points(scenario);
  const path = (series: typeof baseline) => series.map((point, index) => `${index ? 'L' : 'M'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(' ');
  return {
    current: baseline, scenario: improved, currentPath: path(baseline), scenarioPath: path(improved),
    currentLabelY: baseline[5].y + (scenario > current ? 16 : -10),
    scenarioLabelY: improved[5].y + (scenario > current ? -10 : 16),
  };
}
