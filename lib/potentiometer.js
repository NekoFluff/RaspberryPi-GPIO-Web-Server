'use strict';

var _ADCDevice = require('./ADCDevice.js');

function sleep(ms) {
    return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
    });
} // const Gpio = require('pigpio').Gpio;


async function temp() {
    var ads = new _ADCDevice.ADS7830();
    while (true) {
        var rawData = ads.analogRead(0);
        var voltage = rawData / 255.0 * 3.3; // calculate the voltage value 
        console.log('Raw:', rawData, 'V', voltage);
        await sleep(100);
    }
}

temp();