'use strict';

var moment = require('moment');

var Question = Backbone.Model.extend({
    defaults: {
        text: '',
        user: ''
    },
    validation: {
        user: {
            required: true,
            msg: 'Please, enter your name'
        },

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
        var questionsLink = 'http://localhost:8080/api/questions';

        if (this.isNew()) {
            return questionsLink;
        }

        return questionsLink + '/' + this.id;
    }
});

var Questions = Backbone.Collection.extend({
  model: Question,
    url: 'http://localhost:8080/api/questions',
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
        user: {
            required: true,
            msg: 'Please, enter your name'
        },

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
        var url = 'http://localhost:8080/api/questions/' + this.options.questionId
            + '/answers';

        return url;
    }
});

module.exports = {
    Question: Question,
    Questions: Questions,
    Answer: Answer
};