const DrinksDatabase = require('../databaseHandler');

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

module.exports = router;