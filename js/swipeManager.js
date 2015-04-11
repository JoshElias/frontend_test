;
(function() {

	// Constants
	var SWIPE_LEFT = "SWIPE_LEFT";
	var SWIPE_RIGHT = "SWIPE_RIGHT";
	var SWIPE_UP = "SWIPE_UP";
	var SWIPE_DOWN = "SWIPE_DOWN";


	// Members
	var inputEventListeners = {};

	var xMouseDown = undefined;
	var yMouseDown = undefined;
	var mouseDownTime = undefined;

	var xTouchDown = undefined;
	var yTouchDown = undefined;
	var touchDownTime = undefined;

	
	// Methods
	
	// Click Events
	document.addEventListener("mousedown" , mouseDownHandler, false);
	document.addEventListener("mouseup" , mouseUpHandler, false);

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
	document.addEventListener("touchstart", touchStartHandler, false);
	document.addEventListener("touchmove", touchMoveHandler, false);
	
	function touchStartHandler(event) {
		xTouchDown = event.touches[0].clientX;
		yTouchDown = event.touches[0].clientY;
		touchDownTime = new Date().getTime();
	}

	function touchMoveHandler(event) {
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
				var velocity
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
	}

	function addEventListener(eventName, action) {
		if(!inputEventListeners.hasOwnProperty(eventName)) {
			inputEventListeners[eventName] = [];
		}
		inputEventListeners[eventName].push(action);
	}

	function removeEventListener(eventName, action) {
		if(!inputEventListeners.hasOwnProperty(eventName)) {
			return;
		}
		var listeners = inputEventListeners[eventName];
		var length = listeners.length;
		while(length--) {
			if(listeners[length] === action) {
				listeners.splice(length, 1);
			}
		}
	}

	function emitEvent(eventName, eventObj) {
		if(!inputEventListeners.hasOwnProperty(eventName)) {
			return;
		}
		var listeners = inputEventListeners[eventName];
		var length = listeners.length;
		while(length--) {
			listeners[length](eventObj);
		}
	}

	// Exports
	window.SwipeManager = {
		
		addEventListener : addEventListener,
		removeEventListener : removeEventListener,
		emitEvent : emitEvent,

		SWIPE_LEFT : SWIPE_LEFT,
		SWIPE_RIGHT : SWIPE_RIGHT,
		SWIPE_UP : SWIPE_UP,
		SWIPE_DOWN : SWIPE_DOWN
	}
})();