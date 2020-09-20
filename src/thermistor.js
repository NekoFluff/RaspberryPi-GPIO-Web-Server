import { ADS7830 } from './ADCDevice.js';
var Gpio = require('pigpio').Gpio;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function temp() {
    const ads = new ADS7830();
    while (true) {
        try {
            let thermistorData = ads.analogRead(0);
            // console.log('thermistor', thermistorData);
            let voltage = thermistorData / 255.0 * 3.3;
            let Rt = 10 * voltage / (3.3 - voltage);   // calculate resistance value of thermistor
            let tempK = 1 / (1 / (273.15 + 25) + Math.log(Rt / 10) / 3950.0); // calculate temperature(Kelvin)
            let tempC = tempK - 273.15;        // calculate temperature(Celsius)
            let tempF = tempC * 9 / 5 + 32;
            console.log('ADC Value:', thermistorData, 'Voltage:', voltage, 'Temperature (F): ', tempF)
            await sleep(100);
        } catch (err) {
            console.log('An error has occured', err);
        }

    }
}

temp()


