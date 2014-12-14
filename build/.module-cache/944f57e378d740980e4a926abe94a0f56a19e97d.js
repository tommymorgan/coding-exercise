var Dispatcher = require("flux-dispatcher");
var React = require("react");

var Message = React.createClass({displayName: 'Message',
	parseTokens: function(a, b, c) {
		debugger;
	},
	render: function() {
		return (
			React.createElement("textarea", {oninput:  this.parseTokens})
		);
	}
});

React.render(
	React.createElement(Message, null),
	document.getElementById("message")
);
