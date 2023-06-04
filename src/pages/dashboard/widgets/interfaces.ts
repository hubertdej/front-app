import { ReactElement, JSXElementConstructor } from 'react';
import { BoardProps } from '@cloudscape-design/board-components/board';

export interface WidgetDataType {
  title: string;
  description: string;
  provider?: JSXElementConstructor<{ children: ReactElement }>;
  header: JSXElementConstructor<Record<string, never>>;
  content: JSXElementConstructor<Record<string, never>>;
  footer?: JSXElementConstructor<Record<string, never>>;
}

export type BoardWidgetItem = BoardProps.Item<WidgetDataType>;

export type WidgetConfig = Pick<BoardWidgetItem, 'definition' | 'data'>;

export type WidgetPlacement = Pick<BoardWidgetItem, 'id' | 'columnOffset' | 'rowSpan' | 'columnSpan'>;
