import { ColumnLayout, Container, Header, SpaceBetween } from '@cloudscape-design/components';
import Flag from 'react-flagkit';
import Box from '@cloudscape-design/components/box';
import { EquityDetails } from '../../models/equity-details';
import { BasicPriceInfo } from '../../models/basic-price-info';
import { getPriceChange, getPriceChangePercentage, prettyNumber } from './utilities';

function OverviewHeader(props: { equityDetails: EquityDetails | null, basicPriceInfo: BasicPriceInfo | null, ticker: string } ) {
  const equityDetails = props.equityDetails;
  const basicPriceInfo = props.basicPriceInfo;
  const priceChange = getPriceChange(basicPriceInfo?.price, basicPriceInfo?.previousClose);
  const priceChangePercentage = getPriceChangePercentage(basicPriceInfo?.price, basicPriceInfo?.previousClose);
  return (
    <Container header={
      <Header variant="h2">
        <SpaceBetween direction={'horizontal'} size='xxs' >
          {equityDetails?.name} <Flag country={'US'} /> <span className={'small-gray-text'}>{equityDetails?.market}</span>
        </SpaceBetween>
      </Header>}
    >
      <ColumnLayout columns={4} variant="text-grid">
        <div>
          <Box variant={'awsui-key-label'}>{props.ticker}</Box>
          <span style={{ fontWeight: 'bold' }}>{prettyNumber(basicPriceInfo?.price)}</span>
          <span className={'small-gray-text'}>{equityDetails?.currency}</span>
          &nbsp;
          {
            priceChange == undefined ? <></> : (priceChange >= 0 ?
              <span style={{ color: 'green' }}>{prettyNumber(priceChange)}</span> : <span style={{ color: 'red' }}>{prettyNumber(priceChange)}</span>)
          }
          &nbsp;
          {
            priceChangePercentage == undefined ? <></> : (priceChangePercentage.charAt(0) != '-' ?
              <span style={{ color: 'green' }}>({priceChangePercentage})</span> : <span style={{ color: 'red' }}>({priceChangePercentage})</span>)
          }
        </div>
        <div>
          <Box variant={'awsui-key-label'}>Sector</Box>
          <div>{equityDetails?.sector}</div>
        </div>
        <div>
          <Box variant={'awsui-key-label'}>Industry</Box>
          <div>{equityDetails?.industry}</div>
        </div>
        <div>
          <Box variant={'awsui-key-label'}>Market Cap</Box>
          <div>{equityDetails?.market_cap}</div>
        </div>
      </ColumnLayout>
    </Container>
  );
}

export default OverviewHeader;
