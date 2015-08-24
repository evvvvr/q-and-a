'use strict';

var Marionette = require('backbone.marionette');

var QuestionRouter = Marionette.AppRouter.extend({
    appRoutes: {
      'ask': 'showAskQuestion',
      '': 'showAllQuestions',
      'answered': 'showAnsweredQuestions',
      'unanswered': 'showUnansweredQuestions',
    }
});

module.exports = QuestionRouter;