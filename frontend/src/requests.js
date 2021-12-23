// const HOSTNAME = window.location.href;
// const HOSTNAME_WITHOUT_PORT = HOSTNAME.slice(0, -6);
// const BACKEND_PORT = 4000;
// const BACKEND_LINK = `${HOSTNAME_WITHOUT_PORT}:${BACKEND_PORT}/`;
const BACKEND_LINK = 'http://192.168.178.45:4000/';

async function getStatus() {
    try {
        const response = await fetch(BACKEND_LINK + 'status');
        const json = await response.json();
        const responseObject = {
            online: true,
            ...json
        }
        return responseObject;
    } catch (e) {
        return { online: false };
    }
}

async function checkPassword(password) {
    try {
        const response = await fetch(BACKEND_LINK + 'password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password }),
        });
        const json = await response.json();

        return json;
    } catch (e) {
        return { success: false };
    }
}

async function getPumpsAndStatus() {
    try {
        const response = await fetch(BACKEND_LINK + 'pumps');
        const json = await response.json();

        if (response.status !== 200) {
            throw new Error(json.error);
        }
        return {
            json,
            success: true
        }
    } catch (e) {
        console.error(e);
        return { 
            error: e,
            success: false 
        };
    }
}

async function getPossibleDrinks() {
    try {
        const response = await fetch(BACKEND_LINK + 'drink/ingredients');
        const json = await response.json();

        if (response.status !== 200) {
            throw new Error(json.error);
        }
        return {
            drinks: json,
            success: true
        }
    } catch (e) {
        console.error(e);
        return { 
            error: e,
            success: false 
        };
    }
}

async function setPumpSelectionStatus(password, pumpNumber, newSelection) {
    try {
        const response = await fetch(BACKEND_LINK + 'setPump', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, pump: pumpNumber, newSelection }),
        });
        const json = await response.json();

        if (response.status !== 200) {
            throw new Error(json.error);
        }
        return {
            success: true
        }
    } catch (e) {
        console.error(e);
        return { 
            error: e,
            success: false 
        };
    }
}

async function addIngredient(password, ingredient, category) {
    try {
        const response = await fetch(BACKEND_LINK + 'drink/addIngredient', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify({ password, ingredient, category }),
        });
        const json = await response.json();
        return json;
    } catch (e) {
        console.error(e);
        return { 
            error: e,
            success: false 
        };
    }
}

async function removeIngredient(password, ingredient, category) {
    try {
        const response = await fetch(BACKEND_LINK + 'drink/removeIngredient', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, ingredient, category }),
        });
        const json = await response.json();
        return json;
    } catch (e) {
        console.error(e);
        return {
            error: e,
            success: false
        }
    }
}

async function createDrink(drinkObject) {
    const drinkJSON = JSON.stringify(drinkObject);

    try {
        const response = await fetch(BACKEND_LINK + 'drink/add', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: drinkJSON,
        });
        
        const responseJSON = await response.json();
        return responseJSON;
    } catch(e) {
        return {
            error: e,
            success: false
        }
    }


}

async function getPossibleUnits() {
    return [
        'ml',
        'cl',
        'tsp',
        'tbsp',
    ]
}

async function getUnitInMl(unit) {
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

async function startPump(pumpNumber, forInMs) {
    fetch(BACKEND_LINK + 'startPump', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: pumpNumber, time: forInMs }),
    });
}

async function getAllDrinks() {
    try {
        const allDrinks = await fetch(BACKEND_LINK + 'drink/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const allDrinksJSON = await allDrinks.json();
        return {
            success: true,
            response: allDrinksJSON
        }
    } catch(e) {
        return {
            success: false,
        }
    }
}

async function makeDrink(id) {
    fetch(BACKEND_LINK + 'drink/make', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id}),
    });

    return true;
}

async function deleteDrink(password, id) {
    try {
        const response = await fetch(BACKEND_LINK + 'drink/remove', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
                id
            }),
        });

        return {
            success: true,
            response
        }
    } catch(e) {
        return {
            success: false,
            error: e
        }
    }
}

async function getIngredients(id) {
    try {
        const ingredients = await fetch(BACKEND_LINK + 'drink/ingredients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id}),
        });
        const ingredientsJSON = await ingredients.json();
        return {
            success: true,
            response: ingredientsJSON
        }
    } catch(e) {
        return {
            success: false,
            error: e
        }
    }
}

export { getStatus, checkPassword, getPumpsAndStatus, getPossibleDrinks, setPumpSelectionStatus, addIngredient, removeIngredient,
        getAllDrinks, getPossibleUnits, createDrink, startPump, makeDrink, deleteDrink, getIngredients }; 