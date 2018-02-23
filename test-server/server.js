const express = require('express');
const Twitter = require('twitter');
const cors = require('cors');

const app = express();

var client = new Twitter({
  consumer_key: "YmQRlePw6CAKPTKokErcFOSHL",
  consumer_secret: "62wcqvvUl1RoGvHJah9I4QScR8adzBqBzvdI7X2Cqla62EwCYN",
  access_token_key: "2780029802-fdOEt9P2humY7X48vyTEFkdIN9D9qKWrkjElVPP",
  access_token_secret: "cyzf3T19IQLTFvojyvkpHjeYdriXLpH9zFfX834KSQg6n"
});

var corsOptions = {
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.listen(8000, () => {
  console.log('Server started!');
});

app.route('/api/tweets/:search').get((req, res) => {
  const requestedTweet = req.params['search'];
  client.get('search/tweets', {q: requestedTweet, count: 50}, function(error, tweets, response) {
		console.log('error', error);
		console.log('tweets', tweets);
		console.log('response', response);

		res.send({ 
			error: error,
			tweets: tweets,
			response: response 
		});
 });
});