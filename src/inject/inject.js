console.log('Injected javascript has been loaded.');
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		var list = createList(request);
		//appendHtml(document.body, list);
		createIFrame();
	});

function createList(list) {
	var html = '<ul>';
	for (var i = list.length - 1; i >= 0; i--) {
		html += createItem(list[i]);
	};
	return html + '</ul>';
}

function createItem(item) {
	var html = '<li>';
	if (item.title) {
		html += item.title + '<p>' + item.url + '</p>';
	} else {
		html += item.url;
	}
	return html + '</li>';
}

function appendHtml(el, str) {
	var div = document.createElement('div');
	div.innerHTML = str;
	while (div.children.length > 0) {
		el.appendChild(div.children[0]);
	}
	console.log(arguments);
}

function createIFrame() {
	var ifrm = document.createElement("iframe");
	ifrm.setAttribute('src', 'http://developerfusion.com/');
	ifrm.setAttribute('style', 'frameborder="0"');
	ifrm.style.width = 640 + "px";
	ifrm.style.height = 480 + "px";
	document.body.appendChild(ifrm);
}