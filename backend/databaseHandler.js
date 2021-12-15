const sqlite3 = require('sqlite3').verbose();
const drinksDatabase = new sqlite3.Database('../data/database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the drinks database.');
});

class DrinksDatabase {
    static async createTables() {

        const createDrinks = new Promise((resolve, reject) => {
            drinksDatabase.run('CREATE TABLE IF NOT EXISTS drinks (id INTEGER PRIMARY KEY, name TEXT)', (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
        const createIngredients = new Promise((resolve, reject) => {
            drinksDatabase.run('CREATE TABLE IF NOT EXISTS ingredients (id INTEGER, ingredient TEXT, categoryOfIngredient TEXT, amountOfIngredient REAL, unitOfMeasurement TEXT)', (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });

        return Promise.all([createDrinks, createIngredients]);
    }

    static getID() {
        return Math.floor(+Date.now() + Math.random());
    }

    static async createDrink(name) {
        const newID = this.getID();
        return new Promise((resolve, reject) => {
            drinksDatabase.run('INSERT INTO drinks (id, name) VALUES (?, ?)', [newID, name], (err) => {
                if (err) {
                    reject(err);
                }
                resolve(newID);
            });
        });
    }

    static async addIngredient(drinkID, ingredient, category, amount, unit) {
        return new Promise((resolve, reject) => {
            drinksDatabase.run('INSERT INTO ingredients (id, ingredient, categoryOfIngredient, amountOfIngredient, unitOfMeasurement) VALUES (?, ?, ?, ?, ?)', [drinkID, ingredient, category, amount, unit], (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            })
        });
    }

    static async getAllDrinks() {
       return new Promise((resolve, reject) => {
            drinksDatabase.all('SELECT * FROM drinks', (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

    static async endConnection() {
        return new Promise((resolve, reject) => {
            drinksDatabase.close((err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            })
        });
    }
}

async function test() {
    await DrinksDatabase.createTables();
    const id = await DrinksDatabase.createDrink('Ipanema');
    await DrinksDatabase.addIngredient(id, 'Rum', 'Alcohol', 1, 'oz');
    await DrinksDatabase.addIngredient(id, 'Lime', 'Liqueur', 1, 'oz');
    await DrinksDatabase.endConnection();

}
test();
module.exports = DrinksDatabase;