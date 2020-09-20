'use strict';

var _ADCDevice = require('./ADCDevice.js');

var Gpio = require('pigpio').Gpio;

function sleep(ms) {
    return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
    });
}

async function temp() {
    var ads = new _ADCDevice.ADS7830();
    while (true) {
        try {
            var thermistorData = ads.analogRead(0);
            // console.log('thermistor', thermistorData);
            var voltage = thermistorData / 255.0 * 3.3;
            var Rt = 10 * voltage / (3.3 - voltage); // calculate resistance value of thermistor
            var tempK = 1 / (1 / (273.15 + 25) + Math.log(Rt / 10) / 3950.0); // calculate temperature(Kelvin)
            var tempC = tempK - 273.15; // calculate temperature(Celsius)
            var tempF = tempC * 9 / 5 + 32;
            console.log('ADC Value:', thermistorData, 'Voltage:', voltage, 'Temperature (F): ', tempF);
            await sleep(100);
        } catch (err) {
            console.log('An error has occured', err);
        }
    }
}

temp();