import { useState } from 'react';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import { useNavigate } from 'react-router-dom';
import { Button } from '@cloudscape-design/components';

function getDashboardIdsFromLocalStorage(): ReadonlyArray<number> {
  const dashboardIds = [];
  for (const key in localStorage) {
    if (/^\d+$/.test(key)) {
      dashboardIds.push(parseInt(key, 10));
    }
  }
  dashboardIds.sort((a, b) => a - b);
  return dashboardIds;
}

function Sidebar() {
  const [dashboards, setDashboards] = useState(getDashboardIdsFromLocalStorage());
  const [activeHref, setActiveHref] = useState('');
  const navigate = useNavigate();

  const addDashboard = () => {
    const newDashboardId = Math.max(...dashboards, 0) + 1;
    setDashboards([...dashboards, newDashboardId]);
    setActiveHref(`/dashboard/${newDashboardId}`);
    navigate(`/dashboard/${newDashboardId}`);
  };

  const removeDashboard = (id: number) => {
    const newDashboards = dashboards.filter(dashboardId => dashboardId !== id);
    localStorage.removeItem(id.toString(10));
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
          info: <Button iconName={'add-plus'} variant={'inline-icon'} onClick={addDashboard}/>,
          items: dashboards.map(id => (
            {
              type: 'link',
              text: `Dashboard ${id}`,
              href: `/dashboard/${id}`,
              info: <Button iconName={'close'} variant={'inline-icon'} onClick={() => removeDashboard(id)}/>,
            }
          )),
        },
      ]}
    />
  );
}

export default Sidebar;
