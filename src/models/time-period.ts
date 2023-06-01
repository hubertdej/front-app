const FINE_GRAINED_PERIODS = ['1D', '5D'] as const;
const COARSE_GRAINED_PERIODS = ['1M', '3M', '6M', 'YTD', '1Y', '3Y', '5Y', '10Y'] as const;
export const TIME_PERIODS = [...FINE_GRAINED_PERIODS, ...COARSE_GRAINED_PERIODS];

type FineGrainedPeriod = typeof FINE_GRAINED_PERIODS[number];
type CoarseGrainedPeriod = typeof COARSE_GRAINED_PERIODS[number];
export type TimePeriod = FineGrainedPeriod | CoarseGrainedPeriod;

export function isFineGrained(period: TimePeriod): period is FineGrainedPeriod {
  return FINE_GRAINED_PERIODS.includes(period as FineGrainedPeriod);
}

export function getDateRange(period: TimePeriod): [Date, Date] {
  const endDate = new Date();
  endDate.setUTCHours(0, 0, 0, 0);

  const startDate = new Date(endDate.getTime());
  if (period === 'YTD') {
    startDate.setUTCMonth(0, 1);
  } else if (period.endsWith('D')) {
    let days = parseInt(period);
    while (days > 0) {
      startDate.setUTCDate(startDate.getUTCDate() - 1);
      if (startDate.getUTCDay() !== 0 && startDate.getUTCDay() !== 6) {
        days--;
      }
    }
  } else if (period.endsWith('M')) {
    startDate.setUTCMonth(startDate.getUTCMonth() - parseInt(period));
  } else if (period.endsWith('Y')) {
    startDate.setUTCFullYear(startDate.getUTCFullYear() - parseInt(period));
  }

  endDate.setUTCDate(endDate.getUTCDate() + 1);
  return [startDate, endDate];
}
