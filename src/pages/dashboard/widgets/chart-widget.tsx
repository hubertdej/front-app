import React, { useContext, useEffect, useRef } from 'react';
import { Header } from '@cloudscape-design/components';
import { IChartApi, LineData } from 'lightweight-charts';
import { TickerSelectionContext } from '..';
import { useClientContext } from '../../../client-context';
import Chart from '../../../components/chart';
import { useDesignToken } from '../../../hooks/use-design-token';
import { WidgetConfig } from './interfaces';

function isLineData(data: any): data is LineData {
  return (
    data !== undefined && typeof data === 'object' &&
    'time' in data && typeof data.time === 'string' &&
    'value' in data && typeof data.value === 'number'
  );
}

function WidgetContent() {
  const { getSelectedTickers } = useContext(TickerSelectionContext)!;
  const tickers = getSelectedTickers();

  console.log(tickers);

  const colors = [
    useDesignToken('colorChartsPaletteCategorical1'),
    useDesignToken('colorChartsPaletteCategorical2'),
    useDesignToken('colorChartsPaletteCategorical3'),
    useDesignToken('colorChartsPaletteCategorical4'),
    useDesignToken('colorChartsPaletteCategorical5'),
  ];

  const client = useClientContext();
  const chartRef = useRef<IChartApi>(null);

  useEffect(() => {
    if (!chartRef.current) {
      throw new Error('Invalid chart reference.');
    }
    const chart = chartRef.current;
    
    const state = tickers.map((ticker, i) => {
      const series = chart.addLineSeries({ title: ticker, color: colors[i % 5] });
      const subscription = client.subscribe(ticker, message => {
        if (isLineData(message.content)) {
          series.update(message.content);
        }
      }, Infinity);
      return { series, subscription };
    });

    return () => state.forEach(({ series, subscription }) => {
      chartRef.current?.removeSeries(series);
      subscription.unsubscribe();
    });
  }, [client, tickers, ...colors]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Chart ref={chartRef} />
  );
}

export const chartWidget: WidgetConfig = {
  definition: { defaultRowSpan: 4, defaultColumnSpan: 2 },
  data: {
    title: 'Line chart',
    description: 'View line chart',
    header: () => <Header>Line chart</Header>,
    content: WidgetContent,
  },
};
