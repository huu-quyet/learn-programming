// Scripts: async, defer
// In modern websites, scripts are often “heavier” than HTML: their download size is larger, and processing time is also longer.
// When the browser loads HTML and comes across a <script>...</script> tag, it can’t continue building the DOM. It must execute the script right now. The same happens for external scripts <script src="..."></script>: the browser must wait for the script to download, execute the downloaded script, and only then can it process the rest of the page.
// That leads to two important issues:
//  1.  Scripts can’t see DOM elements below them, so they can’t add handlers etc.
//  2.  If there’s a bulky(cồng kềnh) script at the top of the page, it “blocks the page”.

// ------------------defer------------------------------
// The defer attribute tells the browser not to wait for the script. Instead, the browser will continue to process the HTML, build DOM. The script loads “in the background”, and then runs when the DOM is fully built.
// In other words:
//  -   Scripts with defer never block the page.
//  -   Scripts with defer always execute when the DOM is ready (but before DOMContentLoaded event).

// -------------------async--------------------------------
// The async attribute is somewhat like defer. It also makes the script non-blocking. But it has important differences in the behavior.
// In other words, async scripts load in the background and run when ready. The DOM and other scripts don’t wait for them, and they don’t wait for anything. A fully independent script that runs when loaded.

// In practice, defer is used for scripts that need the whole DOM and/or their relative execution order is important.

// And async is used for independent scripts, like counters or ads. And their relative execution order does not matter.
