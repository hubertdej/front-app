import { useEffect, useMemo, useRef } from 'react';
import { IChartApi, LineData, UTCTimestamp } from 'lightweight-charts';
import { TokenId, useDesignTokens } from '../../../hooks/use-design-token';
import { useBars } from '../../../database/use-bars';
import Chart from '../../../components/chart';


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

const changeFormatter = new Intl.NumberFormat(navigator.language, {
  style: 'percent',
  signDisplay: 'always',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function EquityOverviewChart(props: { ticker: string }) {
  const ticker = useMemo(() => [props.ticker], [props.ticker]);
  const chartRef = useRef<IChartApi>(null);
  const colors = useDesignTokens(CHART_COLOR_TOKENS);
  const barsForTickers = useBars(ticker, 'YTD');

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }
    const chart = chartRef.current;

    const allSeries = Object.entries(barsForTickers)
      .filter(([, bars]) => bars.length > 0)
      .map(([symbol, bars], index) => {
        const data: LineData[] = bars.map(({ dateTime, adjClose }) => ({
          time: Date.parse(dateTime) / 1000 as UTCTimestamp,
          value: adjClose,
        }));
        const change = (data[data.length - 1].value - data[0].value) / data[0].value;
        const series = chart.addLineSeries({
          title: `${symbol} ${changeFormatter.format(change)}`,
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

  return <Chart ref={chartRef} />;
}

export default EquityOverviewChart;
