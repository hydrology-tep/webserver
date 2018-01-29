/*
 * L.TileLayer is used for standard xyz-numbered tile layers.
 */

L.TileLayer.BoundedWMS = L.TileLayer.WMS.extend({

	initialize: function (url, options) { // (String, Object)

		this._url = url;

		var wmsParams = L.extend({}, this.defaultWmsParams),
		    tileSize = options.tileSize || this.options.tileSize;

		if (options.detectRetina && L.Browser.retina) {
			wmsParams.width = wmsParams.height = tileSize * 2;
		} else {
			wmsParams.width = wmsParams.height = tileSize;
		}

		for (var i in options) {
			// all keys that are not TileLayer options go to WMS params
			if (!this.options.hasOwnProperty(i) && i !== 'crs') {
				wmsParams[i] = options[i];
			}
		}

		this.wmsParams = wmsParams;

		L.setOptions(this, options);
		
		////my code
		if (options.demo){
			this.demo = {
				rectangles: [],
				zoom: null
			}
		}
		////end my code
	},

	_loadTile: function (tile, tilePoint) {
		tile._layer  = this;
		tile.onload  = this._tileOnLoad;
		tile.onerror = this._tileOnError;

		this._adjustTilePoint(tilePoint);
		
		
		//// my code
		var isToClip = false;
		if (this.options.bounds){
			var map = this._map;
			var tileSize = this.options.tileSize
			var nwPoint = tilePoint.multiplyBy(tileSize);
			var sePoint = nwPoint.add([tileSize, tileSize]);
			var nw = map.unproject(nwPoint, tilePoint.z);
			var se = map.unproject(sePoint, tilePoint.z);
			var layerBounds = this.options.bounds;
			var tileBounds = L.latLngBounds(se, nw);
			
			var bb = L.latLngBounds([[
			                          Math.max(tileBounds.getSouth(),layerBounds.getSouth()),
			                          Math.max(tileBounds.getWest(),layerBounds.getWest())
			                          ],
			                          [
			                           Math.min(tileBounds.getNorth(),layerBounds.getNorth()),
			                           Math.min(tileBounds.getEast(),layerBounds.getEast())
			                           ]]);
			isToClip = !bb.equals(tileBounds);
		}
		
		if (isToClip){
			// get the new width and height (in pixels)
			var pnw = map.latLngToContainerPoint(bb.getNorthWest());
			var pse = map.latLngToContainerPoint(bb.getSouthEast());
			var width = Math.abs(pse.x-pnw.x);
			var height = Math.abs(pse.y-pnw.y);
			
			var tilePnw = map.latLngToContainerPoint(tileBounds.getNorthWest());
			
			// check if the position must change and change the position if true
			var offsetX = pnw.x - tilePnw.x;
			var offsetY = pnw.y - tilePnw.y;
			if (offsetX || offsetY) {
				var tilePos = this._getTilePos(tilePoint).add([offsetX, offsetY]);
				L.DomUtil.setPosition(tile, tilePos, L.Browser.chrome);
				window.tile = tile;
			}
			
			tile.style.width = width + 'px';
			tile.style.height = height + 'px';
			
			tile.src     = this.getTileUrlBounded(tilePoint, bb, width, height);
			
		} else
			tile.src     = this.getTileUrl(tilePoint);
		
		
		// demo
		if (this.demo){			
			// remove previously rectangles
			if (map._zoom != this.demo.zoomLevel){
				while(r=this.demo.rectangles.pop())
					map.removeLayer(r);
				this.demo.zoomLevel = map._zoom; 
			}
			
			// rectangles drawing
			var r2 = L.rectangle(tileBounds, {color: 'black', fill: false, weight:1}).addTo(map);
			this.demo.rectangles.push(r2);
			var r = L.rectangle(bb, {color: isToClip ? 'yellow' : 'magenta', fillOpacity: 0.1, weight:1}).addTo(map);
			this.demo.rectangles.push(r);
		}
		
		this.fire('tileloadstart', {
			tile: tile,
			url: tile.src
		});
	},
	
	getTileUrlBounded: function (tilePoint, bb, width, height) { // (Point, Number) -> String

		var map = this._map;

		var nw = this._crs.project(bb.getNorthWest());
		var se = this._crs.project(bb.getSouthEast());
		var bbox = (this._wmsVersion >= 1.3 && this._crs === L.CRS.EPSG4326 ?
				[se.y, nw.x, nw.y, se.x].join(',') : 
					[nw.x, se.y, se.x, nw.y].join(','));
			
		var url = L.Util.template(this._url, {s: this._getSubdomain(tilePoint)});
		var newParams = L.Util.extend({}, this.wmsParams);
		newParams.width = width;
		newParams.height = height;
		return url + L.Util.getParamString(newParams, url, true) + '&BBOX=' + bbox;
	},

});

L.tileLayer.boundedWms = function (url, options) {
	return new L.TileLayer.BoundedWMS(url, options);
};
