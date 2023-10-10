/**
 * Object are "heavier" than primitive. They require additional resources to support the internal machinery
 */
//----------------------------------------------------------------
// A primitive as an object
// - Primitives are still primitive. A single value, as desired.
// - The language allows access to methods and properties of strings, numbers, booleans and symbols.
// - In order for that to work, a special “object wrapper” that provides the extra functionality is created, and then is destroyed.
// The “object wrappers” are different for each primitive type and are called: String, Number, Boolean, Symbol and BigInt. Thus, they provide different sets of methods.

let str = "Hello";

console.log(str.toUpperCase()); // HELLO
// Simple, right? Here’s what actually happens in str.toUpperCase():
//  - The string str is a primitive. So in the moment of accessing its property, a special object is created that knows the value of the string, and has useful methods, like toUpperCase().
//  - That method runs and returns a new string (shown by console.log).
//  - The special object is destroyed, leaving the primitive str alone.

// So primitives can provide methods, but they still remain lightweight(nhẹ).

// The JavaScript engine highly optimizes this process. It may even skip the creation of the extra object at all. But it must still adhere (dính chặt, tuân theo) to the specification and behave as if it creates one.

// ----------------------------------------------------------------
// Constructors String/Number/Boolean are for internal use only
// Some languages like Java allow us to explicitly create “wrapper objects” for primitives using a syntax like new Number(1) or new Boolean(false).
// In JavaScript, that’s also possible for historical reasons, but highly unrecommended. Things will go crazy in several places.

// For instance:
console.log(typeof 0); // "number"
console.log(typeof new Number(0)); // "object"!
// Objects are always truthy in if, so here the console.log will show up:
let zero = new Number(0);
if (zero) {
  // zero is true, because it's an object
  console.log("zero is truthy!?!");
}

// On the other hand, using the same functions String/Number/Boolean without "new" is totally fine and useful thing. They convert a value to the corresponding type: to a string, a number, or a boolean (primitive).
// For example, this is entirely valid:
let num = Number("123"); // convert a string to number

// --------------------------------------------------------------
// null/undefined have no methods
// The special primitives null and undefined are exceptions. They have no corresponding “wrapper objects” and provide no methods. In a sense, they are “the most primitive”.

// -------------------------------------------------------------
Summary;
//  - Primitives except null and undefined provide many helpful methods. We will study those in the upcoming chapters.
//  - Formally, these methods work via temporary objects, but JavaScript engines are well tuned to optimize that internally, so they are not expensive to call.
