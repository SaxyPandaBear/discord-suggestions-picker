// Wrapper for SQLite db shared by commands
const sqlite3 = require('sqlite3');
const ReadWriteLock = require('rwlock');

const db = new sqlite3.Database('./suggestions.db');
const lock = new ReadWriteLock();

db.run('CREATE TABLE IF NOT EXISTS suggestions (topic TEXT)');

export function submit(suggestion) {
    const statement = db.prepare('INSERT INTO suggestions VALUES (?)');
    lock.writeLock(function (release) {
        statement.run(suggestion);
        statement.finalize();
        release();
    });
}

export function clear() {
    lock.writeLock(function (release) {
        db.run('TRUNCATE suggestions');
        release();
    });
}

export function all() {
    const topics = [];
    lock.readLock(function (release) {
        db.all('SELECT * FROM suggestions', (err, rows) => {
            topics = rows;
        });
        release();
    });
    return topics;
}
