import { Bar } from '../models/bar';
import { getBars } from './requests';

function roundDown(date: Date): string {
  return date.toISOString().split('T')[0];
}

function roundUp(date: Date): string {
  const newDate = new Date(roundDown(date));
  if (newDate < date) {
    newDate.setUTCDate(newDate.getUTCDate() + 1);
  }
  return newDate.toISOString().split('T')[0];
}

// Fetches the data for a given ticker and date range.
// Date range is inclusive.
export async function fetchBars(ticker: string, start: Date, end: Date, fineGrained: boolean): Promise<Bar[]> {
  console.log(`fetchBars(${ticker}, ${start.toISOString()}, ${end.toISOString()}, ${fineGrained})`);

  const response = await getBars({
    ticker,
    start: roundDown(start),
    end: roundUp(end),
    interval: fineGrained ? '15m' : '1d',
  }).catch(e => {
    console.error('Error fetching bars', e);
    return [];
  });

  return response.filter(bar => {
    const date = new Date(bar.dateTime);
    return date >= start && date <= end;
  });
}
