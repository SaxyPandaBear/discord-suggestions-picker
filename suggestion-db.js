// Wrapper for SQLite db shared by commands
const sqlite3 = require('sqlite3');
const ReadWriteLock = require('rwlock');

const db = new sqlite3.Database('./suggestions.db');
const lock = new ReadWriteLock();

db.run('CREATE TABLE IF NOT EXISTS suggestions (topic TEXT)');

module.exports = {
    submit(suggestion) {
        const statement = db.prepare('INSERT INTO suggestions VALUES (?)');
        lock.writeLock(function (release) {
            statement.run(suggestion);
            statement.finalize();
            release();
        })
    },
    clear() {
        lock.writeLock(function (release) {
            db.run('DELETE FROM suggestions');
            release();
        });
    },
    all(callback) {
        lock.readLock(function (release) {
            db.all('SELECT * FROM suggestions', (err, rows) => {
                callback(rows); // in order to retrieve the rows, need to provide a callback function
            });
            release();
        });
    },
};
