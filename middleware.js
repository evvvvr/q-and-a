'use strict';

var AppDefaults = require('./app-defaults.js');

module.exports.parsePagingParams = function (request, response, next) {
	function isPositiveInt(value) {
		return /^([1-9]\d*)$/.test(value);
	}

	request.pageNo = AppDefaults.PageNo;
	request.pageSize = AppDefaults.PageSize;

	if (request.query.pageNo) {
		if (isPositiveInt(request.query.pageNo)) {
			request.pageNo = request.query.pageNo;
		} else {
			response.sendStatus(404);
		}
	}

	if (request.query.pageSize) {
		if (isPositiveInt(request.query.pageSize)) {
			request.pageSize = request.query.pageSize;
		} else {
			response.sendStatus(404);
		}
	}

	next();
};