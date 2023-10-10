// -----------------addEventListener-------------------------
// element.addEventListener(event, handler, [options]);
//  -   event: Event name, e.g. "click".
//  -   handler: The handler function.
//  -   options: An additional optional object with properties:
//          +   once: if true, then the listener is automatically removed after it triggers.
//          +   capture: the phase where to handle the event, to be covered later in the chapter Bubbling and capturing. For historical reasons, options can also be false/true, that’s the same as {capture: false/true}.
//          +   passive: if true, then the handler will not call preventDefault(), we’ll explain that later in Browser default actions.

// To remove the handler, use removeEventListener:
// element.removeEventListener(event, handler, [options]);
// We can add multiple event by addEventListener()
elem.onclick = () => alert("Hello");
elem.addEventListener("click", handler1); // Thanks!
elem.addEventListener("click", handler2); // Thanks again!

// addEventListener supports objects as event handlers. In that case the method handleEvent is called in case of the event.
<button id="elem">Click me</button>;

class Menu {
  handleEvent(event) {
    // mousedown -> onMousedown
    let method = "on" + event.type[0].toUpperCase() + event.type.slice(1);
    this[method](event);
  }

  onMousedown() {
    elem.innerHTML = "Mouse button pressed";
  }

  onMouseup() {
    elem.innerHTML += "...and released.";
  }
}

let menu = new Menu();
elem.addEventListener("mousedown", menu);
elem.addEventListener("mouseup", menu);
