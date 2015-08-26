'use strict';

var moment = require('moment'),
    Config = require('../config.js');

var Question = Backbone.Model.extend({
    defaults: {
        text: '',
        user: ''
    },
    validation: {
        user: [{
            required: true,
            msg: 'Please, enter your name'
        },
        {
            maxLength: 255,
            msg: 'Sorry, your name is too long'
        }],

        text: [{
            required: true,
            msg: 'Please, enter your question'
        },
        {
            maxLength: 3000,
            msg: 'Sorry, your question is too long'
        }]
    },
    url: function() {
        if (this.isNew()) {
            return Config.API.questionsURL;
        }

        return Config.API.buildQuestionURL(this.id);
    }
});

var Questions = Backbone.Collection.extend({
  model: Question,
    url: Config.API.questionsURL,
    comparator: function(item1, item2) {
        var firstItemDateTime = moment(item1.get('dateTimeAsked'));
        var secondItemDateTime = moment(item2.get('dateTimeAsked'));

        if (firstItemDateTime.isAfter(secondItemDateTime)) {
            return -1;
        }

        if (firstItemDateTime.isBefore(secondItemDateTime)) {
            return 1;
        }

        return 0;
    },
    fetchAll: function() {
        this.fetch();
    },
    fetchAnswered: function() {
        this.fetch({
            traditional: true,
            data: {'isAnswered': 'yes'}
        });
    },
    fetchUnanswered: function() {
        this.fetch({
            traditional: true,
            data: {'isAnswered': 'no'}
        });
    }
});

var Answer = Backbone.Model.extend({
    defaults: {
        text: '',
        user: ''
    },
    validation: {
        user: [{
            required: true,
            msg: 'Please, enter your name'
        },
        {
            maxLength: 255,
            msg: 'Sorry, your name is too long'
        }],

        text: [{
            required: true,
            msg: 'Please, enter your answer'
        },
        {
            maxLength: 3000,
            msg: 'Sorry, your answer is too long'
        }]
    },
    initialize: function(options){
        this.options = options || {};
    },
    url: function() {
        return Config.API.buildAnswersURL(this.options.questionId);
    }
});

module.exports = {
    Question: Question,
    Questions: Questions,
    Answer: Answer
};