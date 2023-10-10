// In object-oriented programming, properties and methods are split into two groups:
//  1. Internal interface - methods and properties, accessible from other methods of the class, but not from outside
//  2. External interface - methods and properties, accessible also from outside the class.

// In JavaScript, there are two types of object fields (properties and methods):
//  1. Public: accessible from anywhere. They comprise the external interface. Until now we were only using public properties and methods.
//  2. Private: accessible only from inside the class. These are for the internal interface.

// --------------------------------------------
// Protected properties and methods
// Protected properties are usually prefixed with an underscore "_". That is not enforced on the language level but there is a well-know convention between programmers that such properties and methods should not be accessed from the outside
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) {
      value = 0;
    }
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }
}

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

// add water
coffeeMachine.waterAmount = -10; // _waterAmount will become 0, not -10

// Sometime, your property must be set at creation time and only, and then never modified.
class CoffeeMachine {
  // ...

  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power;
  }
}

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

alert(`Power is: ${coffeeMachine.power}W`); // Power is: 100W

coffeeMachine.power = 25; // Error (no setter)

// and now, we can use getter/setter to read or modify necessary

// protected fields are inherited. If we inherit class MegaMachine extends CoffeeMachine, then nothing prevents us from accessing this._waterAmount or this._power from the methods of the new class

// -----------------------------------------------------------
// Private properties and methods
// Privates should start with #. They are only accessible from inside the class.
class CoffeeMachine {
  #waterLimit = 200;

  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
  }

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value);
  }
}

let coffeeMachine = new CoffeeMachine();

// can't access privates from outside of the class
coffeeMachine.#fixWaterAmount(123); // Error
coffeeMachine.#waterLimit = 1000; // Error

// # is a special sign that the field is private. We can't access it from outside or from inheriting classes.
// Private fields do not conflict with public ones. We can have both private and public fields at the same time
coffeeMachine.waterLimit = 1000; // OK
coffeeMachine.#waterLimit = 1000; // Error

// But if we inherit from CoffeeMachine, then we will have no direct access to #waterAmount. We will need to rely on waterAmount getter/setter:
class MegaCoffeeMachine extends CoffeeMachine {
  method() {
    alert(this.#waterAmount); // Error: can only access from CoffeeMachine
  }
}
// With private fields that’s impossible: this['#name'] doesn’t work. That’s a syntax limitation to ensure privacy.
