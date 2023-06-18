import { createContext, useContext, useMemo, useState } from 'react';

export interface TickerManager {
  allSelectedTickers: string[];
  getSelectedTickers: (id: string) => string[] | undefined;
  setSelectedTickers: (id: string, tickers: string[]) => void;
}

export function useTickerManager(): TickerManager {
  const [selectedTickers, setSelectedTickers] = useState<Record<string, string[]>>({});

  const allSelectedTickers = useMemo(() => {
    const tickerSet = new Set<string>();
    for (const tickersForId of Object.values(selectedTickers)) {
      for (const ticker of tickersForId) {
        tickerSet.add(ticker);
      }
    }
    return Array.from(tickerSet);
  }, [selectedTickers]);

  return {
    allSelectedTickers,
    getSelectedTickers: (id: string) => selectedTickers[id],
    setSelectedTickers: (id: string, tickers: string[]) => {
      setSelectedTickers(prev => ({ ...prev, [id]: tickers }));
    },
  };
}

export const TickerManagerContext = createContext<TickerManager | null>(null);

export function useTickerManagerContext() {
  const tickerManager = useContext(TickerManagerContext);
  if (tickerManager === null) {
    throw new Error('TickerManagerContext not found.');
  }
  return tickerManager;
}
