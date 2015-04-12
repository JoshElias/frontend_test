;
(function() {

	function spin(id, time, degrees) {
		if(typeof time !== "number" || time < 0 || typeof degrees !== "number") {
			return;
		}

		console.log("Spin Time: "+time);
		console.log("Degrees: "+degrees);

		var element = document.getElementById(id);

		element.style.WebkitTransition = "all "+time+"s ease";
		element.style.MozTransition = "all "+time+"s ease";
		 
		element.style.webkitTransform = "rotateY("+degrees+"deg)"; 
    	element.style.mozTransform    = "rotateY("+degrees+"deg)"; 
    	element.style.msTransform     = "rotateY("+degrees+"deg)"; 
    	element.style.oTransform      = "rotateY("+degrees+"deg)"; 
    	element.style.transform       = "rotateY("+degrees+"deg)";
	}

	// Exports
	window.ImageSpinner = {
		spin : spin
	}
})();