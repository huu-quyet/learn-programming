// Class inheritance is a way for one class to extend another class.
// So we can create new functionality on top of the existing.

// The "extends" keyword
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    console.log(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    console.log(`${this.name} stands still.`);
  }
}

let animal = new Animal("My animal");

class Rabbit extends Animal {
  hide() {
    console.log(`${this.name} hides!`);
  }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide(); // White Rabbit hides!

// Object of Rabbit class have access both to Rabbit methods, such as rabbit.hide(), and also to Animal methods, such as rabbit.run().
// Internally, extends keyword works using the good old prototype mechanics. It sets Rabbit.prototype.[[Prototype]] to Animal.prototype. So, if a method is not found in Rabbit.prototype, JavaScript takes it from Animal.prototype.

// --------------------------------------------------
// Overriding a method
// Classes provide "super" keyword for that.

// super.method(...) to call a parent method.
// super(...) to call a parent constructor (inside our constructor only).
// For instance, let our rabbit auto hide when stopped:

class Animal1 {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed = speed;
    console.log(`${this.name} runs with speed ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
    console.log(`${this.name} stands still.`);
  }
}

class Rabbit1 extends Animal1 {
  hide() {
    console.log(`${this.name} hides!`);
  }

  stop() {
    super.stop(); // call parent stop
    this.hide(); // and then hide
  }
}

let rabbit1 = new Rabbit1("White Rabbit");

rabbit1.run(5); // White Rabbit runs with speed 5.
rabbit1.stop(); // White Rabbit stands still. White Rabbit hides!
// Now Rabbit has the stop method that calls the parent super.stop() in the process.

// Arrow functions have no super
// As was mentioned in the chapter Arrow functions revisited, arrow functions do not have super.

// If accessed, it’s taken from the outer function. For instance:

class Rabbit2 extends Animal1 {
  stop() {
    setTimeout(() => super.stop(), 1000); // call parent stop after 1sec
  }
}
// The super in the arrow function is the same as in stop(), so it works as intended. If we specified a “regular” function here, there would be an error:

let rabbit2 = new Rabbit2("White Rabbit");
rabbit2.stop(); //  White Rabbit stands still.

// Unexpected super
// setTimeout(function() { super.stop() }, 1000);

// -----------------------------------------------------
// Overriding constructor
// If a class extends another class and has no constructor, then the following "empty" constructor is generated
class Rabbit3 extends Animal1 {
  // generated for extending classes without own constructors
  constructor(...args) {
    super(...args);
  }
}

// But, we have problem when add a custom constructor
class Rabbit4 extends Animal1 {
  constructor(name, earLength) {
    this.name = name;
    this.speed = this.speed;
    this.earLength = earLength;
  }
}
// let rabbit3 = new Rabbit4("Rabbit", 100); // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor

// OOPS! We get an error. What went wrong?
// In Javascript, there is a difference between a constructor function of an inheriting class (so call "derived constructor") and other functions. A derived constructor has a special internal property [[ConstructorKind]]: "derived". That is a special internal label.
// That label affects to the behavior of "new" keyword:
//  - When a regular function is executed with new, it creates an empty object and assign it to this.
//  - But when a derived constructor runs, it doesn't do this. It expects the parent constructor do this job.
// ---> So a derived constructor must call super(...) in order to executes its parent (base) constructor, otherwise the object for this will not be created. And we will get an error.
class Rabbit5 extends Animal1 {
  constructor(name, earLength) {
    super(name);
    this.earLength = earLength;
  }
}
let rabbit5 = new Rabbit5("White Rabbit", 10);
console.log(rabbit5.name); // White Rabbit
console.log(rabbit5.speed); // 0
console.log(rabbit5.earLength); // 10

let rabbit6 = new Rabbit5("Black Rabbit", 20);
console.log(rabbit6.name); // Black Rabbit
console.log(rabbit6.speed); // 0
console.log(rabbit6.earLength); // 20

console.log(rabbit6.constructor === rabbit5.constructor); // true
console.log(rabbit6.prototype === rabbit5.prototype); // true

// ----------------------------------------
// Overriding class fields
console.log("-----------------------------------");
class Animal2 {
  name = "animal";
  sex = "male";
  showName() {
    console.log("animal");
  }

  constructor() {
    this.showName(); // rabbit
    console.log("Animal:", this);
    this.sayHi();
  }
}

class Rabbit6 extends Animal2 {
  name = "rabbit";
  weight = 2;
  constructor() {
    console.log("------Before super() is called---------");
    super();
    console.log(this.name);
    console.log(this.weight);
    console.log("------After super() is called---------");
    console.log("Rabbit:", this);
    this.showName();
  }
  showName() {
    console.log("rabbit:", this);
  }
  sayHi() {
    console.log("hi");
  }
}

new Rabbit6(); // rabbit - animal

// The order logging is:
//  1.  ------Before super() is called---------
//  2.  rabbit: Rabbit6 { name: 'animal', sex: 'male' }
//  3.  Animal: Rabbit6 { name: 'animal', sex: 'male' }
//  4.  ------After super() is called---------
//  5.  Rabbit: Rabbit6 { name: 'rabbit', sex: 'male', weight: 2 }

// In example above, the output is different. When the parent constructor is called in derived class:
//  - The parent constructor always uses its own field value, not the override one
//  - The parent constructor uses the overridden method
// Why is there a difference?
// The reason is the field initialization order. The class field is initialized before constructor for the base class, immediately after super() for derived class.

// In our case , Rabbit is the derived class.
//  1. Rabbit6 constructor is called when new Rabbit6() -> log: ------Before super() is called---------
//  2. Thus Animal2 constructor is called (because of super()) -> log: rabbit: Rabbit6 { name: 'animal', sex: 'male' } and Animal: Rabbit6 { name: 'animal', sex: 'male' }
// But why Animal2 call showName() function overridden. Because all methods are populated to Animal2 class (overridden methods and new methods) that is why it call showName() function that is overridden and new method sayHi(). All class fields are still old in this case, it is not overridden.
//  3. After parent constructor call, Rabbit2 constructor continues executing ---> log: ------After super() is called--------- and Rabbit: Rabbit6 { name: 'rabbit', sex: 'male', weight: 2 }. But now, this's value is updated because all class fields are initialized immediately after super() call.
