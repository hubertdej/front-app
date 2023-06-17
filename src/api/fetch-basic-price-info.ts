import { getBasicPriceInfo } from './requests';
import { BasicPriceInfo } from '../models/basic-price-info';

export async function fetchBasicPriceInfo(query: string): Promise<BasicPriceInfo | null> {
  if (!query) {
    return null;
  }
  try {
    return await getBasicPriceInfo({ query });
  } catch (e) {
    console.error('Error retrieving basic price info', e);
    return null;
  }
}
