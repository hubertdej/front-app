import { useEffect } from 'react';
import Dashboard from './pages/dashboard';
import { SocketClient, SessionStorage, LruStorage } from './client';
import { ClientContext } from './client-context';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/root-layout';
import { loader as tickerOverviewLoader } from './pages/equity-overview';
import { loader as financialsLoader } from './pages/Financials';
import { loader as dashboardLoader } from './pages/dashboard/index';
import MarketOverview from './pages/market-overview';
import MarketMovers from './pages/market-movers';
import MarketNews from './pages/market-news';
import Watchlist from './pages/watchlist';
import EquityOverview from './pages/equity-overview';
import Financials from './pages/Financials';

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
        element: <MarketOverview />,
      },
      {
        path: '/news',
        element: <MarketNews />,
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
        element: <EquityOverview/>,
        loader: tickerOverviewLoader,
      },
      {
        path: '/financials/:ticker',
        element: <Financials />,
        loader: financialsLoader,
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
