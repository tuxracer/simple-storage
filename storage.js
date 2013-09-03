/*!
Copyright (c) 2013 Derek Petersen https://github.com/tuxracer/simple-storage
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function(root, factory) {
  if (typeof exports === 'object') {
    return module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    return define(factory);
  } else {
    return root.storage = factory();
  }
})(this, function() {
  var storageMethod;
  storageMethod = function(type) {
    if (type !== 'session') {
      type = 'local';
    }
    return window[type + 'Storage'];
  };
  return {
    set: function(key, val, type) {
      if (!(arguments.length >= 2)) {
        throw new TypeError('Not enough arguments');
      }
      if (typeof val === 'function') {
        throw new TypeError('Cannot store functions');
      }
      if (typeof val === 'object') {
        val = JSON.stringify(val);
      }
      return storageMethod(type).setItem(key, val);
    },
    get: function(key, type) {
      var e, val;
      if (key == null) {
        throw new TypeError('Not enough arguments');
      }
      val = storageMethod(type).getItem(key);
      try {
        return JSON.parse(val);
      } catch (_error) {
        e = _error;
        return val;
      }
    },
    remove: function(key, type) {
      if (key == null) {
        throw new TypeError('Not enough arguments');
      }
      return storageMethod(type).removeItem(key);
    },
    clear: function(type) {
      return storageMethod(type).clear();
    }
  };
});
