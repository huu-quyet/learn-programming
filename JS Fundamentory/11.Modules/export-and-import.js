// Export before declarations
// We can label any declaration as exported by placing export before it, be it a variable, function or a class.

// For instance, here all exports are valid:

// export an array
export let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// export a constant
export const MODULES_BECAME_STANDARD_YEAR = 2015;

// export a class
export class User {
  constructor(name) {
    this.name = name;
  }
}

// ---------------------
// Export apart from declarations
// Also, we can put export separately.

// Here we first declare, and then export:

// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

export { sayHi, sayBye }; // a list of exported variables

// ---------------------------
// Import *
// Usually, we put a list of what to import in curly braces import {...}, like this:

// 📁 main.js
import { sayHi, sayBye } from "./say.js";

sayHi("John"); // Hello, John!
sayBye("John"); // Bye, John!
// But if there’s a lot to import, we can import everything as an object using import * as <obj>, for instance:

// 📁 main.js
import * as say from "./say.js";

say.sayHi("John");
say.sayBye("John");
// At first sight, “import everything” seems such a cool thing, short to write, why should we ever explicitly list what we need to import?
// Well, there are few reasons.
// - Explicitly listing what to import gives shorter names: sayHi() instead of say.sayHi().
// - Explicit list of imports gives better overview of the code structure: what is used and where. It makes code support and refactoring easier.

//------------------------------
// Import “as”
// We can also use as to import under different names.

// For instance, let’s import sayHi into the local variable hi for brevity, and import sayBye as bye:

// 📁 main.js
import { sayHi as hi, sayBye as bye } from "./say.js";

hi("John"); // Hello, John!
bye("John"); // Bye, John!

// -----------------------------
// Export “as”
// The similar syntax exists for export.

// Let’s export functions as hi and bye:

// 📁 say.js
// ...
export { sayHi as hi, sayBye as bye };
// Now hi and bye are official names for outsiders, to be used in imports:

// 📁 main.js
import * as say from "./say.js";

say.hi("John"); // Hello, John!
say.bye("John"); // Bye, John!

// -----------------------------
// Export default
// 📁 user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

// export default class { // no class name
//     constructor() {
//         // ...
//      }
//   }

//   export default function(user) { // no function name
//     alert(`Hello, ${user}!`);
//   }

// export a single value, without making a variable
//   export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// 📁 main.js
import User from "./user.js"; // not {User}, just User
new User("John");


// The “default” name
// In some situations the default keyword is used to reference the default export.

// For example, to export a function separately from its definition:

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// same as if we added "export default" before the function
export {sayHi as default};
// Or, another situation, let’s say a module user.js exports one main “default” thing, and a few named ones (rarely the case, but it happens):

// 📁 user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
// Here’s how to import the default export along with a named one:

// 📁 main.js
import {default as User, sayHi} from './user.js';

new User('John');
// And, finally, if importing everything * as an object, then the default property is exactly the default export:

// 📁 main.js
import * as user from './user.js';

let User = user.default; // the default export
new User('John');