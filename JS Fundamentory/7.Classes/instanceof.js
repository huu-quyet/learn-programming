// The instanceof operator allows to check whether an object belongs to a certain class. It also takes inheritance into account.

// The syntax is: obj instanceof Class
// It returns true if obj belongs to the Class or a class inheriting from it.

// For instance:

class Rabbit {}
let rabbit = new Rabbit();

// is it an object of Rabbit class?
console.log(rabbit instanceof Rabbit); // true

// …And with built-in classes like Array:

let arr = [1, 2, 3];
console.log(arr instanceof Array); // true
console.log(arr instanceof Object); // true

// Please note that arr also belongs to the Object class. That’s because Array prototypically inherits from Object.
// Normally, instanceof examines the prototype chain for the check. We can also set a custom logic in the static method Symbol.hasInstance.
// For example:

// setup instanceOf check that assumes that
// anything with canEat property is an animal
class Animal {
  static [Symbol.hasInstance](obj) {
    if (obj.canEat) return true;
  }
}
let obj = { canEat: true };
console.log(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) is called

// Most classes do not have Symbol.hasInstance. In this case, the standard logic is used: obj instanceOf Class checks whether Class.prototype is equal to one of the prototypes in the obj prototype chain:
// obj.__proto__ === Class.prototype?
// obj.__proto__.__proto__ === Class.prototype?
// obj.__proto__.__proto__.__proto__ === Class.prototype?
// ...
// if any answer is true, return true
// otherwise, if we reached the end of the chain, return false
