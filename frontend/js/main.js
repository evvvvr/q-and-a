'use strict';

require('../css/main.css');
require('purecss');

var Backbone = require('backbone'),
	Marionette = require('backbone.marionette');

require('backbone-validation');

var QuestionRouter = require('./routers/router.js'),
	QuestionsController = require('./questions-controller.js');

var App = Marionette.Application.extend();
var app = new App();

app.on('start', function () {
    var controller = new QuestionsController();

    controller.router = new QuestionRouter({
        controller: controller
    });
    
    controller.start();
    Backbone.history.start();
});

app.start();