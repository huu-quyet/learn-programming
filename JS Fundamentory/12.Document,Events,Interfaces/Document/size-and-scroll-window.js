// Width/height of the window
// To get window width and height, we can use the clientWidth/clientHeight of document.documentElement:
document.documentElement.clientHeight;
document.documentElement.clientWidth;

// Width/height of the document
// Theoretically, as the root document element is document.documentElement, and it encloses all the content, we could measure the document’s full size as document.documentElement.scrollWidth/scrollHeight.

// But on that element, for the whole page, these properties do not work as intended. In Chrome/Safari/Opera, if there’s no scroll, then documentElement.scrollHeight may be even less than documentElement.clientHeight! Weird, right?

// To reliably obtain the full document height, we should take the maximum of these properties:

let scrollHeight = Math.max(
  document.body.scrollHeight,
  document.documentElement.scrollHeight,
  document.body.offsetHeight,
  document.documentElement.offsetHeight,
  document.body.clientHeight,
  document.documentElement.clientHeight
);

alert("Full document height, with scrolled out part: " + scrollHeight);

// ---------------Current scroll----------------------------
window.scrollX;
window.scrollY;

// ---------------Scrolling: scrollTo, scrollBy, scrollIntoView-----------------
window.scrollTo(pageX, pageY); // – absolute coordinates,
window.scrollBy(x, y); // – scroll relative the current place,
elem.scrollIntoView(top); // – scroll to make elem visible (align with the top/bottom of the window).
