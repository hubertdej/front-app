import { getEquityEarningsInfo } from './requests';
import { EquityEarningsInfoResponse } from './types';

export async function fetchEquityEarningsInfo(query: string): Promise<EquityEarningsInfoResponse> {
  if (!query) {
    return null;
  }
  try {
    return await getEquityEarningsInfo({ query });
  } catch (e) {
    console.error('Error searching equity key stats', e);
    return null;
  }
}
