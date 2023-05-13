import React, { useEffect } from 'react';
import Dashboard from './pages/dashboard';
import { SocketClient, SessionStorage, LruStorage } from './client';
import { ClientContext } from './client-context';

const client = new SocketClient(
  'http://localhost:5001',
  new LruStorage(new SessionStorage(), 1000000),
);

function App() {
  useEffect(() => {
    client.connect();
    return () => client.disconnect();
  }, []);

  return (
    <ClientContext.Provider value={client}>
      <Dashboard />
    </ClientContext.Provider>
  );
}

export default App;
