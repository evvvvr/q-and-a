'use strict';

var Question = Backbone.Model.extend({
    url: 'http://localhost:8080/api/questions',
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
    }
});

var Questions = Backbone.Collection.extend({
    model: Question,
    url: 'http://localhost:8080/api/questions',
});

module.exports = {
    Question: Question,
    Questions: Questions
};