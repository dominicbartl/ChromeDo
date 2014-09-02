window.History = {
	readHistory: function ( maxResults, list, endTime ) {
		//console.log(arguments);
		if (count++ >= 5) {
			//printList(list);
			return;
		};
		chrome.history.search({ text: '', maxResults: maxResults, endTime: endTime }, function ( history ) {	
			var origLength = history.length;

			//Remove the first element when an endtime is given, to avoid duplicates
			if (endTime) {
				//history.shift();
			};
			printList(history);
			
			list = list.concat(history);

			if (origLength == maxResults) {
				var lastItem = history[history.length-2];
				readHistory(maxResults, list, lastItem.lastVisitTime);
			};
		});
	},

	printList: function ( list ) {
		for (var i = 0; i < list.length; i++) {
			console.log(list[i].title);
		};
	}
};