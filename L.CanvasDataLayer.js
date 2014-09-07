
L.CanvasDataLayer = L.TileLayer.extend({

  _items: {},

  _loadTile: function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        return;
      }

      if (!xhr.status || xhr.status < 200 || xhr.status > 299) {
        return;
      }

      callback(xhr.responseText);
    }

    xhr.open('GET', url, true);
    xhr.send(null);
  },
  
  _removeTile: function(key) {
    delete this._items[this._map.getZoom()][key];
    L.TileLayer.prototype._removeTile.call(this, key);
  },

  _createCanvas: function(size) {
    var
      canvas = document.createElement('CANVAS'),
      context = canvas.getContext('2d');
    canvas.width = size || 0;
    canvas.height = size || 0;
    canvas.style.width = canvas.width +'px';
    canvas.style.height = canvas.height +'px';
    return canvas;
  },

	createTile: function (coords, done) {
    var canvas = this._createCanvas(this._getTileSize());

		// onload = this._tileOnLoad(done, tile);
		// onerror = this._tileOnError(done, tile);

    var self = this;
    this._loadTile(this.getTileUrl(coords), function(data) {
      var
        key = self._tileCoordsToKey(coords),
        zoom = self._map.getZoom();

      (self._items[zoom] || (self._items[zoom] = []))[key] = { data:data, canvas:canvas };
      self.drawTile(canvas, coords, data);
    });

    return canvas;
  },

  redraw: function(forceReload) {
    if (!!forceReload) {
      L.TileLayer.prototype.redraw.call(this);
      return this;
    }

    var
      mapBounds = this._map.getPixelBounds(),
      tileSize = this._getTileSize(),
      tileBounds = L.bounds(
        mapBounds.min.divideBy(tileSize).floor(),
        mapBounds.max.divideBy(tileSize).floor()
      ),
      items = this._items[this._map.getZoom()];

    for (var key in items) {
      this.drawTile(items[key].canvas, coords, items[key].data);
    }

    return this;
  },

  drawTile: function() {}

});
