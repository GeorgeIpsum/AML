//helpers.ts utility

function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function _objectAssign(target) {
  if(target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  let output = Object(target);
  let idx = 1;
  let length = arguments.length;
  while(idx < length) {
    var source = arguments[idx];
    if(source != null) {
      for(var nextKey in source) {
        if(_has(nextKey, source)) {
          output[nextKey] = source[nextKey];
        }
      }
    }
    idx += 1;
  }
  return output;
}

const _objectAssign$1 = typeof Object.assign === 'function' ? Object.assign : _objectAssign;

function _isPlaceholder(a) {
  return a != null &&
    typeof a === 'object' &&
    a['@@functional/placeholder'] === true;
}

function _curry1(fn) {
  return function f1(a) {
    if(arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

const _isArray = Array.isArray || function _isArray(val) {
  return (val != null &&
          val.length >= 0 &&
          Object.prototype.toString.call(val) === '[object Array]');
};

function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}

const _isArrayLike = _curry1(function _isArrayLike(x) {
  if(_isArray(x)) { return true; }
  if (!x) { return false; }
  if(typeof x !== 'object') { return false; }
  if(_isString(x)) { return false; }
  if(x.nodeType === 1) { return !!x.length; }
  if(x.length === 0) { return true; }
  if(x.length > 0) { return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1); }
  return false;
});

function _makeFlat(recursive) {
  return function flatt(list) {
    var value, jlen, j;
    var result = [];
    var idx = 0;
    var ilen = list.length;

    while(idx < ilen) {
      if(_isArrayLike(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx];
        j = 0;
        jlen = value.length;
        while(j < jlen) {
          //@ts-ignore
          result[result.length] = value[j];
          j += 1;
        }
      } else {
        //@ts-ignore
        result[result.length] = list[idx];
      }
      idx += 1;
    }
    return result;
  };
}


/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * HERE BE THE EXPORTED FUNCTIONS
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */

 
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
 * Delay function call for some x milliseconds
 * 
 * @param ms milliseconds to delay
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
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

export const mergeAll = _curry1(function mergeAll(list) {
  //@ts-ignore
  return _objectAssign$1.apply(null, [{}].concat(list));
});

export const flatten = _curry1(_makeFlat(true));

export const isNil = _curry1(function isNil(x) { return x == null; });