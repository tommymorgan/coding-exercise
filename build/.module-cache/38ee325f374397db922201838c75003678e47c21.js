var React = require("react");
var $ = require("jquery");

var Message = React.createClass({displayName: 'Message',
	render: function() {
		return (
			React.createElement("div", null, "I am a React component")
		);
	}
});

$(document).ready(function() {
	React.render(
		React.createElement(Message, null),
		document.getElementById("message")
	);
});
