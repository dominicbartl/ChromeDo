window.Bookmarks = {

	get: function ( callback ) {
		var self = this;
		chrome.bookmarks.getTree(function ( bookmarks ) {
			var list = [];
			self.readFolder(bookmarks[0], list);
			callback(list);
		});
	},

	readFolder: function ( node, list ) {
		var children = node.children;
		for (var i = 0; i < children.length; i++) {
			var newNode = children[i];
			if (this.isBookmark(newNode)) {
				list.push(newNode);
			} else {
				this.readFolder(newNode, list);
			}
		};
	},

	isFolder: function ( node ) {
		return !node.children == undefined;
	},

	isBookmark: function ( node ) {
		return !(node.url === undefined);
	}
};