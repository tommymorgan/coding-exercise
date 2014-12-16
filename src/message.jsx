/** @jsx React.DOM */
var Dispatcher = require("flux-dispatcher");
var MessageStore = require("../src/message.store");
var React = require("react");

var getEmoticonHtml = function() {
	var id = 0;
	return MessageStore.emoticons.map(function(emoticon) {
		return (
			<li key="emoticon-{ id++ }">{ emoticon }</li>
		);
	});
};

var getLinkHtml = function() {
	return MessageStore.links.map(function(link) {
		return (
			<li key="{ link.id }">Url: { link.url }, Title: { link.title }</li>
		);
	});
};

var getMentionHtml = function() {
	return MessageStore.mentions.map(function(mention) {
		return (
			<li key="{ mention.id }">{ mention }</li>
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
		return (
			<div>
				<textarea
					onInput={ this.parseTokens }
					></textarea>

				<div>Version: { MessageStore.version }</div>
				<div>
					Emoticons:
					<ul>
					</ul>
				</div>
				<div>
					Links:
				</div>
					<ul>
					</ul>
				<div>
					Mentions:
					<ul>
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
