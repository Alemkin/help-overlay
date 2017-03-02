# Dynamic SVG Help Overlay plugin
A JQuery plugin allowing for dynamic help overlays which draws
SVG arrows with text attached, pointing to dom elements specified. 

## Required Libraries:
* JQuery (Yep that's it!)

## Steps to implement:
1. Download the helpOverlay.js file and include on your page like so:
	* ```<script src="assets/js/helpOverlay.js"/> ```
1. Attach ids to the dom elements you wish to provide helpful tips for
2. Create some sort of dom element for the user to interact with, in order to trigger the help overlay, such as a button, my favorite is as such, using a font library:
	* ``` <a class="fa fa-question-circle" id="triggerHelp"></a> ```
3. Put a click listener on the created 'button' that implements the library for each of the dom elements, as explained in the example.

## Example Code:
```javascript
$('#triggerHelp').on('click', function() {
  helpOverlay.addLabelTo($('#id1'), "This tab does nothing.", "bottomright", 2);
  helpOverlay.addLabelTo($('#id2'), "This shows you your name.", "topleft", 2);
  helpOverlay.addLabelTo($('#id3'), "Click here to pay.", "bottomleft", 2, 35, 25);
});
```
The click listener is on a button or link of some sort, represented by '#triggerHelp' id, and when hit, you simply add a label to each of the elements via the method above. 

The library will automatically attach an svg overlay with a listener to close on click for you.

Feel free to change any and all about this when you implement it to fit your needs.

## Parameters:
```javascript
addLabelTo = function (dom, label, pos, length, xaway, yaway)
```
* dom = JQuery dom element to attach SVG arrow to
* label = Text appearing next to the SVG arrow
* pos = ' topleft',  'topright', 'bottomleft', 'bottomright'
* length = Total length of the arrow
* xaway = The bend length along the x axis of the arrow
* yaway = The bend length along the y axis of the arrow
