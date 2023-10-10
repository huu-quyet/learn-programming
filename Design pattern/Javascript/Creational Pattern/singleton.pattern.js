// Singleton là gì?
// Là mô hình thiết kế chỉ tạo ra một phiên bản của một lớp duy nhất (one instance for only one class) và cung cấp điểm truy cập cho tất cả các ứng dụng.
// Nói cách khác: Một singleton cung cấp một module duy nhất và có thể truy cập trên tất cả các ứng dụng của chúng ta trong hệ thống mà không cần phải khởi tạo lại một lần nữa.

// Áp dụng trong rất nhiều trường hợp như: quản lý tài nguyên chung (khởi tạo kết nối tới database(giảm thiểu lượng connection)), quản lý cấu hình chung(ví dụ như chỉ mở được 1 task manager trên windown - tránh sai lệch kết quả)

// Ví dụ: Sử dụng singleton pattern và round robin, modulus algorithm trong load balancing system

// thuật toán modulus: số dư phép chia index/numServer là số thứ tự server

class RoundRobin {
  constructor() {
    if (RoundRobin.instance) {
      return RoundRobin.instance;
    }
    RoundRobin.instance = this;
    this.servers = [];
    this.index = 0;
  }

  addServer(server) {
    this.servers.push(server);
  }

  getNextServer() {
    if (!this.servers.length) {
      throw new Error("No server available!");
    }

    const server = this.servers[this.index];
    // modulus
    this.index = (this.index + 1) % this.servers.length;
    return server;
  }
}

const loadBalancer1 = new RoundRobin();
const loadBalancer2 = new RoundRobin();

console.log(loadBalancer1 === loadBalancer2); // true ----> chỉ một class được khởi tạo duy nhất

loadBalancer1.addServer("01");
loadBalancer1.addServer("02");
loadBalancer1.addServer("03");

console.log(loadBalancer1.getNextServer()); // 01
console.log(loadBalancer1.getNextServer()); // 02
console.log(loadBalancer1.getNextServer()); // 03
console.log(loadBalancer1.getNextServer()); // 01
console.log(loadBalancer1.getNextServer()); // 02
