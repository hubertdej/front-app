import { getEquityDetails } from './requests';
import { EquityDetailsResponse } from './types';

export async function fetchEquityDetails(query: string): Promise<EquityDetailsResponse> {
  if (!query) {
    return null;
  }
  try {
    return await getEquityDetails({ query });
  } catch (e) {
    console.error('Error searching equity details', e);
    return null;
  }
}
