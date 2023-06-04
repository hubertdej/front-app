import { forwardRef } from 'react';
import { ChartOptions, DeepPartial, IChartApi } from 'lightweight-charts';
import { useDesignToken } from '../../hooks/use-design-token';
import RawChart from './raw-chart';

const Chart = forwardRef<IChartApi, DeepPartial<ChartOptions>>((props, ref) => {
  const fontFamily = useDesignToken('fontFamilyBase');
  const textColor = useDesignToken('colorTextBodyDefault');
  const gridLineColor = useDesignToken('colorBorderDividerDefault');
  const borderColor = textColor;

  const chartOptions: DeepPartial<ChartOptions> = {
    layout: {
      background: { color: 'transparent' },
      fontFamily,
      textColor,
    },
    leftPriceScale: {
      borderColor,
      textColor,
    },
    rightPriceScale: {
      borderColor,
      textColor,
    },
    timeScale: {
      borderColor,
    },
    grid: {
      horzLines: { color: gridLineColor },
      vertLines: { color: gridLineColor },
    },
    autoSize: true,
  };

  return (
    <RawChart ref={ref} {...chartOptions} {...props} />
  );
});
Chart.displayName = 'Chart';

export default Chart;
