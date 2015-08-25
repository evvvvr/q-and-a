'use strict';

var Marionette = require('backbone.marionette');
var $ = require('jquery');
var _ = require('underscore');

var Question = require('./models/questions.js').Question;
var Questions = require('./models/questions.js').Questions;
var AppLayout = require('./views/app-layout.js');
var QuestionsView = require('./views/questions-view.js');
var QuestionDetailsView = require('./views/question-details-view.js');
var AskView = require('./views/ask-view.js');

var QuestionsController = Marionette.Controller.extend({
    initialize: function () {
        this.questions = new Questions();
        this.layoutView = new AppLayout.Layout();
    },

    start: function () {
        this.showMenu('all');
        this.showAllQuestions(this.questions);
        this.questions.on('all', this.updateHiddenElements, this);
        this.questions.fetch();
    },

    updateHiddenElements: function () {
        $('#main').toggle(!!this.questions.length);
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
        console.log('showing question ' + id);

        var model = new Question({id : id});

        model.fetch({
            success: _.bind(function () {
                var view = new QuestionDetailsView({
                    model: model
                });

                this.listenTo(view, 'addAnswer', _.bind(function (answer) {
                    console.log('Answer added');
                    console.log(answer);
                    this.router.navigate('#questions/' + id);
                }, this));

                this.layoutView.showChildView('main', view);
            }, this)
        });
    }
});

module.exports = QuestionsController;