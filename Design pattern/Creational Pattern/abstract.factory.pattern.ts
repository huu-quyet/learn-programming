// Abstract Factory is a creational design pattern that lets you produce families of related objects without specifying their concrete classes.
// (Abstract Factory là một creational design pattern cho phép chúng ta tạo ra các nhóm đối tượng liên quan mà không cần phải chỉ định cụ thể các lớp của chúng.)

/// ---------------Example:
// Problem: Imagine you are creating a furniture shop simulator. Your code consists of classes that present (Tưởng tượng rằng bạn đang tạo ra một mô phỏng shop nội thất ).

// 1. A family of related products, say: Chair + Sofa + CoffeeTable.
// 2. Several variants of this family. For example, products Chair + Sofa + CoffeeTable are available in these variants: Modern, Victorian, ArtDeco.

// 1. Một nhóm các sản phẩm liên quan như: Chair, Sofa, CoffeeTable
// 2. Một vài biến thể dựa vào các nhóm như: Ví dụ, các sản phẩm Chari + Sofa + CoffeeTable là có sẵn trong các biến thể: Modern, Victorian, ArtDeco

// => You need a way to create individual furniture objects so that they match other objects of the same family.
// Also, you don’t want to change existing code when adding new products or families of products to the program. Furniture vendors update their catalogs very often, and you wouldn’t want to change the core code each time it happens.

// Bạn cần một cách nào đấy để tạo ra các đồ nột thất riêng lẻ sao cho chúng phù hợp với các đồ vật khác trong cùng một dòng sản phẩm.
// Ngoài ra, bạn không muốn thay đổi code hiện tại khi có thêm những sản phẩm hoặc dòng sản phẩm mới vào chương trình. Các nhà cung cấp đồ nội thất cập nhật danh mục của họ rất thường xuyên và bạn sẽ không muốn thay đổi core code mỗi lần điều đó xảy ra.

/// ---------------Solution:
// The first thing the Abstract Factory pattern suggests is to explicity declare interfaces for each distinct product of the product family. Then you can make all variants of products follow those interfaces. For example, all chair variants can implement the Chair interface, all coffee table variants can implement the CoffeeTable interface, and so on.

interface AbstractChair {
  usefulChair(): string;
}

interface AbstractCoffeeTable {
  usefulCoffeeTable(): string;
}

interface AbstractSofa {
  usefulSofa(): string;
}

interface AbstractFurniture {
  createChair(): AbstractChair;
  createCoffeeTable(): AbstractCoffeeTable;
  createSofa(): AbstractSofa;
}

// The next move is to declare the Abstract Factory - an interface with a lot of creation methods for all products that are part of the product family. These methods must return abstract product types represented by the interfaces we extracted previously

class FurnitureFactory implements AbstractFurniture {
  createChair(): AbstractChair {
    return new ChairFactory();
  }
  createCoffeeTable(): AbstractCoffeeTable {
    return new CoffeeTableFactory();
  }
  createSofa(): AbstractSofa {
    return new SofaFactory();
  }
}

// Now, for each variant of a product family, we create a separate factory class based on the AbstractFactory interface. A factory is a class that returns products of a  particular kind. For example, the ModernFurnitureFactory can only create ModernChari, ModernSofa, ModernCoffeeTable object.

class ChairFactory implements AbstractChair {
  usefulChair(): string {
    return "This is chair!";
  }
}

class CoffeeTableFactory implements AbstractCoffeeTable {
  usefulCoffeeTable(): string {
    return "This is coffee table!";
  }
}

class SofaFactory implements AbstractSofa {
  usefulSofa(): string {
    return "This is sofa!";
  }
}

// The client code has to work with both factories and product via their respective(tương ứng) abstract interfaces. This lets you change the type of a factory that you pass to the client code, as well as the product variant that the client code receives, without breaking the actual client code.

function clientCode(factory: AbstractFurniture) {
  const chair = factory.createChair();
  console.log(chair.usefulChair());
}

clientCode(new FurnitureFactory());

// -------------------------APPLICABILITY-----------------------
//  - Use Abstract Factory when you code needs to work with various families of related products, but you do not want it to depend on the concrete classes of those products- they might be unknown beforehand or you simply want to allow for future extensibility.
//    + The Abstract Factory provides you with an interface for creating objects from each class of the product family. As long as your code creates objects via this interface, you don’t have to worry about creating the wrong variant of a product which doesn’t match the products already created by your app.
//  - Consider implementing the Abstract Factory when you have a class with a set of Factory Methods that blur its primary responsibility.
//    + In a well-designed program each class is responsible only for one thing. When a class deals with multiple product types, it may be worth extracting its factory methods into a stand-alone factory class or a full-blown Abstract Factory implementation.

// -------------------------How to Implement---------------------
// 1. Map out a matrix of distinct product types versus variants of these products.

// 2. Declare abstract product interfaces for all product types. Then make all concrete product classes implement these interfaces.

// 3. Declare the abstract factory interface with a set of creation methods for all abstract products.

// 4. Implement a set of concrete factory classes, one for each product variant.

// 5. Create factory initialization code somewhere in the app. It should instantiate one of the concrete factory classes, depending on the application configuration or the current environment. Pass this factory object to all classes that construct products.

// 6. Scan through the code and find all direct calls to product constructors. Replace them with calls to the appropriate creation method on the factory object.

// ----------------------Pros and Cons---------------------------------
/// Pros:
//  - You can be sure that the products you’re getting from a factory are compatible with each other.
//  - You avoid tight coupling(khớp lối) between concrete products and client code.
//  - Single Responsibility Principle. You can extract the product creation code into one place, making the code easier to support.
//  - Open/Closed Principle. You can introduce new variants of products without breaking existing client code.

/// Cons:
//  The code may become more complicated than it should be, since a lot of new interfaces and classes are introduced along with the pattern.
