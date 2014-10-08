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
	if (e.ctrlKey && e.keyCode === 32) {
		event.preventDefault();
		var url = chrome.extension.getURL('src/chromedo.html');
		createIFrame(url);
		return;
	} else if(e.keyCode === 27) {
		removeFrame();
	}
};

function removeFrame() {
	var iframe = document.getElementById('chromedo-frame');
		if (iframe) {
			document.body.removeChild(iframe);
		}
}

function receiveMessage(event){
   if (event.data == 'removeFrame') {
      removeFrame();
   }
}
window.addEventListener('message', receiveMessage, false);