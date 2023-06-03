import * as React from 'react';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import { useNavigate } from 'react-router-dom';
import PlusButton from './add-dashboard-button';
import './index.css';
import RemoveButton from './remove-dashboard-button';

function getDashboardIdsFromLocalStorage():ReadonlyArray<string> {
  const dashboardIds = [];
  for (const key in localStorage) {
    if (/^\d+$/.test(key)) {
      dashboardIds.push(key);
    }
  }
  dashboardIds.sort();
  return dashboardIds;
}
function Sidebar() {
  const [dashboards, setDashboards] = React.useState<ReadonlyArray<string>>(getDashboardIdsFromLocalStorage());
  const [activeHref, setActiveHref] = React.useState('');
  const navigate = useNavigate();

  const addDashboard = () => {
    const newDashboardId:string = Math.max(...dashboards.map(id => parseInt(id, 10)), 0) + 1 + '';
    setDashboards([...dashboards, newDashboardId]);
    setActiveHref(`/dashboard/${newDashboardId}`);
    navigate(`/dashboard/${newDashboardId}`);
  };

  const removeDashboard = (id:string) => {
    const newDashboards = dashboards.filter(dashboardId => dashboardId !== id);
    localStorage.removeItem(id);
    setDashboards(newDashboards);
    if (newDashboards.length > 0) {
      setActiveHref(`/dashboard/${newDashboards[0]}`);
      navigate(`/dashboard/${newDashboards[0]}`);
    } else {
      setActiveHref('/');
      navigate('/');
    }
  };

  return (
    <SideNavigation
      activeHref={activeHref}
      onFollow={event => {
        if (!event.detail.external) {
          event.preventDefault();
          setActiveHref(event.detail.href);
          navigate(event.detail.href);
        }
      }}
      items={[
        { type: 'link', text: 'Market overview', href: '/' },
        { type: 'link', text: 'Market news', href: '/news' },
        { type: 'link', text: 'Market movers', href: '/movers' },
        { type: 'link', text: 'My watchlist', href: '/watchlist' },
        {
          type: 'link-group',
          text: 'Dashboards',
          href: '#',
          info: <PlusButton onClick={addDashboard}/>,
          items: dashboards.map(id => (
            {
              type: 'link',
              text: `Dashboard ${id}`,
              href: `/dashboard/${id}`,
              info: <RemoveButton onClick={() => removeDashboard(id)}/>,
            }
          )),
        },
      ]}
    />
  );
}

export default Sidebar;
