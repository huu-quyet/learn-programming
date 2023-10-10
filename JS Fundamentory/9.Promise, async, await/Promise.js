// Promise is a special Javascript object, that contains the promised result which is done in the future, and make the result available to all the subscribed code when it is ready.
// Syntax:
let promise = new Promise(function (resolve, reject) {
  // executor (the producing code, "singer")
});

// The function passed to new Promise is called the executor. When new Promise is created, executor runs automatically. When it is finished with the attempt, it call resolve if it was successful or reject if there was an error.
// The promise object returned by the new Promise constructor has these internal properties:

//  - state — initially "pending", then changes to either "fulfilled" when resolve is called or "rejected" when reject is called.
//  - result — initially undefined, then changes to value when resolve(value) is called or error when reject(error) is called.
// A promise that is either resolved or rejected is called "settled", as opposed to an initially "pending" promise.
// The properties state and result of the Promise object are internal. We can’t directly access them. We can use the methods .then/.catch/.finally for that.

// then
// The syntax is:

promise.then(
  function (result) {
    /* handle a successful result */
  },
  function (error) {
    /* handle an error */
  }
);
// The first argument of .then is a function that runs when the promise is resolved and receives the result.
// The second argument of .then is a function that runs when the promise is rejected and receives the error.

// catch
// If we’re interested only in errors, then we can use null as the first argument: .then(null, errorHandlingFunction). Or we can use .catch(errorHandlingFunction), which is exactly the same:

// .catch(f) is the same as promise.then(null, f)
promise.catch(alert); // shows "Error: Whoops!" after 1 second
// The call .catch(f) is a complete analog of .then(null, f), it’s just a shorthand.

// Cleanup: finally
// Just like there’s a finally clause in a regular try {...} catch {...}, there’s finally in promises.

// The call .finally(f) is similar to .then(f, f) in the sense that f runs always, when the promise is settled: be it resolve or reject.

// The idea of finally is to set up a handler for performing cleanup/finalizing after the previous operations are complete.
new Promise((resolve, reject) => {
  /* do something that takes time, and then call resolve or maybe reject */
})
  // runs when the promise is settled, doesn't matter successfully or not
  .finally(() => {}) // stop loading indicator
  // so the loading indicator is always stopped before we go on
  .then(
    (result) => {
      console.log(result);
    },
    (err) => {
      console.log(err);
    }
  );
//  -  A finally handler doesn’t get the outcome of the previous handler (it has no arguments). This outcome is passed through instead, to the next suitable handler.
//  -  If a finally handler returns something, it’s ignored.
//  - When finally throws an error, then the execution goes to the nearest error handler.
