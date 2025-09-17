import { MMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

const getItem = <T>(key: string): T | null => {
  const value = storage.getString(key);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const setItem = <T>(key: string, value: T) => {
  storage.set(key, JSON.stringify(value));
};

export const storage = new MMKV();

export const zustandStorage: StateStorage = {
  getItem: (key: string) => getItem(key),
  setItem: (key: string, value: any) => setItem(key, value),
  removeItem: (key: string) => removeItem(key),
};

export function getItemTyped<T>(key: string): T | null {
  return getItem<T>(key);
}

export function setItemTyped<T>(key: string, value: T) {
  return setItem<T>(key, value);
}

export function removeItem(key: string) {
  storage.delete(key);
}
