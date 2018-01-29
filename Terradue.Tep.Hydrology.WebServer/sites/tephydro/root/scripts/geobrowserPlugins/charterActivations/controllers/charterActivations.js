define([
	'jquery',
	'can',
	'underscore',
	'utils/helpers',
	'geobrowser/featureDescriptorControl',
	'leaflet',
	'leafletMarkerCluster'
], function(
	$,
	can,
	_,
	Helpers,
	FeatureDescriptorControl
){
	

return can.Construct.extend({
	
	
	init: function(options){
		this.geobrowserMap = options.geobrowserMap;
		this.map = options.geobrowserMap.map;
		this.catalogueControl = options.catalogueControl;
		this.markersOverlay = new L.MarkerClusterGroup();
		this.layerName = (options.layerName ? options.layerName : 'Charter Activations');
		this.dataUrl = (options.dataUrl ? options.dataUrl : '/t2api/disastercharter');
		
		this.initMarkerIcons();
		
		var firstTime = true;
		var self = this;
		
		// not show the opacity slider for this layer
		this.markersOverlay.disableOpacitySlider = true;

		this.markersOverlay.geobrowserData = {
			credits: '<a href="https://github.com/jjrom/mapshup/tree/master/server/plugins/disasterschartercatalog.org" target="_blank">Disaster Charter</a>'
		};
		
		this.geobrowserMap.layersControl.addOverlay(this.markersOverlay, this.layerName);
		
		if (options.isActive) // load immediately
			self.loadMarkers();
		else
			this.map.on('overlayadd', function(ev){ // load only when layer activated
				if (ev.name!=self.layerName || !firstTime) return;
				
				firstTime = false;
				self.loadMarkers();
				
			});
	
	},
	
	initMarkerIcons: function(){
		
		this.markerOptions = {};
		
		var disasterTypes = ["floods", "volcanoes", "fires", "cyclones", "oilspills", "other", "landslide", "earthquakes", "ocean_wave", "ice"];
		var iconType = 2;
		var self = this;
		
		$.each(disasterTypes, function(){
			self.markerOptions[this] = new L.Icon({
				iconUrl: '/scripts/geobrowserPlugins/charterActivations/img/' + this + iconType + '.png',
				iconSize:     [32, 37], // size of the icon
				iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
				popupAnchor:  [0,-30] // point from which the popup should open relative to the iconAnchor
			});
		});
	},
	
	loadMarkers: function(){
		var self = this;
		var $loader = $('<div class="osn-subLoader"><i class="fa fa-spin fa-spinner"></i> Loading disasters charter...</div>')
			.css({
				position: 'absolute',
				top: '17px',
				color: '#555',
				right: '58px',
				'font-size': '11px',
				'background-color': 'white',
				padding: '2px',
				border: '2px solid',
				'border-color': 'white',
				'border-radius': '7px',
				'box-shadow': '1px 1px 1px #888888'
			})
			.hide()
			.appendTo(this.geobrowserMap.element)
			.fadeIn();
		
		// add layer to the map
		this.map.addLayer(this.markersOverlay);
		
		// load data
		$.getJSON(this.dataUrl, function(data) {
			self.showMarkers(data);
			$loader.fadeOut();
		});
		
	},
	
	showMarkers: function(data){
		var gj = {
			features: [],
			properties: {
				totalResults: data.length
			},
			type:'FeatureCollection'
		};
		var self = this;
		var mainOpensearch = this.catalogueControl.mainOpensearch; // TODO improve
		
		$.each(data, function(i, d){
			d.link = 'https://www.disasterscharter.org' + d.link;
			if (d.latitude && d.longitude && d.latitude!='' && d.longitude!=''){
				gj.features.push({
					type: "Feature",
					properties: d,
					geometry: {
						"type": "Point",
						"coordinates": [d.longitude, d.latitude],
					},
					id: d.id,
				});
			}
		});

		var geojson = L.geoJson(gj, {
			
			style: function (feature) {
				return { color: feature.properties.color };
			},

			onEachFeature: function (feature, layer) {
				var $div = $('<div class="featurePopupContent">');
	    		new FeatureDescriptorControl($div, {
	    			feature: feature,
	    			view: '/scripts/geobrowserPlugins/charterActivations/views/charterActivationDescriptor.html',
	    			setFilterParameters: function(parameters){
	    				mainOpensearch.setSearchParameters(parameters, true);
	    			},
	    			getTimeParameters: function(feature){
						return {
							'time:start': moment(feature.properties.formatedDate).subtract(1, 'month').toISOString(), // 1 month before
							'time:end': timeEnd = moment(feature.properties.formatedDate).add(1, 'month').toISOString() // 1 month later
						};
	    			},
	    			getSpatialParameters: function(feature){
	    				return {
	    					'geo:geometry': "POINT("+feature.geometry.coordinates[0]+" "+feature.geometry.coordinates[1]+")"
	    				}
	    			},
	    			hasDateAndGeometry: function(feature){
	    				return (feature.geometry.coordinates!=null && feature.properties.formatedDate!=null)
	    			}
	    		});

				layer.bindPopup($div.get(0));
			},
			
			pointToLayer: function (feature, latlng) {
				if (self.markerOptions[feature.properties.type])
					return L.marker(latlng, {icon: self.markerOptions[feature.properties.type]});
				else
					return L.marker(latlng);
		    }
			
		});
		this.markersOverlay.addLayer(geojson);
	}

}); // can.Construct

}); // define