var React = require("react");

var Message = React.createClass({
	render: function() {
		return (
			<div>I am a React component</div>
		);
	}
});

React.render(
	<Message />,
	document.getElementById("message")
);
