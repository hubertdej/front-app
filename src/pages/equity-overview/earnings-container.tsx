import { ColumnLayout, Container } from '@cloudscape-design/components';
import { EquityEarningsInfo } from '../../models/equity-earnings-info';
import { prettyNumber } from './utilities';

function EarningsContainer( props: { earningsInfo: EquityEarningsInfo | null }) {
  const earningsInfo = props.earningsInfo;
  return (
    <Container fitHeight={true} header={
      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
        <div style={{ textAlign: 'center' }}>Earnings</div>
      </div>
    }
    >
      <ColumnLayout columns={1} borders='all'>
        <div>
          <span className={'key'}>Date</span>
          <span className={'value'}>{
            (earningsInfo != null && earningsInfo?.earningsDate.length > 1) && earningsInfo?.earningsDate[0] + ' - ' + earningsInfo?.earningsDate[1]
          }
          </span>
        </div>
        <div>
          <span className={'key'}>EPS Forward</span>
          <span className={'value'}>{prettyNumber(earningsInfo?.epsForward)}</span>
        </div>
        <div>
          <span className={'key'}>P/E Forward</span>
          <span className={'value'}>{prettyNumber(earningsInfo?.peForward)}</span>
        </div>
        <div>
          <span className={'key'}>Year Ago EPS</span>
          <span className={'value'}>{prettyNumber(earningsInfo?.yearAgoEps)}</span>
        </div>
      </ColumnLayout>
    </Container>
  );
}

export default EarningsContainer;
