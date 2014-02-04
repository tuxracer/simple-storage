###!
Copyright (c) 2013 Derek Petersen https://github.com/tuxracer/simple-storage MIT Licensed
###

try
  window.localStorage.setItem 'simple-storage-test', true
  window.localStorage.removeItem 'simple-storage-test'
  nativeStorage = true
catch e
  nativeStorage = false

if nativeStorage
  storageSrc = window
else
  tmp =
    local: {}
    session: {}

  storageSrc =
    localStorage:
      setItem: (key, val) ->
        tmp.local[key] = val

      getItem: (key) ->
        tmp.local[key]

      removeItem: (key) ->
        delete tmp.local[key]

      clear: ->
        tmp.local = {}
    sessionStorage:
      setItem: (key, val) ->
        tmp.session[key] = val

      getItem: (key) ->
        tmp.session[key]

      removeItem: (key) ->
        delete tmp.session[key]

      clear: ->
        tmp.session = {}

storageMethod = (type) ->
  type = 'local' unless type is 'session'
  storageSrc[type + 'Storage']

module.exports =
  nativeStorage: nativeStorage

  set: (key, val, type) ->
    throw new TypeError 'Cannot store functions' if typeof val is 'function'
    val = JSON.stringify val if typeof val is 'object'

    storageMethod(type).setItem key, val

  get: (key, type) ->
    if key?
      val = storageMethod(type).getItem key

      try
        JSON.parse val
      catch e
        val
    else
      null

  remove: (key, type) ->
    throw new Error 'Not enough arguments' unless key?
    storageMethod(type).removeItem key

  clear: (type) ->
    do storageMethod(type).clear
