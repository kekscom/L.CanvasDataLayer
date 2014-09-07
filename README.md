L.CanvasDataLayer
=================

Combined canvas and data loading layer for Leaflet.

There are several options for bitmap tile loading and also support for canvas tiles.
This plugin combines a canvas tile layer wit XHR data tile loading.

Usage:

~~~javascript

// initialize
// 1. parameter ais an url template to your data tile source
// 2. parameter are options, compatible with L.TileLayer.Canvas
var layer = new L.CanvasDataLayer('http://geojson.example.com/{z}/{x}/{y}.json', {});

// implement a drawTile method
// 1. parameter: canvas of current tile
// 2. parameter: coordinates { x,y,z } of current tile
// 3. XMLHttpRequest.responseText - process at will
layer.drawTile = function(canvas, coords, responseText) {
  var geojson = JSON.parse(responseText);
  // draw commands...
};

~~~
