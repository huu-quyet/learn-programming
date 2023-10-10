//The optional chaining ?. stops the evaluation if the value before ?. is undefined or null and returns undefined.
// Further in this article, for brevity, we’ll be saying that something “exists” if it’s not null and not undefined.
let user = {}; // user has no address

console.log(user?.address?.street); // undefined (no error)

// The optional chaining ?. is not an operator, but a special syntax construct, that also works with functions and square brackets.

// For example, ?.() is used to call a function that may not exist.

// In the code below, some of our users have admin method, and some don’t:
let userAdmin = {
  admin() {
    console.log("I am admin");
  },
};

let userGuest = {};

userAdmin.admin?.(); // I am admin

userGuest.admin?.(); // nothing happens (no such method)
// Here, in both lines we first use the dot (userAdmin.admin) to get admin property, because we assume that the user object exists, so it’s safe read from it.

// Then ?.() checks the left part: if the admin function exists, then it runs (that’s so for userAdmin). Otherwise (for userGuest) the evaluation stops without errors.

//The ?.[] syntax also works, if we’d like to use brackets [] to access properties instead of dot .. Similar to previous cases, it allows to safely read a property from an object that may not exist.
let key = "firstName";

let user1 = {
  firstName: "John",
};

let user2 = null;

console.log(user1?.[key]); // John
console.log(user2?.[key]); // undefined

//Also we can use ?. with delete:
delete user?.name; // delete user.name if user exists

//We can use ?. for safe reading and deleting, but not writing
// The optional chaining ?. has no use on the left side of an assignment.
