import React, { useEffect } from 'react';
import Dashboard from './pages/dashboard';
import { SocketClient, SessionStorage, LruStorage } from './client';
import { ClientContext } from './client-context';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/root-layout';
import TickerOverview from './pages/ticker-overview';
import { loader as tickerOverviewLoader } from './pages/ticker-overview';
import DummyPage from './pages/dummy-page';


const client = new SocketClient(
  'http://localhost:5001',
  new LruStorage(new SessionStorage(), 1000000),
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <DummyPage />,
      },
      {
        path: '/news',
        element: <DummyPage />,
      },
      {
        path: '/movers',
        element: <DummyPage />,
      },
      {
        path: '/watchlist',
        element: <DummyPage />,
      },
      {
        path: '/stock/:ticker',
        element: <TickerOverview />,
        loader: tickerOverviewLoader,
      },
      {
        path: '/dashboard/:dashboardId',
        element: <Dashboard />,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    client.connect();
    return () => client.disconnect();
  }, []);

  return (
    <ClientContext.Provider value={client}>
      <RouterProvider router={router}></RouterProvider>
    </ClientContext.Provider>
  );
}

export default App;
