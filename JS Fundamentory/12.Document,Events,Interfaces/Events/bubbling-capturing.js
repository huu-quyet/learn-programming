// --------------Bubbling--------------------------
// When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors.
<form onclick="alert('form')">
  FORM
  <div onclick="alert('div')">
    DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>;
// A click on the inner <p> first runs onclick:
//  1.  On that <p>.
//  2.  Then on the outer <div>.
//  3.  Then on the outer <form>.
//  4.  And so on upwards till the document object.
// --------> So if we click on <p>, then we’ll see 3 alerts: p → div → form.

// ----------------event.target and event.currentTarget--------------------
// Note the differences from this (=event.currentTarget):
//  -   event.target – is the “target” element that initiated the event, it doesn’t change through the bubbling process.
//  -   this – is the “current” element, the one that has a currently running handler on it.

// ----------------Stopping bubbling---------------------------------
// A bubbling event goes from the target element straight up. Normally it goes upwards till <html>, and then to document object, and some events even reach window, calling all handlers on the path.
// But any handler may decide that the event has been fully processed and stop the bubbling.
// The method for it is event.stopPropagation().

// event.stopImmediatePropagation()
// If an element has multiple event handlers on a single event, then even if one of them stops the bubbling, the other ones still execute.
// In other words, event.stopPropagation() stops the move upwards, but on the current element all other handlers will run.
// To stop the bubbling and prevent handlers on the current element from running, there’s a method event.stopImmediatePropagation(). After it no other handlers execute.

// ----------------Capturing--------------------------
// There’s another phase of event processing called “capturing”. It is rarely used in real code, but sometimes can be useful.
// The standard DOM Events describes 3 phases of event propagation:
//  1.  Capturing phase – the event goes down to the element.
//  2.  Target phase – the event reached the target element.
//  3.  Bubbling phase – the event bubbles up from the element.

// Until now, we only talked about bubbling, because the capturing phase is rarely used.

// In fact, the capturing phase was invisible for us, because handlers added using on<event>-property or using HTML attributes or using two-argument addEventListener(event, handler) don’t know anything about capturing, they only run on the 2nd and 3rd phases.

// To catch an event on the capturing phase, we need to set the handler capture option to true:

// elem.addEventListener(..., {capture: true})

// // or, just "true" is an alias to {capture: true}
// elem.addEventListener(..., true)
// There are two possible values of the capture option:

// If it’s false (default), then the handler is set on the bubbling phase.
// If it’s true, then the handler is set on the capturing phase.
