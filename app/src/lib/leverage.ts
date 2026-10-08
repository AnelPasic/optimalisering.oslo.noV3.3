export function calculateLeverage(visits: number, conversion: number): number {
  if (!Number.isFinite(visits) || !Number.isFinite(conversion) || visits < 0 || conversion < 0 || conversion > 100) throw new RangeError('Invalid illustrative input');
  return visits * conversion / 100;
}

export function calculateScenario(visits: number, conversion: number, trafficIncrease: number, newConversion: number) {
  if (!Number.isFinite(trafficIncrease) || trafficIncrease < 0) throw new RangeError('Invalid illustrative traffic increase');
  const current = calculateLeverage(visits, conversion);
  const scenarioVisits = visits * (1 + trafficIncrease / 100);
  const scenario = calculateLeverage(scenarioVisits, newConversion);
  const difference = scenario - current;
  const increase = current === 0 ? NaN : difference / current * 100;
  return { current, scenarioVisits, scenario, difference, increase: Number.isFinite(increase) ? increase : null };
}
