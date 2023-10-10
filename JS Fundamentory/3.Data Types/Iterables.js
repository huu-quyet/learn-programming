// Iterable objects are a generalization of arrays. That’s a concept that allows us to make any object useable in a for..of loop.

// Of course, Arrays are iterable. But there are many other built-in objects, that are iterable as well. For instance, strings are also iterable.

// If an object isn’t technically an array, but represents a collection (list, set) of something, then for..of is a great syntax to loop over it, so let’s see how to make it work.

// -------------------------------------
// Symbol.iterator
// We have an object that is not an array but looks suitable for for...of
let range = {
  from: 1,
  to: 5,
};

// We want the for..of to work:
// for(let num of range) ... num=1,2,3,4,5
// to make range object iterable and thus let for...of work we need to add a method to the object named Symbol.iterator
//  1. When for...of work starts, it calls that method once. The method must return an iterator- an object with method next().
//  2. Onward(trở đi, về sau), for...of works only with that return object.
//  3. When for..of wants the next value, it calls next() on that object.
//  4. The result of next() must have the form {done: Boolean, value: any}, where done=true means that the loop is finished, otherwise value is the next value.

// 1. call to for..of initially calls this
range[Symbol.iterator] = function () {
  // ...it returns the iterator object:
  // 2. Onward, for..of works only with the iterator object below, asking it for next values
  return {
    current: this.from,
    last: this.to,

    // 3. next() is called on each iteration by the for..of loop
    next() {
      // 4. it should return the value as an object {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    },
  };
};

// now it works!
for (let num of range) {
  console.log(num); // 1, then 2, 3, 4, 5
}

// Please note the core feature of iterables: separation of concerns.

// The range itself does not have the next() method.
// Instead, another object, a so-called “iterator” is created by the call to range[Symbol.iterator](), and its next() generates values for the iteration.

let range1 = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  },
};

for (let num of range1) {
  console.log(num); // 1, then 2, 3, 4, 5
}

// -----------------------
// String is iterable
// Arrays and strings are most widely used built-in iterables.

// For a string, for..of loops over its characters:

for (let char of "test") {
  // triggers 4 times: once for each character
  alert(char); // t, then e, then s, then t
}
