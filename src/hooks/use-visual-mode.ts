import { useState, useEffect } from 'react';
import { Mode } from '@cloudscape-design/global-styles';

function isDarkModeEnabled(target: Element) {
  return target.classList.contains('awsui-dark-mode');
}

export function useVisualMode(target: Element = document.body): Mode {
  const [darkMode, setDarkMode] = useState<boolean>(() => isDarkModeEnabled(target));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(isDarkModeEnabled(target));
    });

    observer.observe(target, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
    };
  }, [target]);

  return darkMode ? Mode.Dark : Mode.Light;
}
