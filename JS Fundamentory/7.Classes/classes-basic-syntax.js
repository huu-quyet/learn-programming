// In object-oriented programming, a class is an extensible program-code-template for creating objects, providing initial values for state (member variables) and implementations of behavior (member functions or methods). (Wikipedia)

// What is a class ?
// In Javascript, a class is a kind of function
class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log(this.name);
  }
}

// proof: User is a function
console.log(typeof User); // function
//   What class User {...} construct really does is:
//      1.   Creates a function named User, that becomes the result of the class declaration. The function code is taken from the constructor method (assumed empty if we don’t write such method).
//      2.   Stores class methods, such as sayHi, in User.prototype.
// After new User object is created, when call its method, it is taken from the prototype. So the object has access to class methods
console.log(User === User.prototype.constructor); // true

// The methods are in User.prototype, e.g:
console.log(User.prototype.sayHi); // the code of the sayHi method

// there are exactly two methods in the prototype
console.log(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi

// -------------------------------------------------
// Classes is not just a syntactic sugar
// Sometimes people say that class is a “syntactic sugar” (syntax that is designed to make things easier to read, but doesn’t introduce anything new), because we could actually declare the same thing without using the class keyword at all:
// rewriting class User in pure functions
// 1. Create constructor function
function User1(name) {
  this.name = name;
}
// a function prototype has "constructor" property by default,
// so we don't need to create it

// 2. Add the method to prototype
User1.prototype.sayHi = function () {
  console.log(this.name);
};

// Usage:
let user = new User1("John");
user.sayHi();

// Still, there are important differences
//  1.  Function created by class is labelled by a special internal property [[IsClassConstructor]] : true. So it is not the same as creating it manually. That is why it must be called with new:
class User2 {
  constructor() {}
}

console.log(typeof User2); // function
// User2(); // Error: Class constructor User cannot be invoked without 'new'

//  2.  Class methods are non-enumerable. A class definition set enumerable flag to false for all methods in the "prototype". So, for..in can not loop over class methods
//  3.  Classes alway use strict. All code inside the class construct is automatically in strict mode.
//  4.  Besides, class syntax brings many other features.

// -------------------------------------------------
// Class Expression
// Just like functions, classes can be defined inside another expression, passed around, returned, assigned, etc.

// Here’s an example of a class expression:

let User3 = class {
  sayHi() {
    console.log("Hello");
  }
};
// Similar to Named Function Expressions, class expressions may have a name.

// If a class expression has a name, it’s visible inside the class only:

// "Named Class Expression"
// (no such term in the spec, but that's similar to Named Function Expression)
let User4 = class MyClass {
  sayHi() {
    console.log(MyClass); // MyClass name is visible only inside the class
  }
};

new User4().sayHi(); // works, shows MyClass definition

// console.log(MyClass); // error, MyClass name isn't visible outside of the class
// We can even make classes dynamically “on-demand”, like this:

function makeClass(phrase) {
  // declare a class and return it
  return class {
    sayHi() {
      console.log(phrase);
    }
  };
}

// Create a new class
let User5 = makeClass("Hello");

new User5().sayHi(); // Hello

// -----------------------------------------------
// Getter and setters
// Just like literal objects, classes may include getters/setters
class User6 {
  constructor(name) {
    // invokes the setter
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      console.log("Name is too short.");
      return;
    }
    this._name = value;
  }
}

let user6 = new User6("John");
console.log(user6.name); // John
user6 = new User6(""); // Name is too short.

// ----------------------------------------------------
// Class fields
// “Class fields” is a syntax that allows to add any properties.
class User7 {
  name = "John";

  sayHi() {
    console.log(`Hello, ${this.name}!`);
  }
}
new User7().sayHi(); // Hello, John!

// The important difference of class fields is that they are set on individual objects, not User.prototype:
// Making bound methods with class fields
// Function in Javascript have a dynamic this. It depends on the context of the call. If an object is passed around and called in another context, this will not be a reference to its object any more
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    console.log(this.value);
  }

  clickMore = () => {
    console.log(this.value);
  };
}

let button = new Button("hello");

setTimeout(button.click, 1000); // undefined
setTimeout(button.clickMore, 1000); // hello

//   The problem is called "losing this".
//   There are two approaches to fixing it, as discussed in the chapter Function binding:
//   1. Pass a wrapper-function, such as setTimeout(() => button.click(), 1000).
//   2. Bind the method to object, e.g. in the constructor.
// The class field clickMore = () => {...} is created on a per-object basis, there’s a separate function for each Button object, with this inside it referencing that object. We can pass button.click around anywhere, and the value of this will always be correct.

// That’s especially useful in browser environment, for event listeners.
