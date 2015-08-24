var sqlite3 = require('sqlite3'),
	AppDefaults = require('./app-defaults.js');

var GET_ALL_QUESTIONS_SQL = 'Select  Questions.id as id, Questions.Text as text, '
	+ 'Users.Login as user, Questions.DateTimeAsked as dateTimeAsked '
	+ 'From Questions '
	+ 'Inner Join Users On Users.Id = Questions.UserAsked '
	+ 'Order By datetime(Questions.DateTimeAsked) desc, id desc';

var GET_UNANSWERED_QUESTIONS_SQL = 'Select  Questions.id as id, Questions.Text as text, '
	+ 'Users.Login as user, Questions.DateTimeAsked as dateTimeAsked '
	+ 'From Questions '
	+ 'Inner Join Users On Users.Id = Questions.UserAsked '
	+ 'Where Not Exists (Select * From Answers Where Answers.QuestionId = Questions.Id) '
	+ 'Order By datetime(Questions.DateTimeAsked) desc, id desc';

var GET_ANSWERED_QUESTIONS_SQL = 'Select  Questions.id as id, Questions.Text as text, '
	+ 'Users.Login as user, Questions.DateTimeAsked as dateTimeAsked '
	+ 'From Questions '
	+ 'Inner Join Users On Users.Id = Questions.UserAsked '
	+ 'Where Exists (Select * From Answers Where Answers.QuestionId = Questions.Id) '
	+ 'Order By datetime(Questions.DateTimeAsked) desc, id desc';

function runAll(query, callback) {
	var db = new sqlite3.Database(AppDefaults.DbFilename);

	db.all(query, function (err, res) {
		db.close();
		callback(err, res);
	});
}

module.exports.getAllQuestions = function (callback) {
	runAll(GET_ALL_QUESTIONS_SQL, callback);
}

module.exports.getUnansweredQuestions = function (callback) {
	runAll(GET_UNANSWERED_QUESTIONS_SQL, callback);
};

module.exports.getAnsweredQuestions = function (callback) {
	runAll(GET_ANSWERED_QUESTIONS_SQL, callback);
};