var React = require("react");

var Message = React.createClass({displayName: 'Message',
	render: function() {
		return (
			React.createElement("div", null, "I am a React component")
		);
	}
});

React.render(
	React.createElement(Message, null),
	document.getElementById("message")
);
