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
        'add': '.js-add'
    },
    events: {
        'click @ui.add': 'onAdd'
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
            }, this),
            //TODO add server side error handling
            error: _.bind(function (mode, xhr, options) {
                if (xhr.status === 201) {
                    this.trigger('add', this.model);
                }
            }, this)
        });
    },
    
    showError: function (model) {
        var errorString = '';
        _.each(model.validationError, function (error) {
            errorString += '<div>' + error + '</div>';
        });
        this.$('.js-error').html(errorString);
    }
});

module.exports = AnswerView;