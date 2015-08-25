'use strict';

var Marionette = require('backbone.marionette'),
    _ = require('underscore'),
    moment = require('moment'),
    Answer = require('../models/questions.js').Answer,
    AnswerView = require('./answer-view.js');

var QuestionDetailsView = Marionette.LayoutView.extend({
    regions: {
        answer : '.js-add-answer-region'
    },
    template: '#question-details-template',
    templateHelpers: {
        dateTime: function(dateTime) {
            return moment.utc(dateTime).local()
                .format('dddd, MMMM Do YYYY, h:mm:ss a');
        }
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