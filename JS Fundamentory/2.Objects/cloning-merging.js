// Cloning object

//1. Use for ... in loop
let user = {
  name: "John",
  age: 30,
};

let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}

// now clone is a fully independent object with the same content
clone.name = "Pete"; // changed the data in it

console.log(user.name); // still John in the original object

//2. Object.assign(dest, ...source)
let user1 = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// copies all properties from permissions1 and permissions2 into user1
Object.assign(user1, permissions1, permissions2);

// now user = { name: "John", canView: true, canEdit: true }
console.log(user1.name); // John
console.log(user1.canView); // true
console.log(user1.canEdit); // true

// If the copied property name already exists, it gets overwritten:

let user2 = { name: "John" };
Object.assign(user2, { name: "Pete" });

console.log(user2.name); // now user = { name: "Pete" }

//3. Use spread syntax

let clone = { ...user };

// --------------------------------------------
//Nested cloning
// If property in object is another object, when you copy it will copy object reference of the property
// To fix that we should use a cloning loop that examines each value of property and if it is a object, then replicate its structure as well. That is called "deep cloning" or "structured cloning"

structuredClone;
// The call structuredClone(object) clones the object with all nested properties.
// Here’s how we can use it in our example:

let user3 = {
  name: "John",
  sizes: {
    height: 182,
    width: 50,
  },
};

let clone = structuredClone(user3);

console.log(user3.sizes === clone.sizes); // false, different objects

// user3 and clone are totally unrelated now
user3.sizes.width = 60; // change a property from one place
console.log(clone.sizes.width); // 50, not related
// The structuredClone method can clone most data types, such as objects, arrays, primitive values.

// It also supports circular references, when an object property references the object itself (directly or via a chain or references).

// For instance:

let user4 = {};
// let's create a circular reference:
// user.me references the user itself
user4.me = user4;

let clone = structuredClone(user4);
console.log(clone.me === clone); // true
// As you can see, clone.me references the clone, not the user! So the circular reference was cloned correctly as well.

// Although, there are cases when structuredClone fails.

// For instance, when an object has a function property:

// error
structuredClone({
  f: function () {},
});
// Function properties aren’t supported.

// To handle such complex cases we may need to use a combination of cloning methods, write custom code or, to not reinvent the wheel, take an existing implementation, for instance _.cloneDeep(obj) from the JavaScript library lodash.
