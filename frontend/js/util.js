'use strict'

var moment = require('moment');

var Util = {
	escapeHtml: function (str) {
	    var div = document.createElement('div');

	    div.appendChild(document.createTextNode(str));

	    return div.innerHTML;
	},

	formatDateTime: function (dateTime) {
		return moment.utc(dateTime).local()
			.format('dddd, MMMM Do YYYY, h:mm:ss a');
	}
}

module.exports = Util;