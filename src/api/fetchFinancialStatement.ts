import { getFinancialStatement } from './requests';
import { FinancialStatement } from './types';

export async function fetchFinancialStatement(ticker: string, statement: string): Promise<FinancialStatement> {
  if (!ticker || !statement) {
    return {};
  }
  try {
    return await getFinancialStatement({ ticker, statement });
  } catch (e) {
    console.error(`Error fetching ${statement} for ${ticker}`, e);
    return {};
  }
}
