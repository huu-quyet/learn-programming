// Level 0 : without simple factory pattern
const serviceLogistic = (weight) => {
  switch (weight) {
    case "10": {
      return { name: "Truck 10", door: 6, price: "1.000.000 VND" };
    }

    case "20": {
      return { name: "Truck 20", door: 7, price: "2.000.000 VND" };
    }
  }
};

console.log(serviceLogistic("10"));

// Level 1: with simple factory pattern
class ServiceLogistic {
  constructor(door = 6, price = "100,000 VND", name = "Trunk 10") {
    this.name = name;
    this.door = door;
    this.price = price;
  }

  static getTransport = (cargoVolume) => {
    switch (cargoVolume) {
      case "10":
        return new ServiceLogistic();
      case "20": {
        return new ServiceLogistic(16, "1.000.000 VND", "Trunk 20");
      }
    }
  };
}

console.log(ServiceLogistic.getTransport("20"));

// Nhược điểm: Khi logic mở rộng => getTransport() trở nên phức tạp và không còn giữ được tính nguyên vẹn ban đầu => vi phạm nguyên tắc open/close trong SOLID
