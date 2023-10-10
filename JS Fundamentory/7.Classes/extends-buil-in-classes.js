// We also can extends built-in classes like Array, Map...
// add one more method to it (can do more)
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false
// Even more, we can customize that behavior.

// We can add a special static getter Symbol.species to the class. If it exists, it should return the constructor that JavaScript will use internally to create new entities in map, filter and so on.

// Built-in objects have their own static methods, for instance Object.keys, Array.isArray etc.

// As we already know, native classes extend each other. For instance, Array extends Object.

// Normally, when one class extends another, both static and non-static methods are inherited. That was thoroughly explained in the article Static properties and methods.

// But built-in classes are an exception. They don’t inherit statics from each other.

// For example, both Array and Date inherit from Object, so their instances have methods from Object.prototype. But Array.[[Prototype]] does not reference Object, so there’s no, for instance, Array.keys() (or Date.keys()) static method.
