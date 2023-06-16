import * as awsui from '@cloudscape-design/design-tokens';
import styled from 'styled-components';
import { TickerLink } from '../../../../components/ticker-link';
import { Mover } from '../../../../models/mover';
import { FlashingSpan } from '../flashing-span';
import { MoverTableVariant } from './types';
import { formatColumn } from './formatting';

const StyledFlashingSpan = styled(FlashingSpan)<{ variant: MoverTableVariant }>`
  color: ${({ variant }) => variant === 'gainers' ? awsui.colorTextStatusSuccess : awsui.colorTextStatusError};
`;

export interface CellProps {
  item: Mover;
  column: keyof Mover;
  variant: MoverTableVariant;
}

function Cell({ item, column, variant }: CellProps) {
  const value = formatColumn(column, item[column]);
  if (column === 'symbol') {
    return (
      <TickerLink ticker={value} />
    );
  }
  if (column === 'change' || column === 'percentChange') {
    return (
      <StyledFlashingSpan
        key={item.symbol}
        value={value}
        variant={variant}
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

export default Cell;
