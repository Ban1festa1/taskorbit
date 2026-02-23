import { useCallback, useEffect, useRef, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const initialRef = useRef(initialValue);

  const read = useCallback(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw == null) return initialRef.current;
      return JSON.parse(raw);
    } catch {
      return initialRef.current;
    }
  }, [key]);

  const [value, setValue] = useState(read);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore
    }
  }, [key, value]);

  const reset = useCallback(() => setValue(initialRef.current), []);

  return [value, setValue, reset];
}
