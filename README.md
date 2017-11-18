sessionStorage

```javascript
import { simpleSessionStorage } from "simple-storage";

// set items
simpleSessionStorage.setItem("pets", {
  dogs: 3,
  cats: 1
});

// get item
const pets = simpleSessionStorage.getItem("pets");
console.log(pets); // { dogs: 3, cats: 1 }

// remove item
simpleSessionStorage.removeItem("pets");
console.log(pets); // undefined

// clear all
simpleSessionStorage.clear();
```

localStorage

```javascript
import { simpleLocalStorage } from "simple-storage";

// set items
simpleLocalStorage.setItem("pets", {
  dogs: 3,
  cats: 1
});

// get item
const pets = simpleLocalStorage.getItem("pets");
console.log(pets); // { dogs: 3, cats: 1 }

// remove item
simpleLocalStorage.removeItem("pets");
console.log(pets); // undefined

// clear all
simpleLocalStorage.clear();
```

Licensed under the MIT license.

Derek Petersen

https://derek.cloud/
