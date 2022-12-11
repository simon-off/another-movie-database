import { useState, useEffect } from "react";

export default function useLocalStorage(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const stored = window.localStorage.getItem(key);
    return stored === null ? defaultValue : JSON.parse(stored);
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
