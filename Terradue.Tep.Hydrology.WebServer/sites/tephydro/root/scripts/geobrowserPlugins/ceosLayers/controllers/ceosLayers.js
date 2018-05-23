define([
	'jquery',
	'can',
	'underscore',
	'utils/helpers',
	'leaflet',
	'leafletMarkerCluster'
], function(
	$,
	can,
	_,
	Helpers
){
	
return can.Construct.extend({
	
	init: function(options){
		this.geobrowserMap = options.geobrowserMap;
		this.map = options.geobrowserMap.map;
		
		if (!options.layerOptions || options.layerOptions==true)
			options.layerOptions = {
				floods: true,
				seismic: true,
				volcanoes: true
			};
		
		this.data = {};
		
		var self = this;

		var layersInfo = [{
			name: 'CEOS seismic (World Mask)',
			url: '/scripts/geobrowserPlugins/ceosLayers/data/seismic.geojson',
			style: {
				color: 'black',
				weight: 2,
				opacity: 0.7
			},
			enabled: options.layerOptions.seismic
		},{
			name: 'CEOS volcanoes',
			url: '/scripts/geobrowserPlugins/ceosLayers/data/volcanoes.geojson',
			style: {
				color: 'black',
				fillColor: 'red',
				weight: 1,
				opacity: 0.9,
				fillOpacity: 0.6
			},
			enabled: options.layerOptions.volcanoes
		},{
			name: 'CEOS floods',
			url: '/scripts/geobrowserPlugins/ceosLayers/data/floods.geojson',
			style: {
				color: 'blue',
				weight: 1,
				opacity: 0.7
			},
			enabled: options.layerOptions.floods
		}];
		
		$.each(layersInfo, function(i, layerInfo){
			if (!layerInfo.enabled)
				return true;
			
			layerInfo.geojson = L.geoJson(null, {
				style: layerInfo.style,
				pointToLayer: function(f, latlng){
					return L.circleMarker(latlng, { radius: 5 });
				}
			});
			layerInfo.geojson.geobrowserData = {credits: '<a href="http://ceos.org/" target="_blank">CEOS</a> &copy; 2012'}
			layerInfo.geojson.hasStylesControls = true;
			layerInfo.firstLoad = true;
			
			self.geobrowserMap.layersControl.addOverlay(layerInfo.geojson, layerInfo.name);
			self.map.on('overlayadd', function(ev){ // load only when layer activated
				
				if (ev.name != layerInfo.name || !layerInfo.firstLoad) return;
				
				layerInfo.firstLoad = false;
				
				$.getJSON(layerInfo.url, function(data){
					layerInfo.geojson.addData(data);
				});
				
			});
			
			if (Helpers.isTrue(options[layerInfo.name]))
				self.map.addLayer(layerInfo.geojson);
			
		});
		
	},
	
//	initFloodsLayer: function(){
//		this.floodsLayer = L.featureGroup();
//		this.geobrowserMap.layersControl.addOverlay(geojsonLayer, fileName);
//	},
//	
//	initSeismicLayer: function(){
//		
//	},
//	
//	initVolcanoesLayer: function(){
//		
//	},
	
	

}); // can.Construct

}); // define