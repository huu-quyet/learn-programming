// Modules, introduction
// As our application grows bigger, we want to split it into multiple files, so called “modules”. A module may contain a class or a library of functions for a specific purpose.

// For a long time, JavaScript existed without a language-level module syntax. That wasn’t a problem, because initially scripts were small and simple, so there was no need.

// But eventually scripts became more and more complex, so the community invented a variety of ways to organize code into modules, special libraries to load modules on demand.

// To name some (for historical reasons):

// AMD – one of the most ancient module systems, initially implemented by the library require.js.
// CommonJS – the module system created for Node.js server.
// UMD – one more module system, suggested as a universal one, compatible with AMD and CommonJS.
// Now these all slowly became a part of history, but we still can find them in old scripts.

// The language-level module system appeared in the standard in 2015, gradually evolved since then, and is now supported by all major browsers and in Node.js. So we’ll study the modern JavaScript modules from now on.

// ----------------------------------------------
// What is a module?
// A module is just a file. One script is one module. As simple as that.

// Modules can load each other and use special directives export and import to interchange functionality, call functions of one module from another one:

// export keyword labels variables and functions that should be accessible from outside the current module.
// import allows the import of functionality from other modules.
// For instance, if we have a file sayHi.js exporting a function:

// // 📁 sayHi.js
// export function sayHi(user) {
//   alert(`Hello, ${user}!`);
// }
// …Then another file may import and use it:

// // 📁 main.js
// import {sayHi} from './sayHi.js';

// alert(sayHi); // function...
// sayHi('John'); // Hello, John!
// The import directive loads the module by path ./sayHi.js relative to the current file, and assigns exported function sayHi to the corresponding variable.

// As modules support special keywords and features, we must tell the browser that a script should be treated as a module, by using the attribute <script type="module">.
// <!doctype html>
{
  /* <script type="module">
  import {sayHi} from './say.js';

  document.body.innerHTML = sayHi('John');
</script> */
}
// The browser automatically fetches and evaluates the imported module (and its imports if needed), and then runs the script.

// ---------------------------------------------
// Core module features
//  1. Always "use strict": Modules always work in strict mode
//  2. Module-level scope: Each module has its own top-level scope. In other words, top-level variables and functions from a module are not seen in other scripts.
//  3. A module code is evaluated only the first time when imported
//  If the same module is imported into multiple other modules, its code is executed only once, upon the first import. Then its exports are given to all further importers.
//  There’s a rule: top-level module code should be used for initialization, creation of module-specific internal data structures. If we need to make something callable multiple times – we should export it as a function
// 📁 admin.js
export let admin = {
  name: "John",
};
// 📁 1.js
import { admin } from "./admin.js";
admin.name = "Pete";

// 📁 2.js
import { admin } from "./admin.js";
alert(admin.name); // Pete

// Both 1.js and 2.js reference the same admin object
// Changes made in 1.js are visible in 2.js
// As you can see, when 1.js changes the name property in the imported admin, then 2.js can see the new admin.name.

// That’s exactly because the module is executed only once. Exports are generated, and then they are shared between importers, so if something changes the admin object, other importers will see that.

// Such behavior is actually very convenient, because it allows us to configure modules.

//  4. import.meta: The object import.meta contains the information about the current module.
//  5. In a module, “this” is undefined
