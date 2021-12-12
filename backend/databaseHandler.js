const sqlite3 = require('sqlite3').verbose();
const drinksDatabase = new sqlite3.Database('../data/database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the drinks database.');
});

class DrinksDatabase {
    constructor() {
        drinksDatabase.run('CREATE TABLE IF NOT EXISTS drinks (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, image TEXT)');
    }
}

module.exports = DrinksDatabase;