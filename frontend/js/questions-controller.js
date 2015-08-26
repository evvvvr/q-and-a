'use strict';

var Marionette = require('backbone.marionette'),
    $ = require('jquery'),
    _ = require('underscore'),
    Question = require('./models/questions.js').Question,
    Questions = require('./models/questions.js').Questions,
    AppLayout = require('./views/app-layout.js'),
    QuestionsView = require('./views/questions-view.js'),
    QuestionDetailsView = require('./views/question-details-view.js'),
    AskView = require('./views/ask-view.js');

var QuestionsController = Marionette.Controller.extend({
    initialize: function () {
        this.questions = new Questions();
        this.layoutView = new AppLayout.Layout();
    },

    start: function () {
        this.showMenu('all');
        this.showAllQuestions(this.questions);
        this.questions.fetch();
    },

    showMenu: function (type) {
        var menu = new AppLayout.Menu({
            type: type
        });
        this.layoutView.showChildView('menu', menu);
    },

    showAllQuestions: function () {
        this.questions.fetchAll();

        this.layoutView.showChildView('main', new QuestionsView({
            collection: this.questions,
            type: 'all'
        }));

        this.showMenu('all');
    },

    showAnsweredQuestions: function () {
        this.questions.fetchAnswered();

        this.layoutView.showChildView('main', new QuestionsView({
            collection: this.questions,
            type: 'answered'
        }));

        this.showMenu('answered');
    },

    showUnansweredQuestions: function () {
        this.questions.fetchUnanswered();

        this.layoutView.showChildView('main', new QuestionsView({
            collection: this.questions,
            type: 'unanswered'
        }));

        this.showMenu('unanswered');
    },

    showAskQuestion: function () {
        var view =  new AskView({
            model: new Question()
        });
        
        this.listenTo(view, 'add', _.bind(function (model) {
            this.showAllQuestions();
            this.router.navigate('');
        }, this));
        
        this.layoutView.showChildView('main', view);
    },

    showQuestion: function(id) {
        var model = new Question({id : id});

        model.fetch({
            success: _.bind(function () {
                var view = new QuestionDetailsView({
                    model: model
                });

                this.listenTo(view, 'add', _.bind(function () {
                    this.showQuestion(id);
                }, this));

                this.layoutView.showChildView('main', view);
            }, this)
        });
    }
});

module.exports = QuestionsController;