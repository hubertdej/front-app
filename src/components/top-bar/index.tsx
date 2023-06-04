import TopNavigation from '@cloudscape-design/components/top-navigation';
import TickerSearchbar from './ticker-searchbar';

function TopBar() {
  return (
    <TopNavigation
      identity={{
        href: '#',
        title: 'Alpha Terminal',
      }}
      i18nStrings={{
        searchIconAriaLabel: 'Search',
        searchDismissIconAriaLabel: 'Close search',
        overflowMenuTriggerText: 'More',
        overflowMenuTitleText: 'All',
        overflowMenuBackIconAriaLabel: 'Back',
        overflowMenuDismissIconAriaLabel: 'Close menu',
      }}
      search={
        <TickerSearchbar/>
      }
    />
  );
}

export default TopBar;
