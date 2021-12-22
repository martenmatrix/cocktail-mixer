const sqlite3 = require('sqlite3').verbose();
const drinksDatabase = new sqlite3.Database('./data/database.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the drinks database.');
    }
});

class DrinksDatabase {
    static async createTables() {

        const createDrinks = new Promise((resolve, reject) => {
            drinksDatabase.run('CREATE TABLE IF NOT EXISTS drinks (id INTEGER PRIMARY KEY, name TEXT, hasAlcohol BOOLEAN)', (err) => {
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

    static async createDrink(name, hasAlcohol) {
        const newID = this.getID();
        return new Promise((resolve, reject) => {
            drinksDatabase.run('INSERT INTO drinks (id, name, hasAlcohol) VALUES (?, ?, ?)', [newID, name, hasAlcohol], (err) => {
                if (err) {
                    reject(err);
                }
                resolve(newID);
            });
        });
    }

    static async removeDrink(id) {
        const deleteIngredients = new Promise((resolve, reject) => {
            drinksDatabase.run('DELETE FROM ingredients WHERE id = ?', [id], (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });

        const deleteDrink = new Promise((resolve, reject) => {
            drinksDatabase.run('DELETE FROM drinks WHERE id = ?', [id], (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });

        await Promise.all([deleteIngredients, deleteDrink]);
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

    static async getIngredients(drinkID) {
        return new Promise((resolve, reject) => {
            drinksDatabase.all('SELECT * FROM ingredients WHERE id = ?', [drinkID], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

    static async getAllIngredientsCategories() {
        return new Promise((resolve, reject) => {
            drinksDatabase.all('SELECT DISTINCT categoryOfIngredient FROM ingredients', (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

    static async getAllDrinks() {
        return new Promise((resolve, reject) => {
            drinksDatabase.all('SELECT * FROM DRINKS', (err, rows) => {
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

DrinksDatabase.createTables();

module.exports = DrinksDatabase;
