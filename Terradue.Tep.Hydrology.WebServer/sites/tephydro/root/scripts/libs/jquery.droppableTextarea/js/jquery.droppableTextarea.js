

////// DROPPABLE TEXTAREA
(function($) {

$.droppableTextarea = {
	defaults: {
		dropMessage: 'Drop a file here',
		limitByte: 1000,
		limitByteCallback: null,
		limitByteMessage: 'The file is too big, please select another file.', 
		placeholder: null,
		changeCallback: null, // function(val)
	},
}


$.fn.droppableTextarea = function(options) {
	
	function handleFileUpload(files, $droppableTextarea){
		if (files && files.length){
			var file = files[0];
			
			// checking size
			if (file.size>settings.limitByte){
				if (settings.limitByteCallback)
					settings.limitByteCallback(file);
				else if (bootbox)
					bootbox.alert(settings.limitByteMessage);
				else
					alert(settings.limitByteMessage);
				
				return;
			}
			
			// read file
			var reader = new FileReader();
			reader.onload = function(e){
				$droppableTextarea.children('textarea').val(e.target.result);
				if (settings.changeCallback)
					settings.changeCallback(e.target.result);
			}
			reader.readAsText(file);
		}
	}	

	var settings = $.extend( {}, $.droppableTextarea.defaults, options );
	
	var $div = this.empty().addClass('droppableTextarea').appendTo(this),
		$dropMessage = $('<div class="dropMessage">').text(settings.dropMessage).appendTo($div),
		$textarea = $('<textarea>').attr('placeholder', settings.placeholder).appendTo($div);
	
	if (settings.changeCallback)
		$textarea.keyup(function(){
			settings.changeCallback($(this).val());
		});
	
	new DocumentDrag().on('dragenter', function(){
		$div.addClass('dragstart');
	}).on('dragleave', function(){
		$div.removeClass('dragstart');
	});
	
	$div.bind({
		dragenter: function(e){
			e.preventDefault();
			$(this).addClass('dragenter');
		},
		dragover: function(e){
			e.stopPropagation();
			e.preventDefault();
		},
		dragleave: function(e){
			$(this).removeClass('dragenter');
		},
		drop: function(e){
			e.preventDefault();
			$(this).removeClass('dragenter');
			var files = e.originalEvent.dataTransfer.files;
			handleFileUpload(files, $(this));
		},
	});
	
	return this;

};

}(jQuery));



// DocumentDrag Object
var DocumentDrag = can.Construct.extend({}, {
	
	init: function(){
		this.enterListeners = [];
		this.leaveListeners = [];
		this.innerCount = 0;
		var self = this;
		
		$(window).bind({
			dragenter: function(event) {
				self.innerCount++;
				if (self.innerCount==1){
					//console.log('DOCUMENT DRAGENTER ************!');
					$.each(self.enterListeners, function(){
						this();
					});
				}
			},
			dragleave: function(event) {
				// firefox trick
				if(navigator.userAgent.toLowerCase().indexOf('firefox')>-1 && event.relatedTarget==null)
					self.innerCount--;
				
				self.innerCount--;			
				if (self.innerCount==0){
					//console.log('DOCUMENT DRAGLEAVE ***!');
					$.each(self.leaveListeners, function(){
						this();
					});
				}				
			},
			drop: function(event){
				//console.log('DOCUMENT DRAGEND *****!');
				self.innerCount = 0;
				$.each(self.leaveListeners, function(){
					this();
				});
			}
		});
		
	},
	
	on: function(evName, handler){
		if (evName=='dragenter')
			this.enterListeners.push(handler);
		else if (evName=='dragleave')
			this.leaveListeners.push(handler);
		return this;
	},
	
	off: function(evName){
		if (evName=='dragenter')
			this.enterListeners = [];
		else if (evName=='dragleave')
			this.leaveListeners = [];
		return this;
	}
	
});