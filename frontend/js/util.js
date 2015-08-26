'use strict'

var Util = {
	escapeHtml: function (str) {
	    var div = document.createElement('div');

	    div.appendChild(document.createTextNode(str));

	    return div.innerHTML;
	}
}

module.exports = Util;