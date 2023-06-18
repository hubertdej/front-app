import { Mover } from '../../models/mover';

export const COLUMNS: ReadonlyArray<keyof Mover> = [
  'symbol',
  'name',
  'priceIntraday',
  'change',
  'percentChange',
  'volume',
  'avgVol3Month',
  'marketCap',
  'peRatioTTM',
];

export const MAIN_COLUMNS: ReadonlyArray<keyof Mover> = [
  'symbol',
  'name',
  'priceIntraday',
  'change',
  'percentChange',
];

export const PAGE_SIZE_OPTIONS = [10, 20, 50];

export const COLUMN_NAMES: Record<typeof COLUMNS[number], string> = {
  symbol: 'Symbol',
  name: 'Name',
  priceIntraday: 'Price (Intraday)',
  change: 'Change',
  percentChange: '% Change',
  volume: 'Volume',
  avgVol3Month: 'Avg Vol (3 month)',
  marketCap: 'Market Cap',
  peRatioTTM: 'PE Ratio (TTM)',
};
