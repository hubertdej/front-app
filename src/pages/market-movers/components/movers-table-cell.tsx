import * as awsui from '@cloudscape-design/design-tokens';
import { FlashingSpan } from '../../../components/flashing-span';
import { TickerLink } from '../../../components/ticker-link';
import { Mover } from '../../../models/mover';
import { formatNumberDefault, formatNumberWithMagnitude, formatPercentageWithSign } from '../../../utils/formatting';
import { MoverTableVariant } from '../types';

export interface MoversTableCellProps {
  item: Mover;
  column: keyof Mover;
  variant: MoverTableVariant;
}

export function formatColumn<K extends keyof Mover>(column: K, value: Mover[K]): string {
  if (typeof value !== 'number') {
    return value ?? 'N/A';
  }
  if (column === 'percentChange') {
    return formatPercentageWithSign(value);
  }
  if (column === 'volume' || column === 'avgVol3Month' || column === 'marketCap') {
    return formatNumberWithMagnitude(value);
  }
  return formatNumberDefault(value);
}

function MoversTableCell({ item, column, variant }: MoversTableCellProps) {
  if (column === 'symbol') {
    return (
      <TickerLink ticker={item.symbol} />
    );
  }
  const value = formatColumn(column, item[column]);
  if (column === 'change' || column === 'percentChange') {
    return (
      <FlashingSpan
        key={item.symbol}
        value={value}
        style={{ color: variant === 'gainers' ? awsui.colorTextStatusSuccess : awsui.colorTextStatusError }}
      />
    );
  }
  return (
    <FlashingSpan
      key={item.symbol}
      value={value}
    />
  );
}

export default MoversTableCell;
