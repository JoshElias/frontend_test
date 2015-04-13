// This class tracks swipes on a target element
// Swipe must start inside the element

;
(function() {
	
	// Constants
	var IMAGE_PREFIX = "kat";
	var ROTATOR_INTERVAL = 4000;


	// Members	
	var mRotator = document.getElementById("rotator")
	var mRotatorElements = mRotator.getElementsByClassName("rotatorElement");
	var mLimit = mRotatorElements.length-1;
	var mRotatorFuncId = undefined;
	var mCurrElementIndex = 0;
	var mAnimation = {
		duration : 3,
		curve : DivSpinner.EASE_CURVE
	}

	// Set all elements opacity to 0
	for(var i=0; i<mRotatorElements.length; i++) {
		if(i > 0) {
			mRotatorElements[i].style.opacity = 0;
		}
	}

	// Swipe Events
	mRotator.addEventListener(SwipeManager.SWIPE_LEFT, function(evt) {
		DivSpinner.spin(mRotator, getAnimation(evt.velocity));
		stopRotation();
	});

	mRotator.addEventListener(SwipeManager.SWIPE_RIGHT, function(evt) {
		DivSpinner.spin(mRotator, getAnimation(evt.velocity));
		stopRotation();
	});


	// Angle Events
	rotator.addEventListener(DivSpinner.KEY_ANGLE_EVENT[0], function(evt) {
		console.log("GLOW");
	})

	rotator.addEventListener(DivSpinner.KEY_ANGLE_EVENT[90], function(evt) {
		showImage(getNextElementIndex());
	})

	rotator.addEventListener(DivSpinner.KEY_ANGLE_EVENT[180], function(evt) {
		console.log("GLOW");
	})

	rotator.addEventListener(DivSpinner.KEY_ANGLE_EVENT[270], function(evt) {
		showImage(getNextElementIndex());
	});

	rotator.addEventListener(DivSpinner.EVENT_SPIN_COMPLETE, function(evt) {
		console.log("spin complete");
	});


	// Methods
	function getNextElementIndex() {
		var nextIndex = mCurrElementIndex+1;
		if(nextIndex > mLimit) {
			nextIndex = 0;
		}
		console.log("Got next element: "+nextIndex);
		return nextIndex;
	}

	function getAnimation(velocity) {
		var spins = Math.round(velocity);
		return {
			duration : 3,
			curve : DivSpinner.EASE_CURVE,
			duration : spins,
			degrees : spins*360
		}
	}

	function rotatorInterval() {
		mRotatorElements[mCurrElementIndex].style.opacity = 0;
		mCurrElementIndex++;
		if(mCurrElementIndex > mLimit) {
			mCurrElementIndex = 0;
		}
		mRotatorElements[mCurrElementIndex].style.opacity = 1;
	}

	function startRotation(startPosition) {
		if(typeof mRotatorFunc === "undefined" && mRotatorElements.length > 0) {
			mCurrElementIndex = (typeof startPosition === "undefined") 
								? 0 : startPosition;
			mRotatorFunc = setInterval(rotatorInterval, ROTATOR_INTERVAL);
		}
	}; 

	function stopRotation() {
		if(typeof mRotatorFunc !== "undefined" ) {
			mRotatorFunc = undefined;
		}
	}

	function showImage(index) {
		if(mRotatorElements.length > 0) {
			if(typeof index === "undefined" || index < 0) {
				index = 0;
			} else if(index > mLimit) {
				index = mLimit;
			}

			stopRotation();
			mRotatorElements[mCurrElementIndex].style.opacity = 0;
			mRotatorElements[index].style.opacity = 1;
			mCurrElementIndex = index;
		}
	}
		
	// Exports
	window.ImageRotator = {
		startRotation : startRotation,
		stopRotation : stopRotation,
		showImage : showImage
	}
})();