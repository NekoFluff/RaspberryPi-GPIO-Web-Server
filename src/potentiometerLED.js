import { ADS7830 } from './ADCDevice.js';
var Gpio = require('pigpio').Gpio;

var led = new Gpio(17, { mode: Gpio.OUTPUT });

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function temp() {
    const ads = new ADS7830();
    while (true) {
        let rawData = ads.analogRead(0)
        let voltage = rawData / 255.0 * 3.3  // calculate the voltage value 
        console.log('Raw:', rawData, 'V', voltage);
        led.pwmWrite(rawData)
        await sleep(100)
    }
}

temp()


