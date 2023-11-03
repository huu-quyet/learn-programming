// Builder is a creational design pattern that lets you construct complex objects step by step. The pattern allows you to produce different types and representations of an object using  the same construction code.

// -----------------Applicability------------------------
/// 1.  Use the Builder pattern to get rid of a "telescoping constructor".
////    -   When you have a constructor with more than 4 optional parameters. You can overload the constructor and create several shorter versions with fewer parameters or create a builder class that lets you build objects step by step, using only those steps that you really need. After implementing the pattern, you do not have to cram(nhồi nhét) dozens(hàng tá, hàng chục) of parameters into your constructor anymore.

/// 2.  Use the Builder pattern when you want your code to be able to create different representations of some product
////    -   The Builder pattern can be applied when construction of various representations of the product involves similar steps that differ only in the details.
////    -    The base builder interface defines all possible construction steps, and concrete builders implement these steps to construct particular representations of the product. Meanwhile, the director class guides the order of construction.

/// 3.  Use the Builder to construct Composite(tổng hợp) trees or other complex objects.
////    -   The Builder pattern lets you construct products step-by-step. You could defer execution of some steps without breaking the final product. You can even call steps recursively, which comes in handy when you need to build an object tree.

////    -   A builder doesn’t expose the unfinished product while running construction steps. This prevents the client code from fetching an incomplete result.

// ------------------Pros and Cons------------------------
/// Pros:
////    -   You can construct objects step-by-step, defer construction steps or run steps recursively.
////    -   You can reuse the same construction code when building various representations of products.
////    -   Single Responsibility Principle. You can isolate complex construction code from the business logic of the product.

/// Cons:
////    -   The overall complexity of the code increases since the pattern requires creating multiple new classes.

// Example:

export class UserBuilder {
  private name: string;
  private age: number;
  private phone: string;
  private address: string;

  constructor(name: string) {
    this.name = name;
  }

  get Name() {
    return this.name;
  }
  setAge(value: number): UserBuilder {
    this.age = value;
    return this;
  }
  get Age() {
    return this.age;
  }
  setPhone(value: string): UserBuilder {
    this.phone = value;
    return this;
  }
  get Phone() {
    return this.phone;
  }
  setAddress(value: string): UserBuilder {
    this.address = value;
    return this;
  }
  get Address() {
    return this.address;
  }

  build(): User {
    return new User(this);
  }
}

export class User {
  private name: string;
  private age: number;
  private phone: string;
  private address: string;

  constructor(builder: UserBuilder) {
    this.name = builder.Name;
    this.age = builder.Age;
    this.phone = builder.Phone;
    this.address = builder.Address;
  }

  get Name() {
    return this.name;
  }
  get Age() {
    return this.age;
  }
  get Phone() {
    return this.phone;
  }
  get Address() {
    return this.address;
  }
}

const u = new UserBuilder("quyetnh")
  .setAge(12)
  .setPhone("0123456789")
  .setAddress("asdf")
  .build();
console.log(u.Name + " " + u.Age + " " + u.Phone + " " + u.Address);
