// Add/remove items
// We already know methods that add and remove items from the beginning or the end:

// arr.push(...items) – adds items to the end,
// arr.pop() – extracts an item from the end,
// arr.shift() – extracts an item from the beginning,
// arr.unshift(...items) – adds items to the beginning.
// Here are a few others.

// ------------------
// Splice/ slice
let arr = ["I", "study", "JavaScript"];
console.log(arr.splice(1, 1)); // ["I", "Javascript"]

let arr1 = ["I", "study", "JavaScript", "right", "now"];
// remove 3 first elements and replace them with another
console.log(arr1.splice(0, 3, "Let's", "dance")); // ["Let's", "dance", "right", "now"]
console.log([1, 2, 5].splice(-1, 0, 3, 4)); // [1,2,3,4,5]

let arr2 = ["t", "e", "s", "t"];
console.log(arr2.slice(1, 3)); // e,s (copy from 1 to 3)
console.log(arr2.slice(-2)); // s,t (copy from -2 till the end)
console.log(arr2.slice()); // copy array

// ------------------
// Concat
// The method arr.concat creates a new array that includes values from other arrays and additional items.
let arr3 = [1, 2];
// create an array from: arr and [3,4]
console.log(arr3.concat([3, 4])); // 1,2,3,4
// create an array from: arr and [3,4] and [5,6]
console.log(arr3.concat([3, 4], [5, 6])); // 1,2,3,4,5,6
// create an array from: arr and [3,4], then add values 5 and 6
console.log(arr3.concat([3, 4], 5, 6)); // 1,2,3,4,5,6

// Normally, it only copies elements from arrays. Other objects, even if they look like arrays, are added as a whole:

let arr4 = [1, 2];

let arrayLike1 = {
  0: "something",
  length: 1,
};

console.log(arr4.concat(arrayLike1)); // 1,2,[object Object]

// But if an array-like object has a special Symbol.isConcatSpreadable property, then it’s treated as an array by concat: its elements are added instead:

let arrayLike2 = {
  0: "something",
  1: "else",
  [Symbol.isConcatSpreadable]: true,
  length: 2,
};
console.log(arr4.concat(arrayLike2)); // 1,2,something,else

// ------------------
// Iterate: forEach
// The arr.forEach method allows to run a function for every element of the array.
// The syntax:
// arr.forEach(function(item, index, array) {
//   // ... do something with item
// });

// ------------------
// Searching in array
// indexOf/lastIndexOf and includes

// The methods arr.indexOf and arr.includes have the similar syntax and do essentially the same as their string counterparts, but operate on items instead of characters:
// - arr.indexOf(item, from) – looks for item starting from index from, and returns the index where it was found, otherwise -1.
// - arr.includes(item, from) – looks for item starting from index from, returns true if found.
let arr5 = [1, 0, false];
console.log(arr5.indexOf(0)); // 1
console.log(arr5.indexOf(false)); // 2
console.log(arr5.indexOf(null)); // -1
console.log(arr5.includes(1)); // true
// Please note that indexOf uses the strict equality === for comparison. So, if we look for false, it finds exactly false and not the zero.

// The method arr.lastIndexOf is the same as indexOf, but looks for from right to left.
let fruits = ["Apple", "Orange", "Apple"];
console.log(fruits.indexOf("Apple")); // 0 (first Apple)
console.log(fruits.lastIndexOf("Apple")); // 2 (last Apple)

//The includes method handles NaN correctly
const arr6 = [NaN];
console.log(arr6.indexOf(NaN)); // -1 (wrong, should be 0)
console.log(arr6.includes(NaN)); // true (correct)
// That’s because includes was added to JavaScript much later and uses the more up to date comparison algorithm internally.

// find and findIndex/findLastIndex
let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Pete" },
  { id: 3, name: "Mary" },
  { id: 4, name: "John" },
];

// Find first element that satisfied condition, If nothing found, undefined is returned.
console.log(users.find((user) => user.id == 1)); // { id: 1, name: "John" },

// Find the index of the first John. The value of -1 is returned if nothing is found.
console.log(users.findIndex((user) => user.name == "John")); // 0

// Find the index of the last John . findLastIndex() method is like findIndex, but searches from right to left, similar to lastIndexOf.
console.log(users.findLastIndex((user) => user.name == "John")); // 3

// filter()
// The find method looks for a single (first) element that makes the function return true.

// If there may be many, we can use arr.filter(fn).

// The syntax is similar to find, but filter returns an array of all matching elements:

let results = arr.filter(function (item, index, array) {
  // if true item is pushed to results and the iteration continues
  // returns empty array if nothing found
});

// ------------------------------
// Transform an array

// map()
let result = arr.map(function (item, index, array) {
  // returns the new value instead of item
});

// sort()
let sortArr = [1, 2, 15];
// the method reorders the content of sortArr
sortArr.sort();
console.log(sortArr); // 1, 15, 2

// Did you notice anything strange (lạ lùng) in the outcome?
// The order became 1, 15, 2. Incorrect. But why?
// The items are sorted as strings by default.
// Literally(theo đúng nghĩa đen), all elements are converted to strings for comparisons. For strings, lexicographic ordering is applied and indeed "2" > "15".
// To sorting element we must to provide a callback function instead
function compare(a, b) {
  if (a > b) return 1; // if the first value is greater than the second
  if (a == b) return 0; // if values are equal
  if (a < b) return -1; // if the first value is less than the second
}

// With string elements, we must to use localCompare for strings
// Remember strings comparison algorithm? It compares letters by their codes by default.
// For many alphabets, it’s better to use str.localeCompare method to correctly sort letters, such as Ö.
// For example, let’s sort a few countries in German:
let countries = ["Österreich", "Andorra", "Vietnam"];
console.log(countries.sort((a, b) => (a > b ? 1 : -1))); // Andorra, Vietnam, Österreich (wrong)
console.log(countries.sort((a, b) => a.localeCompare(b))); // Andorra,Österreich,Vietnam (correct!)

// reverse()
// The method arr.reverse reverses the order of elements in arr.
// For instance:
let arrReversed = [1, 2, 3, 4, 5];
arrReversed.reverse();
console.log(arrReversed); // 5,4,3,2,1
// It also returns the array arrReversed after the reversal.

// split() and join()

// reduce()/reduceRight()
let value = arr.reduce(
  function (accumulator, item, index, array) {
    // ...
  },
  [initial]
);
// accumulator – is the result of the previous function call, equals initial the first time (if initial is provided).
// item – is the current array item.
// index – is its position.
// array – is the array.

// The method arr.reduceRight does the same, but goes from right to left.

// --------------------------------
// Array.isArray(value)
// Array supports a special method which is help you check if an object dose an array ?. It return true if the value is an array and false otherwise.
console.log(Array.isArray({})); // false
console.log(Array.isArray([])); // true

// ----------------------------------
// Most methods support “thisArg”
// Almost all array methods that call functions – like find, filter, map, with a notable exception of sort, accept an optional additional parameter thisArg.
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg is the optional last argument
// The value of thisArg parameter becomes this for func. If thisArg omitted, undefined value as the value of this key word
let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  },
};

let users1 = [{ age: 16 }, { age: 20 }, { age: 23 }, { age: 30 }];

// find users1, for who army.canJoin returns true
let soldiers = users1.filter(army.canJoin, army);

console.log(soldiers.length); // 2
console.log(soldiers[0].age); // 20
console.log(soldiers[1].age); // 23

//---------------------------------
// Other methods
// some(fn) / every(fn)
// The function fn is called on each element of the array similar to map. If any/all results are true, returns true, otherwise false.
// These methods behave sort of like || and && operators: if fn returns a truthy value, arr.some() immediately returns true and stops iterating over the rest of items; if fn returns a falsy value, arr.every() immediately returns false and stops iterating over the rest of items as well.

// arr.fill(value, start, end) – fills the array with repeating value from index start to end.

// arr.copyWithin(target, start, end) – copies its elements from position start till position end into itself, at position target (overwrites existing).

// arr.flat(depth)/arr.flatMap(fn) create a new flat array from a multidimensional array.

// arr.with(index, value) // create a new array with the single element changed

// ECMA Script 2023 introduces some methods working with array : toReversed(), toSorted(), toSpliced(), toString() // create a new array and does not mutate init array
