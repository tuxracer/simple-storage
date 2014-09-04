describe 'storage', ->
  describe 'when localStorage is unavailable', ->
    lsStub = null
    ssStub = null
    storage = null

    beforeEach ->
      lsStub = sinon.stub(window.localStorage, 'setItem').throws new Error 'Access to localStorage is denied'
      ssStub = sinon.stub(window.sessionStorage, 'setItem').throws  new Error 'Access to sessionStorage is denied'
      storage = require '../../tmp/storage2'

    afterEach ->
      lsStub.restore()
      ssStub.restore()

    describe '#set, #get', ->
      describe 'when given a function', ->
        it 'should throw an error', ->
          doStuff = -> console.log 'hello'
          expect(-> storage.set 'foo', doStuff).to.throw TypeError

      describe 'when not given a third argument', ->
        it 'should store a string to temp localStorage', ->
          storage.set 'day', 'Friday'
          expect(storage.get 'day').to.equal 'Friday'

        it 'should store an object literal to temp localStorage', ->
          storage.set 'size', size: 'small'
          expect(storage.get 'size').to.deep.equal size: 'small'

        it 'should store an array to temp localStorage', ->
          storage.set 'colors', ['red','white','blue']
          expect(storage.get 'colors').to.deep.equal ['red','white','blue']

      describe 'when passed "session" as third argument', ->
        it 'should store a string to temp sessionStorage', ->
          storage.set 'day', 'Friday', 'session'
          expect(storage.get('day', 'session')).to.equal 'Friday'

        it 'should store an object literal to temp sessionStorage', ->
          storage.set 'size', size: 'small', 'session'
          expect(storage.get('size','session')).to.deep.equal size: 'small'

        it 'should store an array to temp sessionStorage', ->
          storage.set 'colors', ['red','white','blue'], 'session'
          expect(storage.get('colors','session')).to.deep.equal ['red','white','blue']

  describe 'when localStorage is available', ->
    storage = null

    beforeEach ->
      storage = require '../../src/storage'
      window.localStorage.clear()
      window.sessionStorage.clear()

    describe '#set', ->
      describe 'when given a function', ->
        it 'should throw an error', ->
          doStuff = -> console.log 'hello'
          expect(-> storage.set 'foo', doStuff).to.throw TypeError

      describe 'when not given a third argument', ->
        it 'should store a string to localStorage', ->
          storage.set 'day', 'Friday'
          expect(window.localStorage.getItem 'day').to.equal 'Friday'

        it 'should store an object literal to localStorage', ->
          storage.set 'size', size: 'small'
          expect(window.localStorage.getItem 'size').to.equal '{"size":"small"}'

        it 'should store an array to localStorage', ->
          storage.set 'colors', ['red','white','blue']
          expect(window.localStorage.getItem 'colors').to.equal '["red","white","blue"]'

      describe 'when passed "session" as third argument', ->
        it 'should store a string to sessionStorage', ->
          storage.set 'day', 'Friday', 'session'
          expect(window.sessionStorage.getItem 'day').to.equal 'Friday'

        it 'should store an object literal to sessionStorage', ->
          storage.set 'size', size: 'small', 'session'
          expect(window.sessionStorage.getItem 'size').to.equal '{"size":"small"}'

        it 'should store an array to sessionStorage', ->
          storage.set 'colors', ['red','white','blue'], 'session'
          expect(window.sessionStorage.getItem 'colors').to.equal '["red","white","blue"]'

    describe '#get', ->
      describe 'when not given any arguments', ->
        it 'should return null', ->
          expect(storage.get()).to.be.null

      describe 'when not given a third argument', ->
        it 'should get a string from localStorage', ->
          window.localStorage.setItem 'car', 'Tesla'
          expect(storage.get 'car').to.equal 'Tesla'

        it 'should get a JSON encoded object literal from localStorage as an object literal', ->
          window.localStorage.setItem 'height', '{"height":"short"}'
          expect(storage.get 'height').to.deep.equal height: 'short'

        it 'should get a JSON encoded array from localStorage as an array', ->
          window.localStorage.setItem 'states', '["Minnesota","California","Illinois"]'
          expect(storage.get 'states').to.deep.equal ['Minnesota', 'California', 'Illinois']

      describe 'when passed "session" as third argument', ->
        it 'should get a string from sessionStorage', ->
          window.sessionStorage.setItem 'car', 'Tesla'
          expect(storage.get 'car', 'session').to.equal 'Tesla'

        it 'should get a JSON encoded object literal from sessionStorage as an object literal', ->
          window.sessionStorage.setItem 'height', '{"height":"short"}'
          expect(storage.get 'height', 'session').to.deep.equal height: 'short'

        it 'should get a JSON encoded array from sessionStorage as an array', ->
          window.sessionStorage.setItem 'states', '["Minnesota","California","Illinois"]'
          expect(storage.get 'states', 'session').to.deep.equal ['Minnesota', 'California', 'Illinois']

    describe '#clear', ->
      describe 'when not given any arguments', ->
        it 'should clear multiple items stored in localStorage', ->
          results = []
          window.localStorage.setItem 'name', 'Sponge Bob'
          window.localStorage.setItem 'house', 'Pineapple'
          storage.clear()
          results.push window.localStorage.getItem 'name'
          results.push window.localStorage.getItem 'house'
          expect(results).to.deep.equal [null, null]

        it 'should not remove items in sessionStorage', ->
          window.sessionStorage.setItem 'movie', 'Fight Club'
          storage.clear()
          expect(window.sessionStorage.getItem 'movie').to.equal 'Fight Club'

      describe 'when given "session" as first argument', ->
        it 'should clear multiple items stored in sessionStorage', ->
          results = []
          window.sessionStorage.setItem 'food', 'Hamburger'
          window.sessionStorage.setItem 'dessert', 'Ice Cream'
          storage.clear 'session'
          results.push window.sessionStorage.getItem 'food'
          results.push window.sessionStorage.getItem 'dessert'
          expect(results).to.deep.equal [null, null]

        it 'should not remove items in localStorage', ->
          window.localStorage.setItem 'artist', 'The Hood Internet'
          storage.clear 'session'
          expect(window.localStorage.getItem 'artist').to.equal 'The Hood Internet'


      describe 'when given neither session or local as first argument', ->
        it 'should throw an error', (done) ->
          try 
            storage.clear 'userid'
          catch
            done()
          