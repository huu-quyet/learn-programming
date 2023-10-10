// Browser default actions
// Many events automatically lead to certain actions performed by the browser.
// For instance:
//  -   A click on a link – initiates navigation to its URL.
//  -   A click on a form submit button – initiates its submission to the server.
//  -   Pressing a mouse button over a text and moving it – selects the text.
// If we handle an event in JavaScript, we may not want the corresponding browser action to happen, and want to implement another behavior instead.

// Preventing browser actions
// There are two ways to tell the browser we don’t want it to act:
//  -   The main way is to use the event object. There’s a method event.preventDefault().
//  -   If the handler is assigned using on<event> (not by addEventListener), then returning false also works the same.
// The optional passive: true option of addEventListener signals the browser that the handler is not going to call preventDefault().
