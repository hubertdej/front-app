import { ColumnLayout, Container } from '@cloudscape-design/components';
import EquityOverviewChart from './EquityOverviewChart';
import { BasicPriceInfo } from '../../../models/basic-price-info';
import { prettyNumber } from '../utilities';

function ChartContainer(props: { ticker: string, basicPriceInfo: BasicPriceInfo | null }) {
  const basicPriceInfo = props.basicPriceInfo;
  return (
    <Container fitHeight={true}>
      <div style={{ height: 400 }}>
        <EquityOverviewChart ticker={props.ticker}/>
      </div>
      <ColumnLayout columns={2} borders={'all'}>
        <div>
          <span className={'key'}>Open</span>
          <span className={'value'}>{prettyNumber(basicPriceInfo?.open)}</span>
        </div>
        <div>
          <span className={'key'}>Previous Close</span>
          <span className={'value'}>{prettyNumber(basicPriceInfo?.previousClose)}</span>
        </div>
        <div>
          <span className={'key'}>52 Week H</span>
          <span className={'value'}>{prettyNumber(basicPriceInfo?.fiftyTwoWeekHigh)}</span>
        </div>
        <div>
          <span className={'key'}>Market Cap</span>
          <span className={'value'}>{prettyNumber(basicPriceInfo?.marketCap)}</span>
        </div>
        <div>
          <span className={'key'}>52 Week L</span>
          <span className={'value'}>{prettyNumber(basicPriceInfo?.fiftyTwoWeekLow)}</span>
        </div>
        <div>
          <span className={'key'}>Volume</span>
          <span className={'value'}>{prettyNumber(basicPriceInfo?.volume)}</span>
        </div>
      </ColumnLayout>
    </Container>
  );
}

export default ChartContainer;
