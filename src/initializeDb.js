import AppDefaults from './AppDefaults'
import fs from 'fs'
import path from 'path'
import sqlite3 from 'sqlite3'

export default function initializeDb(callback) {
    const db = new sqlite3.Database(AppDefaults.DbFilename);

    const dbCreationScript = fs.readFileSync(path.join(__dirname, 'db/create.sql'),
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