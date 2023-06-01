import { fetchBars } from '../../api/fetch-bars';
import { TimePeriod, getDateRange, isFineGrained } from '../../models/time-period';
import { TICKER_INDEX, db } from '..';

export async function updateBars(ticker: string, period: TimePeriod) {
  const table = db.getBarsTable(isFineGrained(period));

  const updateBarsOnInterval = async (start: Date, end: Date) => {
    const bars = await fetchBars(ticker, start, end, isFineGrained(period));
    await table.bulkPut(bars);
  };

  const [currentStart, currentEnd] = await db.transaction('r', table, () => (
    Promise.all([
      table.where(TICKER_INDEX).equals(ticker).first(),
      table.where(TICKER_INDEX).equals(ticker).last(),
    ]).then(
      bars => bars.map(bar => bar && new Date(bar.dateTime)),
    )
  ));
  const [start, end] = getDateRange(period);

  if (currentStart === undefined || currentEnd === undefined) {
    await updateBarsOnInterval(start, end);
    return;
  }
  if (start < currentStart) {
    await updateBarsOnInterval(start, new Date(currentStart.getTime() - 1));
  }
  if (end > currentEnd) {
    await updateBarsOnInterval(new Date(currentEnd.getTime() + 1), end);
  }
}
