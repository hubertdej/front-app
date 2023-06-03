import { Bar } from '../models/bar';

export type BarRequest = {
  tickers: string[];
  start: string;
  end: string;
  interval: '15m' | '1d';
};

export type BarResponse = Bar[];
