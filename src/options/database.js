var Database = {

	bootstrap: function() {
		window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

		// Handle the prefix of Chrome to IDBTransaction/IDBKeyRange.
		if ('webkitIndexedDB' in window) {
			window.IDBTransaction = window.webkitIDBTransaction;
			window.IDBKeyRange = window.webkitIDBKeyRange;
		}

		indexedDB.db = null;
		// Hook up the errors to the console so we could see it.
		// In the future, we need to push these messages to the user.
		indexedDB.onerror = function(e) {
			console.log(e);
		};
	},

	open: function() {
		indexedDB.open = function() {
			var v = "2.0 beta"; // yes! you can put strings in the version not just numbers
			var request = indexedDB.open("todos", v);

			request.onupgradeneeded = function(e) {
				var db = request.result;
				var store = db.createObjectStore("todo", {
					keyPath: "timeStamp"
				});
			};

			request.onsuccess = function(e) {
				todoDB.indexedDB.db = e.target.result;
				todoDB.indexedDB.getAllTodoItems();
			};

			request.onfailure = todoDB.indexedDB.onerror;
		};
	}

};