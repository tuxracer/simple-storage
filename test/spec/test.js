;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
Copyright (c) 2013 Derek Petersen https://github.com/tuxracer/simple-storage MIT Licensed
*/

var storageMethod;

storageMethod = function(type) {
  if (type !== 'session') {
    type = 'local';
  }
  return window[type + 'Storage'];
};

module.exports = {
  set: function(key, val, type) {
    if (!(arguments.length >= 2)) {
      throw new Error('Not enough arguments');
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
    if (key != null) {
      val = storageMethod(type).getItem(key);
      try {
        return JSON.parse(val);
      } catch (_error) {
        e = _error;
        return val;
      }
    } else {
      return null;
    }
  },
  remove: function(key, type) {
    if (key == null) {
      throw new Error('Not enough arguments');
    }
    return storageMethod(type).removeItem(key);
  },
  clear: function(type) {
    return storageMethod(type).clear();
  }
};


},{}],2:[function(require,module,exports){
var storage;

storage = require('../../src/storage');

describe('storage', function() {
  beforeEach(function() {
    window.localStorage.clear();
    return window.sessionStorage.clear();
  });
  describe('#set', function() {
    describe('when not given any arguments', function() {
      return it('should throw an error', function() {
        return expect(function() {
          return storage.set();
        }).to["throw"](Error);
      });
    });
    describe('when not given a second argument', function() {
      return it('should throw an error', function() {
        return expect(function() {
          return storage.set('blah');
        }).to["throw"](Error);
      });
    });
    describe('when given a function', function() {
      return it('should throw an error', function() {
        var doStuff;
        doStuff = function() {
          return console.log('hello');
        };
        return expect(function() {
          return storage.set('foo', doStuff);
        }).to["throw"](TypeError);
      });
    });
    describe('when not given a third argument', function() {
      it('should store a string to localStorage', function() {
        storage.set('day', 'Friday');
        return expect(window.localStorage.getItem('day')).to.equal('Friday');
      });
      it('should store an object literal to localStorage', function() {
        storage.set('size', {
          size: 'small'
        });
        return expect(window.localStorage.getItem('size')).to.equal('{"size":"small"}');
      });
      return it('should store an array to localStorage', function() {
        storage.set('colors', ['red', 'white', 'blue']);
        return expect(window.localStorage.getItem('colors')).to.equal('["red","white","blue"]');
      });
    });
    return describe('when passed "session" as third argument', function() {
      it('should store a string to sessionStorage', function() {
        storage.set('day', 'Friday', 'session');
        return expect(window.sessionStorage.getItem('day')).to.equal('Friday');
      });
      it('should store an object literal to sessionStorage', function() {
        storage.set('size', {
          size: 'small'
        }, 'session');
        return expect(window.sessionStorage.getItem('size')).to.equal('{"size":"small"}');
      });
      return it('should store an array to sessionStorage', function() {
        storage.set('colors', ['red', 'white', 'blue'], 'session');
        return expect(window.sessionStorage.getItem('colors')).to.equal('["red","white","blue"]');
      });
    });
  });
  describe('#get', function() {
    describe('when not given any arguments', function() {
      return it('should return null', function() {
        return expect(storage.get()).to.be["null"];
      });
    });
    describe('when not given a third argument', function() {
      it('should get a string from localStorage', function() {
        window.localStorage.setItem('car', 'Tesla');
        return expect(storage.get('car')).to.equal('Tesla');
      });
      it('should get a JSON encoded object literal from localStorage as an object literal', function() {
        window.localStorage.setItem('height', '{"height":"short"}');
        return expect(storage.get('height')).to.deep.equal({
          height: 'short'
        });
      });
      return it('should get a JSON encoded array from localStorage as an array', function() {
        window.localStorage.setItem('states', '["Minnesota","California","Illinois"]');
        return expect(storage.get('states')).to.deep.equal(['Minnesota', 'California', 'Illinois']);
      });
    });
    return describe('when passed "session" as third argument', function() {
      it('should get a string from sessionStorage', function() {
        window.sessionStorage.setItem('car', 'Tesla');
        return expect(storage.get('car', 'session')).to.equal('Tesla');
      });
      it('should get a JSON encoded object literal from sessionStorage as an object literal', function() {
        window.sessionStorage.setItem('height', '{"height":"short"}');
        return expect(storage.get('height', 'session')).to.deep.equal({
          height: 'short'
        });
      });
      return it('should get a JSON encoded array from sessionStorage as an array', function() {
        window.sessionStorage.setItem('states', '["Minnesota","California","Illinois"]');
        return expect(storage.get('states', 'session')).to.deep.equal(['Minnesota', 'California', 'Illinois']);
      });
    });
  });
  return describe('#clear', function() {
    describe('when not given any arguments', function() {
      it('should clear multiple items stored in localStorage', function() {
        var results;
        results = [];
        window.localStorage.setItem('name', 'Sponge Bob');
        window.localStorage.setItem('house', 'Pineapple');
        storage.clear();
        results.push(window.localStorage.getItem('name'));
        results.push(window.localStorage.getItem('house'));
        return expect(results).to.deep.equal([null, null]);
      });
      return it('should not remove items in sessionStorage', function() {
        window.sessionStorage.setItem('movie', 'Fight Club');
        storage.clear();
        return expect(window.sessionStorage.getItem('movie')).to.equal('Fight Club');
      });
    });
    return describe('when given "session" as first argument', function() {
      it('should clear multiple items stored in sessionStorage', function() {
        var results;
        results = [];
        window.sessionStorage.setItem('food', 'Hamburger');
        window.sessionStorage.setItem('dessert', 'Ice Cream');
        storage.clear('session');
        results.push(window.sessionStorage.getItem('food'));
        results.push(window.sessionStorage.getItem('dessert'));
        return expect(results).to.deep.equal([null, null]);
      });
      return it('should not remove items in localStorage', function() {
        window.localStorage.setItem('artist', 'The Hood Internet');
        storage.clear('session');
        return expect(window.localStorage.getItem('artist')).to.equal('The Hood Internet');
      });
    });
  });
});


},{"../../src/storage":1}]},{},[2])
;