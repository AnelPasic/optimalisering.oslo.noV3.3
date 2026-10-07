export function calculateLeverage(visits: number, conversion: number): number {
  if (!Number.isFinite(visits) || !Number.isFinite(conversion) || visits < 0 || conversion < 0 || conversion > 100) throw new RangeError('Invalid illustrative input');
  return visits * conversion / 100;
}
