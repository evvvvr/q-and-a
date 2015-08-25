'use strict';

var Marionette = require('backbone.marionette');
var moment = require('moment');

var titles = {
    'all': 'All Questions',
    'answered': 'Answered Questions',
    'unanswered': 'Unanswered Questions'
};

var ItemView = Marionette.ItemView.extend({
    className: 'item',
    template: '#item-template',
    templateHelpers: function () {
        return {
            dateTime: moment.utc(this.model.get('dateTimeAsked')).local()
                .format('dddd, MMMM Do YYYY, h:mm:ss a')
        }
    }
});

var ListView = Marionette.CompositeView.extend({
    childView: ItemView,
    template: '#list-template',
    childViewContainer: '.js-list',
    templateHelpers: function () {
        return {
            title: titles[this.options.type]
        }
    }
});

module.exports = ListView;