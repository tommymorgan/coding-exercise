/** @jsx React.DOM */
var Dispatcher = require("flux-dispatcher");
var MessageStore = require("../src/message.store");
var React = require("react");

/*
var getLinkHtml = function() {
	return MessageStore.links.map(function(link) {
		return (
			<li key="{ link.id }">Url: { link.url }, Title: { link.title }
		);
	});
};

var getMentionHtml = function() {
	return MessageStore.mentions.map(function(mention) {
		return (
			<li key="{ mention.id }">{ mention }
		);
	});
};
*/

var Message = React.createClass({displayName: 'Message',
	componentDidMount: function () {
	    MessageStore.bind("change", this.valueChanged);  
	},
	parseTokens: function(ev, id) {
		Dispatcher.dispatch({
			eventName: "message-changed",
			value: this.getDOMNode().value
		});
	},
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("textarea", {
					onInput:  this.parseTokens
					}), 

				React.createElement("div", null, "Version: ",  MessageStore.version)
			)
		);
	},
	value: MessageStore.value,
	valueChanged: function() {
		this.value = MessageStore.value;
		this.forceUpdate();
	}
});

React.render(
	React.createElement(Message, null),
	document.getElementById("message")
);
