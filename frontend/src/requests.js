const HOSTNAME = window.location.href;
const HOSTNAME_WITHOUT_PORT = HOSTNAME.slice(0, -6);
const BACKEND_PORT = 4000;

async function getStatus() {
    try {
        const response = await fetch(`${HOSTNAME_WITHOUT_PORT}:${BACKEND_PORT}/status`);
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
        const response = await fetch(`${HOSTNAME_WITHOUT_PORT}:${BACKEND_PORT}/password`, {
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

export { getStatus, checkPassword }; 