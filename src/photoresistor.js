import { ADS7830 } from './ADCDevice.js';
var Gpio = require('pigpio').Gpio;

var led = new Gpio(17, { mode: Gpio.OUTPUT });

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function temp() {
    const ads = new ADS7830();
    while (true) {
        try {
            let photoresistorData = ads.analogRead(0);
            led.pwmWrite(Math.min(254, photoresistorData));
            console.log('photoresistor', photoresistorData);
            await sleep(100);
        } catch (err) {
            console.log('An error has occured', err);
        }

    }
}

temp()


