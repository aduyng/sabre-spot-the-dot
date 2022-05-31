import isNil from "lodash/isNil";

let storage;

export function initializeStorage(storageType) {
  storage = storageType;
}

export default function getStorage() {
  return storage;
}

export function getItemJson({ key, defaultValue }) {
  let value;
  try {
    const valueString = storage.getItem(key);
    value = JSON.parse(valueString);
    if (isNil(value)) {
      return defaultValue;
    }
  } catch {
    value = defaultValue;
  }

  return value;
}

export function setItemJson({ key, value }) {
  return storage.setItem(key, JSON.stringify(value));
}
