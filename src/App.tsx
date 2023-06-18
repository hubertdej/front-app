import { useEffect } from 'react';
import Dashboard from './pages/dashboard';
import { SocketClient, SessionStorage, LruStorage } from './client';
import { ClientContext } from './client-context';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/root-layout';
import TickerOverview from './pages/ticker-overview';
import { loader as tickerOverviewLoader } from './pages/ticker-overview';
import { loader as dashboardLoader } from './pages/dashboard/index';
import DummyPage from './pages/dummy-page';
import MarketMovers from './pages/market-movers';
import Watchlist from './pages/watchlist';

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
        element: <MarketMovers />,
      },
      {
        path: '/watchlist',
        element: <Watchlist />,
      },
      {
        path: '/stock/:ticker',
        element: <TickerOverview />,
        loader: tickerOverviewLoader,
      },
      {
        path: '/dashboard/:dashboardId',
        element: <Dashboard />,
        loader: dashboardLoader,
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
      <RouterProvider router={router} />
    </ClientContext.Provider>
  );
}

export default App;
