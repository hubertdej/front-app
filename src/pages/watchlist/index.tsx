import { AppLayout, BreadcrumbGroup } from '@cloudscape-design/components';
import WatchlistTable from './components/watchlist-table';

function Watchlist() {
  return (
    <AppLayout
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'App', href: '/' },
            { text: 'Watchlist', href: '/watchlist' },
          ]}
          expandAriaLabel="Show path"
          ariaLabel="Breadcrumbs"
        />
      }
      contentType="table"
      content={
        <WatchlistTable />
      }
      navigationHide={true}
      toolsHide={true}
    />
  );
}

export default Watchlist;
