'use strict';

var Marionette = require('backbone.marionette'),
    _ = require('underscore'),
    moment = require('moment'),
    Answer = require('../models/questions.js').Answer;

function escapeHtml(str) {
    var div = document.createElement('div');

    div.appendChild(document.createTextNode(str));

    return div.innerHTML;
};

var QuestionDetailsView = Marionette.ItemView.extend({
    ui: {
        'add': '.js-add'
    },
    events: {
        'click @ui.add': 'onAdd'
    },
    template: '#question-details-template',
    templateHelpers: {
        dateTime: function(dateTime) {
            return moment.utc(dateTime).local()
                .format('dddd, MMMM Do YYYY, h:mm:ss a');
        }
    },
    initialize: function () {
        Backbone.Validation.bind(this);
    },    
    onAdd: function (e) {
        e.preventDefault();

        var user = escapeHtml(this.$('[name=user]').val());
        var text = escapeHtml(this.$('[name=text]').val());

        var answer = new Answer({questionId: this.model.id});    
        this.listenTo(answer, 'invalid', this.showError);

        answer.save({
            user: user,
            text: text
        }, {
            success: _.bind(function () {
            }, this)
            //TODO add server side error handling
            /*error: _.bind(function (mode, xhr, options) {
                if (xhr.status === 201) {
                    this.trigger('addAnswer', answer);
                }
            }, this)*/
        });
    },

    showError: function (model) {
        console.error('invalid answer');
        var errorString = '';
        _.each(model.validationError, function (error) {
            errorString += '<div>' + error + '</div>';
        });
        this.$('.js-error').html(errorString);
    }
});

module.exports = QuestionDetailsView;