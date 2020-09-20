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
        var rawData = ads.analogRead(0);
        var voltage = rawData / 255.0 * 3.3; // calculate the voltage value 
        console.log('Raw:', rawData, 'V', voltage);
        led.pwmWrite(rawData);
        await sleep(100);
    }
}

temp();