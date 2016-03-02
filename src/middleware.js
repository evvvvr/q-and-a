'use strict';

module.exports.handleError = function (err, request, response, next) {
    console.error('Error occured: %j', err);

    response.json({'error' : 'Sorry, something went wrong'}).status(500);
};