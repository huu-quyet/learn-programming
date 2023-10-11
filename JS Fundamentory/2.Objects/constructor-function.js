/**
 *
- Constructor functions technically are regular functions. There are two conventions though:
    + They are named with capital letter first.
    + They should be executed only with "new" operator.
 */

function User(name) {
  this.name = name;
  this.isAdmin = false;
}

let user1 = new User("Jack");

console.log(user1.name); // Jack
console.log(user1.isAdmin); // false

/**
- When a function is executed with new, it does the following steps:

    1. A new empty object is created
    2. Function is called, this = {}
    2. The function body executes. Usually it modifies this, adds new properties to it. Linked to prototype
    3. The value of this is returned.

In other words, new User(...) does something like:
 */

function User(name) {
  // this = {};  (implicitly)

  // add properties to this
  this.name = name;
  this.isAdmin = false;

  // return this;  (implicitly)
}

let user2 = {
  name: "Jack",
  isAdmin: false,
};

//Now if we want to create other users, we can call new User("Ann"), new User("Alice") and so on. Much shorter than using literals every time, and also easy to read.

// That’s the main purpose of constructors – to implement reusable object creation code.

// --------------------------------------
// If we have many lines of code all about creation of a single complex object, we can wrap them in an immediately called constructor function, like this:

// create a function and immediately call it with new
let user = new (function () {
  this.name = "John";
  this.isAdmin = false;

  // ...other code for user creation
  // maybe complex logic and statements
  // local variables etc
})();

// -----------------------------------------------
//Constructor mode test: new.target
//Inside a function, we can check whether it was called with new or without it, using a special new.target property.
//It is undefined for regular calls and equals the function if called with new:
function User() {
  console.log(new.target);
}

// without "new":
User(); // undefined

// with "new":
new User(); // function User { ... }

//We can also make both new and regular calls to do the same, like this:
function User(name) {
  if (!new.target) {
    // if you run me without new
    return new User(name); // ...I will add new for you
  }

  this.name = name;
}

let john = User("John"); // redirects call to new User
console.log(john.name); // John

// This approach is sometimes used in libraries to make the syntax more flexible. So that people may call the function with or without new, and it still works.

// Probably not a good thing to use everywhere though, because omitting new makes it a bit less obvious what’s going on. With new we all know that the new object is being created.

// -----------------------------------------------------
//Return from constructors
// Usually, constructors do not have a return statement. Their task is to write all necessary stuff into this, and it automatically becomes the result.

// But if there is a return statement, then the rule is simple:

// If return is called with an object, then the object is returned instead of this.
// If return is called with a primitive, it’s ignored.
function BigUser() {
  this.name = "John";

  return { name: "Godzilla" }; // <-- returns this object
}

console.log(new BigUser().name); // Godzilla, got that object

//-----------------------------------------------------------\
//Methods in constructor
//Using constructor functions to create objects gives a great deal of flexibility. The constructor function may have parameters that define how to construct the object, and what to put in it.
// Of course, we can add to this not only properties, but methods as well.
function User(name) {
  this.name = name;

  this.sayHi = function () {
    alert("My name is: " + this.name);
  };
}

let john1 = new User("John");

john1.sayHi(); // My name is: John

/*
  john1 = {
     name: "John",
     sayHi: function() { ... }
  }
  */
