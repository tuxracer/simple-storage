###!
Copyright (c) 2013 Derek Petersen https://github.com/tuxracer/simple-storage MIT Licensed
###

storageMethod = (type) ->
  type = 'local' unless type is 'session'
  window[type + 'Storage']

module.exports =
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
