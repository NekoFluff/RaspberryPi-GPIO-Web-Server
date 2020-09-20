
// NOTE: You have to push and hold the button
const Gpio = require('pigpio').Gpio;

const dutyOffset = 3
const servoMin = 5 + dutyOffset
const servoMax = 30 + dutyOffset

const servoSignal = new Gpio(18, { mode: Gpio.OUTPUT });
servoSignal.digitalWrite(0);
servoSignal.pwmFrequency(50);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function map(value, fromLow, fromHigh, toLow, toHigh) {
    return (toHigh - toLow) * (value - fromLow) / (fromHigh - fromLow) + toLow
}

function servoWrite(angle) {
    if (angle < 0)
        angle = 0
    if (angle > 180)
        angle = 180
    servoSignal.pwmWrite(parseInt(map(angle, 0, 180, servoMin, servoMax)))
}


async function temp() {
    while (true) {
        try {
            var angle = 0;
            for (angle = 0; angle < 181; angle++) {
                servoWrite(angle)
                await sleep(2);
            }
            await sleep(100)
            for (angle = 180; angle >= 0; angle--) {
                servoWrite(angle)
                await sleep(2);
            }
            await sleep(100)
        } catch (err) {
            console.log('An error has occured', err);
        }

    }
}

temp()
