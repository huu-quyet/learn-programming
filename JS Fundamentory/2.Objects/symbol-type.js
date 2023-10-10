// By specification, only two primitive types may serve as object property keys:
// - string type, or
// - symbol type.
// Otherwise, if one uses another type, such as number, it’s auto converted to string. So that obj[1] is the same as obj["1"], and obj[true] is the same as obj["true"].
// Until now we’ve been using only strings.

// -------------------------------------------
// A Symbol represents a unique identifier
// Symbols are guaranteed to be unique. Even if we create many symbols with exactly the same description, they are different values. The description is just a label that doesn’t affect anything.
let id1 = Symbol("id");
let id2 = Symbol("id");

console.log(id1 == id2); // false
console.log(typeof id1.description); // id

// ------------------------------------------
// Symbols don’t auto-convert to a string
console.log(id1.toString()); // Symbol(id)
console.log(id1.valueOf()); // Symbol(id)

// ------------------------------------------
// “Hidden” properties
// Symbols allow us to create “hidden” properties of an object, that no other part of code can accidentally access or overwrite.
let user1 = {
  // belongs to another code
  name: "John",
};

let id = Symbol("id");

user1[id] = 1;

console.log(user1[id]); // we can access the data using the symbol as the key

// …But if we used a string "id" instead of a symbol for the same purpose, then there would be a conflict:
let user2 = { name: "John" };
// Our script uses "id" property
user2.id = "Our id value";
// ...Another script also wants "id" for its purposes...
user2.id = "Their id value";
// Boom! overwritten by another script!

// --------------------------------------------
// Symbols in an object literal
// If we want to use a symbol in an object literal {...}, we need square brackets around it.
let id3 = Symbol("id");

let user3 = {
  name: "John",
  [id3]: 123, // not "id": 123
};

// That’s because we need the value from the variable id as the key, not the string “id”.

// ---------------------------------------------
// Symbols are skipped by for…in
// Symbolic properties do not participate in for..in loop.
let id4 = Symbol("id");
let user4 = {
  name: "John",
  age: 30,
  [id4]: 123,
};

for (let key in user4) console.log(key); // name, age (no symbols)

// the direct access by the symbol works
console.log("Direct: " + user4[id4]); // Direct: 123

// Object.keys() also ignore them
// In contrast, Object.assign copies both string and symbol properties:
let id5 = Symbol("id");
let user5 = {
  [id5]: 123,
};

let clone = Object.assign({}, user5);

console.log(clone[id5]); // 123

// ------------------------------------------------------------
// Global symbols
// Sometime in the different part of application you want to access symbol by a key. To achieve that, there exists a global symbols registry.
// use Symbol.for(key) use can read (create a new one if absent) a symbol from the registry
// read from the global registry
let id6 = Symbol.for("id"); // if the symbol did not exist, it is created

// read it again (maybe from another part of the code)
let idAgain = Symbol.for("id");

// the same symbol
console.log(id6 === idAgain); // true

// Symbol.keyFor
//Symbol.for(key) returns a symbol by name. To do the opposite – return a name by global symbol – we can use: Symbol.keyFor(sym):
// get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// get name by symbol
console.log(Symbol.keyFor(sym)); // name
console.log(Symbol.keyFor(sym2)); // id

//The Symbol.keyFor internally uses the global symbol registry to look up the key for the symbol. So it doesn’t work for non-global symbols. If the symbol is not global, it won’t be able to find it and returns undefined.
// That said, all symbols have the description property.

let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

console.log(Symbol.keyFor(globalSymbol)); // name, global symbol
console.log(Symbol.keyFor(localSymbol)); // undefined, not global
console.log(localSymbol.description); // name

// Technically, symbols are not 100% hidden. There is a built-in method
Object.getOwnPropertySymbols(obj); //  that allows us to get all symbols. Also there is a method named
Reflect.ownKeys(obj); // that returns all keys of an object including symbolic ones.
