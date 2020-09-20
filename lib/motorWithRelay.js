'use strict';

var _ADCDevice = require('./ADCDevice.js');

var Gpio = require('pigpio').Gpio;

var transistorEnabler = new Gpio(17, { mode: Gpio.OUTPUT });
var button = new Gpio(18, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_DOWN,
    edge: Gpio.EITHER_EDGE
});

button.glitchFilter(250 * 1000);

var relayState = false;

function sleep(ms) {
    return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
    });
}

button.on('interrupt', function (level) {
    relayState = !level;
    console.log('Interrupt Relay State:', relayState);
    transistorEnabler.digitalWrite(relayState ? 1 : 0);
});