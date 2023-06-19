import { useLoaderData, LoaderFunctionArgs } from 'react-router-dom';
import { AppLayout, BreadcrumbGroup, ColumnLayout, ContentLayout, SpaceBetween } from '@cloudscape-design/components';
import OverviewHeader from './overview-header';
import ChartContainer from './chart/ChartContainer';
import CompanyDescription from './company-description';
import News from './news';
import KeyData from './key-data';
import { useEffect, useState } from 'react';
import { EquityDetails } from '../../models/equity-details';
import { fetchEquityDetails } from '../../api/fetch-equity-details';
import { EquityNews } from '../../models/equity-news';
import { fetchEquityNews } from '../../api/fetch-equity-news';
import { fetchBasicPriceInfo } from '../../api/fetch-basic-price-info';
import { BasicPriceInfo } from '../../models/basic-price-info';
import EarningsContainer from './earnings-container';
import DividendsContainer from './dividends-container';
import { EquityKeyStats } from '../../models/equity-key-stats';
import { fetchEquityKeyStats } from '../../api/fetch-equity-key-stats';
import { fetchEquityEarningsInfo } from '../../api/fetch-equity-earnings-info';
import { EquityEarningsInfo } from '../../models/equity-earnings-info';
import './index.css';

export async function loader({ params }: LoaderFunctionArgs) {
  const ticker = params.ticker;
  return { ticker };
}

const EquityOverviewContent = ( props: { ticker: string }) => {
  const ticker = props.ticker;
  const [equityDetails, setEquityDetails] = useState<EquityDetails | null>(null);
  const [equityNews, setEquityNews] = useState<EquityNews[]>([]);
  const [basicPriceInfo, setBasicPriceInfo] = useState<BasicPriceInfo | null>(null);
  const [equityKeyStats, setEquityKeyStats] = useState<EquityKeyStats | null>(null);
  const [equityEarningsInfo, setEquityEarningsInfo] = useState<EquityEarningsInfo | null>(null);

  useEffect(() => {
    fetchEquityDetails(ticker).then(equity => {
      setEquityDetails(equity);
    });
    fetchEquityNews(ticker).then(news => {
      setEquityNews(news);
    });
    fetchBasicPriceInfo(ticker).then(data=> {
      setBasicPriceInfo(data);
    });
    fetchEquityKeyStats(ticker).then(data=> {
      setEquityKeyStats(data);
    });
    fetchEquityEarningsInfo(ticker).then(data=> {
      setEquityEarningsInfo(data);
    });

  }, [ticker]);

  return (
    <ContentLayout>
      <SpaceBetween size={'m'}>
        <OverviewHeader equityDetails={equityDetails} basicPriceInfo={basicPriceInfo} ticker={props.ticker}/>
        <ColumnLayout columns={2}>
          <ChartContainer ticker={ticker} basicPriceInfo={basicPriceInfo}/>
          <SpaceBetween size={'m'}>
            <CompanyDescription equityDetails={equityDetails}/>
            <KeyData equityKeyStats={equityKeyStats}/>
            <ColumnLayout columns={2}>
              <EarningsContainer earningsInfo={equityEarningsInfo}/>
              <DividendsContainer basicPriceInfo={basicPriceInfo}/>
            </ColumnLayout>
          </SpaceBetween>
        </ColumnLayout>
        <News news={equityNews}/>
      </SpaceBetween>
    </ContentLayout>
  );
};

function EquityOverviewContentAppLayout(props: { ticker: string }) {
  return (
    <AppLayout
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'App', href: '/' },
            { text: props.ticker, href: `/stock/${props.ticker}` },
          ]}
          expandAriaLabel="Show path"
          ariaLabel="Breadcrumbs"
        />
      }
      contentType="cards"
      content={
        <EquityOverviewContent ticker={props.ticker}/>
      }
      navigationHide={true}
      toolsHide={true}
    />
  );
}

function EquityOverview() {
  const { ticker } = useLoaderData() as { ticker: string };
  return (
    <div key={ticker}>
      <EquityOverviewContentAppLayout ticker={ticker}/>
    </div>
  );
}

export default EquityOverview;
