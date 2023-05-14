import * as React from 'react';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const [activeHref, setActiveHref] = React.useState('');
  const navigate = useNavigate();
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
          type: 'expandable-link-group',
          text: 'Dashboards',
          href: '#',
          items: [
            { type: 'link', text: 'Dashboard 1', href: '/dashboard/1' },
            { type: 'link', text: 'Dashboard 2', href: '/dashboard/2' },
            { type: 'link', text: 'Dashboard 3', href: '/dashboard/3' },
          ],
        },
      ]}
    />
  );
}

export default Sidebar;