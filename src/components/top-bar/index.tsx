import { Icon, Toggle } from '@cloudscape-design/components';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import { Mode, applyMode } from '@cloudscape-design/global-styles';
import { useLayoutEffect } from 'react';
import useLocalStorage from '../../hooks/use-local-storage';
import TickerSearchbar from './ticker-searchbar';

const UUID = 'a453354e-0cdd-4d6a-a280-a6a107e0e211';
const CONTEXT_ID = `${UUID}-context`;
const DESTINATION_ID = `${UUID}-destination`;
const TOGGLE_ID = `${UUID}-toggle`;

function TopBar() {
  const [checked, setChecked] = useLocalStorage('dark-mode-enabled', false);

  useLayoutEffect(() => {
    applyMode(checked ? Mode.Dark : Mode.Light);
  }, [checked]);

  // A very hacky way of inserting a Toggle into the TopNavigation widget
  useLayoutEffect(() => {
    const destination = document.querySelector(`#${CONTEXT_ID} [aria-label="${DESTINATION_ID}"]`);
    const toggle = document.querySelector(`#${CONTEXT_ID} #${TOGGLE_ID}`);
    if (destination && toggle) {
      destination.replaceWith(toggle);
    }
  }, []);

  return (
    <div id={CONTEXT_ID}>
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
          <TickerSearchbar />
        }
        utilities={[
          { type: 'button', ariaLabel: DESTINATION_ID },
        ]}
      />
      <div id={TOGGLE_ID}>
        <Toggle
          checked={checked}
          onChange={({ detail }) => setChecked(detail.checked)}
        >
          <Icon
            svg={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path
                  d="M12.977 11.875a5.371 5.371 0 0 1-5.102-3.902 5.368 5.368 0 0 1 2.305-6 6.042 6.042 0 0 0-1.516-.196A6.222 6.222 0 0 0 2.441 8a6.222 6.222 0 0 0 6.223 6.223 6.156 6.156 0 0 0 4.844-2.375 4.79 4.79 0 0 1-.531.027Zm0 0"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            }
          />
        </Toggle>
      </div>
    </div>
  );
}

export default TopBar;
