import AppDefaults from './AppDefaults'
import fs from 'fs'
import path from 'path'
import Promise from 'bluebird'
import sqlite3 from 'sqlite3'

export default function initializeDb() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(AppDefaults.DbFilename);

        const dbCreationScript = fs.readFileSync(
            path.join(__dirname, 'db/create.sql'),
            'utf8'
        );
      
        db.exec(dbCreationScript, (err) => {
            if (err) {
                reject(err);
            } else {
                db.close();
                resolve();
            }
        });
    });
}