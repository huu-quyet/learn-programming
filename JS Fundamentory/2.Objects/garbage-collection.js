// Memory management in JavaScript is performed automatically and invisibly to us. We create primitives, objects, functions… All that takes memory.

// What happens when something is not needed any more? How does the JavaScript engine discover it and clean it up?

// Reachability
// The main concept of memory management in JavaScript is reachability.

// Simply put, “reachable” values are those that are accessible or usable somehow. They are guaranteed to be stored in memory.

// There’s a base set of inherently reachable values, that cannot be deleted for obvious reasons.

// For instance:

// The currently executing function, its local variables and parameters.
// Other functions on the current chain of nested calls, their local variables and parameters.
// Global variables.
// (there are some other, internal ones as well)
// These values are called roots.

// Any other value is considered reachable if it’s reachable from a root by a reference or by a chain of references.

// For instance, if there’s an object in a global variable, and that object has a property referencing another object, that object is considered reachable. And those that it references are also reachable. Detailed examples to follow.

// There’s a background process in the JavaScript engine that is called garbage collector. It monitors all objects and removes those that have become unreachable.

// Here’s the simplest example:

// user has a reference to the object
let user = {
  name: "John",
};

// Here the arrow depicts an object reference. The global variable "user" references the object {name: "John"} (we’ll call it John for brevity). The "name" property of John stores a primitive, so it’s painted inside the object.

// If the value of user is overwritten, the reference is lost:

user = null;

// Now John becomes unreachable. There’s no way to access it, no references to it. Garbage collector will junk the data and free the memory.

// Internal algorithms
// The basic garbage collection algorithm is called “mark-and-sweep”.

// The following “garbage collection” steps are regularly performed:

// The garbage collector takes roots and “marks” (remembers) them.
// Then it visits and “marks” all references from them.
// Then it visits marked objects and marks their references. All visited objects are remembered, so as not to visit the same object twice in the future.
// …And so on until every reachable (from the roots) references are visited.
// All objects except marked ones are removed.
// For instance, let our object structure look like this:

// We can clearly see an “unreachable island” to the right side. Now let’s see how “mark-and-sweep” garbage collector deals with it.

//1. The first step marks the roots:
//2. Then we follow their references and mark referenced objects:
//3. …And continue to follow further references, while possible:
//3. Now the objects that could not be visited in the process are considered unreachable and will be removed:

// We can also imagine the process as spilling a huge bucket of paint from the roots, that flows through all references and marks all reachable objects. The unmarked ones are then removed.

// That’s the concept of how garbage collection works. JavaScript engines apply many optimizations to make it run faster and not introduce any delays into the code execution.

// Some of the optimizations:

// Generational collection – objects are split into two sets: “new ones” and “old ones”. In typical code, many objects have a short life span: they appear, do their job and die fast, so it makes sense to track new objects and clear the memory from them if that’s the case. Those that survive for long enough, become “old” and are examined less often.
// Incremental collection – if there are many objects, and we try to walk and mark the whole object set at once, it may take some time and introduce visible delays in the execution. So the engine splits the whole set of existing objects into multiple parts. And then clear these parts one after another. There are many small garbage collections instead of a total one. That requires some extra bookkeeping between them to track changes, but we get many tiny delays instead of a big one.
// Idle-time collection – the garbage collector tries to run only while the CPU is idle, to reduce the possible effect on the execution.
// There exist other optimizations and flavours of garbage collection algorithms. As much as I’d like to describe them here, I have to hold off, because different engines implement different tweaks and techniques. And, what’s even more important, things change as engines develop, so studying deeper “in advance”, without a real need is probably not worth that. Unless, of course, it is a matter of pure interest, then there will be some links for you below.

//Link blog https://javascript.info/garbage-collection

//- JS grabage collection là quá trình tự động lấy lại bộ nhớ không còn cần thiết của JS program. Trong JS, các object được cấp phát bộ nhớ động và khi object không còn có thể truy cập hoặc tham chiếu bởi bất kỳ thành phần nào của chương trình thì khi đó object sẽ đủ điều kiện cho grabage collection.
// - Mục tiêu của grabage collection là giải phóng bộ nhớ bị chiếm bởi object không được sử dụng, ngăn ngừa rò rỉ bộ nhớ và tối ưu bộ nhớ trong quá trình sử dụng của chương trình.
// - Một số kỹ thuật được sử dụng trong grabage collection:
//    + Reference counting: kỹ thuật này liên quan đến việc theo dõi số lượng reference tới một object. Mỗi khi một đối tượng được referenced, số lượng tham chiếu của nó sẽ tăng lên, và giảm xuống khi một tham chiếu bị xóa. Các object có số lượng tham chiếu bằng 0 có thể được thu gom và giải phóng một cách an toàn.
//    + Mark and sweep: thuật toán này hoạt động bằng cách duyệt qua tất cả các object, bắt đầu từ các biến toàn cục cho đến các biến cục bộ ... và đánh dấu tất cả các object (có thể truy cập). Sau khi đánh dấu, nó thực hiện quét toàn bộ heap, giải phóng bộ nhớ bị chiếm giữ bới các object chưa được đánh dấu (không thể truy cập).
//    + Generational collection: kỹ thuật này chia các object thành các generation(thế hệ) khác nhau dựa trên thời gian tồn tại của chúng. Thông thường, các object mới hơn được coi là tồn tại trong thời gian ngắn, trong khi các đối tượng cũ hơn tồn tại lâu hơn. Khi này grabage collector có thể tập trung vào các object tồn tại trong thời gian ngắn mà không phải duyệt qua toàn bộ các object.
//    + Incremental và concurrent collection: các phương pháp này nhằm giảm thiểu việc tạm dừng trong quá trình thực thi chương trình bằng cách trải rộng công việc grabage collection qua nhiều chu kỳ hoặc đồng thời với quá trình thực thi chương trình.
