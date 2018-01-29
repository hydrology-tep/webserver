define([
	'jquery',
	'can',
	'underscore',
	'app',
	'modules/pages/controllers/pages',
	'underscorestring'
], function($, can, _, App, Pages){
	// merge string plugin to underscore namespace
	_.mixin(_.str.exports());
	
	var Router = can.Control ({
		init: function () {},

		// ROUTES
		'route': 'index',
		'contact route': 'contact',
		
		'pages/:topPage/:id route': 'pages',
		'pages/:topPage/:id&selector route': 'pages',
		'pages/:id&:selector route': 'pages',
		'pages/:id route': 'pages',
		
		':controller/:action/:id route': 'dispatch',
		':controller/:action route': 'dispatch',
		':controller route': 'dispatch',

		// ACTIONS
		
		// index
		index: function () {
			Pages.index({ fade: false });
			this.rebind(Pages);
		},
      
		// pages route action (dynamic pages)
		pages: function (data) {
			Pages.load(data);
			this.rebind(Pages);
		},

		// rest route actions
		dispatch: function (data) {
			var self = this;
			
			//SCRUB URL PARAMS IF APPLICABLE
			var controllerName = _.capitalize (data.controller);
			//CONVERT URL PARAM TO ACTION NAMING CONVENTION
			var actionName = data.action
			? data.action.charAt(0).toLowerCase() + _.camelize(data.action.slice(1))
					: 'index'; // default to index action
			
			//DYNAMICALLY REQUEST CONTROLLER AND PERFORM ACTION
			App.loadController (controllerName, function (controller) {
				//CALL ACTION WITH PARAMETERS IF APPLICABLE
				if (controller && controller[actionName]){
					controller[actionName](data);
					self.rebind(controller);					
				}
				else Pages.errorView({}, null, "Controller not found: "+controllerName);
			}, function(err){
				Pages.controllerError(controllerName);
				window.err=err;
			});
			
		},
		
		rebind: function(controller){
			if (this.currentController && this.currentController!=controller){
//				console.log('rebind ',Math.random().toFixed(3));
				this.currentController.off();
				controller.on();
			}
//			else
//				console.log('NO rebind ',Math.random().toFixed(3));
			
			this.currentController = controller;
		}

	});
	
	return {
		init: function() {
			var self = this;
			this.currentHash = null;
			
			// route on document.ready
			$(function() {
				// deactivate routing until it's not instantiated
				//can.route.ready(false);

				// init
				new Router(document);

				// events
				can.route.bind('change', function(ev, attr, how, newVal, oldVal) {
					
					var hash = _.ltrim(window.location.hash, '#!');
						currentHash = self.currentHash;
						
					if (hash!=currentHash){
						// hash changed, update the menu
						Pages.initMenu();
						self.currentHash = hash;
					}
				});

				// activate routing
				can.route.ready();
			});
		}
	};
});

