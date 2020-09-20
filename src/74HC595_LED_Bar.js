
// NOTE: You have to push and hold the button
const Gpio = require('pigpio').Gpio;

const LSBFIRST = 1;
const MSBFIRST = 2;

// serial data input
const ds = new Gpio(22, { mode: Gpio.OUTPUT });

// st_cp (parallel update output)
const st_cp = new Gpio(27, { mode: Gpio.OUTPUT });

// sh_cp (serial shift clock)
const sh_cp = new Gpio(17, { mode: Gpio.OUTPUT });

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function shiftOut(order, val) {
    for (let i = 0; i < 8; i++) {
        sh_cp.digitalWrite(0);
        if (order == LSBFIRST) {
            ds.digitalWrite((0x1 & (val >> i)) == 0x01 ? 1 : 0);
        } else if (order == MSBFIRST) {
            ds.digitalWrite((0x80 & (val << i)) == 0x80 ? 1 : 0); // 0 or 1 for pin current pin e.g. Q0...
        }

        sh_cp.digitalWrite(1); // Move from Q0 -> Q1 -> Q2....
    }
}

async function loop() {
    while (true) {
        let x = 0x01;
        for (let i = 0; i < 8; i++) {
            st_cp.digitalWrite(0);
            await shiftOut(LSBFIRST, x);
            st_cp.digitalWrite(1); // Update all lights
            x <<= 1;
            await sleep(20 + i * 21)
        }
        x = 0x80;
        for (let i = 0; i < 8; i++) {
            st_cp.digitalWrite(0);
            await shiftOut(LSBFIRST, x);
            st_cp.digitalWrite(1);
            x >>= 1;
            await sleep(20 + i * 21)
        }
    }
}

loop()
