import { ColumnLayout, Container } from '@cloudscape-design/components';
import { EquityKeyStats } from '../../models/equity-key-stats';
import { prettyNumber } from './utilities';

function KeyData( props: { equityKeyStats: EquityKeyStats | null }) {
  const equityKeyStats = props.equityKeyStats;
  return (
    <Container fitHeight={true} header={
      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                Key Data
      </div>
    }
    >
      <ColumnLayout columns={2} borders='all'>
        <div>
          <span className={'key'}>Beta</span>
          <span className={'value'}>{prettyNumber(equityKeyStats?.beta)}</span>
        </div>
        <div>
          <span className={'key'}>P/B</span>
          <span className={'value'}>{prettyNumber(equityKeyStats?.priceToBook)}</span>
        </div>
        <div>
          <span className={'key'}>EPS(TTM)</span>
          <span className={'value'}>{prettyNumber(equityKeyStats?.trailingEps)}</span>
        </div>
        <div>
          <span className={'key'}>P/E</span>
          <span className={'value'}>{prettyNumber(equityKeyStats?.priceToEarnings)}</span>
        </div>
        <div>
          <span className={'key'}>Shares Outstanding</span>
          <span className={'value'}>{prettyNumber(equityKeyStats?.sharesOutstanding)}</span>
        </div>
        <div>
          <span className={'key'}>Shares Floating</span>
          <span className={'value'}>{prettyNumber(equityKeyStats?.floatShares)}</span>
        </div>
        <div>
          <span className={'key'}>Short Interest% of Float</span>
          <span className={'value'}>{equityKeyStats?.shortPercentOfFloat && prettyNumber(equityKeyStats?.shortPercentOfFloat, 3) + '%'}</span>
        </div>
        <div>
          <span className={'key'}>Days To Cover</span>
          <span className={'value'}>{prettyNumber(equityKeyStats?.shortRatio)}</span>
        </div>
      </ColumnLayout>
    </Container>
  );
}

export default KeyData;
