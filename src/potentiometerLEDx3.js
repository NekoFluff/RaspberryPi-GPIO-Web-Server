import { ADS7830 } from './ADCDevice.js';
var Gpio = require('pigpio').Gpio;

var r = new Gpio(16, { mode: Gpio.OUTPUT });
var g = new Gpio(26, { mode: Gpio.OUTPUT });
var b = new Gpio(20, { mode: Gpio.OUTPUT });

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function temp() {
    const ads = new ADS7830();
    while (true) {
        try {
            let rData = ads.analogRead(0);
            let gData = ads.analogRead(1);
            let bData = ads.analogRead(2);
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

temp()


