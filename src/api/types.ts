import { Bar } from '../models/bar';

export type BarRequest = {
  ticker: string;
  start: string;
  end: string;
  interval: '15m' | '1d';
};

export type BarResponse = Bar[];
