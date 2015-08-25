'use strict';

var Marionette = require('backbone.marionette'),
    moment = require('moment');

var QuestionDetailsView = Marionette.ItemView.extend({
    template: '#question-details-template',
    templateHelpers: {
        dateTime: function(dateTime) {
            return moment.utc(dateTime).local()
                .format('dddd, MMMM Do YYYY, h:mm:ss a');
        }
    }
});

module.exports = QuestionDetailsView;