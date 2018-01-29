
// BY CERAS

L.Control.Button = L.Control.extend({
	
	options : {
		position : 'topleft',
		icon: "icon-search",
		text: null, //"this is a text",
		content: null,
		handler: null,
		popover: null,
		tooltip: null
	},
	
	onAdd : function(map) {
		var opt = this.options,
			collapseSymbol = ((opt.position=="topright" || opt.position=="bottomright") ? "&raquo;" : "&laquo;"),
			$container = $("<div class='expandible-control leaflet-control collapsed'>"),
			$collapsedContainer = $("<div class='expandible-control-collapsedContainer'>").appendTo($container);
		
		if (opt.popover)
			$container.popover(opt.popover);
		if (opt.tooltip)
			$container.tooltip(opt.tooltip);
		
		if (opt.text!=null)
			$collapsedContainer.append($("<p class='expandible-control-collapsedText'><nobr>"+opt.text+"</nobr></p>"));
		else if (opt.content!=null)
			$collapsedContainer.append($(opt.content));
		else if (opt.icon!=null)
			$collapsedContainer.append($("<i class='expandible-control-collapsedIcon " + opt.icon + "'></i>"));
			
		var div = $container.get(0),	
			stop = L.DomEvent.stopPropagation,
			that = this;

        L.DomEvent
            .on(div, 'click', stop)
            .on(div, 'mousedown', stop)
            .on(div, 'dblclick', stop);
        
		this.$container = $container;
		this.$collapsedContainer = $collapsedContainer;

		$collapsedContainer.click(function(){
			if (opt.handler)
				opt.handler();
		});
		
		$container.css({width: "", height:"", overflow: "inherit"});

		return div;
	},
	
	enable: function(){
		this.enabled = true;		
		this.$container.removeClass("disabled");
		return this;
	},
	
	disable: function(){
		this.enabled = false;
		this.$container.addClass("disabled");
		return this;
	},
	
});

		