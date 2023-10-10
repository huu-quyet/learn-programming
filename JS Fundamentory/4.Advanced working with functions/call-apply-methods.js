// Transparent caching
// Let’s say we have a function slow(x) which is CPU-heavy, but its results are stable. In other words, for the same x it always returns the same result.

// If the function is called often, we may want to cache (remember) the results to avoid spending extra-time on recalculations.

// But instead of adding that functionality into slow() we’ll create a wrapper function, that adds caching. As we’ll see, there are many benefits of doing so.

// Here’s the code, and explanations follow:

function slow(x) {
  // there can be a heavy CPU-intensive job here
  console.log(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function (x) {
    if (cache.has(x)) {
      // if there's such key in cache
      return cache.get(x); // read the result from it
    }

    let result = func(x); // otherwise call func

    cache.set(x, result); // and cache (remember) the result
    return result;
  };
}

slow = cachingDecorator(slow);

console.log(slow(1)); // slow(1) is cached and the result returned
console.log("Again: " + slow(1)); // slow(1) result returned from cache

console.log(slow(2)); // slow(2) is cached and the result returned
console.log("Again: " + slow(2)); // slow(2) result returned from cache
// In the code above cachingDecorator is a decorator: a special function that takes another function and alters its behavior.

// The idea is that we can call cachingDecorator for any function, and it will return the caching wrapper. That’s great, because we can have many functions that could use such a feature, and all we need to do is to apply cachingDecorator to them.

// By separating caching from the main function code we also keep the main code simpler.

// To summarize, there are several benefits of using a separate cachingDecorator instead of altering the code of slow itself:

// The cachingDecorator is reusable. We can apply it to another function.
// The caching logic is separate, it did not increase the complexity of slow itself (if there was any).
// We can combine multiple decorators if needed (other decorators will follow).

// ----------------------------------------------------
// Using “func.call” for the context
// The caching decorator mentioned above is not suited to work with object methods.
// method call(context, …args) that allows to call a function explicitly setting this.
function sayHi() {
  alert(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// use call to pass different objects as "this"
sayHi.call(user); // John
sayHi.call(admin); // Admin

// ----------------------------------------------------
// func.apply(context, args);
// It runs the func setting this=context and using an array-like object args as the list of arguments.
// The only syntax difference between call and apply is that call expects a list of arguments, while apply takes an array-like object with them.

// So these two calls are almost equivalent:

func.call(context, ...args);
func.apply(context, args);
// They perform the same call of func with given context and arguments.

// There’s only a subtle difference regarding args:

// The spread syntax ... allows to pass iterable args as the list to call.
// The apply accepts only array-like args.
// …And for objects that are both iterable and array-like, such as a real array, we can use any of them, but apply will probably be faster, because most JavaScript engines internally optimize it better.

// Passing all arguments along with the context to another function is called call forwarding.

// That’s the simplest form of it:

let wrapper = function () {
  return func.apply(this, arguments);
};

// -----------------------------------------------------
// Borrowing a method
function hash() {
  console.log(arguments.join()); // Error: arguments.join is not a function
}

hash(1, 2);
//   Still, there’s an easy way to use array join:

function hash() {
  console.log([].join.call(arguments)); // 1,2
}

hash(1, 2);
//   The trick is called method borrowing.

//   We take (borrow) a join method from a regular array ([].join) and use [].join.call to run it in the context of arguments.
