L.CanvasDataLayer
=================

Combined canvas and data loading layer for [Leaflet](http://leafletjs.com/).

There are several options for bitmap tile loading and also support for canvas tiles.
This plugin combines a canvas tile layer wit XHR data tile loading.

Usage:

~~~html
<!-- include the script after Leaflet.js -->
<script src="L.CanvasDataLayer.js"></script>
~~~
~~~javascript
/**
 *initialization
 * @param {string} - url template to your data tile source
 * @param {object} - extra options, compatible with L.TileLayer.Canvas (http://leafletjs.com/reference.html#tilelayer-canvas)
 */
var layer = new L.CanvasDataLayer('http://geojson.example.com/{z}/{x}/{y}.json', {});

// implement a drawTile method
// @param {HTmlCanvasElement} - canvas of current tile
// @param {object} - coordinates { x,y,z } of current tile
// @param {string} - XMLHttpRequest.responseText
layer.drawTile = function(canvas, coords, responseText) {
  var geojson = JSON.parse(responseText);
  // draw commands...
};
~~~
