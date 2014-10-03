console.log('Injected javascript has been loaded. v2');
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		/*var url = chrome.extension.getURL('src/chromedo.html');
		createIFrame(url);*/
	});

function createIFrame(url) {
	var id = 'chromedo-frame';
	if (document.getElementById(id)) {
		return;
	}
	var ifrm = document.createElement("iframe");
	ifrm.setAttribute('src', url);
	ifrm.setAttribute('id', id);
	ifrm.setAttribute('frameborder', '0');
	ifrm.setAttribute('style', 'position:fixed; top: 100px; right:0; left:0; margin: 0 auto; z-index:99999;');
	ifrm.style.width = 640 + "px";
	ifrm.style.height = 600 + "px";
	document.body.appendChild(ifrm);
}

window.onkeyup = function(e) {
	if (e.ctrlKey && e.which === 32) {
		event.preventDefault();
		var url = chrome.extension.getURL('src/chromedo.html');
		createIFrame(url);
		return;
	}
};