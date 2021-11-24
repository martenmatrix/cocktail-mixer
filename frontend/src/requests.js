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

export { getStatus }; 