###!
Copyright (c) 2013 Derek Petersen https://github.com/tuxracer/simple-storage
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
###

((root, factory) ->
  # CommonJS
  if typeof exports is 'object'
    module.exports = do factory

  # AMD
  else if typeof define is 'function' and define.amd
    define factory

  # Browser global
  else
    root.storage = do factory
) this, ->
  storageMethod = (type) ->
    type = 'local' unless type is 'session'
    window[type + 'Storage']

  set: (key, val, type) ->
    throw new TypeError 'Not enough arguments' unless arguments.length >= 2
    throw new TypeError 'Cannot store functions' if typeof val is 'function'
    val = JSON.stringify val if typeof val is 'object'

    storageMethod(type).setItem key, val

  get: (key, type) ->
    throw new TypeError 'Not enough arguments' unless key?
    val = storageMethod(type).getItem key

    try
      JSON.parse val
    catch e
      val

  remove: (key, type) ->
    throw new TypeError 'Not enough arguments' unless key?
    storageMethod(type).removeItem key

  clear: (type) ->
    do storageMethod(type).clear
