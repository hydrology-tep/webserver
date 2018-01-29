L.Control.MousePosition = L.Control.extend({
  options: {
    position: 'bottomleft',
    separator: ' : ',
    emptyString: 'Unavailable',
    lngFirst: false,
    numDigits: 5,
    lngFormatter: undefined,
    latFormatter: undefined,
    prefix: ""
  },

  onAdd: function (map) {
    this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
    L.DomEvent.disableClickPropagation(this._container);
    map.on('mousemove', this._onMouseMove, this);
    this._container.innerHTML=this.options.emptyString;
    return this._container;
  },

  onRemove: function (map) {
    map.off('mousemove', this._onMouseMove)
  },

  _onMouseMove: function (e) {
	  var self = this;
	  if (!this.timeout){
		  this.timeout = setTimeout(function(){
			    var lng = self.options.lngFormatter ? self.options.lngFormatter(e.latlng.lng) : L.Util.formatNum(e.latlng.lng, self.options.numDigits);
			    var lat = self.options.latFormatter ? self.options.latFormatter(e.latlng.lat) : L.Util.formatNum(e.latlng.lat, self.options.numDigits);
			    var value = self.options.lngFirst ? lng + self.options.separator + lat : lat + self.options.separator + lng;
			    var prefixAndValue = self.options.prefix + ' ' + value;
			    self._container.innerHTML = prefixAndValue;
			    self.timeout = null;
		  }, 50);
	  }
  }

});

L.Map.mergeOptions({
    positionControl: false
});

L.Map.addInitHook(function () {
    if (this.options.positionControl) {
        this.positionControl = new L.Control.MousePosition();
        this.addControl(this.positionControl);
    }
});

L.control.mousePosition = function (options) {
    return new L.Control.MousePosition(options);
};
