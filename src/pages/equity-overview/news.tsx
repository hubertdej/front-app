import { ColumnLayout, Container, Link } from '@cloudscape-design/components';
import { EquityNews } from '../../models/equity-news';

function unixTimestampToDate(timestamp: string): string {
  const timestampMilliseconds = parseInt(timestamp) * 1000;
  const date = new Date(timestampMilliseconds);
  return date.toLocaleString();
}


function News( props: { news: EquityNews[] }) {
  return (
    <Container fitHeight={true} header={
      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                Company News
      </div>
    }
    >
      <ColumnLayout columns={1} borders='all'>
        {props.news.map((newsEntry) => {
          return (
            <div key={newsEntry.title}>
              <Link href={newsEntry.link} external={true}>{newsEntry.title}</Link>
              <span style={{ float: 'right', color: 'gray' }}>{newsEntry.publisher} &middot; {unixTimestampToDate(newsEntry.providerPublishTime)}</span>
            </div>
          );
        })}
        {props.news.length == 0 && <div style={{ textAlign: 'center' }}>No company related news</div> }
      </ColumnLayout>
    </Container>
  );
}

export default News;
