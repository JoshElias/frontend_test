;
(function() {
	
	// Constants
	var IMAGE_PREFIX = "kat";
	var ROTATOR_INTERVAL = 4000;

	// Members	
	var mImages = document.querySelectorAll("#rotator img");
	var mLimit = mImages.length-1;
	var mRotatorFuncId = undefined;
	var mCurrImageIndex = 0;


	// Methods
	function rotatorInterval() {
		mImages[mCurrImageIndex].style.opacity = 0;
		mCurrImageIndex++;
		if(mCurrImageIndex > mLimit) {
			mCurrImageIndex = 0;
		}
		mImages[mCurrImageIndex].style.opacity = 1;
	}

	function startRotation(startPosition) {
		if(typeof mRotatorFunc === "undefined" && mImages.length > 0) {
			mCurrImageIndex = (typeof startPosition === "undefined") 
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
		if(mImages.length > 0) {
			if(typeof index === "undefined" || index < 0) {
				index = 0;
			} else if(index > mLimit) {
				index = mLimit;
			}

			stopRotation();
			mImages[mCurrImageIndex].style.opacity = 0;
			mImages[index].style.opacity = 1;
			mCurrImageIndex = index;
		}
	}
		
	// Exports
	window.ImageRotator = {
		startRotation : startRotation,
		stopRotation : stopRotation,
		showImage : showImage
	}
})();