// Date and time
// Let’s meet a new built-in object: Date. It stores the date, time and provides methods for date/time management.

// Creation
// To create a new Date object, We can call new Date():
let now = new Date();
console.log("current date/time", now); // shows current date/time

// --------------------
// new Date(milliseconds)
// Create a Date object with the time equal to number of milliseconds (1/1000 of a second) passed after the Jan 1st of 1970 UTC+0.
// 0 means 01.01.1970 UTC+0
let Jan01_1970 = new Date(0);
console.log("Jan01_1970", Jan01_1970);

// now add 24 hours, get 02.01.1970 UTC+0
let Jan02_1970 = new Date(24 * 3600 * 1000);
console.log("Jan02_1970", Jan02_1970);

// Dates before 01.01.1970 have negative timestamps, e.g.:

// 31 Dec 1969
let Dec31_1969 = new Date(-24 * 3600 * 1000);
console.log("Dec31_1969", Dec31_1969);

// ----------------------
// new Date(dateString)
// If there is a single argument, and it’s a string, then it is parsed automatically. The algorithm is the same as
let date = new Date("2017-01-26");
console.log("date", date);
// The time is not set, so it's assumed to be midnight GMT and is adjusted according to the timezone the code is run in

// ---------------------
// new Date(year, month, date, hours, minutes, seconds, ms)
// Create the date with the given components in the local time zone. Only the first two arguments are obligatory.
// The year should have 4 digits. For compatibility, 2 digits are also accepted and considered 19xx, e.g. 98 is the same as 1998 here, but always using 4 digits is strongly encouraged.
// The month count starts with 0 (Jan), up to 11 (Dec).
// The date parameter is actually the day of month, if absent then 1 is assumed.
// If hours/minutes/seconds/ms is absent, they are assumed to be equal 0.
let date2 = new Date(2011, 0, 1, 2, 3, 4, 567);
console.log("date2", date2); // 1.01.2011, 02:03:04.567

// --------------------------------------------------
// Access date components
// There are methods to access the year, month and so on from the Date object:
date2.getFullYear();
// Get the year (4 digits)
date2.getMonth();
// Get the month, from 0 to 11.
date2.getDate();
// Get the day of month, from 1 to 31, the name of the method does look a little bit strange.
date2.getHours(),
  date2.getMinutes(),
  date2.getSeconds(),
  date2.getMilliseconds();
// Get the corresponding time components.
date2.getDay();
// Get the day of week, from 0 (Sunday) to 6 (Saturday). The first day is always Sunday, in some countries that’s not so, but can’t be changed.

// All the methods above return the components relative to the local time zone.
// There are also their UTC-counterparts, that return day, month, year and so on for the time zone UTC+0:
const date3 = new Date("December 31, 1975, 23:15:30 GMT+11:00");
const date4 = new Date("December 31, 1975, 23:15:30 GMT-11:00");

console.log(date3.getUTCFullYear());
// Expected output: 1975
console.log(date4.getUTCFullYear());
// Expected output: 1976
console.log(date3.getUTCMonth());
// Expected output: 11
console.log(date4.getUTCMonth());
// Expected output: 0
console.log(date3.getUTCDay());
// Expected output: 3
console.log(date4.getUTCDay());
// Expected output: 4

// Besides the given methods, there are two special ones that do not have a UTC-variant:

// getTime()
// Returns the timestamp for the date – a number of milliseconds passed from the January 1st of 1970 UTC+0.
console.log("get time", new Date().getTime()); // current time
console.log("get time", new Date().getTime() === Date.now());
// getTimezoneOffset()
// Returns the difference between UTC and the local time zone, in minutes:
console.log("getTimezoneOffset", new Date().getTimezoneOffset());

// -----------------------------
// Setting date components
// The following methods allow to set date/time components:

// setFullYear(year, [month], [date])
// setMonth(month, [date])
// setDate(date)
// setHours(hour, [min], [sec], [ms])
// setMinutes(min, [sec], [ms])
// setSeconds(sec, [ms])
// setMilliseconds(ms)
// setTime(milliseconds) (sets the whole date by milliseconds since 01.01.1970 UTC)
// Every one of them except setTime() has a UTC-variant, for instance: setUTCHours().

// As we can see, some methods can set multiple components at once, for example setHours. The components that are not mentioned are not modified.

// For instance:

let today = new Date();

today.setHours(0);
console.log(today); // still today, but the hour is changed to 0

today.setHours(0, 0, 0, 0);
console.log(today); // still today, now 00:00:00 sharp.

// Date to number, date diff
// We can convert Date object to number, it becomes the timestamp same as date.getTime()
console.log("Date to number", +new Date());

// -------------------------------------------------
// Date.now();
// If we only want to measure time, we don’t need the Date object.
// There’s a special method Date.now() that returns the current timestamp.
// It is semantically equivalent to new Date().getTime(), but it doesn’t create an intermediate Date object. So it’s faster and doesn’t put pressure on garbage collection.

// ------------------------------------------------
// Date.parse from a string
// The method Date.parse(str) can read a date from a string.

// The string format should be: YYYY-MM-DDTHH:mm:ss.sssZ, where:

// YYYY-MM-DD – is the date: year-month-day.
// The character "T" is used as the delimiter.
// HH:mm:ss.sss – is the time: hours, minutes, seconds and milliseconds.
// The optional 'Z' part denotes the time zone in the format +-hh:mm. A single letter Z would mean UTC+0.
// Shorter variants are also possible, like YYYY-MM-DD or YYYY-MM or even YYYY.

// The call to Date.parse(str) parses the string in the given format and returns the timestamp (number of milliseconds from 1 Jan 1970 UTC+0). If the format is invalid, returns NaN.

// For instance:

let ms = Date.parse("2012-01-26T13:51:50.417-07:00");

console.log(ms); // 1327611110417  (timestamp)
// We can instantly create a new Date object from the timestamp:

let date5 = new Date(Date.parse("2012-01-26T13:51:50.417-07:00"));

console.log(date5);
