function createIFrame(url) {
	var id = 'chromedo-frame';
	if (document.getElementById(id)) {
		return;
	}
	var ifrm = document.createElement("iframe");
	ifrm.setAttribute('src', url);
	ifrm.setAttribute('id', id);
	ifrm.setAttribute('frameborder', '0');
	ifrm.setAttribute('style', 'position:fixed; top: 0; right:0; bottom:0; left:0; margin: 0 auto; z-index:99999;');
	ifrm.style.width = 100 + "%";
	ifrm.style.height = 100 + "%";
	document.body.appendChild(ifrm);
}

window.onkeyup = function(e) {
	if (e.ctrlKey && e.keyCode === 32) {
		event.preventDefault();
		var url = chrome.extension.getURL('src/chromedo.html');
		createIFrame(url);
		return false;
	} else if(e.keyCode === 27) {
		removeFrame();
	}
};

//Prevent scrolling on Mac #1
window.onkeydown = function(event) { 
    return !(event.ctrlKey && event.keyCode == 32);
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