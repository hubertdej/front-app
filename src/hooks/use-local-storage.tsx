import { useState, useEffect, Dispatch, SetStateAction } from 'react';


function useLocalStorage<S>(key: string, initialState: S, serialize: (value: S) => string, deserialize: (serialized: string) => S): [S, Dispatch<SetStateAction<S>>] {
  const [value, setValue] = useState<S>(() => {
    const storedValue = localStorage.getItem(key);
  
    if (storedValue) {
      return deserialize(storedValue);
    }
  
    if (typeof initialState === 'function') {
      const initialValue = (initialState as () => S)();
      localStorage.setItem(key, serialize(initialValue));
      return initialValue;
    }
  
    localStorage.setItem(key, serialize(initialState));
    return initialState;
  });
  
  useEffect(() => {
    localStorage.setItem(key, serialize(value));
  }, [key, value, serialize]);
  
  return [value, setValue];
}

export default useLocalStorage;
