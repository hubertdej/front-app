import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect } from 'react';
import { db } from '.';
import { getMovers } from '../api/requests';
import { useIsOnline } from '../hooks/use-is-online';
import { Mover } from '../models/mover';

const moversTable = db.getMoversTable();

async function updateMovers() {
  try {
    const { gainers, losers } = await getMovers();
    await moversTable.bulkPut([gainers, losers], ['gainers', 'losers']);
  } catch (e) {
    console.error('Error updating movers', e);
  }
}

const UPDATE_INTERVAL_MS = 15000;

export function useMovers(): { gainers: Mover[], losers: Mover[] } {
  const isOnline = useIsOnline();

  useEffect(() => {
    if (isOnline) {
      updateMovers();
      const interval = setInterval(() => updateMovers(), UPDATE_INTERVAL_MS);
      return () => clearInterval(interval);
    }
  }, [isOnline]);

  const movers = useLiveQuery(() => moversTable.bulkGet(['gainers', 'losers']), [], []);
  return {
    gainers: movers[0] ?? [],
    losers: movers[1] ?? [],
  };
}
