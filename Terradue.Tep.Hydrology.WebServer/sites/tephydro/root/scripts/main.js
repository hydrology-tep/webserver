
//main require
require.config({
	urlArgs: 'v=1.4',
	baseUrl: '/scripts', 
	waitSeconds: 14, // set 14 seconds of timeout instead default 7.
	paths: {
		jquery: 'libs/jquery/jquery-1.10.2',
		jqueryUI: 'libs/jquery-ui/jquery-ui-1.10.3.custom.min',
		jqueryValidate: 'libs/jquery.validate/js/jquery.validate',//.additional-methods.js
		jqueryValidatePasswordExtension: 'libs/jquery.validate.passwordExtension/jquery.validate.passwordExtension',//.additional-methods.js
		jqueryNamespace: 'libs/jquery.namespace/js/jqueryNamespace',
		underscore: 'libs/underscore/underscore-min',
		bootstrap: 'libs/bootstrap/js/bootstrap.min',
		bootstrapHoverDropdown: 'libs/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min2',
		bootstrapFileUpload: 'libs/bootstrap-fileupload/bootstrap-fileupload.min',
		bootstro: 'libs/bootstro/bootstro',
		ajaxFileUpload: 'libs/ajaxFileUpload/ajaxfileupload',
		bootbox: 'libs/bootbox/bootbox.min',
		loadmask: 'libs/jquery.loadmask/jquery.loadmask.min',
		can: 'libs/canjs/can.jquery',
		supercan: 'libs/canjs/can.construct.super',
		canpromise: 'libs/canjs/can.list.promise',
		underscorestring: 'libs/underscore/underscore.string.min',
		skrollr: 'libs/skrollr/skrollr.min',
		moment: 'libs/moment/moment.min',
		cookie: 'libs/jquery.cookie/jquery.cookie',
		jsonTable: 'libs/jquery.jsonTable/js/jsonTable',
		messenger: 'libs/messenger/js/messenger.min',
		messengerThemeFlat: 'libs/messenger/js/messenger-theme-flat',
		jqrange: 'libs/jqrange/js/jQAllRangeSliders-min',
		prettify: 'libs/prettify/js/prettify',
		browserDetector: 'libs/browserDetector/browserDetector',
		droppableTextarea: 'libs/jquery.droppableTextarea/js/jquery.droppableTextarea',
		dropzone: 'libs/dropzone/dropzone-amd-module',
		datePicker: 'libs/datePicker/js/bootstrap-datepicker',
		dataTables: 'libs/jquery.dataTables/js/jquery.dataTables.min',
		clipboardjs: 'libs/clipboardjs/clipboard',
		jqueryCopyableInput: 'libs/jquery.copyableInput/js/jquery.copyableInput',
		leaflet: 'libs/leaflet 0.7.7/leaflet',
		leafletDraw: 'libs/leaflet.draw/js/leaflet.draw',
		mapbox: '//api.mapbox.com/mapbox.js/v2.3.0/mapbox.standalone',
		opensearchFormIt: 'libs/jquery.opensearchFormIt/js/opensearchFormIt',
		opensearchSlurper: 'libs/opensearchSlurper/js/opensearchSlurper',
		select2: 'libs/select2/js/select2'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		jqueryUI: ['jquery'],
		skrollr: ['jquery'],
		jqueryValidate: ['jquery'], 
		jqueryValidatePasswordExtension: ['jquery', 'jqueryValidate'],
		bootstrapFileUpload: ['jquery', 'bootstrap'], 
		bootstrap: ['jquery'],
		bootstrapHoverDropdown: ['jquery', 'bootstrap'],
		bootbox: ['jquery', 'bootstrap'],
		jqrange: ['jquery', 'jqueryUI'],
		cookie: ['jquery'],
		loadmask: ['jquery'],
		jsonTable: ['jquery'],
		messenger: ['jquery'],
		messengerThemeFlat: ['messenger'],
		ajaxFileUpload: ['jquery'],
		can: {
			deps: ['jquery'],
			exports: 'can'
		},
		clipboardjs: {
			exports: 'Clipboard'
		},
		supercan: ['can'],
		canpromise: ['can'],
		underscorestring: ['underscore'],
		datePicker: ['jquery', 'jqueryUI', 'bootstrap'],
		dataTables: ['jquery'],
		jqueryCopyableInput: ['clipboardjs', 'jquery'],
		leaflet: {
        	exports: 'L',
        },
        leafletDraw: ['leaflet'],
        mapbox: ['leaflet'],
        opensearchFormIt: [
		                   'jquery',
		                   'loadmask',
		                   'opensearchSlurper',
		                   'jqueryValidate',
		                   'datePicker'
		                   ],
		opensearchSlurper: ['jquery', 'jqueryNamespace'],
		jqueryNamespace: ['jquery'],
		select2: ['jquery']
	}
});

//init
require([
	'app',
	'router',
	'config',
	'utils/helpers'
], function(App, Router, Config, Helpers) {
	window.App = App;
	window.Helpers = Helpers;
	App.init(Config); // app init
	Router.init(); // router init
});

