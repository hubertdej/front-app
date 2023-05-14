import React, { useContext, useMemo } from 'react';
import { Header, Table } from '@cloudscape-design/components';
import { WidgetConfig } from './interfaces';
import { useSubscription } from '../../../use-subscription';
import { TickerSelectionContext } from '..';

function Content({ id, tickerNames }: { id: string, tickerNames: Record<string, string> }) {
  const { updateSelectedTickers, getSelectedTickers } = useContext(TickerSelectionContext)!;
  const selectedTickers = new Set(getSelectedTickers());
  const tickers = useMemo(() => Object.keys(tickerNames), [tickerNames]);
  const items = useSubscription(tickers).map(([ticker, price]) => ({ ticker, price }));

  return (
    <Table
      variant='embedded'
      items={items}
      columnDefinitions={[
        { id: 'name', header: 'Name', cell: item => tickerNames[item.ticker], width: 100 },
        { id: 'ticker', header: 'Ticker', cell: item => item.ticker, width: 100 },
      ]}
      selectionType='multi'
      onSelectionChange={({ detail }) => {
        updateSelectedTickers(id, detail.selectedItems.map(item => item.ticker));
      }}
      selectedItems={items.filter(item => selectedTickers.has(item.ticker))}
    />
  );
}

function createTableConfig(title: string, tickerNames: Record<string, string>): WidgetConfig  {
  return {
    definition: { defaultRowSpan: 4, defaultColumnSpan: 1 },
    data: {
      title,
      description: `View ${title}`,
      header: () => <Header>{title}</Header>,
      content: () => <Content id={title} tickerNames={tickerNames}/>,
    },
  };
}

export const indicesWidget = createTableConfig('U.S. Major indices', {
  'INDU': 'Dow Jones',
  'SPX': 'S&P 500',
  'IWM': 'Russell 2000',
  'NDX': 'Nasdaq 100',
});

export const utilitiesWidget = createTableConfig('Utilities', {
  'XLU': 'Utilities',
  'XLP': 'Cons. Staples',
  'XLRE': 'Real Estate',
  'XLB': 'Materials',
  'XLE': 'Energy',
  'XLC': 'Communications',
  'XLI': 'Industrials',
  'XLK': 'Technology',
  'XLV': 'Health Care',
  'XLF': 'Financials',
  'XLY': 'Cons. Discretionary',
});

export const currenciesWidget = createTableConfig('Currencies', {
  'EURUSD': 'Euro',
  'GBPUSD': 'British Pound',
  'USDJPY': 'Japanese Yen',
  'BTCUSD': 'Bitcoin',
});
