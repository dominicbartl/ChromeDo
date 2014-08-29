chrome.bookmarks.getTree(function ( bookmarks ) {
	var list = [];
	readFolder(bookmarks[0], list);
	console.log(list);
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