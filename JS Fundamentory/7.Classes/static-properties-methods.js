// We can also assign a method to the class as a whole. Such methods are called static.
// Static method is a method belong to a whole class, but not to any particular object of it. Sometime, it would be so called "factory" method.

class User {
  static today() {
    return new Date();
  }
}

const today = User.today();
console.log(today);

// Static properties
class Person {
  static age = 25;
  constructor(country) {
    this.country = country;
  }
  static today() {
    return new Date();
  }
}

console.log(Person.age);

// Inheritance of static properties and methods
class AsiaPerson extends Person {
  showCountry() {
    console.log(this.country);
  }
}

const vietnamese = new AsiaPerson("Viet Nam");
vietnamese.showCountry();
console.log(AsiaPerson.today());
console.log(AsiaPerson.__proto__ === Person);
console.log(AsiaPerson.prototype.__proto__ === Person.prototype);
