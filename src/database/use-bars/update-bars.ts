import { fetchBars } from '../../api/fetch-bars';
import { TimePeriod, getDateRange, isFineGrained } from '../../models/time-period';
import { TICKER_INDEX, db } from '..';
import { groupBy } from 'lodash';

export async function updateBars(tickers: string[], period: TimePeriod) {
  const table = db.getBarsTable(isFineGrained(period));

  const ranges = await db.transaction('r', table, () => (
    Promise.all(
      tickers.map(async ticker => {
        const first = await table.where(TICKER_INDEX).equals(ticker).first();
        const last = await table.where(TICKER_INDEX).equals(ticker).last();
        const currentStart = first && new Date(first.dateTime);
        const currentEnd = last && new Date(last.dateTime);
        return { ticker, currentStart, currentEnd };
      }),
    )
  ));

  const batches = groupBy(ranges, range => `${range.currentStart}-${range.currentEnd}`);

  const tickerBatches = Object.values(batches).map(group => ({
    tickerBatch: group.map(({ ticker }) => ticker),
    currentStart: group[0]?.currentStart,
    currentEnd: group[0]?.currentEnd,
  }));

  const updateBarsOnInterval = async (tickerBatch: string[], start: Date, end: Date) => {
    const bars = await fetchBars(tickerBatch, start, end, isFineGrained(period));
    await table.bulkPut(bars);
  };

  const [start, end] = getDateRange(period);

  for (const { tickerBatch, currentStart, currentEnd } of tickerBatches) {
    if (currentStart === undefined || currentEnd === undefined) {
      await updateBarsOnInterval(tickerBatch, start, end);
      return;
    }
    if (start < currentStart) {
      await updateBarsOnInterval(tickerBatch, start, new Date(currentStart.getTime() - 1));
    }
    if (end > currentEnd) {
      await updateBarsOnInterval(tickerBatch, new Date(currentEnd.getTime() + 1), end);
    }
  }
}
