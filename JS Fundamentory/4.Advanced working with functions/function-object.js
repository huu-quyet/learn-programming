// In JavaScript, functions are objects.
// A good way to imagine functions is as callable “action objects”. We can not only call them, but also treat them as objects: add/remove properties, pass by reference etc.

// --------------------------------------------
// "name" property
// Function objects contain some useable properties.
// For instance, a function’s name is accessible as the “name” property:

function sayHi() {
  alert("Hi");
}

alert(sayHi.name); // sayHi

// Object methods have names too:

let user = {
  sayHi() {
    // ...
  },
  sayBye: function () {
    // ...
  },
};

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye

// There’s no magic though. There are cases when there’s no way to figure out the right name. In that case, the name property is empty, like here:
// function created inside array
let arr = [function () {}];
alert(arr[0].name); // <empty string>
// the engine has no way to set up the right name, so there is none

// --------------------------------------------
// "length" property
// There is another built-in property “length” that returns the number of function parameters, for instance:

function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2

// Custom properties
// We can also add properties of our own.

// Here we add the counter property to track the total calls count:

function sayHi() {
  alert("Hi");

  // let's count how many times we run
  sayHi.counter++;
}
sayHi.counter = 0; // initial value

sayHi(); // Hi
sayHi(); // Hi

alert(`Called ${sayHi.counter} times`); // Called 2 times
// A property is not a variable
// A property assigned to a function like sayHi.counter = 0 does not define a local variable counter inside it. In other words, a property counter and a variable let counter are two unrelated things.

// We can treat a function as an object, store properties in it, but that has no effect on its execution. Variables are not function properties and vice versa. These are just parallel worlds.

// Function properties can replace closures sometimes. For instance, we can rewrite the counter function example from the chapter Variable scope, closure to use a function property:

function makeCounter() {
  // instead of:
  // let count = 0

  function counter() {
    return counter.count++;
  }

  counter.count = 0;

  return counter;
}

let counter = makeCounter();
alert(counter()); // 0
alert(counter()); // 1
// The count is now stored in the function directly, not in its outer Lexical Environment.

// Is it better or worse than using a closure?

// The main difference is that if the value of count lives in an outer variable, then external code is unable to access it. Only nested functions may modify it. And if it’s bound to a function, then such a thing is possible:

function makeCounter() {
  function counter() {
    return counter.count++;
  }

  counter.count = 0;

  return counter;
}

let counter = makeCounter();

counter.count = 10;
alert(counter()); // 10
// So the choice of implementation depends on our aims

// If the function is declared as a Function Expression (not in the main code flow), and it carries the name, then it is called a Named Function Expression. The name can be used inside to reference itself, for recursive calls or such.
let sayHi = function func(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    func("Guest"); // Now all fine
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Hello, Guest (nested call works)
