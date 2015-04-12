
// CONSTANTS



//ImageRotator.showImage();
//ImageRotator.startRotation();

var rotator = document.getElementById("rotator");
SwipeManager.registerForSwipeEvents(rotator);
SwipeManager.unregisterForSwipeEvents(rotator);
/*
rotator.addEventListener(SwipeManager.SWIPE_LEFT, function(evt) {
	console.log("SWIPE LEFT: "+evt.velocity);
	
	var rotatorId = "rotator";
	var spins = Math.round(evt.velocity);
	console.log("Spins: "+spins);
	ImageSpinner.spin("rotator", spins, spins*360);
});

rotator.addEventListener(SwipeManager.SWIPE_RIGHT, function(evt) {
	console.log("SWIPE RIGHT: "+evt.velocity);
	var rotatorId = "rotator";
	var spins = Math.round(evt.velocity);
	console.log("Spins: "+spins);
	ImageSpinner.spin("rotator", spins, spins*-360);
});

rotator.addEventListener(SwipeManager.SWIPE_UP, function(evt) {
	console.log("SWIPE UP: "+evt.velocity);

});

rotator.addEventListener(SwipeManager.SWIPE_DOWN, function(evt) {
	console.log("SWIPE DOWN: "+evt.velocity);	
});
*/
