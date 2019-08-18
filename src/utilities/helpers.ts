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