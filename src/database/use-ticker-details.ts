import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect } from 'react';
import { db } from '.';
import { getTickerDetails } from '../api/requests';
import { useIsOnline } from '../hooks/use-is-online';
import { TickerDetails } from '../models/ticker-details';

const detailsTable = db.getTickerDetailsTable();

async function updateTickerDetails(tickers: string[]) {
  try {
    await detailsTable.bulkPut(await getTickerDetails({ tickers }));
  } catch (e) {
    console.error('Error updating ticker details', e);
  }
}

const UPDATE_INTERVAL_MS = 10000;

export function useTickerDetails(tickers: string[]): TickerDetails[] {
  const isOnline = useIsOnline();

  useEffect(() => {
    if (isOnline) {
      updateTickerDetails(tickers);
      const interval = setInterval(() => updateTickerDetails(tickers), UPDATE_INTERVAL_MS);
      return () => clearInterval(interval);
    }
  }, [tickers, isOnline]);

  return useLiveQuery(() => (
    detailsTable
      .bulkGet(tickers)
      .then(details => tickers.map((symbol, index) => details[index] ?? { symbol }))
  ), [tickers], []);
}
