import { useState, useEffect, Dispatch, SetStateAction } from 'react';


function useLocalStorage<S>(key: string, initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {
  const [value, setValue] = useState<S>(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue) {
      return JSON.parse(storedValue);
    }

    if (typeof initialState === 'function') {
      return (initialState as () => S)();
    }

    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
