const DrinksDatabase = require('../databaseHandler');
const checkPassword = require('../misc');

const express = require('express');
const fs = require('fs');

const router = express.Router();

const db = new DrinksDatabase();

router.get('/make', (req, res) => {
    res.send('Already making a drink.');
});

router.get('/ingredients', (req, res) => {
    fs.readFile("../data/ingredients.json", "utf8", (error, jsonString) => {
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

    const currentIngredients = await fs.promises.readFile("../data/ingredients.json", "utf8"). catch(error => {
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

    await fs.promises.writeFile("../data/ingredients.json", JSON.stringify(newObject)).catch(error => {
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

    const currentIngredients = await fs.promises.readFile("../data/ingredients.json", "utf8"). catch(error => {
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

    await fs.promises.writeFile("../data/ingredients.json", JSON.stringify(newObject)).catch(error => {
        res.status(500);
        res.send({ error: error.message });
        return;
    });

    res.status(200);
    response.success = true;
    res.send(response);
});

module.exports = router;