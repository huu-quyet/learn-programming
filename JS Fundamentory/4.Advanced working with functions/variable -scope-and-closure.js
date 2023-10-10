// JavaScript is a very function-oriented language. It gives us a lot of freedom. A function can be created at any moment, passed as an argument to another function, and then called from a totally different place of code later.

// We already know that a function can access variables outside of it (“outer” variables).

// ------------------------------------
// Code blocks
// If a variable is declared inside a code block {...}, it’s only visible inside that block.
{
  // do some job with local variables that should not be seen outside

  let message = "Hello"; // only visible in this block
  console.log(message); // Hello
}

console.log(message); // Error: message is not defined
//   We can use this to isolate a piece of code that does its own task, with variables that only belong to it:
{
  // show message
  let message = "Hello";
  console.log(message);
}

{
  // show another message
  let message = "Goodbye";
  console.log(message);
}

// ------------------------------------
// Nested functions
// A function is called “nested” when it is created inside another function.
// It is easily possible to do this with JavaScript.
// We can use it to organize our code, like this:

function sayHiBye(firstName, lastName) {
  // helper nested function to use below
  function getFullName() {
    return firstName + " " + lastName;
  }

  console.log("Hello, " + getFullName());
  console.log("Bye, " + getFullName());
}

// What’s much more interesting, a nested function can be returned: either as a property of a new object or as a result by itself. It can then be used somewhere else. No matter where, it still has access to the same outer variables.
function makeCounter() {
  let count = 0;

  return function () {
    return count++;
  };
}

let counter = makeCounter();

console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2

//How does this work? If we create multiple counters, will they be independent? What’s going on with the variables here? We will discuss below.

// -------------------------------------
// Lexical Scope
//  1. Variables
// In JavaScript, every running function, code block {...}, and the script as a whole have an internal (hidden) associated object known as the Lexical Scope.
// The Lexical Scope object consists of two parts:
// - Scope Record – an object that stores all local variables as its properties (and some other information like the value of this).
// - A reference to the outer lexical Scope, the one associated with the outer code.
// A “variable” is just a property of the special internal object, Scope Record. “To get or change a variable” means “to get or change a property of that object”.

// execution start      -------- phrase : uninitialized     ------(outer)-----> null
// let phrase;          -------- phrase : undefined
// phrase = "Hello";    -------- phrase : "Hello"
// phrase = "Bye";      -------- phrase : "Bye"

//  On the right-hand side demonstrate how the global Lexical Scope changes during the execution, The global Lexical Scope has no outer reference, that’s why the arrow points to null:
//    - When the script starts, the Lexical Scope is pre-populated with all declared variables.
// Initially, they are in the “Uninitialized” state. That’s a special internal state, it means that the engine knows about the variable, but it cannot be referenced until it has been declared with let. It’s almost the same as if the variable didn’t exist.
//    - Then let phrase definition appears. There’s no assignment yet, so its value is undefined. We can use the variable from this point forward.
//    - phrase is assigned a value.
//    - phrase changes the value.

// Everything looks simple for now, right?

// A variable is a property of a special internal object, associated with the currently executing block/function/script.
// Working with variables is actually working with the properties of that object.

// --------
// 2. Function declarations
// A function is also a value, like a variable.
// The difference is that a Function Declaration is instantly fully initialized.
// When a Lexical Scope is created, a Function Declaration immediately becomes a ready-to-use function (unlike let, that is unusable till the declaration).
// That’s why we can use a function, declared as Function Declaration, even before the declaration itself.
// For example, here’s the initial state of the global Lexical Scope when we add a function:

// execution start                    -------- phrase : uninitialized     ------(outer)-----> null
//                                             say: function
// let phrase = "Hello";              -------- phrase : "Hello"
// function say(name){
//  console.log(`${phrase}, ${name})
// }

// --------
// 3. Inner and outer Lexical Scope
// When a function runs, at the beginning of the call, a new Lexical Scope is created automatically to store local variables and  parameters of the call
// During the function call we have tow Lexical Scope:
//    - Inner Lexical Scope that corresponds to the current execution of the function. It has properties, arguments.
//    - Outer Lexical Scope is the Lexical Scope out of the current (inner) Lexical Scope. It has all variables and functions which is declared outside inner Lexical Scope
// If a variable is not found in the inner Lexical Scope, It is continue find that variable in the outer Lexical Scope and so on. Until the variable is not found anywhere, that is an error in strict mode

// ---------
// 4. Retuning a function
function makeCounter() {
  let count = 0;

  return function () {
    return count++;
  };
}

let counter1 = makeCounter();
// at the beginning of each makeCounter() call, a new Lexical Scope object is created, to store variables for this makeCounter run.

// function makeCounter() {   ---------- Lexical Scope of the makeCounter() call  -----(outer)---->  global Lexical Scope                 ------(outer)------> null
//   let count = 0;                         count: 0                                                 makeCounter: function, counter : undefined

//   return function () {
//     return count++;
//   };
// }
// let counter = makeCounter();

// What is different is that, during the execution of makeCounter(), a tiny nested function is created by the returned function() { return count++ } and we do not run it yet, only create.
// All functions remember the Lexical Scope in which the were made. Technically, there is no magic here: all functions have the hidden property named: [[Scope]], that keeps the reference to the Lexical Scope where the functions was created.

// function makeCounter() {
//   let count = 0;

//   return function () {    --- [[Environment]] ---> count: 0 --->(outer) makeCounter: function  --->(outer) null
//     return count++;                                                     counter: undefined
//   };
// }
// let counter = makeCounter();

// So, counter.[[Environment]] has the reference to {count: 0} Lexical scope. That is how the function remembers where it was created, no matter where it is called. The [[Environment]] reference is set once and forever at function creation time.
// Later, when counter() is called, a new Lexical scope is created for the call and it is outer lexical scope reference is taken form counter.[[Environment]]
// Now when the code inside counter() looks for count variable, it first searches its own scope (empty, as there are no local variable there), then the Lexical scope of the outer makeCounter() call, where it finds and changes it.

// A variable is updated in the Lexical scope where it lives.
// If we call counter() multiple times, the count variable will be increased to 2, 3 and so on, at the same place.

Note;
// Closure
// There is a general programming term “closure”, that developers generally should know.

// A closure is a function that remembers its outer variables and can access them. In some languages, that’s not possible, or a function should be written in a special way to make it happen. But as explained above, in JavaScript, all functions are naturally closures (there is only one exception, to be covered in The "new Function" syntax).

// That is: they automatically remember where they were created using a hidden [[Environment]] property, and then their code can access outer variables.

// When on an interview, a frontend developer gets a question about “what’s a closure?”, a valid answer would be a definition of the closure and an explanation that all functions in JavaScript are closures, and maybe a few more words about technical details: the [[Environment]] property and how Lexical Scope work.

///////////////////////////////////////////////////////////////
// Garbage collection
// Usually, a Lexical Scope is removed from memory with all the variables after the function call finishes. That’s because there are no references to it. As any JavaScript object, it’s only kept in memory while it’s reachable.
// However, if there’s a nested function that is still reachable after the end of a function, then it has [[Environment]] property that references the lexical scope.
// In that case the Lexical Scope is still reachable even after the completion of the function, so it stays alive.

// Please note that if f() is called many times, and resulting functions are saved, then all corresponding Lexical Environment objects will also be retained in memory. In the code below, all 3 of them:

function f() {
  let value = Math.random();

  return function () {
    alert(value);
  };
}

// 3 functions in array, every one of them links to Lexical Environment
// from the corresponding f() run
let arr = [f(), f(), f()];

// A Lexical Environment object dies when it becomes unreachable (just like any other object). In other words, it exists only while there’s at least one nested function referencing it.
// In the code below, after the nested function is removed, its enclosing Lexical Environment (and hence the value) is cleaned from memory:
function f() {
  let value = 123;

  return function () {
    alert(value);
  };
}
let g = f(); // while g function exists, the value stays in memory
g = null; // ...and now the memory is cleaned up

// Real-life optimizations
// As we’ve seen, in theory while a function is alive, all outer variables are also retained.

// But in practice, JavaScript engines try to optimize that. They analyze variable usage and if it’s obvious from the code that an outer variable is not used – it is removed.
