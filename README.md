# simple-storage
Store strings and objects to local or session storage. Falls back to storing data in memory if run on platforms where the [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage) is unavailable (such as node).


## sessionStorage
Store items for current session

```javascript
import { simpleSessionStorage } from "simple-storage";

// set item
simpleSessionStorage.setItem("pets", {
  dogs: 3,
  cats: 1,
});

// get item
const pets = simpleSessionStorage.getItem("pets");
console.log(pets); // { dogs: 3, cats: 1 }

// get all items
const items = simpleSessionStorage.getAllItems();
console.log(items); // [{ key: "pets", value: {dogs: 3, cats: 1} }]

// get all items async
const i = await simpleSessionStorage.getAllItemsAsync();
console.log(i); // [{ key: "pets", value: {dogs: 3, cats: 1} }]

// remove item
simpleSessionStorage.removeItem("pets");

// remove all items
simpleSessionStorage.clear();
```

## localStorage
Store items for longer than current session when possible

```javascript
import { simpleLocalStorage } from "simple-storage";

// set item
simpleLocalStorage.setItem("pets", {
  dogs: 3,
  cats: 1,
});

// get item
const pets = simpleLocalStorage.getItem("pets");
console.log(pets); // { dogs: 3, cats: 1 }

// get all items
const items = simpleLocalStorage.getAllItems();
console.log(items); // [{ key: "pets", value: {dogs: 3, cats: 1} }]

// get all items async
const i = await simpleLocalStorage.getAllItemsAsync();
console.log(i); // [{ key: "pets", value: {dogs: 3, cats: 1} }]

// remove item
simpleLocalStorage.removeItem("pets");

// remove all items
simpleLocalStorage.clear();
```

Licensed under the MIT license.

Derek Petersen

https://derek.cloud/
