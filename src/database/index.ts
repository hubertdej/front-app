import Dexie from 'dexie';
import { Bar } from '../models/bar';
import { Mover } from '../models/mover';
import { TickerDetails } from '../models/ticker-details';

const DATABASE_NAME = 'database';
const BARS_TABLE_NAME = 'bars';
const NARROW_BARS_TABLE_NAME = 'narrowBars';
const MOVERS_TABLE_NAME = 'movers';
const TICKER_DETAILS_TABLE_NAME = 'tickerDetails';

const TICKER_KEY: keyof Bar = 'ticker';
const DATE_TIME_KEY: keyof Bar = 'dateTime';
export const TICKER_INDEX = TICKER_KEY;
export const BARS_INDEX = `[${TICKER_KEY}+${DATE_TIME_KEY}]`;
export const TICKER_DETAILS_INDEX: keyof TickerDetails = 'symbol';

export class Database extends Dexie {
  constructor(databaseName: string) {
    super(databaseName);

    this.version(1).stores({
      [BARS_TABLE_NAME]: BARS_INDEX,
      [NARROW_BARS_TABLE_NAME]: BARS_INDEX,
      [MOVERS_TABLE_NAME]: '',
      [TICKER_DETAILS_TABLE_NAME]: TICKER_DETAILS_INDEX,
    });
  }

  getBarsTable(fineGrained: boolean) {
    return this.table<Bar>(fineGrained ? NARROW_BARS_TABLE_NAME : BARS_TABLE_NAME);
  }

  getMoversTable() {
    return this.table<Mover[], 'gainers' | 'losers'>(MOVERS_TABLE_NAME);
  }

  getTickerDetailsTable() {
    return this.table<TickerDetails>(TICKER_DETAILS_TABLE_NAME);
  }
}

export const db = new Database(DATABASE_NAME);
