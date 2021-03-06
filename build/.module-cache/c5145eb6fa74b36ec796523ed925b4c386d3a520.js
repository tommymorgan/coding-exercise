var Dispatcher = require("flux-dispatcher");
var MessageStore = require("../src/message.store");
var React = require("react");

var Message = React.createClass({displayName: 'Message',
	parseTokens: function(ev, id) {
		Dispatcher.dispatch({
			eventName: "message-changed",
			value: this.getDOMNode().value
		});
	},
	render: function() {
		return (
			React.createElement("textarea", {
				onInput:  this.parseTokens
				}, " ", Message.value)
		);
	},

});

React.render(
	React.createElement(Message, null),
	document.getElementById("message")
);
