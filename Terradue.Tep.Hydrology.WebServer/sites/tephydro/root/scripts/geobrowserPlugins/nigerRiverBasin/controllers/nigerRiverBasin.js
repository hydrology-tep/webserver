define([
	'jquery',
	'can',
	'underscore',
	'utils/helpers',
	'utils/geoUtils',
	'geobrowser/featureDescriptorControl',
	'leaflet',
	'leafletExpandibleControl'

], function(
	$,
	can,
	_,
	Helpers,
	GeoUtils,
	FeatureDescriptorControl
){
	
var defaultOptions = {
	subBasinStyle: {
		color: 'green',
		weight: 2,
		opacity: 0.8
	},
	previousSubBasinStyle: {
		color: 'lightgreen',
		weight: 1,
		fillOpacity: 0,
		opacity: 0.6
	},
	upstreamStyle: {
		color: 'yellow',
		weight: 1,
		opacity: 0.4
	}
}
	
return can.Construct.extend({
	
	init: function(options){
		this.options = options = $.extend(true, {}, defaultOptions, options);
		this.geobrowserMap = options.geobrowserMap;
		this.map = options.geobrowserMap.map;
		this.layersControl = options.geobrowserMap.layersControl;
		this.catalogueControl = options.catalogueControl;
		this.owsTheme = options.owsTheme;
		
		this.data = {};
		this.path = '/scripts/geobrowserPlugins/nigerRiverBasin/';
		
		var self = this;
		
		this.initLayers();
		this.initLegend();
		this.initAreaOfInterest();
		this.bindClickOnMap();
	},
	
	initLayers: function(){
		this.subBasinLayer = new L.FeatureGroup();
		this.layersControl.addOverlay(this.subBasinLayer, 'Selected sub basin');
		this.map.addLayer(this.subBasinLayer);
		
		this.upstreamLayer = new L.FeatureGroup();
		this.layersControl.addOverlay(this.upstreamLayer, 'Upstream area'); 
		this.map.addLayer(this.upstreamLayer);
		
	},
	
	initLegend: function(){
		var html = ''
			+ '<div id="nigerRiverBasin-legends" class="legends">'
			+ '	<div class="legend unselectable">'
			+ '		<div>'
			+ '			<img id="legendimg" src="'+this.path+'img/green_box.png">'
			+ '			Selected sub-basin'
			+ '		</div>'
			+ '		<div>'
			+ '			<img id="legendimg" src="'+this.path+'img/yellow_box.png">'
			+ '			Upstream area'
			+ '		</div>'
			+ '	</div>'
			+ '	<div class="background-legend unselectable">'
			+ '		<img src="'+this.path+'img/niger_legend.png">'
			+ '	</div>'
			+ '</div>';		
		var legend = L.control({position: 'bottomright'});
		
		var $div = $(html);
		
		legend.onAdd = function (map) {
		    return $div.get(0);
		};
		
		GeoUtils.stopMapInteractionOnElement($div);

		legend.addTo(this.map);
	},
	
	initAreaOfInterest: function(){
		try {
			// try to take the aoi from the feature geometry
			this.aoi = L.geoJson(this.owsTheme.features[0]);
		} catch(e){
			// fail case, with default aoi
			this.aoi = L.rectangle([[24.267, -12.568],[3.755, 15.952]]);
		}
		this.aoi.setStyle({ color: 'blue', fillOpacity: 0, dashArray: '5px 5px', weight: '3px' });
		this.aoi.addTo(this.map);
		this.map.fitBounds(this.aoi.getBounds());
	},
	
	bindClickOnMap: function(){
		var self = this;
		this.aoi.on('click', function(ev){
			self.searchData(ev.latlng);
		});
	},
	
	searchData: function(latlng){
		var self = this;
		
		// abort previous search
		if (this.xhrSearch && this.xhrSearch.state()=='pending')
			this.xhrSearch.abort();
		
		App.clipboard.unset('nigerRiverBasin:basinId');
		
		this.geobrowserMap.loadMask();
		this.xhrSearch = $.getJSON('/t2api/nigerhype/click?n='+latlng.lat+'&e='+latlng.lng);
		this.xhrSearch.then(function(json){
			self.geobrowserMap.loadUnmask();
			
			if (json)
				self.showData(json);
			else
				Messenger().post({
					message: 'No data found on this point.',
					type: 'error',
					showCloseButton: true
				});

		}).fail(function(xhr){
			self.geobrowserMap.loadUnmask();
			if (xhr.status==200)
				Messenger().post({
					message: 'No data found on this point.',
					type: 'error',
					showCloseButton: true
				});
			else
				Messenger().post({
					message: 'Request error. Unable to load data from this point.',
					type: 'error',
					showCloseButton: true
				});
		});
	},
	
	showData: function(json){
		// show sub basin
		this.showSubBasin(json.geograhpy);
		
		// show upstream
		this.showUpstream(json.upstreamGeograhpy);
		
		// set the sub basin id into the geobrowser clipboard
		try{
			App.clipboard.set('nigerRiverBasin:basinId', json.geograhpy.features[0].properties.subBasinId, null, 'sub basin id');
		} catch(e){
			console.error('error', e);
		}
	},
	
	showSubBasin: function(geoJSON){
		
		// setup properties
		geoJSON.features[0].properties = {
			subBasinId: geoJSON.features[0].properties,
			title: 'Selected Sub Basin'
		};
		
		// remove layers
		this.subBasinLayer.clearLayers();
		
		var layer = L.geoJson(geoJSON, {
		    style: this.options.subBasinStyle
		});
		this.subBasinLayer.addLayer(layer);
		
		this.setPopup(geoJSON, layer);
	},
	
	showUpstream: function(geoJSON){
		
		// remove layers
		this.upstreamLayer.clearLayers();
		
		if (!geoJSON.features[0])
			return;
		
		// setup properties
		geoJSON.features[0].properties = {
			subBasinId: geoJSON.features[0].properties,
			title: 'Upstream Area'
		};

		
		var layer = L.geoJson(geoJSON, {
		    style: this.options.upstreamStyle
		});
		this.upstreamLayer.addLayer(layer);
		
		this.setPopup(geoJSON, layer);
	},
	
	// layer popup
	setPopup: function(geoJSON, layer){
		var mainOpensearch = this.catalogueControl.mainOpensearch; // TODO improve
		var feature = geoJSON.features[0];
		
		// get the simplified layer geo geometry
		var ll = GeoUtils.getSubLayersRecursive(layer)[0];
		var simplifiedLayer = GeoUtils.simplifyPolygon(ll, 50);
		var geometry = GeoUtils.layerToGeometry(simplifiedLayer, 3);
		
		// get the popup html
		var $div = $('<div class="featurePopupContent riverBasinPopupContent">');
		new FeatureDescriptorControl($div, {
			feature: feature,
			view: '/scripts/geobrowserPlugins/nigerRiverBasin/views/basinDescriptor.html',
			setFilterParameters: function(parameters){
				mainOpensearch.setSearchParameters(parameters, true);
			},
			getSpatialParameters: function(feature){
				return {
					'geo:geometry': geometry
				}
			},
			hasDateAndGeometry: function(feature){
				return (feature.geometry.coordinates!=null && feature.properties.formatedDate!=null)
			}
		});

		layer.bindPopup($div.get(0));
	}
	
}); // can.Construct

}); // define