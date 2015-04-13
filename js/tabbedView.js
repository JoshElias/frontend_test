;
(function() {

	// Members
 	var mTabbedView;
    var mTabbedContent;
    var mTabHeader;
	var mCurrentTab;


	// Methods
	window.onload = function() {

		// Members
	    var mTabbedView = document.getElementById("tabbedView");
	    var mTabbedContent = document.getElementById("tabbedContent");
	    var mTabHeader = document.getElementById("tabHeader_1");
	   
	    var mCurrentTab = mTabHeader.id.split("_")[1];
	    mTabHeader.parentNode.setAttribute("data-current", mCurrentTab);
	    mTabHeader.setAttribute("class","activeTab");

	    // Hide inactive tabs
	    var pages = mTabbedContent.getElementsByTagName("div");
	      for (var i = 1; i < pages.length; i++) {
	       pages.item(i).style.display = "none";
	    };

	    // Add on click event to tabs
	    var tabs = mTabbedView.getElementsByTagName("li");
	    for (var i = 0; i < tabs.length; i++) {
	      tabs[i].onclick = displayPage;
	    }
	}

	// Fired when someone clicks on a tab
	function displayPage() {
		var tabIndex = this.parentNode.getAttribute("data-current");
		
		// Remove active class and hide old contents
		document.getElementById("tabHeader_" + tabIndex).removeAttribute("class");
		document.getElementById("tabPage_" + tabIndex).style.display="none";

		var currentTab = this.id.split("_")[1];

		// Add active class of active header to new active tab and show contents
		this.setAttribute("class","activeTab");
		document.getElementById("tabPage_" + currentTab).style.display = "block";
		this.parentNode.setAttribute("data-current", currentTab);
	}
})();