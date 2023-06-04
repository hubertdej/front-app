import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useReducer,
  useRef,
} from 'react';
import { ChartOptions, createChart, DeepPartial, IChartApi } from 'lightweight-charts';

const RawChart = forwardRef<IChartApi, DeepPartial<ChartOptions>>(({ ...options }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi>();
  const [, forceRerender] = useReducer(value => value + 1, 0);

  useLayoutEffect(() => {
    if (!containerRef.current) {
      throw new Error('Unexpected state: unset container reference.');
    }
    chartRef.current = createChart(containerRef.current);
    chartRef.current.timeScale().fitContent();
    forceRerender();
    return () => {
      chartRef.current?.remove();
      chartRef.current = undefined;
    };
  }, []);

  useImperativeHandle(ref, () => {
    if (!chartRef.current) {
      throw new Error('Unexpected state: unset chart reference.');
    }
    return chartRef.current;
  }, []);

  useEffect(() => {
    chartRef.current?.applyOptions(options);
  }, [options]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}/>
  );
});
RawChart.displayName = 'RawChart';

export default RawChart;
