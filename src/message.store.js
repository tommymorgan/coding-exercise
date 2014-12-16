var $ = require("jquery");
var _ = require("lodash");
var Dispatcher = require("flux-dispatcher");
var MicroEvent = require("microevent");
var twitter = require("twitter-text");

var MessageStoreProto = function() {
	this.emoticons = [];
	this.links = [];
	this.mentions = [];
	this.value = "";
	this.version = 0;
};

MicroEvent.mixin(MessageStoreProto);

var MessageStore = new MessageStoreProto();

Dispatcher.register(function(payload) {
	switch (payload.eventName) {
		case "message-changed":
			MessageStore.value = payload.value;
			++MessageStore.version;

			// find emoticons
			MessageStore.emoticons = [];
			var emoticonRegex = /\((.{1,15})\)/g;
			var emoticonMatch;

			while (emoticonMatch = emoticonRegex.exec(MessageStore.value)) {
				MessageStore.emoticons.push(emoticonMatch[1]);
			}

			// find links
			var linkCache = MessageStore.links;
			var linkPromise = $.Deferred();

			// first store the urls and any cached titles
			MessageStore.links = twitter.extractUrls(MessageStore.value).map(function(url) {
				var result = {
					url: url
				};

				var chachedLink = _.find(linkCache, function(link) {
					return link.url === url;
				});

				if (chachedLink) {
					result.title = chachedLink.title;
				}

				return result;
			});

			// now get titles for anything that wasn't cached
			var linksSansTitles = MessageStore.links.filter(function(link) {
				return link.title === void 0 || link.title === null;
			});

			linksSansTitles.forEach(function(link) {
				// use XHR to retrieve title if the link wasn't cached
				$.ajax({
					data: {
						url: link.url
					},
					type: "get",
					url: "http://localhost:3000/url/title"
				}).done(function(data) {
					link.title = data;
					MessageStore.trigger("change");
				});
			});

			// find user mentions
			MessageStore.mentions = twitter.extractMentions(MessageStore.value);

			MessageStore.trigger("change");
			break;
	}

	return true;
});

module.exports = MessageStore;