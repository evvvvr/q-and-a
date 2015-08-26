'use strict';

var Marionette = require('backbone.marionette'),
    Util = require('../util.js');

var titles = {
    'all': 'All Questions',
    'answered': 'Answered Questions',
    'unanswered': 'Unanswered Questions'
};

var ItemView = Marionette.ItemView.extend({
    className: 'item',
    template: '#item-template',
    templateHelpers: {
        dateTime: Util.formatDateTime
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