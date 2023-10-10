// The internal format for strings is always UTF-16, it is not tied to the page encoding.

let str = `Hello`;

console.log(str[-2]); // undefined
console.log(str.at(-2)); // l
// As you can see, the .at(pos) method has a benefit of allowing negative position. If pos is negative, then it’s counted from the end of the string.
// So .at(-1) means the last character, and .at(-2) is the one before it, etc.
// The square brackets always return undefined for negative indexes

// Strings are immutable
// Strings can’t be changed in JavaScript. It is impossible to change a character.

// ------------------------------------------------------
// Comparing strings 
// strings are compared character-by-character in alphabetical order.
// we should be aware that strings in Javascript are encoded using UTF-16. That is: each character has a corresponding numeric code.

// There are special methods that allow to get the character for the code and back:

str.codePointAt(pos);
// Returns a decimal number representing the code for the character at position pos:
// different case letters have different codes
console.log("Z".codePointAt(0)); // 90
console.log("z".codePointAt(0)); // 122
console.log("z".codePointAt(0).toString(16)); // 7a (if we need a hexadecimal value)

String.fromCodePoint(code);
// Creates a character by its numeric code
console.log(String.fromCodePoint(90)); // Z
console.log(String.fromCodePoint(0x5a)); // Z (we can also use a hex value as an argument)

let str1 = "";

for (let i = 65; i <= 220; i++) {
  str1 += String.fromCodePoint(i);
}
console.log(str1);
// Output:
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ

// ------------------------------------------------------------
// Correct comparisons
// The “right” algorithm to do string comparisons is more complex than it may seem, because alphabets are different for different languages.

// So, the browser needs to know the language to compare.

// Luckily, modern browsers support the internationalization standard ECMA-402.

// It provides a special method to compare strings in different languages, following their rules.

// The call str.localeCompare(str2) returns an integer indicating whether str is less, equal or greater than str2 according to the language rules:

// Returns a negative number if str is less than str2.
// Returns a positive number if str is greater than str2.
// Returns 0 if they are equivalent.
// For instance:

console.log("Österreich".localeCompare("Zealand", "", {})); // -1
