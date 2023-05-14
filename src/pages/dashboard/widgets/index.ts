import { BoardWidgetItem, WidgetConfig, WidgetPlacement } from './interfaces';
import { indicesWidget, utilitiesWidget, currenciesWidget } from './table-widget';
import { chartWidget } from './chart-widget';

const allWidgets: Record<string, WidgetConfig> = {
  indicesWidget,
  utilitiesWidget,
  chartWidget,
  currenciesWidget,
};

const defaultLayout: ReadonlyArray<WidgetPlacement> = [
  { id: 'indicesWidget' },
  { id: 'utilitiesWidget' },
  { id: 'chartWidget' },
];

export function getDefaultLayout() {
  const encodedLayout = sessionStorage.getItem('dashboard-layout');
  return encodedLayout ? JSON.parse(encodedLayout) : defaultLayout;
}

export function exportLayout(items: ReadonlyArray<BoardWidgetItem>): ReadonlyArray<WidgetPlacement> {
  const layout = items.map(item => ({
    id: item.id,
    columnSpan: item.columnSpan,
    columnOffset: item.columnOffset,
    rowSpan: item.rowSpan,
  }));
  sessionStorage.setItem('dashboard-layout', JSON.stringify(layout));
  return layout;
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
