;
(function() {

	// Members
	var mContent = document.getElementById("content");
	var mInput = document.getElementById("search_input");
	var mText = document.getElementById("search_text");
	var mResultText = document.getElementById("resultText");


	// Methods
	function getSearchResultText(occurances, query) {
		var queryElements = query.split(" ");
		var structure = (queryElements.length>1) ? "phrase" : "word"
		return "Found "+occurances+" occurances of the "+structure+' "'+query+'" in the below text.';
	}

	function cleanOutTags(paragraph) {
		var newString = "";
		var length = paragraph.length;
		var i = 0;
		var angleIgnore = false;
		var squareIgnore = false;
		for(i;i<length;i++) {
			var char = paragraph[i];
			
			// Ignore anything between < and >
			if(char === "<") {
				angleIgnore = true;
			} else if(angleIgnore && char === ">") {
				angleIgnore = false
			} else if(!angleIgnore) {
				
				// Ignore anything between [ and ]
				if(char === "[") {
					squareIgnore = true;
				} else if(squareIgnore && char === "]") {
					squareIgnore = false
				} else if(!squareIgnore) {
					newString += char;
				}
			}
		}

		return newString;
	}

	function search() {
		var query = mInput.value;
		var paragraphs = mText.getElementsByTagName('p');
		var occurences = 0;

		var length = paragraphs.length;
		var i = 0;
		for(i; i<length; i++) {
			var paragraph = paragraphs[i].innerHTML;
			var matches = cleanOutTags(paragraph).match(query);

			if(matches) {
				occurences += matches.length;
			}
		}

		// Set result text
		mResultText.innerHTML = getSearchResultText(occurences, query);
		console.log("Occurs: "+occurences);

		return false;
	}


	// Exports
	window.TextSearch = {
		search : search
	}
})();