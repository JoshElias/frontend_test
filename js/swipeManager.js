;
(function() {

	// Constants
	var SWIPE_LEFT = "SWIPE_LEFT";
	var SWIPE_RIGHT = "SWIPE_RIGHT";
	var SWIPE_UP = "SWIPE_UP";
	var SWIPE_DOWN = "SWIPE_DOWN";


	// Members
	var inputEventListeners = [];

	var xMouseDown = undefined;
	var yMouseDown = undefined;
	var mouseDownTime = undefined;

	var xTouchDown = undefined;
	var yTouchDown = undefined;
	var touchDownTime = undefined;


	// Events
	document.addEventListener("touchup", touchUpHandler, false);
	document.addEventListener("mouseup" , mouseUpHandler, false);


	// Methods
	function mouseDownHandler(event) {
		xMouseDown = event.clientX;
		yMouseDown = event.clientY;
		mouseDownTime = new Date().getTime();
	}

	function mouseUpHandler(event) {
		if(typeof xMouseDown === "undefined" 
			|| typeof yMouseDown === "undefined"
			|| typeof mouseDownTime === "undefined") {
			return;
		}

		var xMouseUp = event.clientX;
		var yMouseUp = event.clientY;
		var swipeTime = new Date().getTime() - mouseDownTime;

		calculateSwipe(xMouseDown, xMouseUp, yMouseDown, yMouseUp, swipeTime);
	}

	// Touch Events	
	function touchStartHandler(event) {
		xTouchDown = event.touches[0].clientX;
		yTouchDown = event.touches[0].clientY;
		touchDownTime = new Date().getTime();
	}

	function touchUpHandler(event) {
			if(typeof xTouchDown === "undefined" 
				|| typeof yTouchDown === "undefined"
				|| typeof touchDownTime === "undefined") {
				return;
			}

			var xTouchUp = event.touches[0].clientX;
			var yTouchUp = event.touches[0].clientY;
			var swipeTime = new Date().getTime() - touchDownTime;

			calculateSwipe(xTouchDown, xTouchUp, yTouchDown, yTouchUp);
	}

	function calculateSwipe(xDown, xUp, yDown, yUp, swipeTime) {
		// Calculate differences
		var xDiff = xDown - xUp;
		var yDiff = yDown - yUp;
		var distance = Math.sqrt( xDiff*xDiff + yDiff*yDiff );
		var velocity = distance/swipeTime;

		// Build swipe event
		var swipeEvent = {
			xDown : xDown,
			xUp : xUp,
			yDown : yDown,
			yUp : yUp,
			velocity: velocity
		}

		// Check if swipe was left or right?
		if(Math.abs(xDiff) > Math.abs(yDiff)) {
			if(xDiff>0) {
				emitEvent(SWIPE_LEFT, swipeEvent);
			} else {
				emitEvent(SWIPE_RIGHT, swipeEvent);
			}
		// Or the swipe was up or down
		} else {
			if(yDiff>0) {
				emitEvent(SWIPE_UP, swipeEvent);
			} else {
				emitEvent(SWIPE_DOWN, swipeEvent);
			}
		}

		// Reset the variables
		xMouseDown = undefined;
		yMouseDown = undefined;
		xTouchDown = undefined;
		yTouchDown = undefined;
	}

	function registerForSwipeEvents(element) {
		if(!Utility.isElement(element)) {
			return;
		}

		element.addEventListener("touchstart", touchStartHandler, false);
		element.addEventListener("touchup", touchUpHandler, false);
		element.addEventListener("mousedown" , mouseDownHandler, false);
		element.addEventListener("mouseup" , mouseUpHandler, false);
		inputEventListeners.push(element);
	}

	function unregisterForSwipeEvents(element) {
		if(!Utility.isElement(element)) {
			return;
		}
		
		var index;
		if((index = inputEventListeners.indexOf(element)) !== -1) {
			inputEventListeners.splice(index, 1);
			element.addEventListener("touchstart", touchStartHandler, false);
			element.addEventListener("touchup", touchUpHandler, false);
			element.addEventListener("mousedown" , mouseDownHandler, false);
			element.addEventListener("mouseup" , mouseUpHandler, false);
		
		}	
	}

	function emitEvent(eventName, eventObj) {	
		// Create super cool custom event
		var swipeEvent = new CustomEvent(eventName, {
			bubbles: true,
			cancelable: true
		});
		// Add event properties to swipe event
		for(var key in eventObj) {
			if(eventObj.hasOwnProperty(key)) {
				swipeEvent[key] = eventObj[key];
			}
		}

		// Iterate over listeners and dispatch event
		var length = inputEventListeners.length;
		while(length--) {
			var listener = inputEventListeners[length];
			listener.dispatchEvent(swipeEvent);
		}
	}

	// Exports
	window.SwipeManager = {	
		registerForSwipeEvents : registerForSwipeEvents,
		unregisterForSwipeEvents : unregisterForSwipeEvents,
		emitEvent : emitEvent,

		SWIPE_LEFT : SWIPE_LEFT,
		SWIPE_RIGHT : SWIPE_RIGHT,
		SWIPE_UP : SWIPE_UP,
		SWIPE_DOWN : SWIPE_DOWN
	}
})();