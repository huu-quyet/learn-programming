// Setting or reading the prototype with obj.__proto__ is considered outdated and somewhat deprecated
// The modern methods to get/set a prototype are:

// Object.getPrototypeOf(obj) – returns the [[Prototype]] of obj.
// Object.setPrototypeOf(obj, proto) – sets the [[Prototype]] of obj to proto.
// Object.create(proto, [descriptors]) – creates an empty object with given proto as [[Prototype]] and optional property descriptors.
let animal = {
  eats: true,
};

// create a new object with animal as a prototype
let rabbit = Object.create(animal, {
  jumps: {
    value: true,
    configurable: true,
    enumerable: true,
    writable: true,
  },
}); // same as {__proto__: animal}

console.log(rabbit.eats); // true
console.log(rabbit.jumps); // true

console.log(Object.getPrototypeOf(rabbit) === animal); // true

Object.setPrototypeOf(rabbit, {}); // change the prototype of rabbit to {}

// The Object.create provides an easy way to shallow-copy an object with all descriptors:
let clone = Object.create(
  Object.getPrototypeOf(rabbit),
  Object.getOwnPropertyDescriptors(rabbit)
);

console.log(clone);
