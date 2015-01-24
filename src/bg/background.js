
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (message === 'bookmarks') {
		console.log('Got bookmark request (Step 2)');
		sendResponse(window.bms);
	};
});

Bookmarks.get( function ( list ) {
	console.log('Preloaded bookmarks (Step 1)');
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
			console.log('Background page: got response(' + response + ')');
		});
	});
}