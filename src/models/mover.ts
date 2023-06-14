export type Mover = {
  symbol: string;
  name: string;
  priceIntraday: number;
  change: number;
  percentChange: number;
  volume: number;
  avgVol3Month: number;
  marketCap: number | null;
  peRatioTTM: number | null;
};
