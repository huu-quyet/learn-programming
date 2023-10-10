// Map and Set
// Till now, we’ve learned about the following complex data structures:

// Objects are used for storing keyed collections.
// Arrays are used for storing ordered collections.
// But that’s not enough for real life. That’s why Map and Set also exist.

// ---------------------------------------------------------------------
// Map
// Map is a collection of keyed data items, just like an Object. But the main difference is that Map allows keys of any type.
// Methods and properties are:

// new Map() – creates the map.
// map.set(key, value) – stores the value by the key.
// map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
// map.has(key) – returns true if the key exists, false otherwise.
// map.delete(key) – removes the element (the key/value pair) by the key.
// map.clear() – removes everything from the map.
// map.size – returns the current element count.
let map = new Map();

map.set("1", "str1"); // a string key
map.set(1, "num1"); // a numeric key
map.set(true, "bool1"); // a boolean key

// remember the regular Object? it would convert keys to string
// Map keeps the type, so these two are different:
console.log(map.get(1)); // 'num1'
console.log(map.get("1")); // 'str1'
console.log(map);
console.log(map.size); // 3

// map[key] only work correctly with keys are symbol or string
// Map can also use objects as keys.

//Iteration over Map
// For looping over a map, there are 3 methods:

// map.keys() – returns an iterable for keys,
// map.values() – returns an iterable for values,
// map.entries() – returns an iterable for entries [key, value], it’s used by default in for..of.
let recipeMap = new Map([
  ["cucumber", 500],
  ["tomatoes", 350],
  ["onion", 50],
]);

// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
  console.log(vegetable); // cucumber, tomatoes, onion
}

// iterate over values (amounts)
for (let amount of recipeMap.values()) {
  console.log(amount); // 500, 350, 50
}

// iterate over [key, value] entries
for (let entry of recipeMap) {
  // the same as of recipeMap.entries()
  console.log(entry); // cucumber,500 (and so on)
}

// runs the function for each (key, value) pair
recipeMap.forEach((value, key, map) => {
  console.log(`${key}: ${value}`); // cucumber: 500 etc
});

// Object.entries: Map from Object
// Object.entries(obj) that returns an array of key/value pairs for an object exactly in that format.
// So we can create a map from an object like this:

let obj = {
  name: "John",
  age: 30,
};

let map1 = new Map(Object.entries(obj));
console.log(map1.get("name")); // John
// Here, Object.entries returns the array of key/value pairs: [ ["name","John"], ["age", 30] ]. That’s what Map needs.

// Object.fromEntries: Object from Map
// There’s Object.fromEntries method that does the reverse: given an array of [key, value] pairs, it creates an object from them:

let prices = Object.fromEntries([
  ["banana", 1],
  ["orange", 2],
  ["meat", 4],
]);
// now prices = { banana: 1, orange: 2, meat: 4 }
console.log(prices.orange); // 2

let map2 = new Map();
map.set("banana", 1);
map.set("orange", 2);
map.set("meat", 4);

let obj2 = Object.fromEntries(map2.entries()); // make a plain object (*)
// done!
// obj = { banana: 1, orange: 2, meat: 4 }
console.log(obj2.orange); // 2

// ---------------------------------------------------------------------
// Set
// A Set is a special type collection – “set of values” (without keys), where each value may occur only once.
// Its main methods are:

// new Set([iterable]) – creates the set, and if an iterable object is provided (usually an array), copies values from it into the set.
// set.add(value) – adds a value, returns the set itself.
// set.delete(value) – removes the value, returns true if value existed at the moment of the call, otherwise false.
// set.has(value) – returns true if the value exists in the set, otherwise false.
// set.clear() – removes everything from the set.
// set.size – is the elements count.

//The main feature is that repeated calls of set.add(value) with the same value don’t do anything. That’s the reason why each value appears in a Set only once.
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visits, some users come multiple times
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set keeps only unique values
console.log(set.size); // 3

for (let user of set) {
  console.log(user.name); // John (then Pete and Mary)
}
// The alternative to Set could be an array of users, and the code to check for duplicates on every insertion using arr.find. But the performance would be much worse, because this method walks through the whole array checking every element. Set is much better optimized internally for uniqueness checks.

// Iteration over Set
// We can loop over a set either with for..of or using forEach:

let set2 = new Set(["oranges", "apples", "bananas"]);

for (let value of set2) console.log(value);

// the same with forEach:
set2.forEach((value, valueAgain, set) => {
  console.log(value);
});

// The same methods Map has for iterators are also supported:

// set.keys() – returns an iterable object for values,
// set.values() – same as set.keys(), for compatibility with Map,
// set.entries() – returns an iterable object for entries [value, value], exists for compatibility with Map.
