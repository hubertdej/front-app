import { ColumnLayout, Container } from '@cloudscape-design/components';
import { BasicPriceInfo } from '../../models/basic-price-info';

function DividendsContainer( props: { basicPriceInfo: BasicPriceInfo | null }) {
  const basicPriceInfo = props.basicPriceInfo;
  return (
    <Container fitHeight={true} header={
      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
        <div style={{ textAlign: 'center' }}>Dividends</div>
      </div>
    }
    >
      <ColumnLayout columns={1} borders='all'>
        <div>
          <span className={'key'}>Last Dividend date</span>
          <span className={'value'}>{basicPriceInfo?.exDividendDate ?? 'N/A'}</span>
        </div>
        <div>
          <span className={'key'}>Yield TTM</span>
          <span className={'value'}>{basicPriceInfo?.dividendYield ?? 'N/A'}</span>
        </div>
        <div>
          <span className={'key'}>Dividend Rate</span>
          <span className={'value'}>{basicPriceInfo?.dividendRate ?? 'N/A'}</span>
        </div>
        <div>
          <span className={'key'}>Dividend Yield(5Y AVG)</span>
          <span className={'value'}>{basicPriceInfo?.fiveYearAvgDividendYield ?? 'N/A'}</span>
        </div>
      </ColumnLayout>
    </Container>
  );
}

export default DividendsContainer;
