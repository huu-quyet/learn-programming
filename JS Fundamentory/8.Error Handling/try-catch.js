// Sometime our scripts have errors. They may occur because of our mistakes, an unexpected user input, an erroneous server response, and for a thousand other reasons.
// Usually, a script "dies" immediately stops in case of an error, printing it to console. But, there is a syntax constructor try...catch that allows us to catch errors so the script can, instead of dying, do something more reasonable

// try...catch syntax:
try {
  // code ...
} catch (err) {
  // error handling
}

//  1. if the code in try {...} has no error, code in catch {...} blog will be ignored
//  2. if an error occurs, then try {...} execution is stopped and control flows to the beginning of catch(err) {}
//  3. try ... catch only works for runtime errors, the code must be runnable. In other words, it should be valid Javascript:
// The Javascript engine first reads the code and then runs it. The errors that occur on the reading phase are called "parse-time" errors and are unrecoverable. That’s because the engine can’t understand the code. So, try...catch can only handle errors that occur in valid code. Such errors are called “runtime errors” or, sometimes, “exceptions”.
//  4. try ... catch works synchronously
// If an exception happens in “scheduled” code, like in setTimeout, then try...catch won’t catch it:
try {
  setTimeout(function () {
    noSuchVariable; // script will die here
  }, 1000);
} catch (err) {
  console.log("won't work");
}
// That’s because the function itself is executed later, when the engine has already left the try...catch construct.
// To catch an exception inside a scheduled function, try...catch must be inside that function:

setTimeout(function () {
  try {
    noSuchVariable; // try...catch handles the error!
  } catch {
    console.log("error is caught here!");
  }
}, 1000);

// ----------------------------------
// Throwing our own error
// JavaScript has many built-in constructors for standard errors: Error, SyntaxError, ReferenceError, TypeError and others. We can use them to create error objects as well.

// Their syntax is:

// let error = new Error(message);
// // or
// let error = new SyntaxError(message);
// let error = new ReferenceError(message);
// // ...
// For built-in errors (not for any objects, just for errors), the name property is exactly the name of the constructor. And message is taken from the argument.
let json = '{ "age": 30 }'; // incomplete data

try {
  let user = JSON.parse(json); // <-- no errors

  if (!user.name) {
    throw new SyntaxError("Incomplete data: no name"); // (*)
  }

  alert(user.name);
} catch (err) {
  alert("JSON Error: " + err.message); // JSON Error: Incomplete data: no name
}
// In the line (*), the throw operator generates a SyntaxError with the given message, the same way as JavaScript would generate it itself. The execution of try immediately stops and the control flow jumps into catch.

// Rethrowing error
// The “rethrowing” technique can be explained in more detail as:

//  1. Catch gets all errors.
//  2. In the catch (err) {...} block we analyze the error object err.
//  3. If we don’t know how to handle it, we do throw err.
// We can also get the error class name from err.name property. All native errors have it. Another option is to read err.constructor.name.

// In the code below, we use rethrowing so that catch only handles SyntaxError:

let json1 = '{ "age": 30 }'; // incomplete data
try {
  let user = JSON.parse(json1);

  if (!user.name) {
    throw new SyntaxError("Incomplete data: no name");
  }

  blabla(); // unexpected error

  alert(user.name);
} catch (err) {
  if (err instanceof SyntaxError) {
    alert("JSON Error: " + err.message);
  } else {
    throw err; // rethrow (*)
  }
}
// The error throwing on line (*) from inside catch block “falls out” of try...catch and can be either caught by an outer try...catch construct (if it exists), or it kills the script.

// So the catch block actually handles only errors that it knows how to deal with and “skips” all others.

// The example below demonstrates how such errors can be caught by one more level of try...catch:

function readData() {
  let json2 = '{ "age": 30 }';

  try {
    // ...
    blabla(); // error!
  } catch (err) {
    // ...
    if (!(err instanceof SyntaxError)) {
      throw err; // rethrow (don't know how to deal with it)
    }
  }
}

try {
  readData();
} catch (err) {
  alert("External catch got: " + err); // caught it!
}
// Here readData only knows how to handle SyntaxError, while the outer try...catch knows how to handle everything.

// ---------------------------------------------------
// Global error
// There is none in the specification, but environments usually provide it, because it’s really useful. For instance, Node.js has process.on("uncaughtException") for that. And in the browser we can assign a function to the special window.onerror property, that will run in case of an uncaught error.

// The syntax:

// window.onerror = function(message, url, line, col, error) {
//   // ...
// };
// 1. message
// Error message.
// 2. url
// URL of the script where error happened.
// 3. line, col
// Line and column numbers where error happened.
// 4. error
// Error object.
// For instance:

window.onerror = function (message, url, line, col, error) {
  alert(`${message}\n At ${line}:${col} of ${url}`);
};

function readData() {
  badFunc(); // Whoops, something went wrong!
}

readData();

// The role of the global handler window.onerror is usually not to recover the script execution – that’s probably impossible in case of programming errors, but to send the error message to developers.
