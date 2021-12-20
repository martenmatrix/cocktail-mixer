const DrinksDatabase = require('../databaseHandler');
const checkPassword = require('../misc').checkPassword;
const getCategoryOfIngredient = require('../misc').getCategoryOfIngredient;
const ingredientsJSONPATH = './data/ingredients.json';

const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/make', (req, res) => {
    res.send('Already making a drink.');
});

router.get('/ingredients', (req, res) => {
    fs.readFile(ingredientsJSONPATH, "utf8", (error, jsonString) => {
        if (error) {
          res.status(500);
          res.send({ error: error.message });
          return;
        }
        res.status(200);
        res.send(jsonString);
    });
});

router.patch('/addIngredient', async (req, res) => {
    const response = {
        success: false,
    }

    const password = req.body.password;
    const passwordValid = checkPassword(password).correct;
    if (!passwordValid) {
        res.status(401);
        res.send(response);
        return;
    }

    const category = req.body.category;
    const newIngredient = req.body.ingredient;

    const currentIngredients = await fs.promises.readFile(ingredientsJSONPATH, "utf8"). catch(error => {
        res.status(500);
        res.send({ error: error.message });
        return;
    });

    if (!currentIngredients) {
        res.status(500);
        res.send({response, ...{ error: 'Could not read ingredients file.'}});
        return;
    }

    const newObject = {...JSON.parse(currentIngredients)};
    newObject[category].push(newIngredient);

    await fs.promises.writeFile(ingredientsJSONPATH, JSON.stringify(newObject)).catch(error => {
        res.status(500);
        res.send({ error: error.message });
        return;
    });

    res.status(200);
    response.success = true;
    res.send(response);
});

router.patch('/removeIngredient', async (req, res) => {
    const response = {
        success: false,
    }

    const password = req.body.password;
    const passwordValid = checkPassword(password).correct;
    if (!passwordValid) {
        res.status(401);
        res.send(response);
        return;
    }

    const category = req.body.category;
    const deleteIngredient = req.body.ingredient;

    const currentIngredients = await fs.promises.readFile(ingredientsJSONPATH, "utf8"). catch(error => {
        res.status(500);
        res.send({ error: error.message });
        return;
    });

    if (!currentIngredients) {
        res.status(500);
        res.send({response, ...{ error: 'Could not read ingredients file.'}});
        return;
    }

    const newObject = {...JSON.parse(currentIngredients)};
    const newArray = newObject[category].filter(ingredient => ingredient !== deleteIngredient);
    newObject[category] = newArray;

    await fs.promises.writeFile(ingredientsJSONPATH, JSON.stringify(newObject)).catch(error => {
        res.status(500);
        res.send({ error: error.message });
        return;
    });

    res.status(200);
    response.success = true;
    res.send(response);
});

// DrinksDatabase
router.patch('/add', async (req, res) => {
    const name = req.body.name;
    const ingredients = req.body.ingredients;

    // get all categories and check if it contains alcohol
    let hasAlcohol = false;
    const ingredientsWithCategory = await Promise.all(ingredients.map(async (ingredient) => {
        const nameOfIngredient = ingredient.ingredient;
        const category = await getCategoryOfIngredient(nameOfIngredient);

        if (category === 'alcohol') {
            hasAlcohol = true;
        }

        return {
            ...ingredient,
            ...{category}
        }
    }));

    const idOfDrink = await DrinksDatabase.createDrink(name, hasAlcohol);
    await Promise.all(ingredientsWithCategory.map(async (ingredient) => {
        await DrinksDatabase.addIngredient(idOfDrink, ingredient.ingredient, ingredient.category, ingredient.amount, ingredient.unit);
    })).catch((error) => {
        res.status(500);
        res.send({ error: error.message });
        return;
    });

    res.status(200);
    res.send({
        success: true,
        id: idOfDrink
    });
});

module.exports = router;