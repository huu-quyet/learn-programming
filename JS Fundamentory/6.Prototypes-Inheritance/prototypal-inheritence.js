// Sometime, you want to take something and extend it. Example: we have a object with its properties and methods, you want to reuse that properties and methods, not copy/reimplement its methods, just build a new object on top of it.
// Javascript language have a feature called Prototypal inheritance which help us can do that.

// [[Prototype]]
// In Javascript, objects have a special hidden property [[Prototype]], that is null or reference another object. That object is called a prototype.
//      prototype object
//          |
//          | [[Prototype]]
//          |
//      object

// When we read a property or method form object, and it is missing. Javascript automatically takes it from the prototype. In programming, that is called "prototypal inheritance".

// We can set property to [[Prototype]] by using __proto__:
let animal = {
  eats: true,
};
let rabbit = {
  jumps: true,
};

rabbit.__proto__ = animal; // sets rabbit.[[Prototype]] = animal
// Now if we read a property from rabbit, and it is missing. Javascript will automatically take it from animal.
// we can find both properties in rabbit now:
console.log(rabbit.eats); // true
console.log(rabbit.jumps); // true
// If we have a method in animal, it can be called on rabbit:

let animal1 = {
  eats: true,
  walk() {
    console.log("Animal walk");
  },
};

let rabbit1 = {
  jumps: true,
  __proto__: animal1,
};

// walk is taken from the prototype
rabbit1.walk(); // Animal walk

// --------------------------------------
// Prototype chain
let animal2 = {
  eats: true,
  walk() {
    console.log("Animal walk");
  },
};

let rabbit2 = {
  jumps: true,
  __proto__: animal2,
};

let longEar = {
  earLength: 10,
  __proto__: rabbit2,
};

// walk is taken from the prototype chain
longEar.walk(); // Animal walk
console.log(longEar.jumps); // true (from rabbit)
//  animal:     walk: function
//              animal
//              ^
//              |
//              |[[Prototype]]
//              |
//  rabbit:     jumps: true
//              ^
//              |
//              |[[Prototype]]
//              |
//  longEar:    earLength: 10

// Now if we read something from longEar, and it’s missing, JavaScript will look for it in rabbit, and then in animal.
// There are only two limitations:
//  - The references can’t go in circles. JavaScript will throw an error if we try to assign __proto__ in a circle.
//  - The value of __proto__ can be either an object or null. Other types are ignored.
// Also it may be obvious, but still: there can be only one [[Prototype]]. An object may not inherit from two others.

// Note:
// __proto__ is a historical getter/setter for [[Prototype]]
// It’s a common mistake of novice developers not to know the difference between these two.

// Please note that __proto__ is not the same as the internal [[Prototype]] property. It’s a getter/setter for [[Prototype]]. Later we’ll see situations where it matters, for now let’s just keep it in mind, as we build our understanding of JavaScript language.

// The __proto__ property is a bit outdated. It exists for historical reasons, modern JavaScript suggests that we should use Object.getPrototypeOf/Object.setPrototypeOf functions instead that get/set the prototype. We’ll also cover these functions later.

// By the specification, __proto__ must only be supported by browsers. In fact though, all environments including server-side support __proto__, so we’re quite safe using it.

// As the __proto__ notation is a bit more intuitively obvious, we use it in the examples.

// -----------------------------------------
// The values of "this"
// This in each method call would be the corresponding object, evaluated at the call time. So when we write data into "this", it is stored into these objects.
// As a result, methods are shared, but the objects state is not

// -----------------------------------------
// for..in loop
// the for..in loop iterates over inherited properties too.
let animal3 = {
  eats: true,
};

let rabbit3 = {
  jumps: true,
  __proto__: animal3,
};

for (let prop in rabbit3) {
  let isOwn = rabbit3.hasOwnProperty(prop);

  if (isOwn) {
    console.log(`Our: ${prop}`); // Our: jumps
  } else {
    console.log(`Inherited: ${prop}`); // Inherited: eats
  }
}

// Object.hasOwnProperty(key) it return true if Object has its own (not inherited) property named "key"

//                              null
//                              ^
//                              |
//                              |[[Prototype]]
//                              |
//  Object.prototype:     toString: function
//                        hasOwnProperty: function
//                              ...
//                              ^
//                              |
//                              |[[Prototype]]
//                              |
//  animal:                 eats: true
//                              ^
//                              |
//                              |[[Prototype]]
//                              |
//  rabbit:                 jumps: true

// Looking at the prototype chain we can see that rabbit.hasOwnProperty() - hasOwnProperty() method is provided by Object.prototype
// But why for..in loop does not show hasOwnProperty like "eats" and "jumps" do, if for..in lists inherited properties?
// Because: it is not enumerable. Just like all other properties of Object.prototype, it has enumerable: false flag. And for..in only lists enumerable properties. That’s why it and the rest of the Object.prototype properties are not listed.

// Almost all other key/value-getting methods, such as Object.keys, Object.values and so on ignore inherited properties.
// They only operate on the object itself. Properties from the prototype are not taken into account.

// --------------------------------------------
// With new F()
// Remember, new objects can be created with a constructor function, like new F().
// If F.prototype is an object, then the new operator uses it to set [[Prototype]] for the new object.
// Note:
// JavaScript had prototypal inheritance from the beginning. It was one of the core features of the language.
// But in the old times, there was no direct access to it. The only thing that worked reliably was a "prototype" property of the constructor function, described in this chapter. So there are many scripts that still use it.
let animal4 = {
  eats: true,
};

function Rabbit(name) {
  this.name = name;
}

let rabbit4 = new Rabbit("White Rabbit");
console.log(rabbit4.__proto__);

Rabbit.prototype = animal4;
let rabbit5 = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal4
console.log(rabbit5.eats); // true

console.log(rabbit5.__proto__);
console.log(animal4 === rabbit5.__proto__); // true
console.log(animal4 == rabbit5.__proto__); // true
console.log(animal4.__proto__); // [Object: null prototype] {}

// Setting Rabbit.prototype = animal4 literally states the following: "When a new Rabbit is created, assign its [[Prototype]] to animal4".
// F.prototype only used at new F time
// F.prototype property is only used when new F is called, it assigns [[Prototype]] of the new object.

// If, after the creation, F.prototype property changes (F.prototype = <another object>), then new objects created by new F will have another object as [[Prototype]], but already existing objects keep the old one.
let animal5 = {
  eats: false,
};
Rabbit.prototype = animal5;
let rabbit6 = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal5
console.log(rabbit6.eats); // false
console.log(rabbit5.eats); // true

// ------------------------------------------------
// Default F.prototype, constructor property
// Every function has the "prototype" property even if we don’t supply it.
// The default "prototype" is an object with the only property constructor that points back to the function itself.
// Like this:

function Rabbit1() {}
/* default prototype
Rabbit1.prototype = { constructor: Rabbit1 };
*/
console.log(Rabbit1.prototype.constructor == Rabbit1); // true

let rabbit7 = new Rabbit1(); // inherits from {constructor: Rabbit1}
console.log(rabbit7.constructor == Rabbit1); // true (from prototype)

// But if we change default property, then there will be no "constructor" in it.
function Rabbit2() {}
Rabbit2.prototype = {
  jumps: true,
};

let rabbit8 = new Rabbit2();
console.log(rabbit8.constructor === Rabbit2); // false

// So to keep the right "constructor" we can choose add/remove properties to the default "prototype" instead of overwriting it.
function Rabbit3() {}
// Not overwrite Rabbit3.prototype totally
// just add to it
Rabbit3.prototype.jumps = true;
// the default Rabbit3.prototype.constructor is preserved

// Alternatively, recreate the constructor property manually:
Rabbit3.prototype = {
  jumps: true,
  constructor: Rabbit3,
};
