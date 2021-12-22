function showOnDisplay(text, removeAfter = null) {

}

async function activatePump(pumpID, activateFor) {
    console.log(`Activating pump ${pumpID} for ${activateFor} ms`);
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, Math.floor(activateFor));
    });
    console.log(`Pump ${pumpID} disabled after ${activateFor} ms`);

    return true;
}

module.exports.showOnDisplay = showOnDisplay;
module.exports.activatePump = activatePump;