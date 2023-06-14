import { Mover } from '../../../../models/mover';

function formatDefault(value: number): string {
  return new Intl.NumberFormat(navigator.language, {
    style: 'decimal',
    maximumFractionDigits: 3,
  }).format(value);
}

function formatPercentageWithSign(value: number): string {
  return new Intl.NumberFormat(navigator.language, {
    style: 'percent',
    signDisplay: 'always',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

function formatNumberWithMagnitude(value: number): string {
  // Define thresholds in decreasing order
  const thresholds = [
    { threshold: 1e12, unit: 'T' },
    { threshold: 1e9, unit: 'B' },
    { threshold: 1e6, unit: 'M' },
  ];

  for (const { threshold, unit } of thresholds) {
    if (Math.abs(value) >= threshold) {
      return formatDefault(value / threshold) + unit;
    }
  }
  return formatDefault(value);
}

export function formatColumn<K extends keyof Mover>(column: K, value: Mover[K]): string {
  if (typeof value !== 'number') {
    return value ?? 'N/A';
  }
  if (column === 'percentChange') {
    return formatPercentageWithSign(value);
  }
  if (column === 'volume' || column === 'avgVol3Month' || column === 'marketCap') {
    return formatNumberWithMagnitude(value);
  }
  return formatDefault(value);
}
