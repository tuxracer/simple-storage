localStorage

```coffeescript
storage.set 'pets',
  dogs: 3
  cats: 1

storage.get 'pets'
```

sessionStorage

```coffeescript
storage.set 'colors',
  orange: 11
  red: 13
, 'session'

storage.get 'colors', 'session'
```

This version will announce `storage:change`, `storage:remove`, and `storage:clear` events on the Chaplin mediator.

Derek Petersen

[Github](https://github.com/tuxracer) | [Google+](https://plus.google.com/118244156822447731503) | [Twitter](http://twitter.com/tuxracer)
