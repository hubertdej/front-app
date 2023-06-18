import { useCollection } from '@cloudscape-design/collection-hooks';
import { CollectionPreferencesProps, Header, Pagination, Spinner, Table, TableProps } from '@cloudscape-design/components';
import { upperFirst } from 'lodash';
import { Mover } from '../../../models/mover';
import { COLUMNS, COLUMN_NAMES } from '../constants';
import { MoverTableVariant } from '../types';
import MoversTableCell from './movers-table-cell';

export interface MoversTableProps {
  data?: Mover[];
  preferences: CollectionPreferencesProps.Preferences<Mover>;
  variant: MoverTableVariant;
}

function MoversTable({ data, preferences, variant }: MoversTableProps) {
  const columnDefinitions: ReadonlyArray<TableProps.ColumnDefinition<Mover>> = COLUMNS.map(column => ({
    id: column,
    sortingField: column,
    header: COLUMN_NAMES[column],
    cell: item => <MoversTableCell variant={variant} item={item} column={column} />,
  }));

  const sortingField: keyof Mover = 'percentChange';
  const { items, collectionProps, paginationProps } = useCollection<Mover>(data ?? [], {
    sorting: {
      defaultState: {
        isDescending: variant === 'gainers',
        sortingColumn: { sortingField },
      },
    },
    pagination: { pageSize: preferences.pageSize },
  });

  return (
    <Table
      {...collectionProps}
      columnDefinitions={columnDefinitions}
      items={items}
      resizableColumns={true}
      header={<Header>{upperFirst(variant)}</Header>}
      empty={<Spinner size="large" />}
      pagination={<Pagination {...paginationProps} />}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      contentDensity={preferences.contentDensity}
      visibleColumns={preferences.visibleContent}
      stickyColumns={preferences.stickyColumns}
    />
  );
}

export default MoversTable;
