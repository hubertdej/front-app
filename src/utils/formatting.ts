export function formatNumberDefault(value: number): string {
  return new Intl.NumberFormat(navigator.language, {
    style: 'decimal',
    maximumFractionDigits: 3,
  }).format(value);
}

export function formatPercentageWithSign(value: number): string {
  return new Intl.NumberFormat(navigator.language, {
    style: 'percent',
    signDisplay: 'always',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumberWithMagnitude(value: number): string {
  // Define thresholds in decreasing order
  const thresholds = [
    { threshold: 1000000000000, unit: 'T' },
    { threshold: 1000000000, unit: 'B' },
    { threshold: 1000000, unit: 'M' },
  ];

  for (const { threshold, unit } of thresholds) {
    if (Math.abs(value) >= threshold) {
      return formatNumberDefault(value / threshold) + unit;
    }
  }
  return formatNumberDefault(value);
}
