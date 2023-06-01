import { BarRequest, BarResponse } from '../types';

const dateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

const amplitudeRange = [1, 10];
const periodRange = [50, 100];

function randomAmplitude() {
  return Math.random() * (amplitudeRange[1] - amplitudeRange[0]) + amplitudeRange[0];
}

function randomPeriod() {
  return Math.random() * (periodRange[1] - periodRange[0]) + periodRange[0];
}

export async function getBars({ ticker, start, end, interval }: BarRequest): Promise<BarResponse> {
  if (window.navigator.onLine === false) {
    throw new Error('No internet connection');
  }
  if (!start.match(dateRegex)?.length) {
    throw new Error('Invalid start format');
  }
  if (!end.match(dateRegex)?.length) {
    throw new Error('Invalid end format');
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (startDate > endDate) {
    throw new Error('Invalid date range');
  }

  const now = new Date();
  const bound = endDate < now ? endDate : now;
  const dates = new Array<string>();

  for (const date = new Date(startDate.getTime()); date <= bound;) {
    if (interval === '15m') {
      dates.push(date.toISOString());
      date.setUTCMinutes(date.getUTCMinutes() + 15);
    } else {
      dates.push(date.toISOString().split('T')[0]);
      date.setUTCDate(date.getUTCDate() + 1);
    }
  }

  console.log('Mocking API request', { ticker, start, end, interval }, 'total data points: ', dates.length);

  const amplitude = randomAmplitude();
  const periods = Array.from({ length: 6 }).map(() => randomPeriod());

  return dates.map((dateTime, index) => ({
    ticker,
    dateTime,
    open: Math.sin(index / periods[0]) * amplitude,
    high: Math.sin(index / periods[1]) * amplitude,
    low: Math.sin(index / periods[2]) * amplitude,
    close: Math.sin(index / periods[3]) * amplitude,
    adjClose: Math.sin(index / periods[4]) * amplitude,
    volume: Math.sin(index / periods[5]) * amplitude,
  }));
}
