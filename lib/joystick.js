'use strict';

var _ADCDevice = require('./ADCDevice.js');

var Gpio = require('pigpio').Gpio;

var ZAxisInput = new Gpio(18, { mode: Gpio.INPUT });

function sleep(ms) {
    return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
    });
}

async function temp() {
    var ads = new _ADCDevice.ADS7830();
    while (true) {
        try {
            var XAxis = ads.analogRead(0);
            var YAxis = ads.analogRead(1);
            var ZAxis = ZAxisInput.digitalRead();
            console.log('X:', XAxis, 'Y:', YAxis, 'Z: ', ZAxis);
            await sleep(100);
        } catch (err) {
            console.log('An error has occured', err);
        }
    }
}

temp();