//storage.ts utility
/**
 * Loads string from localStorage.
 * 
 * @param key The key to fetch
 */
export const loadString = (key: string): string | null => {
  return localStorage.getItem(key);
}

/**
 * Saves a string value to localStorage.
 * 
 * @param key The key to save to
 * @param value The string to save
 */
export const saveString = (key: string, value: string): boolean => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads an object string from localStorage and returns the object.
 * 
 * @param key The key to fetch
 */
export const load = (key: string): any | null => {
  const VALUE = localStorage.getItem(key);
  if(typeof VALUE === 'string') {
    return JSON.parse(VALUE);
  } else return null;
}

/**
 * Saves objects and all other values to localStorage.
 * 
 * @param key The key to save to
 * @param value The value (can be an object) to save
 */
export const save = (key: string, value: any): boolean => {
  try {
    if(typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes a key-value pair from localStorage.
 * 
 * @param key The key to remove
 */
export const remove = (key: string): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

/**
 * Clears all localStorage.
 */
export const clear = (): boolean => {
  try {
    localStorage.clear();
    return true;
  } catch {
    return false;
  }
}
