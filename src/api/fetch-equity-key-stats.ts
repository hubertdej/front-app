import { getEquityKeyStats } from './requests';
import { EquityKeyStatsResponse } from './types';

export async function fetchEquityKeyStats(query: string): Promise<EquityKeyStatsResponse> {
  if (!query) {
    return null;
  }
  try {
    return await getEquityKeyStats({ query });
  } catch (e) {
    console.error('Error searching equity key stats', e);
    return null;
  }
}
