'use strict';

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

var INSERT_USER_SQL = 'Insert or Ignore Into "Users" (Login) Values ($login)';

var INSERT_QUESTION_SQL = 'Insert Into Questions (Text, DateTimeAsked, UserAsked) ' 
	+ 'Select $text, datetime(\'now\'), Id from Users '
	+ 'Where Login = $login';

var GET_QUESTION_SQL = 'Select Questions.Id as id, Users.Login as user, '
	+ 'Questions.Text as text, Questions.DateTimeAsked as dateTimeAsked '
	+ 'From Questions '
	+ 'Inner Join Users On Users.Id = Questions.UserAsked '
	+ 'Where Questions.Id = $questionid';

var GET_ANSWERS_FOR_QUESTION = 'Select Users.Login as user, Answers.Text as text, '
	+ ' Answers.DateTimeAnswered as dateTimeAnswered From Answers '
	+ 'Inner Join Users On Users.Id = Answers.UserAnswered '
	+ 'Where Answers.QuestionId = $questionIdForAnswers '
	+ 'Order By datetime(Answers.DateTimeAnswered) desc, '
	+ 'Answers.Id desc';

var INSERT_ANSWER_SQL = 'Insert Into Answers (Text, DateTimeAnswered, QuestionId, UserAnswered) ' 
	+ 'Select $text, datetime(\'now\'), Questions.Id, Users.Id from Users '
	+ 'cross join Questions '
	+ 'Where Users.Login = $login and Questions.Id = $questionid';

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

module.exports.insertQuestion = function (question, callback) {
	var db = new sqlite3.Database(AppDefaults.DbFilename);

	db.serialize(function () {
		db.run(INSERT_USER_SQL, { $login: question.user });

		db.run(INSERT_QUESTION_SQL, {
				$text : question.text,
				$login : question.user
			}, function (err) {
				db.close();
				callback(err, this.lastID);
		});
	});
};

module.exports.getQuestion = function(id, callback) {
	var db = new sqlite3.Database(AppDefaults.DbFilename);

	db.get(GET_QUESTION_SQL, { $questionid : id }, function (error, question) {
		if (!question) {
			db.close();
			
			callback(error, undefined);
		} else {
			db.all(GET_ANSWERS_FOR_QUESTION, { $questionIdForAnswers : id},
				function (err, answers) {
					db.close();

					question.answers = answers;
					callback(err, question);
			});
		}
	});
};

module.exports.insertAnswer = function (questionId, answer, callback) {
	var db = new sqlite3.Database(AppDefaults.DbFilename);

	db.serialize(function () {
		db.run(INSERT_USER_SQL, { $login: answer.user });

		db.run(INSERT_ANSWER_SQL, {
				$text : answer.text,
				$login : answer.user,
				$questionid : questionId
			}, function (error) {
				db.close();

				callback(error, this.lastID);
		});
	});
};