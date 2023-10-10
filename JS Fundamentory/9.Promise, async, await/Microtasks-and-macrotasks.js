// Trong event loop JavaScript, chúng ta không thể sử dụng các phương thức có sẵn trong trình duyệt như setTimeout để tạo một số loại hành động không đồng bộ sao?
// Đúng! Tuy nhiên, trong event loop, thực tế có hai loại hàng đợi: (macro) task queue  (hoặc chỉ được gọi là task queue) và hàng đợi microtask queue. Hàng đợi (macro)tasks dành cho các tác vụ (vĩ mô) và hàng đợi microtasks dành cho các tác vụ vi mô.
// Vậy (macro) task là gì và nhiệm vụ vi mô là gì?
// - (Macro)task:	setTimeout | setInterval | setImmediate
// - Microtask:	process.nextTick | Promise callback | queueMicrotask

// Ahh, chúng ta thấy promise trong danh sách microtask! Khi một promise resolves và gọi then(), catch() hoặc finally(), callback trong các phương thức sẽ được thêm vào hàng đợi microtask! Điều này có nghĩa là callback trong phương thức then(), catch() hoặc finally()  không được thực thi ngay lập tức, về cơ bản sẽ thêm một số hành vi async vào mã JavaScript của chúng ta!

// Vậy khi nào một callback then(), catch() hoặc finally() được thực thi? Event loop đưa ra mức độ ưu tiên khác nhau cho các tác vụ:

// Tất cả các chức năng hiện đang trong call stack được thực thi. Khi chúng trả về một giá trị, chúng sẽ bật ra khỏi ngăn xếp.
// Khi call stack trống, tất cả các microtasks hiện có trong hàng đợi sẽ lần lượt được đưa vào call stack và được thực thi! (Bản thân các microtasks cũng có thể trả về các microtasks mới, tạo ra một vòng lặp microtasks vô hạn 😬)
// Nếu cả call stack và hàng đợi microtasks đều trống, Event loop sẽ kiểm tra xem còn nhiệm vụ nào trên hàng đợi tác vụ (macro)task hay không. Các tác vụ này sẽ được đây lên call stack và được thực thi!

// Hãy xem một ví dụ nhanh, đơn giản bằng cách sử dụng:
//  - Task1: một chức năng được thêm vào call stack ngay lập tức, ví dụ bằng cách gọi nó ngay lập tức trong mã của chúng ta.
//  - Task2, Task3, Task4: microtask, ví dụ như một callback của promise then được thêm vào queueMicrotask.
//  - Task5 , Task6 : một nhiệm vụ (vĩ mô) (macro) task, ví dụ: callback của setTimeout hoặc setImmediate

console.log("Start");

setTimeout(() => {
  console.log("Timeout");
});

Promise.resolve("Promise").then((res) => console.log(res));

console.log("End");

// Đầu tiên, Task1 đã trả lại một giá trị và đã bật ra khỏi call stack. Sau đó, Chương trình đã kiểm tra các nhiệm vụ được xếp trong hàng đợi microtask. Khi tất cả các nhiệm vụ đã được thực thi trong call stack và bật ra, chương trình sẽ kiểm tra các tác vụ trên hàng đợi tác vụ (macro), được đẩy lên call stack và bật ra khi chúng trả lại giá trị.
// Trong đoạn mã này, chúng ta có tác vụ macro task setTimeout và microtask của callback trong then của promise. Khi chương trình thực thi đến dòng của hàm setTimeout. Hãy chạy mã này từng bước và xem những gì được ghi lại!
// Ở dòng đầu tiên, chương trình gặp phương thức console.log(). Nó được thêm vào call stack và sau đó nó ghi lại giá trị Start! ra console. Phương thức sẽ được bật ra khỏi call stack và chương trình tiếp tục.
// Chương trình gặp phải phương thức setTimeout và được bật lên call stack. Phương thức setTimeout có nguồn gốc từ trình duyệt: hàm callback của nó (() => console.log ('Timeout!')) sẽ được thêm vào API Web, cho đến khi hết thời gian hẹn giờ. Mặc dù chúng ta đã cung cấp giá trị 0 cho bộ đếm thời gian, nhưng callback vẫn được đẩy vào API Web trước và sau đó nó mới được thêm vào hàng đợi tác vụ (macro): SetTimeout là một macro task!
// Chương trình gặp phương thức Promise.resolve(). Phương thức Promise.resolve() được thêm vào call stack, sau đó được resolve với giá trị Promise!. Callback của then của nó sẽ được thêm vào hàng đợi microtask queue.
// Chương trình gặp phương thức console.log(). Nó sẽ được thêm vào call stack ngay lập tức, sau đó nó ghi lại giá trị End! đến bảng điều khiển console và được bật ra khỏi call stack và chương trình tiếp tục.
// Chương trình nhìn thấy Call stack bây giờ trống rỗng. Vì call stack trống, nên chương trình sẽ kiểm tra xem có các nhiệm vụ xếp hàng trong hàng đợi microtask không! Và vâng, có, callback của then sau promise đang chờ đến lượt nó! Nó được bật lên call stack, sau đó nó ghi lại giá trị resolve của promise: giá trị được ghi ra là Promise!
// Chương trình thấy call stack trống, vì vậy, nó sẽ kiểm tra hàng đợi microtask một lần nữa để xem liệu còn hay không. Không, hàng đợi microtask hoàn toàn trống.
// Đã đến lúc kiểm tra (macro)task queue: callback của setTimeout vẫn đang chờ ở đó! callback của setTimeout được bật lên Call Stack. Hàm call back trả về phương thức Console.log, ghi lại chuỗi "Timeout!". callback của setTimeout sẽ bị bật ra khỏi Call Stack.
