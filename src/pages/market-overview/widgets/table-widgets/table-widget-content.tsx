import { Popover, Table } from '@cloudscape-design/components';
import * as awsui from '@cloudscape-design/design-tokens';
import { useMemo } from 'react';
import { FlashingSpan } from '../../../../components/flashing-span';
import { TickerLink } from '../../../../components/ticker-link';
import { useTickerDetails } from '../../../../database/use-ticker-details';
import { formatPercentageWithSign } from '../../../../utils/formatting';
import { useTickerManagerContext } from '../../use-ticker-manager';
import { TableItem } from './types';

interface TableWidgetContentProps {
  id: string;
  items: TableItem[];
}

export function TableWidgetContent({ id, items }: TableWidgetContentProps) {
  const tickers = useMemo(() => items.map(item => item.symbol), [items]);
  const details = useTickerDetails(tickers);
  const percentagesPerSymbol = Object.fromEntries(details.map(item => [item.symbol, item.percentChange]));

  const { getSelectedTickers, setSelectedTickers } = useTickerManagerContext();
  const selectedTickers = getSelectedTickers(id) ?? [];
  const selectedItems = items.filter(item => selectedTickers.includes(item.symbol));

  return (
    <Table
      variant='borderless'
      items={items}
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) => setSelectedTickers(id, detail.selectedItems.map(item => item.symbol))}
      columnDefinitions={[
        {
          id: 'symbol',
          header: 'Symb.',
          cell: item => <TickerLink ticker={item.symbol}/>,
        },
        {
          id: 'name',
          header: 'Name',
          cell: item => <Popover content={item.description} dismissButton={false}>{item.name}</Popover>,
        },
        {
          id: 'percentChange',
          header: '% Chg',
          cell: item => {
            const value = percentagesPerSymbol[item.symbol];
            if (value === undefined) {
              return (
                <FlashingSpan
                  key={item.symbol}
                  value='N/A'
                />
              );
            }
            return (
              <FlashingSpan
                key={item.symbol}
                value={formatPercentageWithSign(value)}
                style={{ color: value >= 0 ? awsui.colorTextStatusSuccess : awsui.colorTextStatusError }}
              />
            );
          },
        },
      ]}
      selectionType='multi'
      contentDensity='compact'
    />
  );
}
