import { TickerDetails } from '../models/ticker-details';
import { getTickers } from './requests';

export async function fetchTickers(query: string): Promise<Record<string, TickerDetails[]>> {
  if (!query) {
    return {};
  }
  try {
    return await getTickers({ query });
  } catch (e) {
    console.error('Error searching tickers', e);
    return {};
  }
}
