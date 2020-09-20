'use strict';

var _ADCDevice = require('./ADCDevice.js');

var Gpio = require('pigpio').Gpio;

var led = new Gpio(17, { mode: Gpio.OUTPUT });

function sleep(ms) {
    return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
    });
}

async function temp() {
    var ads = new _ADCDevice.ADS7830();
    while (true) {
        try {
            var photoresistorData = ads.analogRead(0);
            led.pwmWrite(Math.min(254, photoresistorData));
            console.log('photoresistor', photoresistorData);
            await sleep(100);
        } catch (err) {
            console.log('An error has occured', err);
        }
    }
}

temp();