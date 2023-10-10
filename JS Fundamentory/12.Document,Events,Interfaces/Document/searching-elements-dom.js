document.getElementById("id"); // get an element by id
document.querySelectorAll("selectors"); // get all elements inside document matching the given CSS selector.
document.querySelector(css); // returns the first element for the given CSS selector.

// matches
// Previous methods were searching the DOM.
// The elem.matches(css) does not look for anything, it merely checks if elem matches the given CSS-selector. It returns true or false.
// The method comes in handy when we are iterating over elements (like in an array or something) and trying to filter out those that interest us.
for (let elem of document.body.children) {
  if (elem.matches('a[href$="zip"]')) {
    console.log("The archive reference: " + elem.href);
  }
}

// closest
// The method closest goes up from the element and checks each of parents. If it matches the selector, then the search stops, and the ancestor is returned.
<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
    <li class="chapter">Chapter 2</li>
  </ul>
</div>;
let chapter = document.querySelector(".chapter"); // LI
console.log(chapter.closest(".book")); // UL
console.log(chapter.closest(".contents")); // DIV

//getElementsBy*
// There are also other methods to look for nodes by a tag, class, etc.
// Today, they are mostly history, as querySelector is more powerful and shorter to write.
// So here we cover them mainly for completeness, while you can still find them in the old scripts.
//  - elem.getElementsByTagName(tag) looks for elements with the given tag and returns the collection of them. The tag parameter can also be a star "*" for “any tags”.
//  - elem.getElementsByClassName(className) returns elements that have the given CSS class.
//  - document.getElementsByName(name) returns elements with the given name attribute, document-wide. Very rarely used.

// Summary
// There are 6 main methods to search for nodes in DOM:

// Method	                    Searches by...	    Can call on an element?	    Live?
// querySelector	            CSS-selector	    ✔	                        -
// querySelectorAll	            CSS-selector	    ✔	                        -
// getElementById	            id	                -	                        -
// getElementsByName	        name	            -	                        ✔
// getElementsByTagName	        tag or '*'	        ✔	                        ✔
// getElementsByClassName	    class	            ✔	                        ✔
// By far the most used are querySelector and querySelectorAll, but getElement(s)By* can be sporadically helpful or found in the old scripts.

// Besides that:

// There is elem.matches(css) to check if elem matches the given CSS selector.
// There is elem.closest(css) to look for the nearest ancestor that matches the given CSS-selector. The elem itself is also checked.
// And let’s mention one more method here to check for the child-parent relationship, as it’s sometimes useful:

// elemA.contains(elemB) returns true if elemB is inside elemA (a descendant of elemA) or when elemA==elemB.
