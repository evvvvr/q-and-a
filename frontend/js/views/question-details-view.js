'use strict';

var Marionette = require('backbone.marionette'),
    moment = require('moment');

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
    onAdd: function (e) {
        e.preventDefault();
        this.trigger('addAnswer', this.model);
    }
});

module.exports = QuestionDetailsView;