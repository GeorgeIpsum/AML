//helpers.ts utility
/**
 * Adds a key value/ index value pair to an object, return original object if key or index already exists
 * 
 * @param obj the object
 * @param key key value to be added
 * @param value value at said key value to be added
 * @param index index to use
 */
export const addToObject = (obj: Object, key: string, value: any, index: number): Object => {
  let temp = {};
  let i = 0;

  for(var prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      if(i===index&&key&&value) {
        temp[key] = value;
      }
      temp[prop] = obj[prop];
      i++;
    }
  }
  if(!index&&key&&value) {
    temp[key] = value;
  }
  return temp;
}

/**
 * Debounce function
 * 
 * @param fn the function to debounce
 */
export const debounce = (fn) => {
  let timeout;

  return function() {
    let context = this;
    let args = arguments;

    if(timeout) {
      window.cancelAnimationFrame(timeout);
    }

    timeout = window.requestAnimationFrame(function() {
      fn.apply(context, args);
    });
  }
}

/**
 * Shuffles an array
 * 
 * @param array the array to shuffle
 */
export const shuffle = (array: any[]): any[] => {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while(0!==currentIndex) {
    randomIndex = Math.floor(Math.random()*currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  
  return array;
}

/**
 * Chooses a random item from an array
 * 
 * @param array ...the array
 */
export const chooseRandomItem = (array: any[]): any => {
  return array[Math.floor(Math.random()*array.length)];
}

/**
 * Converts an array into a CSV string
 * 
 * @param array array to convert
 * @param delimiter delimiter to use between values. defaults to ','
 */
export const arrayToCsv = (array: any, delimiter: string = ','): string => {
  return array.map(v => v.map(x => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x)).join(delimiter)).join('\n');
}

/**
 * Returns intersection of 2 arrays
 * 
 * @param a first array
 * @param b second array
 */
export const intersection = (a: any[], b: any[]) => {
  const s = new Set(b);
  return a.filter(x => s.has(x));
}

/**
 * Generate a hash for an object
 * 
 * @param object object to generate hash for
 * @param key 
 */
export const toHash = (object: Object, key: string) => {
  return Array.prototype.reduce.call(
    object,
    (acc: any, data, index) => ((acc[!key ? index : data[key]] = data), acc),
    {}
  );
}

/**
 * Generates a UUID in a browser
 */
export const UUIDGenerator = () => {
  //@ts-ignore
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}

/**
 * Get size of object, array, or string
 * 
 * @param val array, object, or string to measure size of
 */
export const size = (val: any): number =>
  Array.isArray(val)
    ? val.length
    : val && typeof val === 'object'
    ? val.size || val.length || Object.keys(val).length
    : typeof val === 'string'
    ? new Blob([val]).size
    : 0;
