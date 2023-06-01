import Dexie from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect } from 'react';
import { BARS_INDEX, db } from '..';
import { useIsOnline } from '../../hooks/use-is-online';
import { Bar } from '../../models/bar';
import { TimePeriod, getDateRange, isFineGrained } from '../../models/time-period';
import { updateBars } from './update-bars';

export function useBars(tickers: string[], period: TimePeriod): Record<string, Bar[]> {
  const isOnline = useIsOnline();

  useEffect(() => {
    if (isOnline) {
      tickers.forEach(ticker => updateBars(ticker, period));
    }
  }, [isOnline, tickers, period]);

  const table = db.getBarsTable(isFineGrained(period));
  const [start] = getDateRange(period);

  // It is important to remove the time component from the start key
  // because YYYY-MM-DDT00:00:00.000Z is lexicographically larger than YYYY-MM-DD.
  const startKey = start.toISOString().split('T')[0];

  return useLiveQuery(() => (
    db.transaction('r', table, () => (
      Promise.all(
        tickers.map(ticker => (
          table
            .where(BARS_INDEX)
            .between([ticker, startKey], [ticker, Dexie.maxKey], true, true)
            .toArray()
            .then(bars => ([ticker, bars] as [string, Bar[]]))
        )),
      ).then(
        entries => Object.fromEntries(entries),
      )
    ))
  ), [tickers, table, startKey], {});
}
