var Dispatcher = require("flux-dispatcher");
var MicroEvent = require("microevent");

var MessageStoreProto = function() {
	this.emoticons = ["filbert"],
	this.links = [],
	this.mentions = [],
	this.value = "",
	this.version = 0
};

MicroEvent.mixin(MessageStoreProto);

var MessageStore = new MessageStoreProto();

Dispatcher.register(function(payload) {
	switch (payload.eventName) {
		case "message-changed":
			MessageStore.value = payload.value;
			++MessageStore.version;

			// find emoticons
			var emoticonRegex = /\((?:.{1,15})\)/g;
			debugger;
			MessageStore.emoticons = emoticonRegex.exec(MessageStore.value);

			// find links
				// get page title

			// find user mentions
			// MessageStore.mentions.push();

			MessageStore.trigger("change");
			break;
	}

	return true;
});

module.exports = MessageStore;