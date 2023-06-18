import * as awsui from '@cloudscape-design/design-tokens';
import { FlashingSpan } from '../../../components/flashing-span';
import { TickerLink } from '../../../components/ticker-link';
import { Favorite } from '../../../models/favorite';
import { formatNumberDefault, formatPercentageWithSign } from '../../../utils/formatting';
import { TrendChart } from './trend-chart';

export interface WatchlistTableCellProps {
  item: Favorite;
  column: keyof Favorite;
}

function WatchlistTableCell({ item, column }: WatchlistTableCellProps) {
  const color = item.percentChange !== undefined && item.percentChange >= 0 ? 'green' : 'red';
  if (column === 'trendBars') {
    return <TrendChart bars={item.trendBars ?? []} color={color} />;
  }
  if (column === 'symbol') {
    return <TickerLink ticker={item.symbol} />;
  }
  if (column === 'percentChange' && item.percentChange !== undefined) {
    return (
      <FlashingSpan
        key={item.symbol}
        value={formatPercentageWithSign(item.percentChange)}
        style={{ color: color === 'green' ? awsui.colorTextStatusSuccess : awsui.colorTextStatusError }}
      />
    );
  }
  const value = item[column];
  if (typeof value === 'number') {
    return (
      <FlashingSpan
        key={item.symbol}
        value={formatNumberDefault(value)}
      />
    );
  }
  return (
    <FlashingSpan
      key={item.symbol}
      value={value ?? 'N/A'}
    />
  );
}

export default WatchlistTableCell;
