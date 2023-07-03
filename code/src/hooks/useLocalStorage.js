import { useState } from 'react';

const useLocalStorage = (key, defaultValue) => {
  const isFunction = (value) => typeof value === 'function';

  const [localStorageValue, setLocalStorageValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);

      if (value) return JSON.parse(value);
      throw Error('NO_VALUE');
    } catch ({ message }) {
      if (message !== 'NO_VALUE') throw Error(message);

      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  const setLocalStorageStateValue = (valueOrFn) => {
    const newValue = isFunction(valueOrFn)
      ? valueOrFn(localStorageValue)
      : valueOrFn;

    localStorage.setItem(key, JSON.stringify(newValue));
    setLocalStorageValue(newValue);
  };
  return [localStorageValue, setLocalStorageStateValue];
};

export default useLocalStorage;
