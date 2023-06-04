import { useState } from 'react';
import { Header, Table } from '@cloudscape-design/components';
import { WidgetConfig } from './interfaces';
import { useSubscription } from '../../../use-subscription';

const tickers = ['INDU', 'SPX'];

function SampleContent() {
  const items = useSubscription(tickers).map(([ticker, price]) => ({ ticker, price }));
  const [selectedTickers, setSelectedTickers] = useState<Set<string>>(new Set());

  return (
    <Table
      variant='embedded'
      items={items}
      columnDefinitions={[
        { id: 'ticker', header: 'Ticker', cell: item => item.ticker, width: 100 },
        { id: 'price', header: 'Price', cell: item => item.price },
      ]}
      selectionType='multi'
      onSelectionChange={({ detail }) => setSelectedTickers(new Set(detail.selectedItems.map(item => item.ticker)))}
      selectedItems={items.filter(item => selectedTickers.has(item.ticker))}
    />
  );
}

export const sampleWidget: WidgetConfig = {
  definition: { defaultRowSpan: 2, defaultColumnSpan: 1 },
  data: {
    title: 'Sample title',
    description: 'Sample description',
    header: () => <Header>Tickers</Header>,
    content: SampleContent,
  },
};
