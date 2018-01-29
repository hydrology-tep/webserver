
define(['can', 'config'], function(can, Config){
	
	return can.Model({
		findAll: 'GET /'+Config.api+'/news/tumblr',
		findOne: 'GET /'+Config.api+'/news/{Id}',
		create: 'POST /'+Config.api+'/news/tumblr',
		update: 'PUT /'+Config.api+'/news',
		destroy: 'DELETE /'+Config.api+'/news/{Id}'
	}, {});
	
});

