const gpio = require('onoff').Gpio;

//index +1 stands for pumpid
const relays = [
    new gpio(11, 'out'),
    new gpio(13, 'out'),
    new gpio(19 , 'out'),
    new gpio(17, 'out'),
    new gpio(27, 'out'),
    new gpio(22, 'out'),
    new gpio(10, 'out'),
    new gpio(9, 'out'),
]

function showOnDisplay(text, removeAfter = null) {

}

async function activatePump(pumpID, activateFor) {
    const pumpArrayIndex = pumpID - 1;
    const relay = relays[pumpArrayIndex];
    relay.writeSync(1);
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, Math.floor(activateFor));
    });
    relay.writeSync(0);
    relay.unexport();
    return true;
}

module.exports.showOnDisplay = showOnDisplay;
module.exports.activatePump = activatePump;