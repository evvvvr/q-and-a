'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Marionette = require('backbone.marionette');

var Layout = Marionette.LayoutView.extend({
    el: '#questionapp',
    regions: {
        menu: '#menu',
        main: '#main'
    }
});

var Menu = Marionette.ItemView.extend({
    template: '#menu-template',

    onRender: function () {
        var type = this.options.type;
        
        this.$('li').each(function () {
            var $item = $(this);

            if ($item.data('type') === type) {
                $item.addClass('pure-menu-selected');
            } else {
                $item.removeClass('pure-menu-selected');
            }
        })
    }
});

module.exports = {
    Layout: Layout,
    Menu: Menu
};