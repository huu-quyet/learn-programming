// Promise.all
// Sometime we want many promises to execute in parallel and wait until all of them are ready. That is what Promise.all is coming
// Syntax: let promise = Promise.all(iterable)
// The new promise resolves when all listed promises are resolved, and the array of their results becomes its result.

// For instance, the Promise.all below settles after 3 seconds, and then its result is an array [1, 2, 3]:

Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
]).then((res) => {
  console.log(res); // // 1,2,3 when promises are ready: each promise contributes an array member
});

// Please note that the order of the resulting array members is the same as in its source promises. Even though the first promise takes the longest time to resolve, it’s still first in the array of results.
// A common trick is to map an array of job data into an array of promises, and then wrap that into Promise.all
// If any of the promises is rejected, the promise returned by Promise.all immediately rejects with that error. The others still continue to execute, but Promise.all will not watch them anymore. They will probably settle, but their results will be ignored. Promise.all does nothing to cancel them.
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).catch(alert); // Error: Whoops!

// Promise.allSettled
// Promise.all rejects as a whole if any promise rejects. That's good for "all or nothing" cases, when we need all results successful to proceed
// Promise.allSettled just waits for all promises to settle, regardless of the result. The resulting array has:
//  - {status:"fulfilled", value:result} for successful responses,
//  - {status:"rejected", reason:error} for errors.
let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://no-such-url",
];

Promise.allSettled(urls.map((url) => fetch(url))).then((results) => {
  // (*)
  results.forEach((result, num) => {
    if (result.status == "fulfilled") {
      alert(`${urls[num]}: ${result.value.status}`);
    }
    if (result.status == "rejected") {
      alert(`${urls[num]}: ${result.reason}`);
    }
  });
});
//   The results in the line (*) above will be:

//   [
//     {status: 'fulfilled', value: ...response...},
//     {status: 'fulfilled', value: ...response...},
//     {status: 'rejected', reason: ...error object...}
//   ]

// --------------------------------------------------------
// Promise.race
// Similar to Promise.all, but waits only for the first settled promise and gets its result (or error).
// The syntax is:
// let promise = Promise.race(iterable);
// For instance, here the result will be 1:

Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(alert); // 1
// The first promise here was fastest, so it became the result. After the first settled promise “wins the race”, all further results/errors are ignored.

// -------------------------------------------------------------
// Promise.any
// Similar to Promise.race, but waits only for the first fulfilled promise and gets its result. If all of the given promises are rejected, then the returned promise is rejected with AggregateError – a special error object that stores all promise errors in its errors property.
// The syntax is:
// let promise = Promise.any(iterable);
// For instance, here the result will be 1:

Promise.any([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 1000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(alert); // 1

// The first promise here was fastest, but it was rejected, so the second promise became the result. After the first fulfilled promise “wins the race”, all further results are ignored.
// Here’s an example when all promises fail:

Promise.any([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Ouch!")), 1000)
  ),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Error!")), 2000)
  ),
]).catch((error) => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error!
});
