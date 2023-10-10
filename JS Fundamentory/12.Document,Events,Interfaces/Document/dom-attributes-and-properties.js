// Attributes and properties
// When the browser loads the page, it “reads” (another word: “parses”) the HTML and generates DOM objects from it. For element nodes, most standard HTML attributes automatically become properties of DOM objects.

// For instance, if the tag is <body id="page">, then the DOM object has body.id="page".

// But the attribute-property mapping is not one-to-one! In this chapter we’ll pay attention to separate these two notions, to see how to work with them, when they are the same, and when they are different.

// ------------------------DOM PROPERTIES-----------------------
// DOM nodes are regular JavaScript objects. We can alter them.

// For instance, let’s create a new property in document.body:
document.body.myData = {
  name: "Caesar",
  title: "Imperator",
};

alert(document.body.myData.title); // Imperator

// We can add a method as well:

document.body.sayTagName = function () {
  alert(this.tagName);
};

document.body.sayTagName(); // BODY (the value of "this" in the method is document.body)
// We can also modify built-in prototypes like Element.prototype and add new methods to all elements:

Element.prototype.sayHi = function () {
  alert(`Hello, I'm ${this.tagName}`);
};

document.documentElement.sayHi(); // Hello, I'm HTML
document.body.sayHi(); // Hello, I'm BODY

// ----> So, DOM properties and methods behave just like those of regular JavaScript objects:
//  - They can have any value.
//  - They are case-sensitive (write elem.nodeType, not elem.NoDeTyPe).

// -----------------------HTML ATTRIBUTES--------------------------
// In HTML, tags may have attributes. When the browser parses the HTML to create DOM objects for tags, it recognizes standard attributes and creates DOM properties from them.
// So when an element has id or another standard attribute, the corresponding property gets created. But that doesn’t happen if the attribute is non-standard.
<body id="test" something="non-standard"></body>;
alert(document.body.id); // test
// non-standard attribute does not yield a property
alert(document.body.something); // undefined

// Please note that a standard attribute for one element can be unknown for another one. For instance, "type" is standard for <input> (HTMLInputElement), but not for <body> (HTMLBodyElement). Standard attributes are described in the specification for the corresponding element class.
// We can access attributes by using methods:
//  1. elem.hasAttribute(name) – checks for existence.
//  2. elem.getAttribute(name) – gets the value.
//  3. elem.setAttribute(name, value) – sets the value.
//  4. elem.removeAttribute(name) – removes the attribute.

// HTML attributes have the following features:
//  - Their name is case-insensitive (id is same as ID).
//  - Their values are always strings.
<body id="test" something="non-standard"></body>;
alert(document.body.getAttribute("id")); // test
alert(document.body.getAttribute("Something")); // non-standard
alert(document.body.setAttribute("Test", 123)); // "123"

// ---------------------Property-attribute synchronization-----------------------
// When standard attributes changes, the corresponding property is auto-updated
let input = document.querySelector("input");

// attribute => property
input.setAttribute("id", "id");
alert(input.id); // id (updated)

// property => attribute
input.id = "newId";
alert(input.getAttribute("id")); // newId (updated)
// As you can see, when id attributes change the corresponding property is changed but not back
// ---->
// - Changing the attribute value updates the property.
// - But the property change does not affect the attribute.

// -----------------------Non-standard attributes, dataset-------------------------
// Sometime, we need a non-standard attribute to mark HTML element or pass custom data to Javascript
// All attributes starting with “data-” are reserved for programmers’ use. They are available in the dataset property.
<body data-about="new"></body>;
alert(document.body.dataset.about); // new
<div data-order-status="pending"></div>;
alert(document.querySelector("[data-order-status]").dataset.orderStatus); // pending
