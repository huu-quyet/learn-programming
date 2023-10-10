// Async iteration and generators
// Asynchronous iteration allow us to iterate over data that comes asynchronously, on-demand. Like, for instance, when we download something chunk-by-chunk over a network. And asynchronous generators make it even more convenient.

// -----------------------------------
// Async iterables
// Asynchronous iteration is needed when values come asynchronously: after setTimeout or another kind of delay.
// The most common case is that the object needs to make a network request to deliver the next value, we’ll see a real-life example of it a bit later.
// To make an object iterable asynchronously:

//  1. Use Symbol.asyncIterator instead of Symbol.iterator.
//  2. The next() method should return a promise (to be fulfilled with the next value).
// The async keyword handles it, we can simply make async next().
//  3. To iterate over such an object, we should use a for await (let item of iterable) loop.
// Note the await word.

// As a starting example, let’s make an iterable range object, similar like the one before, but now it will return values asynchronously, one per second.
// All we need to do is to perform a few replacements in the code above:

let range = {
  from: 1,
  to: 5,

  [Symbol.asyncIterator]() {
    // (1)
    return {
      current: this.from,
      last: this.to,

      async next() {
        // (2)

        // note: we can use "await" inside the async next:
        await new Promise((resolve) => setTimeout(resolve, 1000)); // (3)

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      },
    };
  },
};

(async () => {
  for await (let value of range) {
    // (4)
    alert(value); // 1,2,3,4,5
  }
})();

// As we can see, the structure is similar to regular iterators:
//  1. To make an object asynchronously iterable, it must have a method Symbol.asyncIterator (1).
//  2. This method must return the object with next() method returning a promise (2).
//  3. The next() method doesn’t have to be async, it may be a regular method returning a promise, but async allows us to use await, so that’s convenient. Here we just delay for a second (3).
//  4. To iterate, we use for await(let value of range) (4), namely add “await” after “for”. It calls range[Symbol.asyncIterator]() once, and then its next() for values.

// Here’s a small table with the differences:
//                                      Iterators	                                Async iterators
// Object method to provide iterator    Symbol.iterator	                            Symbol.asyncIterator
// next() return value is	            any value	                                Promise
// to loop,                             use	for..of                         	    for await..of

// The spread syntax ... doesn’t work asynchronously
// alert( [...range] ); // Error, no Symbol.iterator

// --------------------------------------------
// Async generators (finally)
// For most practical applications, when we’d like to make an object that asynchronously generates a sequence of values, we can use an asynchronous generator.
// The syntax is simple: prepend function* with async. That makes the generator asynchronous.
// And then use for await (...) to iterate over it, like this:

async function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    // Wow, can use await!
    await new Promise((resolve) => setTimeout(resolve, 1000));

    yield i;
  }
}

(async () => {
  let generator = generateSequence(1, 5);
  for await (let value of generator) {
    alert(value); // 1, then 2, then 3, then 4, then 5 (with delay between)
  }
})();
// As the generator is asynchronous, we can use await inside it, rely on promises, perform network requests and so on.

// Under-the-hood difference
// Technically, if you’re an advanced reader who remembers the details about generators, there’s an internal difference.
// For async generators, the generator.next() method is asynchronous, it returns promises.
// In a regular generator we’d use result = generator.next() to get values. In an async generator, we should add await, like this:
// result = await generator.next(); // result = {value: ..., done: true/false}
// That’s why async generators work with for await...of.

//                                  Generators	                        Async generators
// Declaration	                    function*	                        async function*
// next() return value is	        {value:…, done: true/false}	        Promise that resolves to {value:…, done: true/false}
