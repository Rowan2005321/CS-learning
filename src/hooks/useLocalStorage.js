import { useEffect, useState } from "react";

function readValue(key, initialValue) {
  if (typeof window === "undefined") return initialValue;

  try {
    const stored = window.localStorage.getItem(key);
    if (stored == null) return initialValue;

    try {
      return JSON.parse(stored);
    } catch {
      if (Array.isArray(initialValue)) {
        return stored.split(",").filter(Boolean);
      }
      return stored;
    }
  } catch {
    return initialValue;
  }
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readValue(key, initialValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Persistence is optional; the app remains usable if storage is blocked.
    }
  }, [key, value]);

  return [value, setValue];
}
