exports.QuestionType = {
	All : -1,

	NotAnswered : 0,

	Answered: 1,

	parse : function (value) {
		switch (value.toLowerCase()) {
			case "yes":
				return this.Answered;

			case "no":
				return this.NotAnswered;

			default:
				throw "Invalid value";
		}
	}
};