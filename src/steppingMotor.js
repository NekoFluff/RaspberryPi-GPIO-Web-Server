
// NOTE: You have to push and hold the button
const Gpio = require('pigpio').Gpio;

const dutyOffset = 3
const servoMin = 5 + dutyOffset
const servoMax = 30 + dutyOffset

const a = new Gpio(18, { mode: Gpio.OUTPUT });
const b = new Gpio(23, { mode: Gpio.OUTPUT });
const c = new Gpio(24, { mode: Gpio.OUTPUT });
const d = new Gpio(25, { mode: Gpio.OUTPUT });
const outputs = [a, b, c, d];
const CCWStep = [0x01, 0x02, 0x04, 0x08];
const CWStep = [0x08, 0x04, 0x02, 0x01];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function moveOnePeriod(direction, ms) {
    let j = 0;
    let i = 0;

    for (j = 0; j < 4; j++) {
        for (i = 0; i < 4; i++) {
            if (direction == 1) {
                // Clockwise
                outputs[i].digitalWrite(CCWStep[j] == 1 << i);
            } else {
                // Counter clockwise
                outputs[i].digitalWrite(CWStep[j] == 1 << i);
            }
        }

        if (ms < 3)
            ms = 3

        await sleep(ms);
    }
}

async function moveSteps(direction, ms, steps) {
    for (let i = 0; i < steps; i++) {
        await moveOnePeriod(direction, ms);
    }
}

async function loop() {
    while (true) {
        await moveSteps(1, 3, 512)
        await sleep(500)
        await moveSteps(0, 3, 512)
        await sleep(500)
    }
}

loop()
