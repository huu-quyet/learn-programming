// In Javascript we can only inherit from a single object. There can be only one [[Prototype]] from an object. And class may extend only one other class
// A mixins is a class containing methods that can ve used by other classes without a need to inherit from it (Wikipedia)
// In other words, a mixin provides methods that implement a certain behavior, but we do not use it alone, we use it to add the behavior to other classes

// Example:
// The simple way to implement a mixin in JS is to make an object with useful methods, so that we can easily merge them into a prototype of any class.
let sayMixin = {
  say(phrase) {
    console.log(phrase);
  },
};

let sayHiMixin = {
  __proto__: sayMixin, // (or we could use Object.setPrototypeOf to set the prototype here)

  sayHi() {
    // call parent method
    super.say(`Hello ${this.name}`); // (*)
  },
  sayBye() {
    super.say(`Bye ${this.name}`); // (*)
  },
};

class User {
  constructor(name) {
    this.name = name;
  }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!

// There’s no inheritance, but a simple method copying. So User may inherit from another class and also include the mixin to “mix-in” the additional methods,
