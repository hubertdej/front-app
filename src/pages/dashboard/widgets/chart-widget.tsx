import { Button, Header, Select } from '@cloudscape-design/components';
import { IChartApi, LineData, UTCTimestamp } from 'lightweight-charts';
import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useRef, useState } from 'react';
import Chart from '../../../components/chart';
import { useBars } from '../../../database/use-bars';
import { updateBars } from '../../../database/use-bars/update-bars';
import { TokenId, useDesignTokens } from '../../../hooks/use-design-token';
import { TIME_PERIODS, TimePeriod, isFineGrained } from '../../../models/time-period';
import { WidgetConfig } from './interfaces';

const DEFAULT_PERIOD: TimePeriod = 'YTD';
const PERIOD_OPTIONS = TIME_PERIODS.map(period => ({ value: period }));

const WidgetContext = createContext<[TimePeriod, Dispatch<SetStateAction<TimePeriod>>]>([DEFAULT_PERIOD, () => {}]);

function PeriodProvider({ children }: { children: ReactNode }) {
  const state = useState<TimePeriod>(DEFAULT_PERIOD);
  return <WidgetContext.Provider value={state}>{children}</WidgetContext.Provider>;
}

function WidgetFooter() {
  const [selectedPeriod, setSelectedPeriod] = useContext(WidgetContext);

  return (
    <div style={{ width: 80 }}>
      <Select
        options={PERIOD_OPTIONS}
        selectedOption={{ value: selectedPeriod }}
        onChange={({ detail }) => setSelectedPeriod(detail.selectedOption.value as TimePeriod)}
      />
    </div>
  );
}

const TICKERS = ['AAPL', 'GOOGL'];

const CHART_COLOR_TOKENS: TokenId[] = [
  'colorChartsPaletteCategorical1',
  'colorChartsPaletteCategorical2',
  'colorChartsPaletteCategorical3',
  'colorChartsPaletteCategorical4',
  'colorChartsPaletteCategorical5',
  'colorChartsPaletteCategorical6',
  'colorChartsPaletteCategorical7',
  'colorChartsPaletteCategorical8',
  'colorChartsPaletteCategorical9',
];

function WidgetContent() {
  const colors = useDesignTokens(CHART_COLOR_TOKENS);
  const [period] = useContext(WidgetContext);
  const barsForTickers = useBars(TICKERS, period);
  const chartRef = useRef<IChartApi>(null);

  useEffect(() => {
    chartRef.current?.applyOptions({ timeScale: { timeVisible: isFineGrained(period) } });
  }, [period]);

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }
    const chart = chartRef.current;

    const allSeries = Object.entries(barsForTickers).map(([ticker, bars], index) => {
      const data: LineData[] = bars.map(({ dateTime, adjClose }) => ({
        time: Date.parse(dateTime) / 1000 as UTCTimestamp,
        value: adjClose,
      }));
      const series = chart.addLineSeries({
        title: ticker,
        color: colors[index % colors.length],
      });
      series.setData(data);
      return series;
    });

    chart.timeScale().fitContent();

    return () => {
      allSeries.forEach(series => {
        try { chart.removeSeries(series); } catch {}
      });
    };
  }, [barsForTickers, colors]);

  return (
    <Chart
      ref={chartRef}
      handleScale={false}
      handleScroll={false}
      timeScale={{ minBarSpacing: 0 }}
    />
  );
}

function WidgetHeader() {
  const [period] = useContext(WidgetContext);
  const [isRefreshing, setIsRefreshing] = useState(false);

  return (
    <Header
      actions={[
        <Button
          key='refresh'
          variant='icon'
          iconName='refresh'
          disabled={isRefreshing}
          onClick={async () => {
            setIsRefreshing(true);
            await updateBars(TICKERS, period);
            setIsRefreshing(false);
          }}
        />,
      ]}>
      Chart
    </Header>
  );
}

export const chartWidget: WidgetConfig = {
  definition: { defaultRowSpan: 4, defaultColumnSpan: 2 },
  data: {
    title: 'Chart',
    description: 'Line chart displaying historical data',
    provider: PeriodProvider,
    header: WidgetHeader,
    content: WidgetContent,
    footer: WidgetFooter,
  },
};
