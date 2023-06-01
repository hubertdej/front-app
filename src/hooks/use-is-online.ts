import { useEffect, useState } from 'react';

export function useIsOnline() {
  const [isOnline, setOnlineStatus] = useState(window.navigator.onLine);

  useEffect(() => {
    const saveStatus = () => setOnlineStatus(window.navigator.onLine);

    window.addEventListener('online', saveStatus);
    window.addEventListener('offline', saveStatus);

    return () => {
      window.removeEventListener('online', saveStatus);
      window.removeEventListener('offline', saveStatus);
    };
  }, []);

  return isOnline;
}
