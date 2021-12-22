const DrinksDatabase = require('../databaseHandler');
const checkPassword = require('../misc').checkPassword;
const getCategoryOfIngredient = require('../misc').getCategoryOfIngredient;
const activatePump = require('../raspberry').activatePump;
const setTask = require('../currentTask').setTask;
const getTask = require('../currentTask').getTask;
const ingredientsJSONPATH = './data/ingredients.json';
const pumpsJSONPATH = './data/pumps.json';

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

    const currentIngredients = await fs.promises.readFile(ingredientsJSONPATH, "utf8").catch(error => {
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

    const currentIngredients = await fs.promises.readFile(ingredientsJSONPATH, "utf8").catch(error => {
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


router.get('/all', async (req, res) => {
    const allDrinks = await DrinksDatabase.getAllDrinks();
    res.status(200);
    res.send(allDrinks);
});

function getUnitInMl(unit) {
    switch (unit) {
        case 'ml':
            return 1;
        case 'cl':
            return 10;
        case 'tsp':
            return 5;
        case 'tbsp':
            return 15;
        default:
            return 1;
    }
}

async function getPumpWithIngredient(ingredient) {
    const response = await fs.promises.readFile(pumpsJSONPATH, 'utf8').catch((error) => console.error(error));
    const pumpSettingsArray = JSON.parse(response).pumps;

    const ingredientIndex = pumpSettingsArray.findIndex((object) => object.select === ingredient);
    if (ingredientIndex === -1) {
        console.error(`Ingredient ${ingredient} not avaible.`);
        return -1;
    }

    return pumpSettingsArray[ingredientIndex].id;
}

function getPumpRate(pumpID) {
    // ml per second
    pumpID = parseInt(pumpID);

    switch (pumpID) {
        case 1:
            return process.env.RATE_PUMP_1;
        case 2:
            return process.env.RATE_PUMP_2;
        case 3:
            return process.env.RATE_PUMP_3;
        case 4:
            return process.env.RATE_PUMP_4;
        case 5:
            return process.env.RATE_PUMP_5;
        case 6:
            return process.env.RATE_PUMP_6;
        case 7:
            return process.env.RATE_PUMP_7;
        case 8:
            return process.env.RATE_PUMP_8;
    }
}

router.post('/make', async (req, res) => {
    const currentTask = getTask();
    if (currentTask !== 'Idle') {
        res.status()
    };
    setTask('Mixing');

    const idOfDrink = req.body.id;
    const ingredients = await DrinksDatabase.getIngredients(idOfDrink);
    const notAdded = [];
    await Promise.all(ingredients.map(async (ingredient) => {

        const pumpID = await getPumpWithIngredient(ingredient.ingredient);
        if (pumpID === -1) {
            notAdded.push(ingredient);
            return;
        }

        console.log(ingredient);
        const unit = ingredient.unitOfMeasurement;
        const amount = ingredient.amountOfIngredient;

        const convertRate = getUnitInMl(unit);
        const mlToDispense = amount * convertRate;
        const pumpRateMlPerSecond = parseInt(getPumpRate(pumpID));

        const activationTimeInSeconds = mlToDispense / pumpRateMlPerSecond;
        const activationTime = activationTimeInSeconds * 1000;
        await activatePump(pumpID, activationTime);
    }));
    res.status(200);
    res.send({notAdded});
    setTask('Idle');
});

router.delete('/remove', async (req, res) => {
    const password = req.body.password;
    const drinkID = req.body.id;

    if (!(checkPassword(password).correct)) {
        res.status(401);
    }

    try {
        await DrinksDatabase.removeDrink(drinkID);
        res.status(200);
        res.send({success: true})
    } catch(error) {
        res.status(500);
        res.send({error: error.message})
    }
});

router.post('/ingredients', async (req, res) => {
    const id = req.body.id;
    const ingredients = await DrinksDatabase.getIngredients(id);
    res.status(200);
    res.send({ingredients});
});
module.exports = router;