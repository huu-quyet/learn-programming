// ---------------------readonly--------------------------------

// fields/properties may be prefixed with the readonly modifier. This prevent assignment to the field outside of the constructor

class Greeter {
  readonly name: string = "world";

  constructor(otherName?: string) {
    if (otherName) {
      this.name = otherName;
    }
  }

  error() {
    this.name = "not ok"; // Cannot assign to 'name' because it is a read-only property.
  }
}

const g = new Greeter();
g.name = "also not ok"; // Cannot assign to 'name' because it is a read-only property.

// ---------------------Constructors--------------------------------

// The constructor method is a special method of a class for creating and initializing an object instance of that class. A constructor enables you to provide any custom initialization that must be done before any other methods can be called on an instantiated object.
// class constructors are very similar to functions. You can add parameters with type annotations, default values and overloads

class Point {
  x: number;
  y: number;

  // Normal signature with defaults
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class PointOverload {
  // Overloads
  constructor(x: number, y: string);
  constructor(s: string);
  constructor(xs: any, y?: any) {
    // TBD
  }
}

/// super calls
// Just as Javascript, if you have a base class, you will need to call super() in your constructor body before using any this.member

class Base {
  k = 4;
}

class Derived extends Base {
  constructor() {
    super();
    this.k = 5;
  }
}

// Methods
// A function property on a class is called method. Methods can use all the same type annotations as functions and constructor.
class Methods {
  x = 10;
  y = 10;
  scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}

// ---------------------Getters/ Setters--------------------------------

class GetterAndSetter {
  _length = 0;
  _name = "";
  get length() {
    return this._length;
  }
  set length(value: number) {
    this._length = value;
  }

  // if get() exists but no get(), the property is automatically readonly
  get name() {
    return this._name;
  }
}

const getterAndSetter = new GetterAndSetter();

// ---------------------Clauses heritage--------------------------------

/// implements clauses
// You can use implements clauses to check that a class satisfies a particular interface. An error will be issued if a class fails to correctly implement it.
interface Ping {
  ping(): void;
}

interface Pong {
  pong(): void;
}

// classes may also implement multiple interfaces

class Sonar implements Ping, Pong {
  ping() {
    console.log("ping!");
  }

  pong() {
    console.log("pong!");
  }
}

// implements clauses is only check the classes can be treated as the interface type. It doesn't change the type of the class or its methods at all

/// extends clauses
// The extends keyword is used in class declarations or class expressions to create a class that is a child of another class and can also define additional members.
class Animal {
  move() {
    console.log("Moving along!");
  }
}

class Dog extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log("woof!");
    }
  }
}

/// Overriding methods
// A derived class can also override a base class field or property. You can use "super" syntax to access base class methods
// In Javascript, we can also override a method by doing that:
class ParentClass {
  greet() {
    console.log("Hello, world!");
  }
}

class ChildClass extends ParentClass {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}

// In Typescript, it enforces that a derived class is alway a subtype of its base class
//  class Base {
//     greet() {
//       console.log("Hello, world!");
//     }
//   }

//   class Derived extends Base {
//     // Make this parameter required
//     greet(name: string) {
//   Property 'greet' in type 'Derived' is not assignable to the same property in base type 'Base'.
//     Type '(name: string) => void' is not assignable to type '() => void'.
//       console.log(`Hello, ${name.toUpperCase()}`);
//     }
//   }
