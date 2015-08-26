'use strict';

var Marionette = require('backbone.marionette');
var _ = require('underscore');

function escapeHtml(str) {
    var div = document.createElement('div');

    div.appendChild(document.createTextNode(str));

    return div.innerHTML;
};

var AnswerView = Marionette.ItemView.extend({
    template: '#answer-template',
    ui: {
        'add': '.js-add',
        'user': '[name=user]',
        'text': '[name=text]'
    },
    events: {
        'click @ui.add': 'onAdd',
        'focus @ui.user': 'clearError',
        'focus @ui.text': 'clearError'
    },

    initialize: function () {
        Backbone.Validation.bind(this);
        this.listenTo(this.model, 'invalid', this.showError);
    },

    onAdd: function (e) {
        e.preventDefault();

        var user = escapeHtml(this.$('[name=user]').val());
        var text = escapeHtml(this.$('[name=text]').val());

        this.model.save({
            user: user,
            text: text
        }, {
            success: _.bind(function () {
                this.trigger('add');
            }, this),
            error: _.bind(function (mode, xhr, options) {
                var errorMessage = 'Something went bad';

                if (response.responseJSON.error) {
                    errorMessage = response.responseJSON.error;
                }
                
                this.$('.js-error').html(errorMessage);
            }, this)
        });
    },
    
    showError: function (model) {
        var errorString = '';
        _.each(model.validationError, function (error) {
            errorString += '<div>' + error + '</div>';
        });
        this.$('.js-error').html(errorString);
    },

    clearError: function () {
        this.$('.js-error').empty();
    }
});

module.exports = AnswerView;