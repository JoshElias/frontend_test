;
(function() {

	function isNode(obj) {
		return(obj.nodeName !== "undefined");
	}

	function isElement(obj) {
		return(typeof obj.tagName !== "undefined");
	}

	// Exports
	window.Utility = {
		isNode : isNode,
		isElement : isElement
	}
})();