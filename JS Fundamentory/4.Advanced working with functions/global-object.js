// The global object provides variables and functions that are available anywhere. By default, those that are built into the language or the environment.

// In a browser it is named window, for Node.js it is global, for other environments it may have another name.

// Recently, globalThis was added to the language, as a standardized name for a global object, that should be supported across all environments. It’s supported in all major browsers.

// We’ll use window here, assuming that our environment is a browser. If your script may run in other environments, it’s better to use globalThis instead.

// The global object holds variables that should be available everywhere.

// That includes JavaScript built-ins, such as Array and environment-specific values, such as window.innerHeight – the window height in the browser.

// The global object has a universal name globalThis.

// …But more often is referred by “old-school” environment-specific names, such as window (browser) and global (Node.js).

// We should store values in the global object only if they’re truly global for our project. And keep their number at minimum.

// In-browser, unless we’re using modules, global functions and variables declared with var become a property of the global object.

// To make our code future-proof and easier to understand, we should access properties of the global object directly, as window.x.
