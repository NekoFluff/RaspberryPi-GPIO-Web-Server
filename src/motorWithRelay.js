
// NOTE: You have to push and hold the button
const Gpio = require('pigpio').Gpio;

const transistorEnabler = new Gpio(17, { mode: Gpio.OUTPUT });
const button = new Gpio(18, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_DOWN,
    edge: Gpio.EITHER_EDGE
});

button.glitchFilter(250 * 1000);

let relayState = false;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

button.on('interrupt', (level) => {
    relayState = !level
    console.log('Interrupt Relay State:', relayState)
    transistorEnabler.digitalWrite(relayState ? 1 : 0);
});

