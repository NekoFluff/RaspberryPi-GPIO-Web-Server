import { ADS7830 } from './ADCDevice.js';
var Gpio = require('pigpio').Gpio;

var motorEnable = new Gpio(26, { mode: Gpio.OUTPUT });
var motor1 = new Gpio(19, { mode: Gpio.OUTPUT });
var motor2 = new Gpio(13, { mode: Gpio.OUTPUT });
var ZAxisInput = new Gpio(18, { mode: Gpio.INPUT });

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function runMotor(input) {
    if (input > 127) {
        motor1.digitalWrite(1);
        motor2.digitalWrite(0);
        console.log("Forward!");

    } else if (input < 127) {
        motor1.digitalWrite(0);
        motor2.digitalWrite(1);
        console.log("Backwards!");

    } else {
        motor1.digitalWrite(0);
        motor2.digitalWrite(0);
        console.log("Nothing!");
    }

    let speed = Math.min(Math.abs(input - 127) * 2, 254)
    console.log("Speed:", speed);
    motorEnable.pwmWrite(speed);
}

async function temp() {
    const ads = new ADS7830();
    while (true) {
        try {
            let XAxis = ads.analogRead(0);
            let YAxis = ads.analogRead(1);
            let ZAxis = ZAxisInput.digitalRead();
            console.log('X:', XAxis, 'Y:', YAxis, 'Z: ', ZAxis)
            runMotor(XAxis);
            await sleep(100);
        } catch (err) {
            console.log('An error has occured', err);
        }
    }
}

temp()

