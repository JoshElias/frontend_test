
// CONSTANTS



//ImageRotator.showImage();
//ImageRotator.startRotation();

var rotator = document.getElementById("rotator");
SwipeManager.registerForSwipeEvents(rotator);
//SwipeManager.unregisterForSwipeEvents(rotator);

rotator.addEventListener(SwipeManager.SWIPE_LEFT, function(evt) {
	console.log("SWIPE LEFT: "+evt.velocity);
	
	var rotatorId = "rotator";
	var spins = Math.round(evt.velocity);
	console.log("Spins: "+spins);
	ImageSpinner.spin(rotator, spins, spins*360);
	rotator.addEventListener(ImageSpinner.DID_HALF_SPIN, function(evt2) {
		console.log("half spin");
	});
	rotator.addEventListener(ImageSpinner.DID_FULL_SPIN, function(evt2) {
		console.log("full spin");
	});
	rotator.addEventListener(ImageSpinner.COMPLETED_SPIN, function(evt2) {
		console.log("completed spin");
	});
});

rotator.addEventListener(SwipeManager.SWIPE_RIGHT, function(evt) {
	console.log("SWIPE RIGHT: "+evt.velocity);
	var rotatorId = "rotator";
	var spins = Math.round(evt.velocity);
	console.log("Spins: "+spins);
	ImageSpinner.spin(rotator, spins, spins*-360);
});

rotator.addEventListener(SwipeManager.SWIPE_UP, function(evt) {
	console.log("SWIPE UP: "+evt.velocity);

});

rotator.addEventListener(SwipeManager.SWIPE_DOWN, function(evt) {
	console.log("SWIPE DOWN: "+evt.velocity);	
});

