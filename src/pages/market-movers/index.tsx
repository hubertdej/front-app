import { AppLayout, BreadcrumbGroup, CollectionPreferences, ColumnLayout, ContentLayout, Header } from '@cloudscape-design/components';
import { useMovers } from '../../database/use-movers';
import useLocalStorage from '../../hooks/use-local-storage';
import MoversTable from './components/movers-table';
import { COLLECTION_PREFERENCES_CONFIG, DEFAULT_PREFERENCES } from './preferences';

function MarketMovers() {
  const { gainers, losers } = useMovers();
  const [preferences, setPreferences] = useLocalStorage('market-movers-table-preferences', DEFAULT_PREFERENCES);

  return (
    <AppLayout
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'App', href: '/' },
            { text: 'Market Movers', href: '/movers' },
          ]}
          expandAriaLabel="Show path"
          ariaLabel="Breadcrumbs"
        />
      }
      contentType="cards"
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              actions={
                <CollectionPreferences
                  title="Preferences"
                  confirmLabel="Confirm"
                  cancelLabel="Cancel"
                  preferences={preferences}
                  onConfirm={({ detail }) => setPreferences(detail)}
                  { ...COLLECTION_PREFERENCES_CONFIG }
                />
              }
            >
              Market Movers
            </Header>
          }
        >
          <ColumnLayout columns={2}>
            <MoversTable variant="gainers" data={gainers} preferences={preferences} />
            <MoversTable variant="losers" data={losers} preferences={preferences} />
          </ColumnLayout>
        </ContentLayout>
      }
      navigationHide={true}
      toolsHide={true}
    />
  );
}

export default MarketMovers;
