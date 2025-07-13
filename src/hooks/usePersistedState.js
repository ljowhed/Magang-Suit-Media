import { useState, useEffect } from 'react';

function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    try {
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (e) {
      console.error("Failed to parse stored value:", e);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.error("Failed to store value:", e);
    }
  }, [key, state]);

  return [state, setState];
}

export default usePersistedState;