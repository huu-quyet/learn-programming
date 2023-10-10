// Property flags
// Object properties, besides a value, have three special attributes (so-called “flags”):

//  - writable – if true, the value can be changed, otherwise it’s read-only.
//  - enumerable – if true, then listed in loops, otherwise not listed.
//  - configurable – if true, the property can be deleted and these attributes can be modified, otherwise not.

// We didn’t see them yet, because generally they do not show up. When we create a property “the usual way”, all of them are true. But we also can change them anytime.
// First, let’s see how to get those flags.

// The method Object.getOwnPropertyDescriptor allows to query the full information about a property.

// The syntax is: let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
// - obj
// The object to get information from.
// - propertyName
// The name of the property.
// The returned value is a so-called “property descriptor” object: it contains the value and all the flags.

// For instance:

let user = {
  name: "John",
};

let descriptor = Object.getOwnPropertyDescriptor(user, "name");
console.log(JSON.stringify(descriptor, null, 2));
/* property descriptor:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/

// To change the flags, we can use Object.defineProperty.

// The syntax is: Object.defineProperty(obj, propertyName, descriptor)
// - obj, propertyName
// The object and its property to apply the descriptor.
// - descriptor
// Property descriptor object to apply.
// If the property exists, defineProperty updates its flags. Otherwise, it creates the property with the given value and flags; in that case, if a flag is not supplied, it is assumed false.
Object.defineProperty(user, "name", {
  value: "Sara",
  configurable: false,
});
console.log(
  JSON.stringify(Object.getOwnPropertyDescriptor(user, "name"), null, 2)
);
/*
{
  "value": "Sara",
  "writable": true,
  "enumerable": true,
  "configurable": false
}
 */

// -------------------------------
// Object.defineProperties
// There’s a method Object.defineProperties(obj, descriptors) that allows to define many properties at once.

// The syntax is:

// Object.defineProperties(obj, {
//   prop1: descriptor1,
//   prop2: descriptor2
//   // ...
// });
// For instance:

Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});

// ---------------------------------
// Object.getOwnPropertyDescriptors
// To get all property descriptors at once, we can use the method Object.getOwnPropertyDescriptors(obj).

// Together with Object.defineProperties it can be used as a “flags-aware” way of cloning an object:

// let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
// Normally when we clone an object, we use an assignment to copy properties, like this:

// for (let key in user) {
//   clone[key] = user[key]
// }
// …But that does not copy flags. So if we want a “better” clone then Object.defineProperties is preferred.

// Another difference is that for..in ignores symbolic and non-enumerable properties, but Object.getOwnPropertyDescriptors returns all property descriptors including symbolic and non-enumerable ones.

Object.preventExtensions(user);
// Forbids the addition of new properties to the object.
Object.seal(user);
// Forbids adding/removing of properties. Sets configurable: false for all existing properties.
Object.freeze(user);
// Forbids adding/removing/changing of properties. Sets configurable: false, writable: false for all existing properties.
// And also there are tests for them:

Object.isExtensible(user);
// Returns false if adding properties is forbidden, otherwise true.
Object.isSealed(user);
// Returns true if adding/removing properties is forbidden, and all existing properties have configurable: false.
Object.isFrozen(user);
// Returns true if adding/removing/changing properties is forbidden, and all current properties are configurable: false, writable: false.
