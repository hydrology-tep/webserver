
define([
	'require',
	'jquery',
	'can',
	'underscore',
	'config',
	'utils/helpers',
	'bootbox',
	'bootstrap',
	'underscorestring',
	'messenger',
	'canpromise'
], function(require, $, can, _, Config, Helpers, bootbox) {
	
	//private properties
	var baseUrl = require.toUrl('./').toLowerCase().replace(/(\?).*/, '').replace('/./', '/');
	
	return {

		// controller cache
		controllers: [],

		// init
		init: function(options){
			
			Helpers.logoInConsole();
			window.gotoInnerLink = Helpers.gotoInnerLink;
			
			options = options || {};
			
			// set the identifier name
			can.Model.id = 'Id';
			
			// configure ajax requests
			$.ajaxSetup({
			    contentType : 'application/json',
			    //processData : true,
			});
			$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
			    if (!options.noPrefilter && options.type!='get' && options.type!='GET' && options.data && options.contentType!='application/xml')
			    	options.data=JSON.stringify(originalOptions.data);
			});
			
			// merge string plugin to underscore namespace
			_.mixin(_.str.exports());
			
			// set canjs view extension to nothing for extensionless view filenames
			can.view.ext = '';
			
			// set default template engine for can.view
			can.view.types[''] = can.view.types['.' + options.template || Config.template];
			
			// messenger init
			Messenger.options = {
			    extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
			    theme: 'flat'
			};
			
			//this.initErrorHandler(options);
		},
		
		loadController: function(controllerName, successCallback, errorCallback) {
			var self = this,
				_errorCallback = (errorCallback ? errorCallback : function(){
					self.errorMessage('Error', 'Error to load script ' + url);
				}),
				controllerNameLow = controllerName.toLowerCase();

			if (self.controllers[controllerName])
				// use cached controller
				successCallback(self.controllers[controllerName]);
			else
				// get controller via ajax
				require(['modules/'+controllerNameLow+'/controllers/'+controllerNameLow], function(controller){
					self.controllers[controllerName] = controller;
					successCallback(controller);
				}, _errorCallback);
			// TODO: check
		},
		
		loadView: function(options, fnLoad, fnError) {
			if (options && fnLoad) {
				var resolvedUrl = this.toViewsUrl(options.url);

				// load and merge data to view (if applicable)
				if (options.url && options.data) {
					if (can.isDeferred(options.data))
						can.view(options.url, options.data, options.viewHelpers).then(fnLoad);
					else fnLoad(can.view(options.url, options.data, options.viewHelpers));
				} else if (options.url)
					$.get(resolvedUrl, fnLoad).fail(fnError);
				else if (options.content) fnLoad(options.content);
			}
		},
		
		navigate: function(route, data) {
			var hash = '!' + _.ltrim(route, '#!/');
			if (data) hash += '&' + can.param(data);
			// change page (hash)
			window.location.hash = hash;
		},

		getCurrentPage: function() {
			var file = window.location.pathname;
			var n = file.lastIndexOf('/');
			return n >= 0 ? file.substring(n + 1).toLowerCase() : '';
		},
		getCurrentHashPage: function() {
			var path = _.ltrim(window.location.hash, '#!/');

			//VALIDATE INPUT
			if (path === '') return '';

			//ROOT PAGE IF APPLICABLE
			if (path.indexOf('/') < 0) return path;

			//DETERMINE ROOT PAGE
			return path.substring(0, path.indexOf('/'));
		},

		
		// utils
		toUrl: function(url) {
			return (url[0]=='/' ? url : baseUrl + url);
		},
		toScriptsUrl: function(url) {
			return this.toUrl(url);
		},	
		toViewsUrl: function(url) {
			return this.toUrl(url);
		},
		
		errorMessage: function(title, msg, msg2){
			if (typeof(msg)!='string')
				msg = Helpers.getErrMsg(msg, msg2);
			bootbox.alert('<p class="text-error"><strong>' + (title ? title : 'Error:') + '<strong></p>' + msg);
		},
		
		error: function(msg){
			// TODO: improve
			alert(msg);			
		}
	}
	
})
