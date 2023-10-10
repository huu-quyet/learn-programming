// Generators
// Regular functions return only one, single value (or nothing).
// Generators can return (“yield”) multiple values, one after another, on-demand. They work great with iterables, allowing to create data streams with ease.

// Generator functions
// To create a generator, we need a special syntax construct: function*, so-called “generator function”.
// Generator functions behave differently from regular ones. When such function is called, it doesn’t run its code. Instead it returns a special object, called “generator object”, to manage the execution.

// Here, take a look:
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// "generator function" creates "generator object"
let generator = generateSequence();
console.log(generator); // [object Generator]

// The main method of a generator is next(). When called, it runs the execution until the nearest yield statement. Then the function execution pauses, and the yielded value is return to the outer code.
// The result of next() is always an object with tow properties:
//  - value: the yielded value.
//  - done: true if the function code has finished, otherwise false

let one = generator.next();
console.log(JSON.stringify(one)); // {value: 1, done: false}
let two = generator.next();
console.log(JSON.stringify(two)); // {value: 2, done: false}
let three = generator.next();
console.log(JSON.stringify(three)); // {value: 3, done: true}

// Generators are iterable
// As you probably already guessed looking at the next() method, generators are iterable.
// We can loop over their values using for..of:

for (let value of generator) {
  alert(value); // 1, then 2
}
// Looks a lot nicer than calling .next().value, right?
// …But please note: the example above shows 1, then 2, and that’s all. It doesn’t show 3!
// It’s because for..of iteration ignores the last value, when done: true. So, if we want all results to be shown by for..of, we must return them with yield:

function* generateSequence1() {
  yield 1;
  yield 2;
  yield 3;
}

let generator1 = generateSequence1();
for (let value of generator1) {
  alert(value); // 1, then 2, then 3
}

let sequence = [0, ...generateSequence()];
console.log(sequence); // 0, 1, 2, 3

// --------------------------------------------------
// Using generators for iterables
// Some time ago, in the chapter Iterables we created an iterable range object that returns values from..to.

// Here, let’s remember the code:

let range = {
  from: 1,
  to: 5,

  // for..of range calls this method once in the very beginning
  [Symbol.iterator]() {
    // ...it returns the iterator object:
    // onward, for..of works only with that object, asking it for next values
    return {
      current: this.from,
      last: this.to,

      // next() is called on each iteration by the for..of loop
      next() {
        // it should return the value as an object {done:.., value :...}
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      },
    };
  },
};

// iteration over range returns numbers from range.from to range.to
console.log([...range]); // 1,2,3,4,5
// We can use a generator function for iteration by providing it as Symbol.iterator.

// Here’s the same range, but much more compact:

let range1 = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() {
    // a shorthand for [Symbol.iterator]: function*()
    for (let value = this.from; value <= this.to; value++) {
      yield value;
    }
  },
};

console.log([...range1]); // 1,2,3,4,5
// That works, because range[Symbol.iterator]() now returns a generator, and generator methods are exactly what for..of expects:

// it has a .next() method
// that returns values in the form {value: ..., done: true/false}
// That’s not a coincidence, of course. Generators were added to JavaScript language with iterators in mind, to implement them easily.
// The variant with a generator is much more concise than the original iterable code of range, and keeps the same functionality.

// To much more about generator: https://javascript.info/generators#using-generators-for-iterables
