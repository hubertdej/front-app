import { chartWidget } from './chart-widget';
import { BoardWidgetItem, WidgetConfig, WidgetPlacement } from './interfaces';
import { currenciesWidget, usEquityMarketsWidget, usEquitySectorsWidget } from './table-widgets/widgets';

const allWidgets: Record<string, WidgetConfig> = {
  chartWidget,
  currenciesWidget,
  usEquityMarketsWidget,
  usEquitySectorsWidget,
};

const defaultLayout: ReadonlyArray<WidgetPlacement> = [
  { 'id': 'usEquitySectorsWidget', 'columnSpan': 1, 'columnOffset': { '4': 0 }, 'rowSpan': 5 },
  { 'id': 'chartWidget', 'columnSpan': 2, 'columnOffset': { '4': 1 }, 'rowSpan': 4 },
  { 'id': 'currenciesWidget', 'columnSpan': 1, 'columnOffset': { '4': 3 }, 'rowSpan': 3 },
  { 'id': 'usEquityMarketsWidget', 'columnSpan': 1, 'columnOffset': { '4': 3 }, 'rowSpan': 4 },
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
