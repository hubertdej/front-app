import { createContext, useContext } from 'react';
import { Client } from './client';

export const ClientContext = createContext<Client | undefined>(undefined);

export function useClientContext() {
  const client = useContext(ClientContext);
  if (!client) {
    throw new Error('No client instance provided.');
  }
  return client;
}
