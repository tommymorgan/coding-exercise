var Dispatcher = require("flux-dispatcher");
var React = require("react");

var Message = React.createClass({displayName: 'Message',
	parseTokens: function(ev, id) {
		debugger;
		Dispatcher.dispatch({
			eventName: "message-changed"
		});
	},
	render: function() {
		return (
			React.createElement("textarea", {
				onInput:  this.parseTokens
				})
		);
	}
});

React.render(
	React.createElement(Message, null),
	document.getElementById("message")
);
