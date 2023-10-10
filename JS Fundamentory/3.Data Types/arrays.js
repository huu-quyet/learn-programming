// Objects allow you to store keyed collections of values. That’s fine.
// But quite often we find that we need an ordered collection, where we have a 1st, a 2nd, a 3rd element and so on. For example, we need that to store a list of something: users, goods, HTML elements etc.
// It is not convenient to use an object here, because it provides no methods to manage the order of elements. We can’t insert a new property “between” the existing ones. Objects are just not meant for such use.
// There exists a special data structure named Array, to store ordered collections.

// ----------------------------------------
// Methods pop/push, shift/unshift
// A queue is one of the most common uses of an array. In computer science, this means an ordered collection of elements which supports two operations:
//  - push: appends an element to the end.
//  - shift: get an element from the beginning, advancing the queue, so that the 2nd element becomes the 1st.
// For queues, we have FIFO (First-In-First-Out).

// <---------- shift [] <----------- push

//Arrays support both operations.
// In practice we need it very often. For example, a queue of messages that need to be shown on-screen.
// There’s another use case for arrays – the data structure named stack.
// It supports two operations:
//  - push adds an element to the end.
//  - pop takes an element from the end.
// So new elements are added or taken always from the “end”.
// A stack is usually illustrated as a pack of cards: new cards are added to the top or taken from the top:
// For stacks, the latest pushed item is received first, that’s also called LIFO (Last-In-First-Out) principle.

// |            ^
// |  push      |
// v            | pop
// [.................]

// Arrays in JavaScript can work both as a queue and as a stack. They allow you to add/remove elements, both to/from the beginning or the end.

let fruits = ["Apple", "Orange", "Pear"];
console.log(fruits.pop()); // remove "Pear"
console.log(fruits.push("Pear")); // add "Pear" to the end of the fruits -> Apple, Orange, Pear, Pear
console.log(fruits.shift("Pear")); // remove "Pear" at the start -> Apple, Orange, Pear, Pear
console.log(fruits.unshift("Pear")); // add "Pear" at the start -> Apple, Orange, Pear, Pear

// pop(), push(), shift() and unshift() modify initiative array

// -----------------------------------------------------
// Internals
// An array is a special kind of object. But what makes arrays really special is their internal representation. The engine tries to store its elements in the "contiguous memory area"(bộ nhớ liền kề), there are other optimizations as well, to make arrays work really fast.

// -------------------------------------------------------------
// Performance
// Methods push/pop run fast, while shift/unshift are slow.
// Why is it faster to work with the end of an array than with its beginning? Let’s see what happens during the execution:
fruits.shift(); // take 1 element from the start
// It’s not enough to take and remove the element with the index 0. Other elements need to be renumbered as well.
// The shift operation must do 3 things:

//  1. Remove the element with the index 0.
//  2. Move all elements to the left, renumber them from the index 1 to 0, from 2 to 1 and so on.
//  3. Update the length property.
["Apple", "Orange", "Pear", "Lemon"].shift();
//  ->   ["Apple", "Orange", "Pear", "Lemon"]  ------------------------------------>   ["Orange", "Pear", "Lemon"]
//          [0]      [1]      [2]     [3]       -> clear -> [][1][2][3] -> move ->         [0]      [1]       [2]

// The more elements in the array, the more time to move them, more in-memory operations.
// The similar thing happens with unshift: to add an element to the beginning of the array, we need first to move existing elements to the right, increasing their indexes.

// And what’s with push/pop? They do not need to move anything. To extract an element from the end, the pop method cleans the index and shortens length.
// The actions for the pop operation:
["Apple", "Orange", "Pear", "Lemon"].pop();
//  ->   ["Apple", "Orange", "Pear", "Lemon"]  ------------------------------------>   ["Orange", "Pear", "Lemon"]
//          [0]      [1]      [2]     [3]       -> clear(length = 3)->                     [0]      [1]       [2]
// The pop method does not need to move anything, because other elements keep their indexes. That’s why it’s faster.
// The similar thing with the push method.

// --------------------------------------------------------------
// Loops though an array by for ... of
// The for..of doesn’t give access to the number of the current element, just its value, but in most cases that’s enough. And it’s shorter.
let arr = ["Apple", "Orange", "Pear"];

for (let key in arr) {
  console.log(arr[key]); // Apple, Orange, Pear
}

// we also use for ... in to loop though an array but that is actually a bad idea. There are some problems with it:
//  1. The loop for ... in iterates over all properties, not only the numeric ones
//  2. The for ... in loop is optimized for general objects, not arrays, and thus is 10 - 100 times slower. Of course, it is still very fast but still we be aware of the difference.

// ---> Generally, we should not use for ... in for arrays
