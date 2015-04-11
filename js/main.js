
// CONSTANTS



//ImageRotator.showImage();
//ImageRotator.startRotation();

SwipeManager.addEventListener(SwipeManager.SWIPE_LEFT, function(evt) {
	console.log("SWIPE LEFT: "+evt.velocity);
});

SwipeManager.addEventListener(SwipeManager.SWIPE_RIGHT, function(evt) {
	console.log("SWIPE RIGHT: "+evt.velocity);
});

SwipeManager.addEventListener(SwipeManager.SWIPE_UP, function(evt) {
	console.log("SWIPE UP: "+evt.velocity);
});

SwipeManager.addEventListener(SwipeManager.SWIPE_DOWN, function(evt) {
	console.log("SWIPE DOWN: "+evt.velocity);	
});