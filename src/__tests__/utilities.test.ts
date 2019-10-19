import * as storage from '../utilities/storage';

var localStorageMock = (function() {
  var store = {};

  return {
      getItem: function(key) {
          return store[key] || null;
      },
      setItem: function(key, value) {
          store[key] = value.toString();
      },
      removeItem: function(key) {
        store[key] = null;
      },
      clear: function() {
          store = {};
      }
  };

})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe("Storage", () => {
  it('should attempt to save and then load a json string', () => {
    const key = 'foo', value = 'bar';
    storage.saveString(key, value);
    expect(localStorage.getItem(key)).toBe(value);
  });

  it('should save strings without using JSON.stringify', () => {
    const key = 'foo', value = 'bar';
    storage.save(key, value);
    expect(storage.loadString(key)).toBe(value);
  });

  it('should remove and clear localStorage', async () => {
    const key = 'foo', value = 'bar';
    storage.save(key, value);
    expect(storage.remove(key)).toEqual(true);
    expect(storage.clear()).toEqual(true);
  });
});
