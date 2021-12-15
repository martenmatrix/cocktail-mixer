const HOSTNAME = window.location.href;
const HOSTNAME_WITHOUT_PORT = HOSTNAME.slice(0, -6);
const BACKEND_PORT = 4000;
const BACKEND_LINK = `${HOSTNAME_WITHOUT_PORT}:${BACKEND_PORT}/`;

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

export { getStatus, checkPassword, getPumpsAndStatus, getPossibleDrinks, setPumpSelectionStatus, addIngredient, removeIngredient }; 