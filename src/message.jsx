/** @jsx React.DOM */
var Dispatcher = require("flux-dispatcher");
var MessageStore = require("../src/message.store");
var React = require("react");

var getEmoticonHtml = function() {
	var id = 0;
	return MessageStore.emoticons.map(function(emoticon) {
		return (
			<li>{ emoticon }</li>
		);
	});
};

var getLinkHtml = function() {
	return MessageStore.links.map(function(link) {
		return (
			<li>
				Url: { link.url },
				Title: { link.title }
			</li>
		);
	});
};

var getMentionHtml = function() {
	return MessageStore.mentions.map(function(mention) {
		return (
			<li>{ mention }</li>
		);
	});
};

var Message = React.createClass({
	componentDidMount: function () {
	    MessageStore.bind("change", this.valueChanged);  
	},
	parseTokens: function(ev, id) {
		Dispatcher.dispatch({
			eventName: "message-changed",
			value: this.getDOMNode().querySelector("textarea").value
		});
	},
	render: function() {
		var textareaStyle = {
			height: "300px",
			width: "800px"
		};

		return (
			<div>
				<textarea
					onInput={ this.parseTokens }
					style={ textareaStyle }
					></textarea>

				<div>
					Emoticons:
					<ul>
						{ getEmoticonHtml() }
					</ul>
				</div>
				<div>
					Links:
				</div>
					<ul>
						{ getLinkHtml() }
					</ul>
				<div>
					Mentions:
					<ul>
						{ getMentionHtml() }
					</ul>
				</div>
			</div>
		);
	},
	value: MessageStore.value,
	valueChanged: function() {
		this.value = MessageStore.value;
		this.forceUpdate();
	}
});

React.render(
	<Message />,
	document.getElementById("message")
);
