import React from 'react';
import { BoardProps } from '@cloudscape-design/board-components/board';

export interface WidgetDataType {
  title: string;
  description: string;
  header: React.JSXElementConstructor<Record<string, never>>;
  content: React.JSXElementConstructor<Record<string, never>>;
  footer?: React.JSXElementConstructor<Record<string, never>>;
}

export type BoardWidgetItem = BoardProps.Item<WidgetDataType>;

export type WidgetConfig = Pick<BoardWidgetItem, 'definition' | 'data'>;

export type WidgetPlacement = Pick<BoardWidgetItem, 'id' | 'columnOffset' | 'rowSpan' | 'columnSpan'>;
