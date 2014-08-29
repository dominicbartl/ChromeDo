chrome.bookmarks.getTree(function ( bookmarks ) {
	var list = [];
	readFolder(bookmarks[0], list);
	//console.log(list);
});

var hist = [];
//readHistory(3, hist);

chrome.history.search({ text: '', maxResults: 0 }, function ( history ) {	
	console.log(history.length)
});

function readFolder(node, list) {
	var children = node.children;
	for (var i = 0; i < children.length; i++) {
		var newNode = children[i];
		if (isBookmark(newNode)) {
			list.push(newNode);
		} else {
			readFolder(newNode, list);
		}
	};
}

function isFolder( node ) {
	return !!(node.children);
}

function isBookmark( node ) {
	return !(node.url === undefined);
}

var count = 0;

function readHistory( maxResults, list, endTime ) {
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
}

function printList( list ) {
	for (var i = 0; i < list.length; i++) {
		console.log(list[i].title);
	};
}

