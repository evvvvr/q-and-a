var express = require('express');

var port = process.env.PORT || 8080;

var app = express();

var router = express.Router();

router.get('/', function(request, response) {
	response.json({foo: 'bar'});
	console.log('Got an API request!');
});

app.use(express.static('content'));
app.use('/api', router);

app.listen(port);
console.log('Listening on port ' + port);