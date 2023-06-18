import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useMemo } from 'react';
import { db } from '.';
import { getTickerDetails } from '../api/requests';
import { useIsOnline } from '../hooks/use-is-online';
import { Favorite } from '../models/favorite';
import { TickerDetails } from '../models/ticker-details';
import { useBars } from './use-bars';

const detailsTable = db.getTickerDetailsTable();

export async function deleteFavorites(tickers: string[]) {
  await detailsTable.bulkDelete(tickers);
}

function getPresentTickers(): Promise<string[]> {
  return detailsTable.toArray().then(details => details.map(({ symbol }) => symbol));
}

async function updateFavorites() {
  try {
    const newDetails = await getTickerDetails({ tickers: await getPresentTickers() });
    await db.transaction('rw', detailsTable, async () => {
      // Contents might have changed since we fetched the details, so we need to filter the details
      const presentSymbols = await getPresentTickers();
      detailsTable.bulkPut(newDetails.filter(({ symbol }) => presentSymbols.includes(symbol)));
    });
  } catch (e) {
    console.error('Error updating favorites', e);
  }
}

const UPDATE_INTERVAL_MS = 10000;

export function useFavorites(): Favorite[] {
  const isOnline = useIsOnline();

  useEffect(() => {
    if (isOnline) {
      updateFavorites();
      const interval = setInterval(() => updateFavorites(), UPDATE_INTERVAL_MS);
      return () => clearInterval(interval);
    }
  }, [isOnline]);

  const tickerDetails = useLiveQuery(() => detailsTable.toArray(), [], []);
  const tickers = useMemo(() => tickerDetails.map(favorite => favorite.symbol), [tickerDetails]);
  const barsForTickers = useBars(tickers, '1D');

  return tickerDetails.map(favorite => {
    const result: TickerDetails & Partial<Favorite> = favorite;
    const bars = barsForTickers[favorite.symbol] ?? [];
    result.trendBars = bars;
    if (bars.length >= 1) {
      result.priceIntraday = bars[bars.length - 1].adjClose;
      if (result.previousClose) {
        result.percentChange = result.priceIntraday / result.previousClose - 1;
        result.percentChange *= 100;
      }
    }
    return result;
  });
}
