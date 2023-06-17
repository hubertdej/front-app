import { Bar } from '../models/bar';
import { Mover } from '../models/mover';
import { TickerDetails } from '../models/ticker-details';
import { EquityDetails } from '../models/equity-details';
import { EquityNews } from '../models/equity-news';
import { EquityKeyStats } from '../models/equity-key-stats';
import { EquityEarningsInfo } from '../models/equity-earnings-info';

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
export type EquityDetailsResponse = EquityDetails | null;
export type EquityNewsResponse = EquityNews[];
export type EquityKeyStatsResponse = EquityKeyStats | null;
export type EquityEarningsInfoResponse = EquityEarningsInfo | null;

export type MoversResponse = { gainers: Mover[], losers: Mover[] };

export type TickerDetailsRequest = { tickers: string[] };

export type TickerDetailsResponse = TickerDetails[];
