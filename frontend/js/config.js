'use strict';

var Config = {
	API: {
		questionsURL: 'http://localhost:8080/api/questions',
		buildQuestionURL: function (id) {
			return this.questionsURL + '/' + id;
		},
		buildAnswersURL: function (questionId) {
			return this.questionsURL + '/' + questionId + '/answers';
		}
	}
};

module.exports = Config;