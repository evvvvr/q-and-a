'use strict';

module.exports.QuestionType = {
	All : -1,

	Unanswered : 0,

	Answered: 1,

	parse : function (value) {
		switch (value.toLowerCase()) {
			case "yes":
				return this.Answered;

			case "no":
				return this.Unanswered;

			default:
				throw "Invalid value";
		}
	}
};