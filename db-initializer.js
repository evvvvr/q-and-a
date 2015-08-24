var fs = require('fs'),
	sqlite3 = require('sqlite3'),
	AppDefaults = require('./app-defaults.js');;

module.exports = function (callback) {
	var db = new sqlite3.Database(AppDefaults.DbFilename),
		dbCreationScript = fs.readFileSync('./db/create.sql', 'utf8');

	db.exec(dbCreationScript, function (err) {
		if (err) {
			callback(err);
		} else {
			db.close();
			callback();
		}		
	});
}