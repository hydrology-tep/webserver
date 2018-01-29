
define([
	'jquery',
	'can',
	'utils/baseControl',
	'config',
	'modules/cpanel/models/newsTumblr',
	'utils/helpers',
	'moment'
], function($, can, BaseControl, Config, NewsTumblrModel, Helpers){
	
	var Cpanel = BaseControl({
		defaults: { fade: 'slow' },
	}, {
		init: function(element, options){
			console.log("cpanel.init");
			this.newsTumblrDetails = new can.Observe({});
			this.selectedNewsTumblr = null;
			this.newsesTumblr = null;
			this.isLoginPromise = App.Login.isLoggedDeferred;
		},
		
		index: function(data){
			//alert(console.log(App.Login.isLoggedDeferred));
			var self = this;
			this.isLoginPromise.then(function(user){
				if (App.Login.isAdmin()){
					console.log("App.controllers.cpanl.index");
					self.element.html(can.view("modules/cpanel/views/index.html", {
						user: user,
						accounting: Config.enableAccounting
					}));
				} else 
					self.accessDenied();
			}).fail(function(){
				self.accessDenied();
			});
		},
		
		news: function(data){
			if (App.Login.isLogged() && App.Login.isAdmin()){
				console.log("App.controllers.cpanl.news");
				var self = this;
				NewsTumblrModel.findAll({}, function(newsesTumblr){
					self.newsesTumblr = newsesTumblr;
					self.element.html(can.view("modules/cpanel/views/newsesTumblr.html", {
						list: newsesTumblr,
						details: self.newsTumblrDetails,
					}));
				});
			} else {
				this.element.html("Unable to access this page");
			}
		},
		
		'.newses-tumblr .update click': function(el){
			var self=this,
				news = el.parent().data('news');
			this.selectedNewsTumblr = news;
			this.newsTumblrDetails.attr({_isVisible: true, }, true);
			this.newsTumblrDetails.attr(news.attr());
		},
		
		'.newses-tumblr .create click': function(){
			// cancel the form and show it
			this.newsTumblrDetails.attr({_isVisible: true},true);
		},
		
		'.news-tumblr-form .formUpdate click': function(){
			var self = this;			
			this.selectedNewsTumblr
				.attr(this.retrieveFromForm())
				.save()
				.then(function(){
					// cancel the form and hide it
					self.newsTumblrDetails.attr({_isVisible: false}, true);
				});
			return false;
		},
		
		'.news-tumblr-form .formCreate click': function(){
			var self = this,
				news = new NewsTumblrModel(this.retrieveFromForm())
					.save()
					.then(function(createdNews){
						// cancel the form and hide it
						self.newsTumblrDetails.attr({_isVisible: false}, true);
						// push to the list
						self.newsesTumblr.push(createdNews);
					});
			return false;
		},
		
		'.newses-tumblr .formCancel click': function(){
			// cancel the form and hide it
			this.newsTumblrDetails.attr({_isVisible: false}, true);
		},
		
		retrieveFromForm: function(){
			return {
				Title: this.element.find('input[name="Title"]').val(),
				Name: this.element.find('input[name="Name"]').val(),
				Abstract: this.element.find('input[name="Abstract"]').val(),
				Author: this.element.find('input[name="Author"]').val(),
				Url: this.element.find('input[name="Url"]').val(),
			};
		}
		
	});
	
	return new Cpanel(Config.mainContainer, {});
	
});
