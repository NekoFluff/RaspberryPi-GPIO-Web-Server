import { ADS7830 } from './ADCDevice.js';
var Gpio = require('pigpio').Gpio;

var ZAxisInput = new Gpio(18, { mode: Gpio.INPUT });

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function temp() {
    const ads = new ADS7830();
    while (true) {
        try {
            let XAxis = ads.analogRead(0);
            let YAxis = ads.analogRead(1);
            let ZAxis = ZAxisInput.digitalRead();
            console.log('X:', XAxis, 'Y:', YAxis, 'Z: ', ZAxis)
            await sleep(100);
        } catch (err) {
            console.log('An error has occured', err);
        }

    }
}

temp()


