// The property prototype is used by the core of Javascript itself. All build-in constructor functions use it.

// Object.prototype
// when we declare a empty object like this:
let obj = {};
// It is the same obj = new Object(), where Object is a build-in object constructor function with its own prototype reference a huge object with methods.
// When new Object() is called (or a literal object {...} is created), the [[Prototype]] of it is set to Object.prototype.

//          prototype
// Object --------------> Object.prototype { constructor: Object; toString: function; ...}
//                              ^
//                              | [[Prototype]]
//                              |
//                        obj = new Object()

// So then when call obj.toString() is called the method is taken from Object.prototype

console.log(obj.__proto__ === Object.prototype); // true
console.log(obj.toString === obj.__proto__.toString); //true
console.log(obj.toString === Object.prototype.toString); //true
obj.prototype = {
  name: "hello",
};
console.log(obj.prototype === obj.__proto__); //false
console.log(obj.__proto__ === Object.prototype); // true
console.log(obj.toString === obj.__proto__.toString); //true
console.log(obj.toString === Object.prototype.toString); //true

// Please note that there is no more [[Prototype]] in the chain above Object.prototype:
console.log(Object.prototype.__proto__); // null

// ---------------------------------------------------
// Other build-in prototypes
// Other built-in objects such as Array, Date, Function and others also keep methods in prototypes.
// Let’s check the prototypes manually:
let arr = [1, 2, 3];

// it inherits from Array.prototype?
console.log(arr.__proto__ === Array.prototype); // true

// then from Object.prototype?
console.log(arr.__proto__.__proto__ === Object.prototype); // true

// and null on the top.
console.log(arr.__proto__.__proto__.__proto__); // null

// --------------------------------------------------
// Primitives
// As we remember, primitives type are not objects. But if we try to access their property, "temporary wrapper object" are created using build-in constructors String, Number, Boolean. They provide the methods and disappear.
// These objects are created invisibly to us and most engine optimize them out. Methods of these objects also reside(cư trú tại/ở tại) in prototype, available as String.prototype, Number.prototype and Boolean.prototype.
// Note: null and undefined have no object wrappers. Them stand apart and there are no corresponding object prototypes either

// --------------------------------------------------
// Changing native prototypes
// Native prototypes can be modified. For instance, if we add a method to String.prototype, it becomes available to all strings:

String.prototype.show = function () {
  console.log(this);
};

// "BOOM!".show(); // BOOM!
// During the process of development, we may have ideas for new built-in methods we’d like to have, and we may be tempted to add them to native prototypes. But that is generally a bad idea.

// Important:
// Prototypes are global, so it’s easy to get a conflict. If two libraries add a method String.prototype.show, then one of them will be overwriting the method of the other.
// So, generally, modifying a native prototype is considered a bad idea.
// In modern programming, there is only one case where modifying native prototypes is approved. That’s polyfilling.
// Polyfilling is a term for making a substitute for a method that exists in the JavaScript specification, but is not yet supported by a particular JavaScript engine.
// We may then implement it manually and populate the built-in prototype with it.
// For instance:

if (!String.prototype.repeat) {
  // if there's no such method
  // add it to the prototype

  String.prototype.repeat = function (n) {
    // repeat the string n times

    // actually, the code should be a little bit more complex than that
    // (the full algorithm is in the specification)
    // but even an imperfect polyfill is often considered good enough
    return new Array(n + 1).join(this);
  };
}

console.log("La".repeat(3)); // LaLaLa

// ---------------------------------------------------
// Borrowing from prototypes
// That’s when we take a method from one object and copy it into another.

// Some methods of native prototypes are often borrowed.

// For instance, if we’re making an array-like object, we may want to copy some Array methods to it.

let obj1 = {
  0: "Hello",
  1: "world!",
  length: 2,
};

obj1.join = Array.prototype.join;
console.log(obj1.join(",")); // Hello,world!

// It works because the internal algorithm of the built-in join method only cares about the correct indexes and the length property. It doesn’t check if the object is indeed an array. Many built-in methods are like that.

// Another possibility is to inherit by setting obj.__proto__ to Array.prototype, so all Array methods are automatically available in obj.

// But that’s impossible if obj already inherits from another object. Remember, we only can inherit from one object at a time.

// Borrowing methods is flexible, it allows to mix functionalities from different objects if needed.
