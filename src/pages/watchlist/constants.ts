import { Favorite } from '../../models/favorite';

export const COLUMNS: ReadonlyArray<keyof Favorite> = [
  'symbol',
  'name',
  'previousClose',
  'priceIntraday',
  'percentChange',
  'trendBars',
];

export const COLUMN_NAMES: Record<typeof COLUMNS[number], string> = {
  symbol: 'Symbol',
  name: 'Name',
  previousClose: 'Previous Close',
  priceIntraday: 'Price (Intraday)',
  percentChange: '% Change',
  trendBars: 'Trend',
};
