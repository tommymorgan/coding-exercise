var express = require('express');
var jsdom = require('jsdom');
var request = require('request');
var router = express.Router();

/* GET URL listing. */
router.get('/title', function(req, res) {
	if (!req.query.url) {
		res.send('Request must contain a url to load.');
		return;
	}

	request(req.query.url, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			jsdom.env(body, ["http://code.jquery.com/jquery.js"], function(errors, window) {
				res.send(window.$("title").text());
			});
		} else {
			res.send('There was an error loading the title');
		}
	});
});

module.exports = router;
