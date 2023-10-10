// DOM node classes
// Different DOM nodes may have different properties.
// All classes of DOM nodes form a single hierarchy.
// Each DOM node belongs to the corresponding built-in class.(You can check the dom-node-classes.png to see more)

// We also can use instanceof to check the inheritance:

console.log(document.body instanceof HTMLBodyElement); // true
console.log(document.body instanceof HTMLElement); // true
console.log(document.body instanceof Element); // true
console.log(document.body instanceof Node); // true
console.log(document.body instanceof EventTarget); // true
// As we can see, DOM nodes are regular JavaScript objects. They use prototype-based classes for inheritance.

// ----------nodeType----------------
// nodeType : check type of a DOM node

// ELEMENT_NODE = 1;
// ATTRIBUTE_NODE = 2;
// TEXT_NODE = 3;
// CDATA_SECTION_NODE = 4;
// ENTITY_REFERENCE_NODE = 5; // legacy
// ENTITY_NODE = 6; // legacy
// PROCESSING_INSTRUCTION_NODE = 7;
// COMMENT_NODE = 8;
// DOCUMENT_NODE = 9;
// DOCUMENT_TYPE_NODE = 10;
// DOCUMENT_FRAGMENT_NODE = 11;
// NOTATION_NODE = 12; // legacy

let elem = document.body;
// let's examine: what type of node is in elem?
console.log(elem.nodeType); // 1 => element
// and its first child is...
console.log(elem.firstChild.nodeType); // 3 => text

// -------------nodeName and tagName---------------------
// Given a DOM node, we can read its tag name from nodeName or tagName properties:
// For instance:
console.log(document.body.nodeName); // BODY
console.log(document.body.tagName); // BODY
// The difference is reflected in their names, but is indeed a bit subtle.
// - The tagName property exists only for Element nodes.
// - The nodeName is defined for any Node:
//     + for elements it means the same as tagName.
//     + for other node types (text, comment, etc.) it has a string with the node type.

// --------------innerHTML/outerHTML------------------------
// innerHTML property allows to get the HTML inside the element as a string.
// We can also modify it. So it’s one of the most powerful ways to change the page.

// outerHTML property contains the full HTML of the element. That’s like innerHTML plus the element itself.
// Beware: unlike innerHTML, writing to outerHTML does not change the element. Instead, it replaces it in the DOM.

// ------------------nodeValue/data: text node content---------------------
// The innerHTML property is only valid for element nodes.
// Other node types, such as text nodes, have their counterpart: nodeValue and data properties. These two are almost the same for practical use, there are only minor specification differences. So we’ll use data, because it’s shorter.
<body>
  Hello
  {"<"}!--Comment--{">"}
</body>;
let text = document.body.firstChild;
console.log(text.data); // Hello
let comment = text.nextSibling;
console.log(comment.data); // Comment

// --------------------------The “hidden” property--------------------------
// The “hidden” attribute and the DOM property specifies whether the element is visible or not.
// elem.hidden = true;
