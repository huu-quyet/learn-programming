// Getters and setters
// Accessor properties are represented by “getter” and “setter” methods. In an object literal they are denoted by get and set:

let obj = {
  get propName() {
    // getter, the code executed on getting obj.propName
  },

  set propName(value) {
    // setter, the code executed on setting obj.propName = value
  },
};

let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },
};

console.log(user.fullName); // John Smith
user.fullName = "Alice Cooper";

console.log(user.name); // Alice
console.log(user.surname); // Cooper

// --------------------------------------------------
// Accessor descriptors
// Descriptors for accessor properties are different from those for data properties.

// For accessor properties, there is no value or writable, but instead there are get and set functions.

// That is, an accessor descriptor may have:

// get – a function without arguments, that works when a property is read,
// set – a function with one argument, that is called when the property is set,
// enumerable – same as for data properties,
// configurable – same as for data properties.
// For instance, to create an accessor fullName with defineProperty, we can pass a descriptor with get and set:

let user = {
  name: "John",
  surname: "Smith",
};

Object.defineProperty(user, "fullName", {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  },
});

console.log(user.fullName); // John Smith

for (let key in user) console.log(key); // name, surname
// Please note that a property can be either an accessor (has get/set methods) or a data property (has a value), not both.

// If we try to supply both get and value in the same descriptor, there will be an error:

// Error: Invalid property descriptor.
Object.defineProperty({}, "prop", {
  get() {
    return 1;
  },

  value: 2,
});
