const gpio = require('onoff').Gpio;

//index +1 stands for pumpid
let relays;
try {
    relays = [
        new gpio(11, 'high'),
        new gpio(13, 'high'),
        new gpio(19 , 'high'),
        new gpio(17, 'high'),
        new gpio(27, 'high'),
        new gpio(22, 'high'),
        new gpio(10, 'high'),
        new gpio(9, 'high'),
    ]
} catch (e) {
    console.error(e);
}

function showOnDisplay(text, removeAfter = null) {

}



let lastTimeoutID = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

async function activatePump(pumpID, activateFor) {
    try {
        const pumpArrayIndex = pumpID - 1;
        const relay = relays[pumpArrayIndex];
        if (!lastTimeoutID[pumpArrayIndex]) relay.writeSync(0);
        await new Promise((resolve, reject) => {
            clearTimeout(lastTimeoutID[pumpArrayIndex]);
            lastTimeoutID[pumpArrayIndex] = setTimeout(() => {
                lastTimeoutID[pumpArrayIndex] = null;
                relay.writeSync(1);
                resolve();
            }, Math.floor(activateFor));
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

module.exports.showOnDisplay = showOnDisplay;
module.exports.activatePump = activatePump;