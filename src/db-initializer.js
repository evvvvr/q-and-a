'use strict';

var fs = require('fs'),
    path = require('path'),
    sqlite3 = require('sqlite3'),
    AppDefaults = require('./app-defaults.js');;

module.exports = function (callback) {
    var db = new sqlite3.Database(AppDefaults.DbFilename);

    var dbCreationScript = fs.readFileSync(path.join(__dirname, 'db/create.sql'),
        'utf8');

    db.exec(dbCreationScript, function (err) {
        if (err) {
            callback(err);
        } else {
            db.close();
            callback();
        }       
    });
}