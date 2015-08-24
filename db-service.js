var sqlite3 = require('sqlite3'),
	AppDefaults = require('./app-defaults.js');

var GET_ALL_QUESTIONS_SQL = 'Select  Questions.id as id, Questions.Text as text, '
	+ 'Users.Login as user, Questions.DateTimeAsked as dateTimeAsked '
	+ 'From Questions '
	+ 'Inner Join Users On Users.Id = Questions.UserAsked '
	+ 'Order By datetime(Questions.DateTimeAsked) desc, id desc';

module.exports.getAllQuestions = function (callback) {
	var db = new sqlite3.Database('data.db');

	db.all(GET_ALL_QUESTIONS_SQL, function (err, res) {
		db.close();
		callback(err, res);
	});
};