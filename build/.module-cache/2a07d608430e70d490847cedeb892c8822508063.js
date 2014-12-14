var Dispatcher = require("flux-dispatcher");
var MessageStore = require("../src/message.store");
var React = require("react");

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

				React.createElement("div", null, "Version: ",  MessageStore.version), 
				React.createElement("div", null, 
					"Emoticons:", 
					React.createElement("ul", null
					)
				), 
				React.createElement("div", null, 
					"Links:"
				), 
					React.createElement("ul", null
					), 
				React.createElement("div", null, 
					"Mentions:", 
					React.createElement("ul", null
					)
				)
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
