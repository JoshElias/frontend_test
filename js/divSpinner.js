// This class was supposed to be a super awesome class that animated a div to spin
// and to audio and visuals queues depending on the orientation but I spent way too much time trying 
// to get it working. Was 

;
(function() {

	// Constants
	var EASE_CURVE = { 
		"a" : 0.25,
		"b" : 0.1,
		"c" : 0.25,
		"d" : 1
	}; // Got this from ws3
	var KEY_ANGLE_EVENT = {
		0 : "EVENT_ANGLE_0",
		90 : "EVENT_ANGLE_90",
		180 : "EVENT_ANGLE_180",
		270 : "EVENT_ANGLE_270",
		360 : "EVENT_ANGLE_360"
	} 
	var EVENT_SPIN_COMPLETE = "EVENT_SPIN_COMPLETE";


	// Members
	var mSpinners = {};


	// Methods

	// Fires events when a spinner has hit 0, 90, 180, 270 or 360 degrees
	function triggerAngleEvents(animation, currentAngle) {
		
		var angleThreshhold = currentAngle / 360;
		if(angleThreshhold > 1) {
			currentAngle = currentAngle - Math.floor(angleThreshhold)*360;
		}

		var delta = Math.abs(animation.lastAngle - currentAngle)
		if(delta < 4) {
			var angleEvent = new CustomEvent(KEY_ANGLE_EVENT[animation.lastAngle], {
				bubbles: true,
				cancelable: true
			});
			animation.element.dispatchEvent(angleEvent)
			
			animation.lastAngle+=90
			if(animation.lastAngle > 360) {
				animation.lastAngle = 0;
			}
		} 
	}

	// Loop than calculates the bezier curve over time
	function spinLoop(id) {
		return function() {
			var animation = mSpinners[id];

			// Get current time
			var now = Date.now();
			var t = (now - animation.startTime) / ( animation.duration*1000 );

			// Calculate curve and solved time
			var curve = new UnitBezier(animation.curve.a, 
				animation.curve.b, animation.curve.c, animation.curve.d);
			var t1 = curve.solve(t, UnitBezier.prototype.epsilon);
			var s1 = 1.0-t1;

			// Lerp using solved time
		    var currentAngle = (animation.degrees * t1); //(animation.startAngle * s1) + (animation.endAngle * t1);
		    triggerAngleEvents(animation, currentAngle);
			
			// Reset timeout
			animation.timeout = setTimeout( spinLoop(id), 60/1000 );
		}
	}	

	/* Applies a spin animation to the provided element.
     * Uses ease function by default.
     *
     * animation :{
	 *   	degrees : number,
	 *		duration : number,
	 *		curve : object
     * }
     */
	function spin(element, animation) {
		if(!Utility.isElement(element) || typeof animation !== "object"
			|| typeof animation.degrees !== "number" || typeof animation.duration !== "number" 
			|| typeof animation.curve !== "object") {
			return;
		}

		// I don't want to handle multiple spins on the same div
		// I've already spent too much time doing this spinning stuff...
		if(typeof mSpinners[element.id] !== "undefined") {
			return;
		}

		animation.element = element;
	 	animation.lastAngle = 0;

		// Add transform css to element
		animation.element.style.cssText += '-webkit-transition-property: -webkit-transform, all;-webkit-transition-timing-function: cubic-bezier('
				+animation.curve.a+","+animation.curve.b+","+animation.curve.c+","+animation.curve.d+')';
		animation.element.style.webkitTransitionDuration = animation.duration+'s';

		// Start the webkit animation on a timeout to get
		// more accurate timing
		function startSpin(id) {
			return function() {		
				var animation = mSpinners[id];
				
				// Start the webkit animation
				animation.startTime = Date.now();
				animation.element.style.webkitTransform = "rotateY("+animation.degrees+"deg)";
				
				// Start our loop
				setTimeout(spinLoop(id), 0);
			}
		}
		setTimeout(startSpin(element.id), 0);

	  	// Stop timer once our timer is done
	  	function stopSpin(id) {
	  		return function() {
	  			var animation = mSpinners[id];
				clearTimeout( animation.timeout );	
				var spinCompleteEvent = new CustomEvent(EVENT_SPIN_COMPLETE, {
					bubbles: true,
					cancelable: true
				});
				animation.element.dispatchEvent(spinCompleteEvent);
				mSpinners[id] = undefined;
			}
	  	}
	  	setTimeout(stopSpin(element.id), animation.duration*1000);

	  	// Add to Spinners
		mSpinners[element.id] = animation;
	}



	// Bezier Implementation  
	function UnitBezier(p1x, p1y, p2x, p2y) {
		// Calculate the polynomial coefficients
		this.cx = 3.0 * p1x;
		this.bx = 3.0 * (p2x - p1x) - this.cx;
		this.ax = 1.0 - this.cx -this.bx;
		 
		this.cy = 3.0 * p1y;
		this.by = 3.0 * (p2y - p1y) - this.cy;
		this.ay = 1.0 - this.cy - this.by;
	}

	UnitBezier.prototype.epsilon = 1e-5;; // Precision  
	UnitBezier.prototype.sampleCurveX = function(t) {
	    return ((this.ax * t + this.bx) * t + this.cx) * t;
	}
	UnitBezier.prototype.sampleCurveY = function (t) {
	    return ((this.ay * t + this.by) * t + this.cy) * t;
	}
	UnitBezier.prototype.sampleCurveDerivativeX = function (t) {
	    return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
	}
	UnitBezier.prototype.solveCurveX = function (x, epsilon) {
		var t0;	
		var t1;
		var t2;
		var x2;
		var d2;
		var i;

		// Try Newton's method
		for (t2 = x, i = 0; i < 8; i++) {
		    x2 = this.sampleCurveX(t2) - x;
		    if (Math.abs (x2) < epsilon)
		        return t2;
		    d2 = this.sampleCurveDerivativeX(t2);
		    if (Math.abs(d2) < epsilon)
		        break;
		    t2 = t2 - x2 / d2;
		}

		// If no solution found - use bi-section
		t0 = 0.0;
		t1 = 1.0;
		t2 = x;

		if (t2 < t0) return t0;
		if (t2 > t1) return t1;

		while (t0 < t1) {
			x2 = this.sampleCurveX(t2);
			if (Math.abs(x2 - x) < epsilon)
				return t2;
			if (x > x2) t0 = t2;
			else t1 = t2;

			t2 = (t1 - t0) * .5 + t0;
		}

		// Give up, sad day
		return t2;
	}

	// Find new T as a function of Y along curve X
	UnitBezier.prototype.solve = function (x, epsilon) {
	    return this.sampleCurveY( this.solveCurveX(x, epsilon) );
	}


	// Exports
	window.DivSpinner = {
		spin : spin,

		EASE_CURVE : EASE_CURVE,
		KEY_ANGLE_EVENT : KEY_ANGLE_EVENT,
		EVENT_SPIN_COMPLETE : EVENT_SPIN_COMPLETE
	}
})();
