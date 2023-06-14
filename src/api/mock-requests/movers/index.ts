import { Mover } from '../../../models/mover';
import { MoversResponse } from '../../types';
import GAINERS from './gainers.json';
import LOSERS from './losers.json';

function addRandomVariability(record: Mover): Mover {
  Object.entries(record).forEach(([key, value]) => {
    if (typeof value === 'number') {
      // Randomize within 95% to 105% of the original value
      const randomizedValue = value * (Math.random() * 0.1 + 0.95);
      Object.assign(record, { [key]: parseFloat(randomizedValue.toFixed(3)) });
    }
  });
  return record;
}

export function getMovers(): Promise<MoversResponse> {
  return Promise.resolve({
    gainers: GAINERS.map(mover => addRandomVariability(mover)),
    losers: LOSERS.map(mover => addRandomVariability(mover)),
  });
}
