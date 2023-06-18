import { LineChart } from '@cloudscape-design/components';
import * as awsui from '@cloudscape-design/design-tokens';
import { Bar } from '../../../models/bar';

interface TrendChartProps {
  bars: Bar[];
  color: 'green' | 'red';
}

export function TrendChart({ bars, color }: TrendChartProps) {
  if (bars.length <= 1) {
    return null;
  }

  const prices = bars.map(bar => bar.adjClose);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return (
    <div style={{ height: 50, width: 200, pointerEvents: 'none' }}>
      <LineChart
        height={50}
        series={[{
          title: '',
          type: 'line',
          color: color === 'green' ? awsui.colorChartsGreen500 : awsui.colorChartsRed500,
          data: bars.map(({ dateTime, adjClose }) => ({ x: new Date(dateTime), y: adjClose })),
        }]}
        xDomain={[new Date(bars[0].dateTime), new Date(bars[bars.length - 1].dateTime)]}
        yDomain={[minPrice, maxPrice]}
        xScaleType="time"
        hideFilter
        hideLegend
      />
    </div>
  );
}
