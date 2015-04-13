
// Start the rotation of the rotator
var rotator = document.getElementById("rotator");
SwipeManager.registerForSwipeEvents(rotator);
ImageRotator.startRotation();

// You can swipe left or right on the rotator to watch it go crazy. It wasn't supposed to
// be so crazy but I couldnt get the orientation times perfect for this submission so
// lets pretend it's current functionality was intended... 