'use strict';

var Marionette = require('backbone.marionette');
var _ = require('underscore');

function escapeHtml(str) {
    var div = document.createElement('div');

    div.appendChild(document.createTextNode(str));

    return div.innerHTML;
};

var AskView = Marionette.ItemView.extend({
    template: '#add-template',
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
                this.trigger('add', this.model);
            }, this),            
            error: _.bind(function (model, response) {
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
    }
});

module.exports = AskView;