const ingredientsJSONPATH = './data/ingredients.json';
const fs = require('fs');

function checkPassword(password) {
    const response = {
      correct: false
    }
    
    const validPassword = process.env.SETTINGS_PASSWORD;
    
    if (validPassword === password) {
      response.correct = true;
    }
  
    return response;
}
module.exports.checkPassword = checkPassword;

async function getCategoryOfIngredient(ingredient) {
    const currentIngredients = await fs.promises.readFile(ingredientsJSONPATH, "utf8"). catch((error) => {
        res.status(500);
        res.send({ error: error.message });
        return;
    });

    let foundCategory = null;
    Object.entries(JSON.parse(currentIngredients)).forEach(([category, ingredients]) => {
        ingredients.forEach((ingredientInCategory) => {
            if (ingredientInCategory === ingredient) {
                foundCategory = category;
            }
        });
    });

    return foundCategory;
}
module.exports.getCategoryOfIngredient = getCategoryOfIngredient;