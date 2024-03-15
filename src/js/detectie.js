(function detectIE() {
	const ua = window.navigator.userAgent;

	const msie = ua.indexOf('MSIE ');

	if (msie > 0) {
		// IE 10 or older => return version number
		const ieV = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);

		document.querySelector('body').className += ' is-browser-ie';
	}

	const trident = ua.indexOf('Trident/');

	if (trident > 0) {
		// IE 11 => return version number
		const rv = ua.indexOf('rv:');

		const ieV = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);

		document.querySelector('body').className += ' is-browser-ie';
	}

	const edge = ua.indexOf('Edge/');

	if (edge > 0) {
		// IE 12 (aka Edge) => return version number
		const ieV = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);

		document.querySelector('body').className += ' is-browser-ie';
	}

	// other browser
	return false;
})();

if (!('remove' in Element.prototype)) {
	Element.prototype.remove = () => {
		if (this.parentNode) {
			this.parentNode.removeChild(this);
		}
	};
}