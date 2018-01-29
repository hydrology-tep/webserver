// BY CERAS

// to not show an opacity slider for a layer, simply set noOpacitySlider = true on the layer

L.Control.Layers2 = L.Control.Layers.extend({
	
	_addItem: function (obj) {
		var label = document.createElement('label'),
		    checked = this._map.hasLayer(obj.layer),
		    input;

		if (obj.overlay) {
			input = document.createElement('input');
			input.type = 'checkbox';
			input.className = 'leaflet-control-layers-selector';
			input.defaultChecked = checked;
		} else {
			input = this._createRadioElement('leaflet-base-layers', checked);
		}
		
		input.layerId = L.stamp(obj.layer);

		L.DomEvent.on(input, 'click', this._onInputClick, this);

		var name = document.createElement('span');
		name.innerHTML = ' ' + obj.name;

		label.appendChild(input);
		label.appendChild(name);
		
		//// ceras code
		var self = this;
		var $slider;
		if (obj.overlay && obj.layer && !obj.layer.disableOpacitySlider){
			var l = obj.layer;
			
			if (!l.sliderValue){
				if (l.options && l.options.opacity)
					l.sliderValue = l.options.opacity * 100;
				else if (l._container && l._container.style)
					l.sliderValue = l._container.style.opacity * 100;
				else
					l.sliderValue = 100;
			}
			
			$slider = $('<div class="opacitySlider">').hide().slider({
				change: function(e, slider){
					l.sliderValue = slider.value;
					self._changeOpacityLayer(l, slider.value/100);
				},
				value: l.sliderValue
			});

			var $buttonContainer = $('<div class="opacityButtonContainer">');
			var $button = $('<a class="opacityButton" title="set layer opacity" href="javascript://"><i class="fa fa-adjust"></i></a>')
				.appendTo($buttonContainer)
				.click(function(e){
					if ($slider.is(':visible'))
						$slider.hide();
					else
						$slider.show();
				});
			label.appendChild($buttonContainer.get(0));
			
		}
		//// end ceras code

		var container = obj.overlay ? this._overlaysList : this._baseLayersList;
		container.appendChild(label);
		
		
		//// ceras code
		if ($slider)
			container.appendChild($slider.get(0));
		//// end ceras code

		
		return label;
	},
	
	_changeOpacityLayer: function(layer, opacity){
		if (layer.setOpacity)
			layer.setOpacity(opacity);
		else{
			var layers = this._getSubLayersRecursive(layer);
			var $elements = $($.map(layers, function(l){
				if (l.setOpacity)
					l.setOpacity(opacity);
				return l._container;
			}));
			$elements.css('opacity', opacity)
		}
	},
	
	_getSubLayersRecursive: function(layer){
		var self = this;
		if (layer.getLayers){
			var layersList = [];
			$.each(layer.getLayers(), function(){
				layersList = layersList.concat(self._getSubLayersRecursive(this));
			});
			return layersList;
		} else
			return [layer]; // base case
	}


});

L.control.layers2 = function (baseLayers, overlays, options) {
	return new L.Control.Layers2(baseLayers, overlays, options);
};