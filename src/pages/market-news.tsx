import { useEffect, useState } from 'react';
import { fetchNews } from '../api/fetch-news';
import { News } from '../models/news';
import { ColumnLayout, Container, Header, Link, SpaceBetween, Tabs } from '@cloudscape-design/components';

function NewsContainer(props: { query: string, when: number, entries: number, header: string }) {
  const [news, setNews] = useState<News[]>([]);
  useEffect(() => {
    fetchNews(props.query, props.when, props.entries).then(setNews);
  }, [props.query, props.when, props.entries]);
  return (
    <Container header={<Header variant={'h2'}>{props.header}</Header>}>
      <ColumnLayout columns={1} borders={'horizontal'}>
        {news.map(({ title, link, publisher, date }) => (
          <div key={link}>
            <Link href={link} external={true}>{title}</Link>
            <span style={{ float: 'right', color: 'gray' }}>{publisher} &middot; {date}</span>
          </div>
        ))}
      </ColumnLayout>
    </Container>
  );
}

function GlobalMarketsTab() {
  return (
    <SpaceBetween size={'l'}>
      <NewsContainer query={'american markets'} header={'American Markets'} entries={10} when={24}/>
      <NewsContainer query={'european markets'} header={'European Markets'} entries={10} when={24}/>
      <NewsContainer query={'asian markets'} header={'Asian Markets'} entries={10} when={24}/>
    </SpaceBetween>
  );
}

function CorporateEventsTab() {
  return (
    <SpaceBetween size={'l'}>
      <NewsContainer query={'ipo'} header={'Initial Public Offerings'} entries={10} when={24}/>
      <NewsContainer query={'mergers and acquisitions'} header={'Mergers and Acquisitions'} entries={10} when={24}/>
      <NewsContainer query={'dividends'} header={'Dividends'} entries={10} when={24}/>
      <NewsContainer query={'share repurchases buybacks'} header={'Share Repurchases/Buybacks'} entries={10} when={24}/>
    </SpaceBetween>
  );
}

function TopNewsTab() {
  return (
    <SpaceBetween size={'l'}>
      <NewsContainer query={'financial markets'} header={'Top News'} entries={20} when={24}/>
      <NewsContainer query={'latest financial markets news'} header={'Latest News'} entries={10} when={1}/>
    </SpaceBetween>
  );
}

function IndustriesTab() {
  return (
    <SpaceBetween size={'l'}>
      <NewsContainer query={'consumer goods industry'} header={'Consumer Goods'} entries={10} when={24}/>
      <NewsContainer query={'consumer services industry'} header={'Consumer Services'} entries={10} when={24}/>
      <NewsContainer query={'financial industry'} header={'Finance'} entries={10} when={24}/>
      <NewsContainer query={'oil and gas'} header={'Oil and Gas'} entries={10} when={24}/>
      <NewsContainer query={'technology sector'} header={'Technology'} entries={10} when={24}/>
    </SpaceBetween>
  );
}

function MacroTab() {
  return (
    <SpaceBetween size={'l'}>
      <NewsContainer query={'debt markets'} header={'Debt Markets'} entries={10} when={24}/>
      <NewsContainer query={'commodities markets'} header={'Commodities Markets'} entries={10} when={24}/>
      <NewsContainer query={'currency markets'} header={'Currency Markets'} entries={10} when={24}/>
      <NewsContainer query={'cryptocurrencies'} header={'Cryptocurrencies'} entries={10} when={24}/>
    </SpaceBetween>
  );
}

function WorldEconomyTab() {
  return (
    <SpaceBetween size={'l'}>
      <NewsContainer query={'united states economy'} header={'United States'} entries={5} when={24}/>
      <NewsContainer query={'united kingdom economy'} header={'United Kingdom'} entries={5} when={24}/>
      <NewsContainer query={'china economy'} header={'China'} entries={5} when={24}/>
      <NewsContainer query={'japan economy'} header={'Japan'} entries={5} when={24}/>
      <NewsContainer query={'germany economy'} header={'Germany'} entries={5} when={24}/>
      <NewsContainer query={'australia economy'} header={'Australia'} entries={5} when={24}/>
    </SpaceBetween>
  );
}



function MarketNews() {
  return (
    <div style={{ padding: '10px 10px 10px 10px' }}>
      <Tabs
        tabs={[
          {
            label: 'Top News',
            id: 'top_news',
            content: <TopNewsTab />,
          },
          {
            label: 'Global Markets',
            id: 'global_markets',
            content: <GlobalMarketsTab />,
          },
          {
            label: 'Corporate Events',
            id: 'corporate_events',
            content: <CorporateEventsTab />,
          },
          {
            label: 'Industries',
            id: 'industries',
            content: <IndustriesTab />,
          },
          {
            label: 'Macro',
            id: 'macro',
            content: <MacroTab />,
          },
          {
            label: 'World Economy',
            id: 'world_economy',
            content: <WorldEconomyTab />,
          },
        ]}
        variant="container"
      />
    </div>

  );
}

export default MarketNews;
