import { getEquityNews } from './requests';
import { EquityNewsResponse } from './types';

export async function fetchEquityNews(query: string): Promise<EquityNewsResponse> {
  if (!query) {
    return [];
  }
  try {
    return await getEquityNews({ query });
  } catch (e) {
    console.error('Error searching equity news', e);
    return [];
  }
}
