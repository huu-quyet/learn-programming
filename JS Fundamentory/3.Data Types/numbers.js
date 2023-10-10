//In modern JavaScript, there are two types of numbers:
//  1. Regular numbers in JavaScript are stored in 64-bit format IEEE-754, also known as “double precision floating point numbers”. These are numbers that we’re using most of the time, and we’ll talk about them in this chapter.

//  2. BigInt numbers represent integers of arbitrary length. They are sometimes needed because a regular integer number can’t safely exceed (253-1) or be less than -(253-1),

// --------------------------------------------------
// More way to write a number
let billion = 1000000000;
let billion1 = 1_000_000_000;
console.log(billion1);
// Here the underscore _ plays the role of the “syntactic sugar”, it makes the number more readable. The JavaScript engine simply ignores _ between digits, so it’s exactly the same one billion as above.
let billion2 = 1e9; // 1 billion, literally: 1 and 9 zeroes
console.log(7.3e9); // 7.3 billions (same as 7300000000 or 7_300_000_000)

1e3 === 1 * 1000; // e3 means *1000
console.log(1e3);
1.23e6 === 1.23 * 1000000; // e6 means *1000000
console.log(1.23e6);

// -3 divides by 1 with 3 zeroes
1e-3 === 1 / 1000; // 0.001
console.log(1e-3);
// -6 divides by 1 with 6 zeroes
1.23e-6 === 1.23 / 1000000; // 0.00000123
console.log(1.23e-6);
// an example with a bigger number
1234e-2 === 1234 / 100; // 12.34, decimal point moves 2 times
console.log(1234e-2);

// --------------------------------------------------------------
// Hex, binary and octal numbers
// Javascript support three numeral systems: hex, binary and octal numbers
console.log(0xff); // hex
console.log(0b1111111); // binary
console.log(0o377); // octal numbers

// toString(base) base
// num.toString(base) returns a string representation of num in the numeral system with the given "base"
// the "base" can be from 2 to 36. By default it's 10
let num = 255;
// base=16 is used for hex colors, character encodings etc, digits can be 0..9 or A..F.
console.log(num.toString(16)); // ff
// base=2 is mostly for debugging bitwise operations, digits can be 0 or 1.
console.log(num.toString(2)); // 11111111
// base=36 is the maximum, digits can be 0..9 or A..Z. The whole latin alphabet is used to represent a number. A funny, but useful case for 36 is when we need to turn a long numeric identifier into something shorter, for example to make a short url.
console.log((123456).toString(36)); // = 123456..toString(36) // 2n9c

// --------------------------------------------------------------
// Rounding

//          Math.floor	Math.ceil	Math.round	Math.trunc
// 3.1	          3	        4	        3	        3
// 3.6	          3	        4	        4	        3
// -1.1	          -2	    -1	        -1	        -1
// -1.6	          -2	    -1	        -2	        -1

// ----------------------------------------------------------------
// Imprecise calculations (Tính toán không chính xác)
// Internally, a number is represented in 64-bit format IEEE-754, so there are exactly 64 bits to store a number: 52 of them are used to store the digits, 11 of them store the position of the decimal point, and 1 bit is for the sign.
console.log(0.1 + 0.2); // 0.30000000000000004
// But why does this happen?

// A number is stored in memory in its binary form, a sequence of bits – ones and zeroes. But fractions like 0.1, 0.2 that look simple in the decimal numeric system are actually unending fractions in their binary form. (Một số được lưu trữ trong bộ nhớ dưới dạng nhị phân - một sự liên tiếp giữa 0 và 1. Nhưng các phân số như 0.1, 0.2 trông đơn giản trong hệ đếm thập phân thực chất không biểu diễn các phân số trong hệ nhị phân.)

// What is 0.1? It is one divided by ten 1/10, one-tenth. In decimal numeral system such numbers are easily representable. Compare it to one-third: 1/3. It becomes an endless fraction 0.33333(3). (0.1 là phép chia 1 cho 10. Trong hệ đếm thập phân các số biểu diễn đơn giản nhưng nếu 1 chia 3 nó trở thành vô tận 0.333333333(3))

// So, division by powers 10 is guaranteed to work well in the decimal system, but division by 3 is not. For the same reason, in the binary numeral system, the division by powers of 2 is guaranteed to work, but 1/10 becomes an endless binary fraction. (Vì vậy, phép chia cho 10 được đảm bảo hoạt động tốt trong hệ thập phân nhưng phép chia cho 3 thì không. Với cùng lí do đó, trong hệ nhị nhân, phép chia cho 2 được đảm bảo hoạt động tốt nhưng phép chia cho 10 sẽ trở thành vô tận trong hệ nhị phân)

// There’s just no way to store exactly 0.1 or exactly 0.2 using the binary system, just like there is no way to store one-third as a decimal fraction.
// (Không có cách nào để lưu trữ chính xác 0.1 và 0.2 trong hệ nhị phân cũng như là không có cách nào để lưu trữ 1/10 như một phân số thập phân)

// The numeric format IEEE-754 solves this by rounding to the nearest possible number. These rounding rules normally don’t allow us to see that “tiny precision loss”, but it exists.
// Định dạng số IEEE-754 giải quyết vấn đề này bằng cách làm tròn đến số gần nhất có thể. Các quy tắc làm tròn này thường không cho phép chúng ta thấy “sự mất mát chính xác rất nhỏ” đó, nhưng nó vẫn tồn tại.

// ------------------------------------------------------------
// isFinite and isNaN
// Number.isNaN and Number.isFinite
// Number.isNaN and Number.isFinite methods are the more “strict” versions of isNaN and isFinite functions. They do not autoconvert their argument into a number, but check if it belongs to the number type instead.

// Number.isNaN(value) returns true if the argument belongs to the number type and it is NaN. In any other case it returns false.

console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN("str" / 2)); // true

// Note the difference:
console.log(Number.isNaN("str")); // false, because "str" belongs to the string type, not the number type
console.log(isNaN("str")); // true, because isNaN converts string "str" into a number and gets NaN as a result of this conversion

// Number.isFinite(value) returns true if the argument belongs to the number type and it is not NaN/Infinity/-Infinity. In any other case it returns false.
// isFinite(value) converts its argument to a number and returns true if it’s a regular number, not NaN/Infinity/-Infinity:

console.log(isFinite("15")); // true
console.log(isFinite("str")); // false, because a special value: NaN
console.log(isFinite(Infinity)); // false, because a special value: Infinity

console.log(Number.isFinite(123)); // true
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite(2 / 0)); // false

// Note the difference:
console.log(Number.isFinite("123")); // false, because "123" belongs to the string type, not the number type
console.log(isFinite("123")); // true, because isFinite converts string "123" into a number 123
// In a way, Number.isNaN and Number.isFinite are simpler and more straightforward than isNaN and isFinite functions. In practice though, isNaN and isFinite are mostly used, as they’re shorter to write.

// Comparison with Object.is
// There is a special built-in method Object.is that compares values like ===, but is more reliable for two edge cases:

// It works with NaN: Object.is(NaN, NaN) === true, that’s a good thing.
// Values 0 and -0 are different: Object.is(0, -0) === false, technically that’s correct, because internally the number has a sign bit that may be different even if all other bits are zeroes.
// In all other cases, Object.is(a, b) is the same as a === b.

// We mention Object.is here, because it’s often used in JavaScript specification. When an internal algorithm needs to compare two values for being exactly the same, it uses Object.is (internally called SameValue).

// ----------------------------------------------------------------
// Numeric conversion using a plus + or Number() is strict. If a value is not exactly a number, it fails:

console.log(+"100px"); // NaN
// The sole exception is spaces at the beginning or at the end of the string, as they are ignored.

// But in real life we often have values in units, like "100px" or "12pt" in CSS. Also in many countries the currency symbol goes after the amount, so we have "19€" and would like to extract a numeric value out of that.

// That’s what parseInt and parseFloat are for.

// They “read” a number from a string until they can’t. In case of an error, the gathered number is returned. The function parseInt returns an integer, whilst parseFloat will return a floating-point number:

console.log(parseInt("100px")); // 100
console.log(parseFloat("12.5em")); // 12.5

console.log(parseInt("12.3")); // 12, only the integer part is returned
console.log(parseFloat("12.3.4")); // 12.3, the second point stops the reading
// There are situations when parseInt/parseFloat will return NaN. It happens when no digits could be read:

console.log(parseInt("a123")); // NaN, the first symbol stops the process
// The second argument of parseInt(str, radix)
// The parseInt() function has an optional second parameter. It specifies the base of the numeral system, so parseInt can also parse strings of hex numbers, binary numbers and so on:

console.log(parseInt("0xff", 16)); // 255
console.log(parseInt("ff", 16)); // 255, without 0x also works

console.log(parseInt("2n9c", 36)); // 123456
