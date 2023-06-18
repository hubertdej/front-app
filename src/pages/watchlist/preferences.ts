import { CollectionPreferencesProps } from '@cloudscape-design/components';
import { COLUMNS, COLUMN_NAMES } from './constants';
import { Favorite } from '../../models/favorite';

export const COLLECTION_PREFERENCES_CONFIG: CollectionPreferencesProps<keyof Favorite> = {
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
        label: 'Properties',
        options: COLUMNS.map(column => ({
          id: column,
          label: COLUMN_NAMES[column],
          editable: column !== 'symbol' && column != 'percentChange',
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

export const DEFAULT_PREFERENCES: CollectionPreferencesProps.Preferences<keyof Favorite> = {
  stripedRows: true,
  visibleContent: COLUMNS,
  stickyColumns: { first: 1 },
};
