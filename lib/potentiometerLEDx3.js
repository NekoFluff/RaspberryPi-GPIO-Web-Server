'use strict';

var _ADCDevice = require('./ADCDevice.js');

var Gpio = require('pigpio').Gpio;

var r = new Gpio(16, { mode: Gpio.OUTPUT });
var g = new Gpio(26, { mode: Gpio.OUTPUT });
var b = new Gpio(20, { mode: Gpio.OUTPUT });

function sleep(ms) {
    return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
    });
}

async function temp() {
    var ads = new _ADCDevice.ADS7830();
    while (true) {
        try {
            var rData = ads.analogRead(0);
            var gData = ads.analogRead(1);
            var bData = ads.analogRead(2);
            r.pwmWrite(Math.min(254, rData));
            g.pwmWrite(Math.min(254, gData));
            b.pwmWrite(Math.min(254, bData));
            console.log('r', rData, 'g', gData, 'b', bData);
            await sleep(100);
        } catch (err) {
            console.log('An error has occured', err);
        }
    }
}

temp();