export function prettyNumber(num: number | undefined, precision = 2): string | undefined {
  if (num == undefined)
    return undefined;
  if (num >= 1_000_000_000) {
    const billions = num / 1_000_000_000;
    return `${billions.toFixed(precision)} BLN`;
  } else if (num >= 1_000_000) {
    const millions = num / 1_000_000;
    return `${millions.toFixed(precision)} MLN`;
  } else {
    return num.toFixed(precision);
  }
}

export function getPriceChange(price: number | undefined, previousClose: number | undefined): number | undefined {
  if (price == undefined || previousClose == undefined)
    return undefined;
  return price - previousClose;
}

export function getPriceChangePercentage(price: number | undefined, previousClose: number | undefined): string | undefined {
  if (price == undefined || previousClose == undefined)
    return undefined;
  const priceChange = getPriceChange(price, previousClose) as number;
  const percentage = (priceChange / previousClose) * 100;
  return `${percentage.toFixed(2)}%`;
}
