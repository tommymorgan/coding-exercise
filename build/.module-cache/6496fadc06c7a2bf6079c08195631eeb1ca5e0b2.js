var Dispatcher = require("flux-dispatcher");
var MessageStore = require("../src/message.store");
var React = require("react");

var getEmoticonHtml = function() {
	var id = 0;
};

var getLinkHtml = function() {
};

var getMentionHtml = function() {
};

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
