import { chartWidget } from './chart-widget';
import { BoardWidgetItem, WidgetConfig, WidgetPlacement } from './interfaces';
import { sampleWidget } from './sample-widget';

const allWidgets: Record<string, WidgetConfig> = {
  sampleWidget,
  chartWidget,
};

const defaultLayout: ReadonlyArray<WidgetPlacement> = [
  { id: 'sampleWidget' },
  { id: 'chartWidget' },
];

export function getDefaultLayout() {
  return defaultLayout;
}

export function exportLayout(items: ReadonlyArray<BoardWidgetItem>): ReadonlyArray<WidgetPlacement> {
  return items.map(item => ({
    id: item.id,
    columnSpan: item.columnSpan,
    columnOffset: item.columnOffset,
    rowSpan: item.rowSpan,
  }));
}

export function getBoardWidgets(layout: ReadonlyArray<WidgetPlacement>): BoardWidgetItem[] {
  return layout.map(position => {
    const widget = allWidgets[position.id];
    return {
      ...position,
      ...widget,
      columnSpan: position.columnSpan ?? widget.definition?.defaultColumnSpan ?? 1,
      rowSpan: position.rowSpan ?? widget.definition?.defaultRowSpan ?? 2,
    };
  });
}

export function getPaletteWidgets(layout: ReadonlyArray<WidgetPlacement>): BoardWidgetItem[] {
  return Object.entries(allWidgets)
    .filter(([id]) => !layout.find(position => position.id === id))
    .map(([id, widget]) => ({ id, ...widget }));
}
