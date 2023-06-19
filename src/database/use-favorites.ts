import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '.';
import { Favorite } from '../models/favorite';
import { TickerDetails } from '../models/ticker-details';
import { useBars } from './use-bars';
import { useTickerDetails } from './use-ticker-details';

const favoritesTable = db.getFavoritesTable();

export async function addFavorite(ticker: string) {
  await favoritesTable.put(ticker, ticker);
}

export async function deleteFavorites(tickers: string[]) {
  await favoritesTable.bulkDelete(tickers);
}

export function useIsFavorite(ticker: string): boolean {
  return useLiveQuery(() => favoritesTable.get(ticker), [ticker]) !== undefined;
}

export function useFavorites(): Favorite[] {
  const favoriteTickers = useLiveQuery(() => favoritesTable.toArray(), [], []);
  const tickerDetails = useTickerDetails(favoriteTickers);
  const barsForTickers = useBars(favoriteTickers, '1D');

  return tickerDetails.map(favorite => {
    const result: TickerDetails & Partial<Favorite> = favorite;
    const bars = barsForTickers[favorite.symbol] ?? [];
    result.trendBars = bars;
    if (bars.length >= 1) {
      result.priceIntraday = bars[bars.length - 1].adjClose;
    }
    return result;
  });
}
