import { Header } from '@cloudscape-design/components';
import { TableWidgetContent } from './table-widget-content';
import { WidgetConfig } from '../interfaces';
import { TableItem } from './types';
import currencies from './data/currencies.json';
import usEquityMarkets from './data/us-equity-markets.json';
import usEquitySectors from './data/us-equity-sectors.json';

function createTableWidgetConfig(
  name: string,
  definition: WidgetConfig['definition'],
  dataSet: TableItem[],
): WidgetConfig {
  return {
    definition,
    data: {
      title: name,
      description: name,
      header: () => <Header>{name}</Header>,
      content: () => <TableWidgetContent id={name} items={dataSet} />,
    },
  };
}

export const currenciesWidget = createTableWidgetConfig(
  'Currencies',
  { minRowSpan: 3 },
  currencies,
);
export const usEquityMarketsWidget = createTableWidgetConfig(
  'US Equity Markets',
  { minRowSpan: 4 },
  usEquityMarkets,
);
export const usEquitySectorsWidget = createTableWidgetConfig(
  'US Equity Sectors',
  { minRowSpan: 5 },
  usEquitySectors,
);
