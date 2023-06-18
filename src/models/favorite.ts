import { Bar } from './bar';
import { TickerDetails } from './ticker-details';

export type Favorite = TickerDetails & {
  priceIntraday?: number;
  percentChange?: number;
  trendBars?: Bar[];
};
