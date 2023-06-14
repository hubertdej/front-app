import { CollectionPreferencesProps } from '@cloudscape-design/components';
import { Mover } from '../../models/mover';
import { COLUMNS, COLUMN_NAMES, MAIN_COLUMNS, PAGE_SIZE_OPTIONS } from './constants';

export const COLLECTION_PREFERENCES_CONFIG: CollectionPreferencesProps = {
  pageSizePreference: {
    title: 'Page size',
    options: PAGE_SIZE_OPTIONS.map(value => ({ value, label: `${value} entries` })),
  },
  wrapLinesPreference: {
    label: 'Wrap lines',
    description: 'Select to see all the text and wrap the lines',
  },
  stripedRowsPreference: {
    label: 'Striped rows',
    description: 'Select to add alternating shaded rows',
  },
  contentDensityPreference: {
    label: 'Content density',
    description: 'Select to display content in a denser, more compact mode',
  },
  visibleContentPreference: {
    title: 'Select visible columns',
    options: [
      {
        label: 'Main properties',
        options: MAIN_COLUMNS.map(column => ({
          id: column,
          label: COLUMN_NAMES[column],
          editable: column !== 'symbol' && column != 'percentChange',
        })),
      },
      {
        label: 'Additional properties',
        options: COLUMNS.filter(column => !MAIN_COLUMNS.includes(column)).map(column => ({
          id: column,
          label: COLUMN_NAMES[column],
          editable: true,
        })),
      },
    ],
  },
  stickyColumnsPreference: {
    firstColumns: {
      title: 'Stick first column(s)',
      description: 'Keep the first column(s) visible while horizontally scrolling the table content.',
      options: [
        { label: 'None', value: 0 },
        { label: 'First column', value: 1 },
        { label: 'First two columns', value: 2 },
      ],
    },
  },
};

export const DEFAULT_PREFERENCES: CollectionPreferencesProps.Preferences<Mover> = {
  pageSize: PAGE_SIZE_OPTIONS[0],
  stripedRows: true,
  visibleContent: MAIN_COLUMNS,
  stickyColumns: { first: 1 },
};
