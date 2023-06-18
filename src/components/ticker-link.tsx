import { Link } from '@cloudscape-design/components';

interface TickerLinkProps {
  ticker: string;
}

export function TickerLink({ ticker }: TickerLinkProps) {
  return (
    <Link href={`/stock/${ticker}`}>{ticker}</Link>
  );
}
