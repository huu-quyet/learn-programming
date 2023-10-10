// -------------------Create an element--------------------------
// To create DOM nodes, there are two methods:
// document.createElement(tag)
let div = document.createElement("div");
// document.createElement(tag)
let textNode = document.createTextNode("Here I am");

// ------------------Insertion Methods --------------------------
//  - node.append(...nodes or strings) – append nodes or strings at the end of node,
//  - node.prepend(...nodes or strings) – insert nodes or strings at the beginning of node,
//  - node.before(...nodes or strings) –- insert nodes or strings before node,
//  - node.after(...nodes or strings) –- insert nodes or strings after node,
//  - node.replaceWith(...nodes or strings) –- replaces node with the given nodes or strings.

<ol id="ol">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>;
let olEle = document.getElementsByTagName("ol")[0];
olEle.before("before"); // insert string "before" before <ol>
olEle.after("after"); // insert string "after" after <ol>

let liFirst = document.createElement("li");
liFirst.innerHTML = "prepend";
olEle.prepend(liFirst); // insert liFirst at the beginning of <ol>

let liLast = document.createElement("li");
liLast.innerHTML = "append";
olEle.append(liLast); // insert liLast at the end of <ol>

// output:
// before
// <ol id="ol">
//   <li>prepend</li>
//   <li>0</li>
//   <li>1</li>
//   <li>2</li>
//   <li>append</li>
// </ol>
// after

// -------------------insertAdjacentHTML/Text/Element------------------------
// We can inset relative element via method: element.insertAdjacentHTML(where, html)
// The first parameter "where" is a code word:
//  -   "beforebegin" - insert "html" immediately before "element"
//  -   "afterbegin" - insert "html" into "element", at the beginning,
//  -   "beforeend" - insert "html" into "element", at the end
//  -   "afterend" - insert "html" immediately after "element"

// elem.insertAdjacentText(where, text) – the same syntax, but a string of text is inserted “as text” instead of HTML,
// elem.insertAdjacentElement(where, elem) – the same syntax, but inserts an element.

// -----------------remove node------------------------------------
// node.remove()

// -----------------Cloning nodes----------------------------------
// The call elem.cloneNode(true) creates a “deep” clone of the element – with all attributes and sub elements.
// If we call elem.cloneNode(false), then the clone is made without child elements.
