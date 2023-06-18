import { useCollection } from '@cloudscape-design/collection-hooks';
import { Button, CollectionPreferences, Header, Table, TableProps, TextFilter } from '@cloudscape-design/components';
import { EmptyState } from '../../../components/empty-state';
import { deleteFavorites, useFavorites } from '../../../database/use-favorites';
import useLocalStorage from '../../../hooks/use-local-storage';
import { Favorite } from '../../../models/favorite';
import { COLUMNS, COLUMN_NAMES } from '../constants';
import { COLLECTION_PREFERENCES_CONFIG, DEFAULT_PREFERENCES } from '../preferences';
import WatchlistTableCell from './watchlist-table-cell';

function WatchlistTable() {
  const favorites = useFavorites();
  const [preferences, setPreferences] = useLocalStorage('watchlist-table-preferences', DEFAULT_PREFERENCES);

  const columnDefinitions: ReadonlyArray<TableProps.ColumnDefinition<Favorite>> = COLUMNS.map(column => ({
    id: column,
    sortingField: column !== 'trendBars' ? column : undefined,
    header: COLUMN_NAMES[column],
    cell: item => <WatchlistTableCell item={item} column={column} />,
  }));

  const sortingField: keyof Favorite = 'percentChange';
  const { items, collectionProps, filteredItemsCount, filterProps } = useCollection<Favorite>(favorites, {
    sorting: {
      defaultState: {
        isDescending: true,
        sortingColumn: { sortingField },
      },
    },
    selection: {
      trackBy: item => item.symbol,
    },
    filtering: {
      empty: <EmptyState title="No symbols" description="Add symbols to favorites to display them here" />,
      noMatch: 'No matches',
    },
  });

  const selectionEmpty = (collectionProps.selectedItems ?? []).length === 0;

  const deleteSelected = () => {
    const selectedTickers = collectionProps.selectedItems?.map(item => item.symbol);
    deleteFavorites(selectedTickers ?? []);
  };

  return (
    <Table
      {...collectionProps}
      variant="full-page"
      selectionType="multi"
      columnDefinitions={columnDefinitions}
      items={items}
      resizableColumns={true}
      header={
        <Header
          variant="h1"
          actions={
            <Button
              iconName="remove"
              disabled={selectionEmpty}
              onClick={deleteSelected}
            >
              Remove
            </Button>
          }
          counter={`(${items.length})`}
        >
          Watchlist
        </Header>
      }
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      contentDensity={preferences.contentDensity}
      visibleColumns={preferences.visibleContent}
      stickyColumns={preferences.stickyColumns}
      filter={
        <TextFilter
          {...filterProps}
          filteringPlaceholder="Find symbols"
          filteringClearAriaLabel="Clear"
          countText={`${filteredItemsCount ?? 0} ${filteredItemsCount === 1 ? 'match' : 'matches'}`}
        />
      }
      preferences={
        <CollectionPreferences
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          preferences={preferences}
          onConfirm={({ detail }) => setPreferences(detail)}
          { ...COLLECTION_PREFERENCES_CONFIG }
        />
      }
    />
  );
}

export default WatchlistTable;
