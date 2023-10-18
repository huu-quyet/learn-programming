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

/// Type-only field declarations
// When target >= ES2022, class fields are initialize after the parent class constructor completes, overriding any values set by the parent class. This can be a problem when you only want to re-declare a more accurate type for an inherited field. To handle these cases, you can write "declare" to indicate to TS that there should be no runtime effect for this field declaration.
interface Animal {
  dateOfBirth: any;
}

interface Dog extends Animal {
  breed: any;
}

class AnimalHouse {
  resident: Animal;
  constructor(animal: Animal) {
    this.resident = animal;
  }
}

class DogHouse extends AnimalHouse {
  // Does not emit JavaScript code,
  // only ensures the types are correct
  declare resident: Dog;
  constructor(dog: Dog) {
    super(dog);
  }
}

/// Initialization order
// The order of class initialization, as defined by JS, is:
//  1.  The base class fields are initialized
//  2.  The base class constructor runs
//  3.  The derived class fields are initialized
//  4.  The derived class constructor runs

// ---------------------Member visibility--------------------------------

/// public
// By default, class member is public. A public member can be accessed anywhere

/// protected
// protected members are only visible to subclasses of the class they are declare in.

// We need to repeat the protected modifier if overriding fields in subclass
class Base1 {
  protected m = 10;
}
class Derived1 extends Base1 {
  // No modifier, so default is 'public'
  protected m = 15;
}
const d = new Derived1();
// console.log(d.m); // NOT OK

/// private
// private is like protected, but doesn't allow access to the member even from subclasses
class Base2 {
  private x = 0;
}
const b = new Base2();
// Can't access from outside the class
console.log(b.x);
// Property 'x' is private and only accessible within class 'Base'.

// Because "private" members are not visible to derived classes, a derived class can not increase their visibility
class Base3 {
  private x = 0;
}
class Derived3 extends Base3 {
  // Class 'Derived3' incorrectly extends base class 'Base3'.
  //   Property 'x' is private in type 'Base3' but not in type 'Derived3'.
  x = 1;
}

// Notes:
// Like others aspects of Typescript's type system, private and protected are only enforced during type checking. This mean Javascript runtime constructor like "in" or simple property lookup can still access a "protected" or "private" member.
// "private" also can access using bracket notation during type checking
class MySafe {
  private secretKey = 12345;
}

const s = new MySafe();

// Not allowed during type checking
console.log(s.secretKey);
// Property 'secretKey' is private and only accessible within class 'MySafe'.

// OK
console.log(s["secretKey"]);

// ---------------------Static members-------------------------------

// Classes may have static members. These members are not associated with a particular instance of the class. The can be access through the class constructor object itself.
class MyClass {
  static x = 0;
  static printX() {
    console.log(MyClass.x);
  }
}
console.log(MyClass.x);
MyClass.printX();

// Static members can also use the same public, protected, and private visibility modifiers:
class MyClass1 {
  private static x = 0;
}
console.log(MyClass1.x);
// Property 'x' is private and only accessible within class 'MyClass1'.

// Static members are also inherited:
class Base4 {
  static getGreeting() {
    return "Hello world";
  }
}
class Derived4 extends Base4 {
  myGreeting = Derived4.getGreeting();
}

/// Static blocks in classes
// Static blocks allow you to write a sequence of statements with their own scope that can access private fields within the containing class.This mean that we can write initialization code with all the capabilities of writing statements, no leakage of variables and full access to our class's internal.
class Foo {
  static #count = 0;

  get count() {
    return Foo.#count;
  }

  static {
    try {
      const lastInstances = loadLastInstances();
      Foo.#count += lastInstances.length;
    } catch {}
  }
}

// -------------------------Generic Classes------------------------
// Classes, much like interfaces, can be generic. When a generic class is instantiated with new, its type parameters are inferred the same way as in a function call:

class Box<Type> {
  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }
}

const box = new Box("hello!");

// const box: Box<string>
// Classes can use generic constraints and defaults the same way as interfaces.

// -------------------------this at runtime in classes------------------------

// It’s important to remember that TypeScript doesn’t change the runtime behavior of JavaScript
// by default, the value of this inside a function depends on how the function was called.

///  Arrow function
// If you have a function that will often be called in a way that loses its this context, it can make sense to use an arrow function property instead of a method definition:
class MyClass2 {
  name = "MyClass";
  getName = () => {
    return this.name;
  };
}
const c = new MyClass2();
const gn = c.getName;
// Prints "MyClass" instead of crashing
console.log(gn());

// Notes:
//  -  The this value is guaranteed to be correct at runtime, even for code not checked with TypeScript
//  - This will use more memory, because each class instance will have its own copy of each function defined this way
//  - You can’t use super.getName in a derived class, because there’s no entry in the prototype chain to fetch the base class method from

/// ---------------------------this types-------------------------------------
// In classes, a special type called this refers dynamically to the type of the current class.
// You can use this is Type in the return position for methods in classes and interfaces. When mixed with a type narrowing (e.g. if statements) the type of the target object would be narrowed to the specified Type.
class FileSystemObject {
  isFile(): this is FileRep {
    return this instanceof FileRep;
  }
  isDirectory(): this is Directory {
    return this instanceof Directory;
  }
  isNetworked(): this is Networked & this {
    return this.networked;
  }
  constructor(public path: string, private networked: boolean) {}
}

class FileRep extends FileSystemObject {
  constructor(path: string, public content: string) {
    super(path, false);
  }
}

class Directory extends FileSystemObject {
  children: FileSystemObject[];
}

interface Networked {
  host: string;
}

const fso: FileSystemObject = new FileRep("foo/bar.txt", "foo");

if (fso.isFile()) {
  fso.content;

  // const fso: FileRep;
} else if (fso.isDirectory()) {
  fso.children;

  // const fso: Directory;
} else if (fso.isNetworked()) {
  fso.host;

  // const fso: Networked & FileSystemObject;
}

// A common use-case for a this-based type guard is to allow for lazy validation of a particular field.

// --------------------Parameter Properties-------------------------------
// TypeScript offers special syntax for turning a constructor parameter into a class property with the same name and value. These are called parameter properties and are created by prefixing a constructor argument with one of the visibility modifiers public, private, protected, or readonly. The resulting field gets those modifier(s):

class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    // No body necessary
  }
}
const a = new Params(1, 2, 3);
console.log(a.x);

// (property) Params.x: number
console.log(a.z);
// Property 'z' is private and only accessible within class 'Params'.

// ----------------------Constructor Signatures---------------------------
// JavaScript classes are instantiated with the new operator. Given the type of a class itself, the InstanceType utility type models this operation.

class Point1 {
  createdAt: number;
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.createdAt = Date.now();
    this.x = x;
    this.y = y;
  }
}
type PointInstance = InstanceType<typeof Point1>;

function moveRight(point: PointInstance) {
  point.x += 5;
}

const point = new Point1(3, 4);
moveRight(point);
point.x; // => 8

// ---------------------------abstract classes and members------------------------------
// Classes, methods, and fields in TypeScript may be abstract.

// An abstract method or abstract field is one that hasn’t had an implementation provided. These members must exist inside an abstract class, which cannot be directly instantiated.

// The role of abstract classes is to serve as a base class for subclasses which do implement all the abstract members. When a class doesn’t have any abstract members, it is said to be concrete.

// Let’s look at an example:
abstract class BaseAbstract {
  abstract getName(): string;

  printName() {
    console.log("Hello, " + this.getName());
  }
}

const baseAbstract = new BaseAbstract();
// Cannot create an instance of an abstract class.
// We can’t instantiate BaseAbstract with new because it’s abstract. Instead, we need to make a derived class and implement the abstract members:
class DerivedAbstract extends BaseAbstract {
  getName() {
    return "world";
  }
}

const derived = new DerivedAbstract();
derived.printName();
