'use strict';

var Marionette = require('backbone.marionette'),
    _ = require('underscore'),
    Util = require('../util.js'),
    Answer = require('../models/questions.js').Answer,
    AnswerView = require('./answer-view.js');

var QuestionDetailsView = Marionette.LayoutView.extend({
    regions: {
        answer : '.js-add-answer-region'
    },
    template: '#question-details-template',
    templateHelpers: {
        dateTime: Util.formatDateTime
    },
    onShow: function() {
        var answerView = new AnswerView({
            model: new Answer({questionId: this.model.id})
        });

        this.listenTo(answerView, 'add', _.bind(function () {
            this.trigger('add');
        }, this));

        this.showChildView('answer', answerView);
    }
});

module.exports = QuestionDetailsView;