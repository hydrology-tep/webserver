//
// COPYABLE INPUT - BY CERAS
// version 2.0
// it requires clipboard.js
//

(function($) {
	
$.fn.copyableInput = function(textToCopy, options){

	if (this.attr('data-copyableInput-enabled'))
		return this;

	if (options.isButton)
		// use the button as content
		var $button = $(this);
	else {
		// init content
		var $div = $('<div class="input-append copyableInput">');
		
		if (!options.hideInput)
			var $input = $('<input class="span2 copyableInput-input" type="text" readonly="readonly">')
				.appendTo($div)
				.val(textToCopy)
				.css('min-width', options.minWidth ? options.minWidth : 110)
				.click(function(){
					$(this).select();
				});
		
		var $button = $('<button class="btn '+(options.btnClass ? options.btnClass : 'btn-small') +' copyableInput-button copyableInput-round"><i class="fa fa-copy copyableInput-button-icon"></i></button>')
			.appendTo($div);			
		
		this.append($div);
	}
	
	//$button.attr('data-clipboard-text', textToCopy);
	
	var clipboard = new Clipboard($button.get(0), {
		text: function(trigger) {
	        return $button.attr('data-copyable-value') || textToCopy;
	    }
	});

	clipboard.on('success', function(e) {
		$button.attr('data-original-title', 'copied!').tooltip('show');
	});
	
	// set tooltip
	$button.tooltip({
		trigger: 'manual',
		title: options.title ? options.title : 'copy to clipboard',
		placement: options.placement || 'bottom'
	}).mouseenter(function(){
 		$(this).attr('data-original-title', options.title ? options.title : 'copy to clipboard');
 		$button.tooltip('show');
	}).mouseleave(function(){
		$button.tooltip('hide');
	});
	
	this.attr('data-copyableInput-enabled', 'true');

	return this;
};

}(jQuery));
