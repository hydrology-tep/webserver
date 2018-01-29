
define([], function(){
	
	// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
	var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	
	var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
	
	// At least Safari 3+: "[object HTMLElementConstructor]"
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	
	// Chrome 1+
	var isChrome = !!window.chrome && !isOpera;
	
	// At least IE6
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	
	return {
		isOpera: isOpera,
		isFirefox: isFirefox,
		isSafari: isSafari,
		isChrome: isChrome,
		isIE: isIE,
	};
	
});