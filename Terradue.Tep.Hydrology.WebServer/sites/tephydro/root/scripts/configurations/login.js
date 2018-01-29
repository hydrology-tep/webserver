
// LoginConfiguration object

define(['config'], function(Config){
	return {
		api: Config.api,
		loginPollingTime: 60*1000 // 1 minute
	}
});