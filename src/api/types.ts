import { Bar } from '../models/bar';
import { TickerDetails } from '../models/ticker-details';

export type BarRequest = {
  tickers: string[];
  start: string;
  end: string;
  interval: '15m' | '1d';
};

export type BarResponse = Bar[];

export type TickerSearchRequest = {
  query: string
};

export type TickerSearchResponse = Record<string, TickerDetails[]>;
