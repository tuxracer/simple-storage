sessionStorage

```coffeescript
storage.set 'colors',
  orange: 11
  red: 13
, 'session'

storage.get 'colors', 'session'
```

localStorage

```coffeescript
storage.set 'pets',
  dogs: 3
  cats: 1

storage.get 'pets'
```