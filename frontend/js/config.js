'use strict';

var Config = {
	API: {
		questionsURL: 'http://localhost:8080/api/questions',
		buildQuestionURL: function (id) {
			return this.questionsLink + '/' + id;
		},
		buildAnswersURL: function (questionId) {
			return this.questionsLink + '/' + questionId + '/answers';
		}
	}
};

module.exports = Config;