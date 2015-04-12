;
(function() {

	// Constants 
	var EVENT_INTERVAL = 500; // Half second
	var DID_HALF_SPIN = "DID_HALF_SPIN";
	var DID_FULL_SPIN = "DID_FULL_SPIN";
	var COMPLETED_SPIN = "COMPLETED_SPIN";


	// Members
	var spinners = []; // Are we humans or are we spinners?
	var halfSpinEvent = new CustomEvent(DID_HALF_SPIN, {
		bubbles: true,
		cancelable: true
	});
	var fullSpinEvent = new CustomEvent(DID_FULL_SPIN, {
		bubbles: true,
		cancelable: true
	});
	var completeSpinEvent = new CustomEvent(COMPLETED_SPIN, {
		bubbles: true,
		cancelable: true
	});


	// Methods
	function spin(element, time, degrees) {
		if(!Utility.isElement(element) || typeof time !== "number" 
			|| time < 0 || typeof degrees !== "number") {
			return;
		}

		// Only spin if it's not already spinning
		if(typeof spinners[element.id] === "undefined") {
			
			// Set transition
			element.style.WebkitTransition = "all "+time+"s ease";
			element.style.MozTransition = "all "+time+"s ease";
		 
			// Set Transform
			element.style.webkitTransform = "rotateY("+degrees+"deg)"; 
    		element.style.mozTransform    = "rotateY("+degrees+"deg)"; 
    		element.style.msTransform     = "rotateY("+degrees+"deg)"; 
    		element.style.oTransform      = "rotateY("+degrees+"deg)"; 
    		element.style.transform       = "rotateY("+degrees+"deg)";

    		console.log("Outside element null: "+typeof element);

    		var spinIntervalId = startSpinTimer(element, time*1000);

    		// Add to spinners
			spinners[element.id] = {
				spinTime : 0,
				intervalId : spinIntervalId
			}
		}	
	}

	function startSpinTimer(element, time) {
	console.log("Original Time: "+time);	
		function startSpinInterval(element, time) {
			

			var spinner = spinners[element.id];
			spinner.spinTime += EVENT_INTERVAL;
			var intervalId = spinner.intervalId;

			console.log("SpinTime: "+spinner.spinTime);
			console.log("Time: "+time);
			element.dispatchEvent(halfSpinEvent);
			if(spinner.spinTime % 1000 === 0) {
				element.dispatchEvent(fullSpinEvent);
			}

			if(spinner.spinTime === time)  {
				element.dispatchEvent(completeSpinEvent);
				clearInterval(intervalId);
				delete spinners[element.id];
			}
		}

		return setInterval(function() {
			startSpinInterval(element, time);
		}, EVENT_INTERVAL);

	}


	// Exports
	window.ImageSpinner = {
		spin : spin,

		DID_HALF_SPIN : DID_HALF_SPIN,
		DID_FULL_SPIN : DID_FULL_SPIN,
		COMPLETED_SPIN : COMPLETED_SPIN,
	}
})();