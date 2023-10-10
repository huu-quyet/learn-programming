// We can not only assign handlers, but also generate events from JavaScript.

// -----------Event constructor-------------------
// We can create Event objects like this:

let event = new Event(type, [options]);
// Arguments:
//  -   type – event type, a string like "click" or our own like "my-event".
//  -   options – the object with two optional properties:
//      +   bubbles: true/false – if true, then the event bubbles.
//      +   cancelable: true/false – if true, then the “default action” may be prevented.
//      By default both are false: {bubbles: false, cancelable: false}.

// ---------------dispatchEvent-------------------
// After an event object is created, we should “run” it on an element using the call elem.dispatchEvent(event).
// Then handlers react on it as if it were a regular browser event. If the event was created with the bubbles flag, then it bubbles.
// In the example below the click event is initiated in JavaScript. The handler works same way as if the button was clicked:

// <button id="elem" onclick="alert('Click!');">Auto click</button>

// <script>
//   let event = new Event("click");
//   elem.dispatchEvent(event);
// </script>
// event.isTrusted
// There is a way to tell a “real” user event from a script-generated one.

// The property event.isTrusted is true for events that come from real user actions and false for script-generated events.

// ------------------Custom events ------------------------
// Technically CustomEvent is the same as Event, with one exception.
// In the second argument (object) we can add an additional property detail for any custom information that we want to pass with the event.
<h1 id="elem">Hello for John!</h1>;
// additional details come with the event to the handler
elem.addEventListener("hello", function (event) {
  alert(event.detail.name);
});

elem.dispatchEvent(
  new CustomEvent("hello", {
    detail: { name: "John" },
  })
);

// The detail property can have any data. Technically we could live without, because we can assign any properties into a regular new Event object after its creation. But CustomEvent provides the special detail field for it to evade conflicts with other event properties.
// Besides, the event class describes “what kind of event” it is, and if the event is custom, then we should use CustomEvent just to be clear about what it is.

// Please note: the event must have the flag cancelable: true, otherwise the call event.preventDefault() is ignored.

// ---------------Events-in-events are synchronous-------------------------
// Usually events are processed in a queue.
<button id="menu">Menu (click me)</button>;

menu.onclick = function () {
  alert(1);

  menu.dispatchEvent(
    new CustomEvent("menu-open", {
      bubbles: true,
    })
  );

  alert(2);
};

// triggers between 1 and 2
document.addEventListener("menu-open", () => alert("nested"));
// The output order is: 1 → nested → 2.

// Please note that the nested event menu-open is caught on the document. The propagation and handling of the nested event is finished before the processing gets back to the outer code (onclick).

// That’s not only about dispatchEvent, there are other cases. If an event handler calls methods that trigger other events – they are processed synchronously too, in a nested fashion.
