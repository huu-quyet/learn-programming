// The three most widely used type conversions are to string, to number, and to boolean.

// String Conversion – Occurs when we output something. Can be performed with String(value). The conversion to string is usually obvious for primitive values.

let s = "my" + "string";
console.log(s); // my string
console.log(1 + "2"); // 12
console.log("2" + 1); // 21
console.log(2 + 2 + "1"); // "41" and not "221"

// The binary + is the only operator that supports strings in such a way. Other arithmetic operators work only with numbers and always convert their operands to numbers.

// Here’s the demo for subtraction and division:

console.log(6 - "2"); // 4, converts '2' to a number
console.log("6" / "2"); // 3, converts both operands to numbers

// Numeric Conversion – Occurs in math operations. Can be performed with Number(value).

// The conversion follows the rules:
//   Value	         Becomes…
// undefined	       NaN
// null	                0
// true / false	       1 / 0
// string	         The string is read “as is”, whitespaces (includes spaces, tabs \t, newlines \n etc.) from both sides are ignored. An empty string becomes 0. An error gives NaN.

// The plus + exists in two forms: the binary form that we used above and the unary form.

// The unary plus or, in other words, the plus operator + applied to a single value, doesn’t do anything to numbers. But if the operand is not a number, the unary plus converts it into a number.

// For example:

// No effect on numbers
let x = 1;
console.log(+x); // 1

let y = -2;
console.log(+y); // -2

// Converts non-numbers
console.log(+true); // 1
console.log(+""); // 0

// It actually does the same thing as Number(...), but is shorter.

// Boolean Conversion – Occurs in logical operations. Can be performed with Boolean(value).

// Follows the rules:
// Value	                     Becomes…
// 0, null, undefined, NaN, ""	  false
// any other value	               true
// Most of these rules are easy to understand and memorize. The notable exceptions where people usually make mistakes are:

// undefined is NaN as a number, not 0.
// "0" and space-only strings like " " are true as a boolean.
