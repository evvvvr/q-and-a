'use strict';

var Marionette = require('backbone.marionette');
var _ = require('underscore');

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
        var user = this.$('[name=user]').val();
        var text = this.$('[name=text]').val();
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
    
    showError: function () {
        var errorString = '';
        _.each(this.model.validationError, function (error) {
            errorString += '<div>' + error + '</div>';
        })
        this.$('.js-error').html(errorString);
    }
});

module.exports = AskView;