import { fetchBars } from '../../api/fetch-bars';
import { TimePeriod, getDateRange, isFineGrained } from '../../models/time-period';
import { TICKER_INDEX, db } from '..';
import { groupBy } from 'lodash';

function getDateKey(date: Date): string {
  // Omitting the time portion of the date allows for better batching
  return date.toISOString().split('T')[0];
}

function getRangeKey(range: { currentStart: Date, currentEnd: Date }) {
  return `${getDateKey(range.currentStart)}-${getDateKey(range.currentEnd)}`;
}

export async function updateBars(tickers: string[], period: TimePeriod) {
  const table = db.getBarsTable(isFineGrained(period));

  const ranges = await db.transaction('r', table, () => (
    Promise.all(
      tickers.map(async ticker => {
        const first = await table.where(TICKER_INDEX).equals(ticker).first();
        const last = await table.where(TICKER_INDEX).equals(ticker).last();
        if (!first || !last) {
          return { ticker, type: 'new' as const };
        }
        const currentStart = new Date(first.dateTime);
        const currentEnd = new Date(last.dateTime);
        return { ticker, currentStart, currentEnd, type: 'existing' as const };
      }),
    )
  ));

  const newTickers = ranges
    .filter(r => r.type === 'new')
    .map(r => r.ticker);

  const existingTickerRanges = ranges
    .filter(r => r.type === 'existing') as { ticker: string, currentStart: Date, currentEnd: Date }[];

  const grouped = groupBy(existingTickerRanges, r => getRangeKey(r));

  const existingTickerBatches = Object.values(grouped).map(group => ({
    tickerBatch: group.map(({ ticker }) => ticker),
    currentStart: Math.min(...group.map(range => range.currentStart.getTime())),
    currentEnd: Math.max(...group.map(range => range.currentEnd.getTime())),
  }));

  const updateBarsOnInterval = async (tickerBatch: string[], start: Date, end: Date) => {
    const bars = await fetchBars(tickerBatch, start, end, isFineGrained(period));
    await table.bulkPut(bars);
  };

  const [start, end] = getDateRange(period);

  await updateBarsOnInterval(newTickers, start, end);

  for (const { tickerBatch, currentStart, currentEnd } of existingTickerBatches) {
    if (start.getTime() < currentStart) {
      await updateBarsOnInterval(tickerBatch, start, new Date(currentStart - 1));
    }
    if (end.getTime() > currentEnd) {
      await updateBarsOnInterval(tickerBatch, new Date(currentEnd + 1), end);
    }
  }
}
