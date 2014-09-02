chrome.commands.onCommand.addListener(function (command) {
	sendBookmarks();
});

console.log("imma background page");

Bookmarks.get( function ( list ) {
	console.log("ssss");
	window.bms = list;
});

function sendBookmarks() {
	sendMessageToActiveTab(window.bms);
}

function sendMessageToActiveTab ( message ) {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
			console.log(response);
		});
	});
}

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