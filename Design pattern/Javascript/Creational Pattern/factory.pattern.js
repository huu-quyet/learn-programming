// Factory method pattern là một creational design pattern, cung cấp một interface cho việc tạo ra các objects trong một class nhưng cho phép các subclasses có thể thay đổi type của các đối tượng được tạo ra.

// Ví dụ: Bạn có một ứng dụng quản lý logistic và ban đầu bạn chỉ cung cấp dịch vụ bằng Car/Truck
class Vehicle {
  constructor({
    name = "Ford Ranger 2023",
    doors = 4,
    price = "10 VND",
    customer = {},
  }) {
    this.name = name;
    this.doors = doors;
    this.price = price;
    this.customer = customer;
  }
}

// Sau một khoảng thời gian, dịch vụ của bạn bắt đầu phát triển và mở rộng thêm các dịch vụ cho Sea hay Trunk hay Airplane.
// Khi đó, bạn cần tạo thêm các classes cho các dịch vụ mới.
// Tuy nhiên, code của bạn đã kết hợp với class Vehicle đã tồn tại.
// Việc thêm Sea hay Trunk class vào code của bạn sẽ thay đổi toàn bộ codebase

// ===> Solution:
// The Factory Method pattern is coming.
// Factory method pattern suggests you replace direct object construction call to a special "factory" method.

// create service logistic
class ServiceLogistic {
  transportClass = Vehicle;

  // factory method that return transport with "new"
  createTransport = (cus) => {
    return new this.transportClass({ customer: cus });
  };
}

// order for customer by car
const carService = new ServiceLogistic();
console.log(
  "CarService::",
  carService.createTransport({ name: "Car", volume: "10kg" })
);

// Create new instance for Trunk service
// Cach 1
class Trunk {
  constructor({
    name = "Container 2023",
    doors = 16,
    price = "20 VND",
    customer = {},
  }) {
    this.name = name;
    this.doors = doors;
    this.price = price;
    this.customer = customer;
  }
}

carService.transportClass = Trunk;
console.log(
  "TrunkService::",
  carService.createTransport({ name: "Trunk 1", volume: "1000kg" })
);

// Cach 2
class TrunkService extends ServiceLogistic {
  // Assign new "Vehicle" for creating a new Trunk subclass
  transportClass = Trunk;
}
const truckService = new TrunkService();
console.log(
  "TrunkService::",
  truckService.createTransport({ name: "Trunk 2", volume: "2000kg" })
);

// In the TrunkService above: we override transportClass property in the superclass that will create subclass when we call createTransport to create a new subclass
// Modify a little bit, we can create trunkService with "new" and then importing it anywhere to use

// APPLICABILITY - ỨNG DỤNG
//  -  Use Factory method when you do not know exactly types and dependencies of the objects your code work with. The Factory Method separate "product construction" code from the code that actually uses the product. Therefore, It is easier to extend the product construction code independently the rest of the code.
//  - Use Factory Method pattern when you want to provides users of your library or framework with a way to extend its internal components
//    +  Inheritance is probably the easiest way to extend the default behavior of a library or framework. But how would the framework recognize that your subclass should be used instead of a standard component?
//    + The solution is to reduce the code that constructs components across the framework into a single factory method and let anyone override this method in addition to extending the component itself.
//  - Use Factory Method when you want to save resources by reusing existing objects instead of rebuilding them each time.
// Sometime, you dealing with large, resource-intensive object such as database connection, file system, network resource.

// HOW TO IMPLEMENT
// 1. Make all products follow the same interface. This interface should declare methods that make sense in every product.

// 2. Add an empty factory method inside the creator class. The return type of the method should match the common product interface.

// 3. In the creator’s code find all references to product constructors. One by one, replace them with calls to the factory method, while extracting the product creation code into the factory method.

// 4. You might need to add a temporary parameter to the factory method to control the type of returned product.

// 5. At this point, the code of the factory method may look pretty ugly. It may have a large switch statement that picks which product class to instantiate. We can fix that by use Strategy Pattern to create a product subclass

// 6. Now, create a set of creator subclasses for each type of product listed in the factory method. Override the factory method in the subclasses and extract the appropriate bits of construction code from the base method.

// If there are too many product types and it doesn’t make sense to create subclasses for all of them, you can reuse the control parameter from the base class in subclasses.

// PROS AND CORS (ƯU VÀ NHƯỢC ĐIỂM)
// PROS:
//  - Gíup chúng ta tránh khỏi sự bó buộc giữa superclass với các subclasses
//  - Single Responsibility Principle. You can move the product creation code into one the place in the programming making the code easier to support
//  - Open/Closed Principle.You can introduce/create new types of products into the programming without breaking existing code.

// CORS:
// The code may become complicated since you introduce a lot of new subclasses to implement the pattern
// The best case scenario is when you are introducing the pattern into a exiting hierarchy of create classes
